# Client & Venue Resources QA

## Scope

- Issue: #9
- Pull request: #10
- Branch: `integrator/client-venue-resources`
- Reviewed head: `69d2b67f9070bd017985508a545d0429c363c108`
- CI preview run: `33832620811`
- CI preview artifact: `9922255734`
- Browser plugin: not available
- Rendered fallback: Python Playwright with system Chromium against the exact GitHub Actions preview artifact

## Automated result

The preview passed 78 checks covering:

- page identity, title, meaningful content, and framework-overlay absence;
- desktop, tablet, and mobile horizontal-overflow checks;
- desktop and mobile navigation behavior;
- role-shortcut scrolling and FAQ expansion;
- prepared W-9, vendor-onboarding, and completed-form email controls;
- local-page, VCF, image, and PDF link resolution;
- Contact-page regression checks and removal of the inactive COI card;
- console and failed-request health;
- public-artifact scan confirming that no W-9 PDF is exposed;
- PDF page counts, fillable-field counts, and agreement sample marking.

## CI gates

The following steps completed successfully in run `33832620811`:

1. Install Python PDF dependencies.
2. Install Node dependencies with `npm ci`.
3. Run `npm run coordination:test`.
4. Run `npm run check`.
5. Run `npm run build`.
6. Upload the pull-request Pages preview artifact.

The agent-scope workflow also completed successfully for the same pull-request head.

## PDF verification

| Document | Pages | Fillable fields | Result |
|---|---:|---:|---|
| Event, Music & Service Request Form | 5 | 120 | Pass |
| Wedding Cue & Pronunciation Addendum | 3 | 107 | Pass |
| Event Planning Milestone Checklist | 2 | 39 | Pass |
| Sample Event Entertainment Service Agreement | 4 | 81 | Pass |
| Venue Technical & Logistics Advance | 4 | 90 | Pass |
| DJ Phelix One-Sheet | 1 | 0 | Pass |

The sample agreement retains all 81 form fields and displays `SAMPLE FOR REVIEW - NOT AN EXECUTED AGREEMENT - DOES NOT RESERVE A DATE` on every page.

The generated resource PDFs were rendered to images and visually inspected. The final build embeds the approved DJ Phelix lion logo in the resource documents and includes the existing contact QR code in the one-sheet.

## Visual inspection

Reviewed states:

- desktop resource-hub hero and role navigation at 1440 x 1000;
- desktop venue-resource cards;
- desktop FAQ with an expanded answer;
- desktop Contact-page vendor section;
- tablet resource-hub layout at 820 x 1000;
- mobile hero at 390 x 844;
- mobile navigation open state;
- mobile planning cards;
- mobile private-document request cards.

No clipping, accidental horizontal scrolling, unreadable text, overlapping controls, missing images, broken card layouts, or relevant console errors were observed.

## Interaction path

`/client-documents/` -> select Venue role shortcut -> verify `#venue-resources` target -> expand first FAQ -> verify answer visibility -> inspect prepared W-9, vendor-inquiry, and completed-form email links -> open `/contact/` -> verify two vendor cards and no inactive COI solicitation -> open mobile menu -> verify Resources entry and close control.

## Remaining operational limitations

- The site remains static; completed PDFs must be attached manually in the user's email application.
- W-9 and vendor-document requests remain manual-review email workflows.
- The booking form still requires a future owner-approved form endpoint before it can submit directly.
- The current inquiry destination remains the verified personal Gmail address until the planned Google Workspace account is funded and activated.
