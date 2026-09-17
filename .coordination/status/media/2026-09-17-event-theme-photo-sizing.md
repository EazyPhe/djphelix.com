# Issue 45 - Event theme photo sizing

- Lane: media
- Branch: agent/media/event-theme-photo-sizing
- State: ready for release checks
- Base reviewed: abed44409d9d612e666a6fbe6e6d25101e398c10
- Task contract: direct owner request, 2026-09-17, fix badly sized photos on the event theme page.
- Delivery: owner explicitly requested publication on 2026-09-17 after reviewing the local fix.
- Issue: https://github.com/EazyPhe/djphelix.com/issues/45
- Release integrator: primary agent; independent QA agent reviews before merge.

## Allowed paths

- src/pages/events-nightlife.astro
- .coordination/status/media/2026-09-17-event-theme-photo-sizing.md
- docs/review/media/event-theme-photo-sizing/**

## Diagnosis

Live /events-nightlife/ reproduces a blank region below the hero photo. Its figure has a minimum height but the in-flow image percentage height resolves to its intrinsic 3:2 ratio. At 390px viewport the frame is 350 x 384 while the image is 350 x 233.

## Scope and coordination

Use page-scoped positioning to fill the existing responsive frame, preserve aspect ratio through object-fit: cover, and preserve the current focal point. Do not change business copy, assets, shared styles or other pages. Open drafts #19 and #32 have no current changed-file overlap; #19 plans a future gallery on this route but currently contains status only. Original dirty checkout remains untouched.

## Verification completed

- 10 coordination self-tests passed; media ownership check passed.
- npm run check: 0 errors, 0 warnings, 2 existing deprecation hints in unrelated files.
- npm run build: passed, 14 static pages.
- Google Chrome via existing Playwright 1.61.1: 130 assertions passed at widths 320, 390, 760, 768, 1080, 1081, 1440 and 1920.
- Hero photo and frame bounds match; object-fit cover preserves proportions and the right-center crop. No horizontal overflow or browser errors.
- Mobile menu opens and closes via Escape with focus restored. Booking CTA reaches /contact/. Affected-page internal links return HTTP success.
- Wedding hero positioning is unchanged, confirming page-scoped styles.
- Live before screenshots confirm the gap; local desktop, tablet and mobile screenshots were inspected.
- Independent exact-diff review found no actionable issues.
- Browser plugin unavailable; used existing Playwright and installed Chrome. No dependency changes.
- Evidence: docs/review/media/event-theme-photo-sizing/ (five screenshots and checks.json).
- Preview: http://127.0.0.1:4329/events-nightlife/
- Original dirty checkout status matches the initial inspection.

## Delivery status

Owner approved publishing this verified fix. Release through a protected pull request, wait for required CI and independent QA, then verify the existing Pages deployment and public page. No hosting configuration changes are needed.
