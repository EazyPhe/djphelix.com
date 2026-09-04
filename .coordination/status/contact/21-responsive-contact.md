# Issue 21 — Responsive contact actions

- Lane: contact
- Branch: agent/contact/issue-21-responsive-contact
- State: ready-for-qa
- Base reviewed: bd35949c1f51ff15870c53a1f79f6cf29516abe8
- Pull request: #23
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
- Applied the product changes to a clean worktree based on current `main`.
- Passed `npm run check` with zero errors and two pre-existing deprecation hints.
- Passed `npm run build`; all 12 routes were generated.
- Confirmed the generated HTML places the booking section before `#save-contact`.
- Confirmed the generated CSS contains the desktop-only hide rule.
- Rendered the contact page successfully in Google Chrome at desktop width.
- Opened pull request #23 with no files outside the contact lane.
- Integrated current `main` after the Events page and automatic deployment updates landed; neither update touched contact-owned files.
- Passed the Agent scope workflow on the combined branch head.

## Next

- Confirm required CI passes on the final branch head.
- Merge pull request #23 by squash and verify the automatic Pages deployment.

## Blockers and requests

- None.
