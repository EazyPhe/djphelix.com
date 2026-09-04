# DJ Phelix Repository Guidance

## Scope

- This repository owns only the static website for `https://djphelix.com`.
- Keep verified business facts, contact details, service areas, media links, and form endpoint settings in `src/data/site.ts`.
- Do not invent pricing, availability, testimonials, venue relationships, insurance, equipment, travel limits, or legal terms. Record missing inputs in `docs/CONTENT_NEEDED.md` through an integrator request.

## Required reading order

Before changing code, every agent must read:

1. This `AGENTS.md` file.
2. `.coordination/README.md`.
3. `.coordination/ownership.json`.
4. The assigned GitHub issue and pull-request description.
5. The task-specific status file under `.coordination/status/<lane>/`, when one exists.

The assigned issue is the task contract. Do not broaden its scope without written integrator approval.

## Multi-agent operating model

- Use one Git worktree and one branch per task.
- Feature branches must be named `agent/<lane>/<task-slug>`.
- Integrator branches must be named `coordination/<task-slug>` or `integrator/<task-slug>`.
- Only the integrator may use privileged branch prefixes, modify shared architecture, settle cross-lane conflicts, control merge order, or deploy.
- Feature agents may edit only the paths assigned to their lane in `.coordination/ownership.json`.
- A feature agent must not edit a shared or integrator-owned path, even for a one-line convenience change. Post a `SHARED_FILE_REQUEST` in control-room issue #6 instead.
- Do not use a common status Markdown file. Each task owns a unique file at `.coordination/status/<lane>/<issue-number>-<task-slug>.md`.
- Open a draft pull request early. The issue and pull request are the durable communication channels.
- When two tasks touch the same path, stop work on that path and post `CONFLICT_DETECTED` in issue #6. Do not resolve another agent's branch unilaterally.
- Agents do not merge their own pull requests. QA reports findings; the integrator performs shared fixes and merges.

## Required task lifecycle

1. Receive one issue with a lane, allowed paths, dependencies, and acceptance criteria.
2. Create the assigned branch and isolated worktree from current `origin/main`.
3. Create the unique task status file and record the exact scope before editing product code.
4. Open a draft pull request as soon as the branch has a coherent first commit.
5. Keep progress, blockers, interface requests, and shared-file requests in the task issue or control-room issue #6.
6. Run the required checks and record the results in the pull request.
7. Post `READY_FOR_QA`, then wait for QA or integrator review.
8. Post `READY_FOR_INTEGRATION` only after findings are resolved and the branch is current with `main`.

## Build and verification

- Use Astro with strict TypeScript and static output.
- Run `npm run coordination:test`, `npm run check`, and `npm run build` after material changes.
- Review affected pages in a real browser at desktop, tablet, and mobile widths before marking work ready.
- Keep lane-specific visual evidence under `docs/review/<lane>/`.
- Preserve keyboard access, visible focus, reduced-motion support, semantic landmarks, and honest static-form behavior.
- The QA lane is read-mostly. It may edit only its assigned test, QA script, review-evidence, status, and handoff paths.

## Communication protocol

Use one of these message types in issue #6 or the task issue:

- `SHARED_FILE_REQUEST`
- `CONFLICT_DETECTED`
- `INTERFACE_CHANGE`
- `BLOCKED`
- `READY_FOR_QA`
- `QA_FAILED`
- `READY_FOR_INTEGRATION`
- `DECISION_REQUIRED`

Use the exact YAML message format documented in `.coordination/README.md` so the integrator can scan and route messages consistently.

## Git and deployment safety

- Keep changes scoped to this repository and stage exact paths only.
- Never commit secrets, `.env` files, build output, generated dependency folders, EIN information, completed W-9 forms, customer data, or private booking information.
- Never push directly to `main`.
- Never alter remotes, GitHub Pages settings, repository visibility, domains, DNS, or deployment configuration unless the issue explicitly assigns that work to the integrator.
- Do not install or update production dependencies without integrator approval.
- Do not rewrite, force-push, or merge another agent's branch.
- Deployment remains a deliberate integrator action after full-site validation.
