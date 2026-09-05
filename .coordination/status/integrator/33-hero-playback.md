# Issue 33 - Homepage hero video playback

- Lane: integrator
- Branch: integrator/hero-playback-33
- State: ready-for-integration
- Base reviewed: 36d9345f0aa82aa31ba948352ef77d5e6496848f
- Pull request: #34
- Last update: 2026-09-05

## Allowed paths

- src/pages/index.astro
- .coordination/status/integrator/33-hero-playback.md

## Findings and scope

- The live WebM decodes only two frames in Chrome, then reports MediaError code 3.
- Browser tests confirm that the existing MP4 plays normally at desktop and mobile-emulated sizes.
- Remove only the broken WebM source selection. Preserve the MP4, poster, content, styles, playback behavior, and reduced-motion support.
- Open PRs 19 and 32 do not change the homepage. The original checkout and other worktrees are untouched.

## Validation

- Clean locked dependency installation, coordination self-tests (10 cases), scope validation, Astro check, and production build passed.
- Astro check: 0 errors, 0 warnings, 2 existing deprecation hints in unrelated files.
- Chrome 152.0.7977.78 through existing Playwright: all 47 browser assertions passed against the actual production preview.
- Viewports: desktop 1440 x 900, tablet 820 x 1180, mobile-emulated 390 x 844; reduced-motion initial-load checks at desktop and mobile widths.
- Verified MP4 muted inline autoplay, increasing playback time and decoded frames, natural full-clip loop on desktop, loop boundaries at other sizes, scroll-away pause, scroll-back resume, reduced-motion poster, motion-preference return, and both homepage CTAs.
- Page identity, meaningful content, framework-overlay absence, console/runtime health, images, and horizontal overflow passed. Desktop, tablet, and mobile screenshots were reviewed.
- Static build scan: 13 pages, 559 local navigation/asset references, 0 missing references; canonical metadata excluded.
- MP4 SHA-256 matches the already verified live MP4 exactly; no media file was replaced.
- Browser plugin not available; existing Playwright/Chrome used without adding dependencies. Physical iOS/Safari testing was not performed.
- QA scripts, screenshots, and JSON evidence remain outside Git in the dedicated XPS temporary QA directory.

## Next

- Recheck required CI on the final status-only commit and integrate through the protected PR path.
- Verify the resulting GitHub Pages release with the same browser checks on the live homepage.
