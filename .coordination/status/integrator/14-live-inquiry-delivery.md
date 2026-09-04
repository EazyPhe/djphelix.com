# Issue 14 — Live inquiry delivery

- Lane: integrator
- Branch: integrator/live-inquiry-delivery
- State: validating
- Base reviewed: d9ea38719fcfd0b237eb6a79e5e599c3a97d5242
- Pull request: #15
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
- Confirmed the owner-approved temporary personal inbox.
- Selected FormSubmit as the temporary static-site form transport.
- Connected the booking form with POST delivery, spam controls, a direct-email fallback, and a branded confirmation route.
- Replaced the privacy placeholder with an interim operational privacy notice.
- Passed local coordination, Astro, production build, and 39 Playwright browser assertions.
- Added desktop and mobile evidence under `docs/review/integrator/live-inquiry-delivery/`.

## Next

- Complete pull-request CI and ownership checks.
- Merge and deliberately deploy after the checks pass.
- Activate the production FormSubmit route and verify an end-to-end delivery in Gmail.

## Blockers and requests

- FormSubmit requires one activation email after the first live submission.
