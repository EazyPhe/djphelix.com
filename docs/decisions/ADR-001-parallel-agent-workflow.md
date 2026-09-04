# ADR-001: Parallel Agent Workflow

- Status: Accepted
- Date: 2026-09-03
- Decision owner: Repository integrator

## Context

Several independent website features can be developed concurrently, but the site also contains high-conflict files such as global styles, navigation, shared data, configuration, workflows, and deployment settings. A single shared Markdown log would itself become a merge-conflict hotspot and would not provide real-time visibility across isolated worktrees.

## Decision

Use a coordinator-led GitHub workflow:

- one issue, branch, worktree, status file, and pull request per task;
- registered feature lanes with explicit path ownership;
- integrator-only ownership of shared architecture and deployment files;
- issue #6 as the live cross-agent message channel;
- unique lane/task Markdown files for durable status and handoff records;
- automated scope validation on pull requests;
- automated overlap detection against other open pull requests;
- standard CI and QA before integrator-controlled merge and deployment.

The scope workflow uses `pull_request_target` and executes only the checker and ownership policy from the protected base commit. It fetches the proposed head only for a filename diff and never executes pull-request code. This prevents a feature branch from weakening its own guardrails in the same pull request.

## Consequences

### Positive

- Parallel work can proceed with bounded ownership.
- Shared-file edits are centralized and reviewable.
- Conflicts are detected before merge.
- Task state and decisions remain auditable.
- A feature agent cannot make its own scope checker permissive and then rely on that altered checker.

### Costs and limitations

- The integrator must route shared changes and merge order.
- Branch naming is part of the trust model because all automated agents may operate through the same GitHub identity.
- Repository rules or branch protection are still required to prevent direct pushes to `main`; the in-repository workflow cannot enforce server-side push permissions by itself.
- Legitimate scope changes require an integrator update to `ownership.json`.

## Rejected alternatives

- **One shared status Markdown file:** rejected because isolated worktrees do not provide real-time synchronization and concurrent edits cause conflicts.
- **Unrestricted peer-to-peer changes:** rejected because agents could silently modify another lane or shared architecture.
- **One branch for all agents:** rejected because worktrees cannot safely share one checked-out branch and change attribution becomes unclear.
