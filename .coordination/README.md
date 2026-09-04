# DJ Phelix Agent Control Plane

This directory defines how multiple agents can work on `djphelix.com` concurrently without treating the repository as a shared free-for-all.

## Sources of truth

Use these records in this order:

1. **GitHub issue** — task contract, acceptance criteria, decisions, and blockers.
2. **Feature branch and pull request** — proposed code and review discussion.
3. **CI checks** — objective build and scope validation.
4. **Task status file** — compact handoff record for one task.
5. **Control-room issue #6** — cross-agent coordination and conflict routing.

Control room: https://github.com/EazyPhe/djphelix.com/issues/6

A Markdown file in Git is not a real-time document. Agents therefore write separate task status files, while issue #6 provides the live shared message stream.

## Roles

### Integrator

The integrator owns shared architecture, global navigation, global styles, configuration, workflow files, data contracts, cross-lane changes, merge order, and deployment. The integrator may use `coordination/*` or `integrator/*` branches.

### Feature agents

Feature agents use `agent/<lane>/<task-slug>` branches and may edit only their lane's paths in `ownership.json`. They request shared changes rather than editing shared files.

### QA agent

The QA agent validates behavior, accessibility, responsive layouts, links, builds, and integration. QA reports product-code defects to the feature agent or integrator instead of silently repairing files outside the QA lane.

## Registered lanes

- `contact` — contact page, booking/contact components, QR/VCF assets, and client-document request experience.
- `playlists` — playlist page, Spotify presentation, playlist data, and playlist-specific styles/assets.
- `media` — nightlife/media/mixes pages and media-specific components, data, styles, and assets.
- `qa` — tests, QA scripts, review evidence, status, and handoff files.

Adding or changing a lane requires an integrator pull request.

## Starting a task

Example for issue 7 in the contact lane:

```bash
git fetch origin
git worktree add ../djphelix-contact-7 -b agent/contact/issue-7-vcf origin/main
cd ../djphelix-contact-7
mkdir -p .coordination/status/contact
```

Create `.coordination/status/contact/7-vcf.md` from the status template, commit it with the first coherent implementation slice, and open a draft pull request.

Never point two worktrees at the same branch. Never reuse a branch for a second task.

## Status-file format

Each task creates one unique file:

```markdown
# Issue 7 — VCF download

- Lane: contact
- Branch: agent/contact/issue-7-vcf
- State: in-progress
- Base reviewed: <main commit SHA>
- Pull request: draft
- Last update: 2026-09-03

## Allowed paths

- src/pages/contact.astro
- public/contact/**

## Completed

- Created the first implementation slice.

## Next

- Validate iOS and Android download behavior.

## Blockers and requests

- SHARED_FILE_REQUEST: add a header link after approval.
```

Do not edit another task's status file.

## Cross-agent messages

Post messages in issue #6 using this exact shape:

```yaml
AGENT_MESSAGE:
  type: SHARED_FILE_REQUEST
  from: playlists
  to: integrator
  issue: 12
  pull_request: 15
  blocking: false
  affected_paths:
    - src/components/Header.astro
  request: Add the Playlists navigation entry after the feature PR is approved.
```

Valid `type` values:

- `SHARED_FILE_REQUEST`
- `CONFLICT_DETECTED`
- `INTERFACE_CHANGE`
- `BLOCKED`
- `READY_FOR_QA`
- `QA_FAILED`
- `READY_FOR_INTEGRATION`
- `DECISION_REQUIRED`

A message is not approval. Only an explicit integrator response changes scope.

## Conflict protocol

1. Stop editing the disputed path.
2. Re-check `ownership.json` and open pull requests.
3. Post `CONFLICT_DETECTED` with the path, branches, and preferred resolution.
4. Continue only on unaffected files.
5. The integrator chooses ownership, sequencing, an interface split, or a consolidation branch.

The automated `Agent scope` workflow blocks lane violations and overlapping files across open feature pull requests. It does not replace human review.

## Shared-file request protocol

Feature agents must request changes to integrator-owned files. The request must include:

- exact path;
- required behavior, not an unsolicited rewrite;
- dependency or interface expectation;
- whether it blocks the feature;
- associated issue and pull request.

The integrator applies the smallest compatible shared change after reviewing the feature branch.

## Pull-request sequence

1. Draft PR opened early.
2. Scope workflow verifies branch and changed paths.
3. Standard CI runs dependency installation, coordination self-tests, Astro checks, and production build.
4. Feature agent posts `READY_FOR_QA`.
5. QA records findings.
6. Feature agent resolves lane-owned findings; integrator resolves shared findings.
7. Integrator updates shared files and merge order.
8. Full-site validation runs on the integrated result.
9. Integrator merges and deploys deliberately.

## Local commands

```bash
npm ci
npm run coordination:test
npm run coordination:check -- --base origin/main --head HEAD
npm run check
npm run build
```

`coordination:check` derives the lane from the current branch. Use the registered branch format or it will fail closed.
