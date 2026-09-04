# Issue 14 — Live inquiry delivery

- Lane: integrator
- Branch: integrator/live-inquiry-delivery
- State: in-progress
- Base reviewed: d9ea38719fcfd0b237eb6a79e5e599c3a97d5242
- Pull request: pending
- Last update: 2026-09-04

## Allowed paths

- src/data/site.ts
- src/components/BookingForm.astro
- src/pages/contact.astro
- src/pages/privacy.astro
- src/pages/inquiry-received.astro
- .coordination/status/integrator/14-live-inquiry-delivery.md
- docs/review/integrator/**

## Completed

- Registered issue #14 as the task contract.
- Created an isolated integrator branch and worktree from current `main`.
- Confirmed the approved temporary destination is `estinvilp3@gmail.com`.
- Selected FormSubmit as the temporary static-site form transport.

## Next

- Connect the booking form and add accurate success, privacy, and fallback behavior.
- Run repository checks and rendered browser QA.
- Deploy, activate the FormSubmit route, and verify an end-to-end delivery in Gmail.

## Blockers and requests

- FormSubmit requires one activation email after the first live submission.
