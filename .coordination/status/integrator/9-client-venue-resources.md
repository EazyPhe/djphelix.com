# Issue 9 — Client & Venue Resources hub

- Lane: integrator
- Branch: integrator/client-venue-resources
- State: validating
- Base reviewed: 7aec00105fb48911594cba4d4805f08c2087e457
- Pull request: #10
- Last update: 2026-09-03

## Allowed paths

- src/pages/client-documents.astro
- src/pages/contact.astro
- src/data/site.ts
- scripts/generate_client_documents.py
- scripts/generate_resource_documents.py
- package.json
- .github/workflows/ci.yml
- .coordination/status/integrator/9-client-venue-resources.md
- docs/review/integrator/**

## Completed

- Registered issue #9 as the integrator task contract.
- Created the isolated implementation branch from the reviewed main commit.
- Rebuilt `/client-documents/` as the Client & Venue Resources hub.
- Added role shortcuts, six public resources, a sample-agreement warning, a form-return workflow, private W-9 and vendor request paths, FAQs, and safety guidance.
- Removed the inactive public COI solicitation from the Contact page.
- Renamed the navigation item from `Client Docs` to `Resources`.
- Added build-time generation for the venue advance, milestone checklist, wedding cue addendum, and one-sheet.
- Added a pull-request preview artifact to CI for rendered QA before deployment.
- Opened draft pull request #10.

## Next

- Complete CI and ownership checks.
- Download the production preview artifact and validate desktop, tablet, mobile, interaction, link, and PDF behavior.
- Merge and deliberately deploy after all checks pass.

## Blockers and requests

- None.
