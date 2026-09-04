# Issue 9 — Client & Venue Resources hub

- Lane: integrator
- Branch: integrator/client-venue-resources
- State: ready-to-merge
- Base reviewed: 7aec00105fb48911594cba4d4805f08c2087e457
- Pull request: #10
- Last update: 2026-09-03

## Allowed paths

- src/pages/client-documents.astro
- src/pages/contact.astro
- src/data/site.ts
- scripts/generate_client_documents.py
- scripts/generate_resource_documents.py
- scripts/generate_branded_resource_documents.py
- scripts/mark_sample_agreement.py
- requirements-client-documents.txt
- package.json
- .github/workflows/ci.yml
- .coordination/status/integrator/9-client-venue-resources.md
- docs/review/integrator/**

## Completed

- Registered issue #9 as the integrator task contract.
- Created the isolated implementation branch from the reviewed main commit.
- Rebuilt `/client-documents/` as the Client & Venue Resources hub while preserving the existing public URL.
- Added role shortcuts, six public resources, a sample-agreement warning, a completed-form return workflow, private W-9 and vendor request paths, FAQs, and safety guidance.
- Removed the inactive public COI solicitation from the Contact page.
- Renamed the navigation item from `Client Docs` to `Resources`.
- Added build-time generation for the venue advance, milestone checklist, wedding cue addendum, and branded one-sheet.
- Added a pull-request preview artifact to CI for rendered QA before deployment.
- Preserved all fillable fields while marking the public agreement as sample-only on every page.
- Corrected PDF build ordering so the approved lion logo and contact QR are embedded without creating duplicate public routes.
- Completed CI and agent-scope checks successfully on reviewed head `69d2b67f9070bd017985508a545d0429c363c108`.
- Completed 78 automated preview checks plus visual inspection at desktop, tablet, and mobile widths.
- Rendered and inspected all six PDFs; page counts, form fields, logo use, QR placement, and sample markings passed.
- Recorded the verification evidence in `docs/review/integrator/client-venue-resources-qa.md`.

## Next

- Wait for the status-only commits to pass the final pull-request CI and agent-scope checks.
- Merge pull request #10.
- Deliberately dispatch the GitHub Pages deployment from `main`.
- Verify the live custom-domain page, interactions, and document downloads.

## Blockers and requests

- None.
