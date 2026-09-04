#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const CONFIG_PATH = fileURLToPath(new URL('../.coordination/ownership.json', import.meta.url));

function parseArgs(argv) {
  const values = new Map();
  const flags = new Set();

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    if (token === '--self-test' || token === '--require-overlap-check') {
      flags.add(token.slice(2));
      continue;
    }

    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) {
      throw new Error(`Missing value for ${token}`);
    }

    values.set(token.slice(2), next);
    index += 1;
  }

  return {
    get(name) {
      return values.get(name);
    },
    has(name) {
      return flags.has(name);
    },
  };
}

function loadConfig() {
  const parsed = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));

  if (parsed.schemaVersion !== 1) {
    throw new Error(`Unsupported ownership schema version: ${parsed.schemaVersion}`);
  }

  if (!parsed.branchPolicy?.agentPattern || !Array.isArray(parsed.branchPolicy?.privilegedPatterns)) {
    throw new Error('ownership.json is missing branchPolicy configuration.');
  }

  if (!parsed.lanes || typeof parsed.lanes !== 'object') {
    throw new Error('ownership.json is missing lane definitions.');
  }

  return parsed;
}

function escapeRegExp(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&');
}

function globToRegExp(glob) {
  const normalized = glob.replaceAll('\\', '/');
  const doubleStarToken = '__DOUBLE_STAR__';
  const escaped = escapeRegExp(normalized)
    .replaceAll('**', doubleStarToken)
    .replaceAll('*', '[^/]*')
    .replaceAll(doubleStarToken, '.*');

  return new RegExp(`^${escaped}$`);
}

function matchesPattern(path, pattern) {
  return globToRegExp(pattern).test(path.replaceAll('\\', '/'));
}

function matchesAny(path, patterns) {
  return patterns.some((pattern) => matchesPattern(path, pattern));
}

function classifyBranch(branch, config) {
  for (const pattern of config.branchPolicy.privilegedPatterns) {
    if (new RegExp(pattern).test(branch)) {
      return { kind: 'privileged', lane: 'integrator' };
    }
  }

  const match = new RegExp(config.branchPolicy.agentPattern).exec(branch);
  if (!match) {
    return { kind: 'invalid', lane: null };
  }

  const lane = match.groups?.lane ?? match[1];
  return { kind: 'agent', lane };
}

function evaluateScope({ branch, files, config }) {
  const classification = classifyBranch(branch, config);

  if (classification.kind === 'invalid') {
    return {
      ok: false,
      classification,
      violations: [
        {
          path: '(branch)',
          reason:
            'Unregistered branch name. Use agent/<lane>/<task-slug> for feature work or a coordinator-assigned privileged prefix.',
        },
      ],
    };
  }

  if (classification.kind === 'privileged') {
    return { ok: true, classification, violations: [] };
  }

  const lane = config.lanes[classification.lane];
  if (!lane) {
    return {
      ok: false,
      classification,
      violations: [
        {
          path: '(branch)',
          reason: `Lane "${classification.lane}" is not registered in .coordination/ownership.json.`,
        },
      ],
    };
  }

  const violations = [];
  for (const rawPath of files) {
    const path = rawPath.replaceAll('\\', '/');

    if (matchesAny(path, config.integratorOnly ?? [])) {
      violations.push({
        path,
        reason: `Integrator-owned path. Post SHARED_FILE_REQUEST in control-room issue #${config.controlRoomIssue}.`,
      });
      continue;
    }

    if (!matchesAny(path, lane.allowedPaths ?? [])) {
      violations.push({
        path,
        reason: `Path is outside the "${classification.lane}" lane. Request an ownership change from the integrator.`,
      });
    }
  }

  return {
    ok: violations.length === 0,
    classification,
    violations,
  };
}

function runGit(args) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function resolveBranch(explicitBranch) {
  if (explicitBranch) {
    return explicitBranch;
  }

  if (process.env.GITHUB_HEAD_REF) {
    return process.env.GITHUB_HEAD_REF;
  }

  const branch = runGit(['branch', '--show-current']);
  if (!branch) {
    throw new Error('Unable to determine branch. Pass --branch explicitly.');
  }

  return branch;
}

