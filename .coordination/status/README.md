# Task Status Files

Create one uniquely named Markdown file per task:

```text
.coordination/status/<lane>/<issue-number>-<task-slug>.md
```

A task may edit only its own status file. Never maintain a shared all-agents status document in Git.

Required fields:

```markdown
# Issue <number> — <title>

- Lane: <lane>
- Branch: agent/<lane>/<task-slug>
- State: planned | in-progress | blocked | ready-for-qa | ready-for-integration | completed
- Base reviewed: <main commit SHA>
- Pull request: <number or draft>
- Last update: YYYY-MM-DD

## Allowed paths

- <exact path or approved pattern>

## Completed

- <verified progress>

## Next

- <next bounded action>

## Blockers and requests

- None, or a structured message reference.
```

Issue #6 is the live cross-agent control room. This directory is a durable handoff record, not a chat system.
