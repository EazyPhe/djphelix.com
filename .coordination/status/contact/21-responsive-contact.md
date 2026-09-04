# Issue 21 — Responsive contact actions

- Lane: contact
- Branch: agent/contact/issue-21-responsive-contact
- State: in-progress
- Base reviewed: fa4befc4e4c3164896b3e1fe19f41e0977f99338
- Pull request: draft
- Last update: 2026-09-04

## Allowed paths

- `.coordination/status/contact/21-responsive-contact.md`
- `src/pages/contact.astro`
- `src/styles/contact-card.css`
- `docs/review/contact/21-responsive-contact/**`

## Scope

- Place the booking inquiry form before the save-contact section.
- Keep the complete save-contact action workflow available at 800 px and below.
- Hide the vCard, SMS, alternate-card, platform-note, import-instruction, and hero save-contact controls above 800 px.
- Preserve the QR code, contact identity, phone, email, website, live form delivery, and venue resources.

## Completed

- Confirmed the contact lane owns every product path in this change.
- Moved the booking inquiry form above the save-contact section.
- Added a desktop-only hide rule using the site's existing 800 px mobile breakpoint.
- Kept the QR code and basic contact details visible on desktop.
- Preserved the mobile vCard download and SMS links.
- Preserved the live booking-form copy and delivery behavior added on current `main`.

## Next

- Complete CI and responsive review on the pull request.
- Mark ready for integration after required checks pass.

## Blockers and requests

- None.