function parseFilesArgument(value) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== 'string')) {
      throw new Error('--files JSON must be an array of strings.');
    }
    return parsed;
  }

  return trimmed
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function changedFiles(base, head) {
  try {
    const output = execFileSync(
      'git',
      ['diff', '--name-only', '--diff-filter=ACDMRTUXB', '-z', `${base}...${head}`],
      {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );

    return output.split('\0').filter(Boolean);
  } catch (error) {
    const stderr = error?.stderr?.toString?.().trim();
    throw new Error(
      `Unable to compare ${base}...${head}.${stderr ? ` Git reported: ${stderr}` : ''}`,
    );
  }
}

function annotationEscape(value) {
  return value
    .replaceAll('%', '%25')
    .replaceAll('\r', '%0D')
    .replaceAll('\n', '%0A');
}

function printScopeResult(branch, files, result) {
  console.log(`Agent scope branch: ${branch}`);
  console.log(`Classification: ${result.classification.kind}`);
  console.log(`Lane: ${result.classification.lane ?? 'none'}`);
  console.log(`Changed files evaluated: ${files.length}`);

  if (result.ok) {
    if (result.classification.kind === 'privileged') {
      console.log('Scope result: PASS (integrator/privileged branch)');
    } else {
      console.log('Scope result: PASS');
    }
    return;
  }

  console.error('Scope result: FAIL');
  for (const violation of result.violations) {
    const message = `${violation.path}: ${violation.reason}`;
    console.error(`- ${message}`);
    console.error(`::error file=${annotationEscape(violation.path)}::${annotationEscape(message)}`);
  }
}

async function githubRequest(path, token) {
  const apiBase = process.env.GITHUB_API_URL ?? 'https://api.github.com';
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'djphelix-agent-scope-checker',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status} for ${path}: ${body.slice(0, 500)}`);
  }

  return response.json();
}

async function listOpenPullRequests(repository, baseBranch, token) {
  const pulls = [];

  for (let page = 1; page <= 10; page += 1) {
    const batch = await githubRequest(
      `/repos/${repository}/pulls?state=open&base=${encodeURIComponent(baseBranch)}&per_page=100&page=${page}`,
      token,
    );
    pulls.push(...batch);
    if (batch.length < 100) {
      break;
    }
  }

  return pulls;
}

async function listPullRequestFiles(repository, pullNumber, token) {
  const files = [];

  for (let page = 1; page <= 30; page += 1) {
    const batch = await githubRequest(
      `/repos/${repository}/pulls/${pullNumber}/files?per_page=100&page=${page}`,
      token,
    );
    files.push(...batch.map((entry) => entry.filename));
    if (batch.length < 100) {
      break;
    }
  }

  return files;
}

async function findPullRequestOverlaps({
  repository,
  currentPullNumber,
  currentFiles,
  baseBranch,
  token,
}) {
  const currentSet = new Set(currentFiles.map((path) => path.replaceAll('\\', '/')));
  const pulls = await listOpenPullRequests(repository, baseBranch, token);
  const overlaps = [];

  for (const pull of pulls) {
    if (Number(pull.number) === Number(currentPullNumber)) {
      continue;
    }

    const otherFiles = await listPullRequestFiles(repository, pull.number, token);
    const shared = otherFiles.filter((path) => currentSet.has(path.replaceAll('\\', '/')));

    if (shared.length > 0) {
      overlaps.push({
        number: pull.number,
        title: pull.title,
        branch: pull.head?.ref ?? 'unknown',
        url: pull.html_url,
        files: shared.sort(),
      });
    }
  }

  return overlaps;
}

function printOverlaps(overlaps) {
  if (overlaps.length === 0) {
    console.log('Open pull-request overlap check: PASS');
    return;
  }

  console.error('Open pull-request overlap check: FAIL');
  for (const overlap of overlaps) {
    console.error(`- PR #${overlap.number} (${overlap.branch}): ${overlap.title}`);
    console.error(`  ${overlap.url}`);
    for (const file of overlap.files) {
      const message = `${file} is also changed by open PR #${overlap.number} (${overlap.branch}).`;
      console.error(`  - ${file}`);
      console.error(`::error file=${annotationEscape(file)}::${annotationEscape(message)}`);
    }
  }
}

function runSelfTest(config) {
  const cases = [
    {
      name: 'contact lane accepts its main page',
      branch: 'agent/contact/issue-7-vcf',
      files: ['src/pages/contact.astro'],
      expected: true,
    },
    {
      name: 'contact lane accepts a nested contact route',
      branch: 'agent/contact/issue-7-vcf',
      files: ['src/pages/contact/saved.astro'],
      expected: true,
    },
    {
      name: 'contact lane rejects a playlist file',
      branch: 'agent/contact/issue-7-vcf',
      files: ['src/pages/playlists.astro'],
      expected: false,
    },
    {
      name: 'contact lane rejects a shared header',
      branch: 'agent/contact/issue-7-vcf',
      files: ['src/components/Header.astro'],
      expected: false,
    },
    {
      name: 'playlist lane accepts playlist-specific CSS',
      branch: 'agent/playlists/issue-8-spotify-cards',
      files: ['src/styles/playlists.css'],
      expected: true,
    },
    {
      name: 'QA lane rejects product source',
      branch: 'agent/qa/issue-9-responsive-review',
      files: ['src/pages/contact.astro'],
      expected: false,
    },
    {
      name: 'feature lane accepts its unique status file',
      branch: 'agent/media/issue-10-gallery',
      files: ['.coordination/status/media/10-gallery.md'],
      expected: true,
    },
    {
      name: 'integrator branch may update shared policy',
      branch: 'coordination/install-agent-control-plane',
      files: ['AGENTS.md', '.github/workflows/agent-scope.yml'],
      expected: true,
    },
    {
      name: 'unregistered branch fails closed',
      branch: 'feature/contact-refresh',
      files: ['src/pages/contact.astro'],
      expected: false,
    },
    {
      name: 'unknown lane fails closed',
      branch: 'agent/unknown/issue-11-test',
      files: ['tests/example.test.mjs'],
      expected: false,
    },
  ];

  const failures = [];
  for (const testCase of cases) {
    const result = evaluateScope({
      branch: testCase.branch,
      files: testCase.files,
      config,
    });
    if (result.ok !== testCase.expected) {
      failures.push(`${testCase.name}: expected ${testCase.expected}, received ${result.ok}`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`Agent scope self-test failed:\n${failures.map((item) => `- ${item}`).join('\n')}`);
  }

  console.log(`Agent scope self-test passed (${cases.length} cases).`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = loadConfig();

  if (args.has('self-test')) {
    runSelfTest(config);
    return;
  }

  const branch = resolveBranch(args.get('branch'));
  const explicitFiles = parseFilesArgument(args.get('files'));
  const base = args.get('base') ?? `origin/${config.defaultBaseBranch}`;
  const head = args.get('head') ?? 'HEAD';
  const files = explicitFiles ?? changedFiles(base, head);
  const result = evaluateScope({ branch, files, config });

  printScopeResult(branch, files, result);
  if (!result.ok) {
    process.exitCode = 1;
    return;
  }

  if (result.classification.kind === 'privileged') {
    console.log('Open pull-request overlap check: advisory only for privileged branches; skipped.');
    return;
  }

  const currentPullNumber = args.get('current-pr') ?? process.env.PR_NUMBER;
  const repository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  const requireOverlapCheck = args.has('require-overlap-check');

  if (!currentPullNumber || !repository || !token) {
    const missing = [
      !currentPullNumber && 'current PR number',
      !repository && 'GITHUB_REPOSITORY',
      !token && 'GITHUB_TOKEN',
    ].filter(Boolean);

    if (requireOverlapCheck) {
      throw new Error(`Cannot perform required overlap check; missing ${missing.join(', ')}.`);
    }

    console.log(`Open pull-request overlap check: skipped locally (${missing.join(', ')} unavailable).`);
    return;
  }

  const overlaps = await findPullRequestOverlaps({
    repository,
    currentPullNumber,
    currentFiles: files,
    baseBranch: config.defaultBaseBranch,
    token,
  });

  printOverlaps(overlaps);
  if (overlaps.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`Agent scope check failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
