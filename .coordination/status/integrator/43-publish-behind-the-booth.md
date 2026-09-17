# Issue 43 — Publish Behind the Booth

- Lane: integrator
- Branch: integrator/publish-behind-the-booth-43
- State: ready-for-integration
- Base reviewed: 6a33a4825d43844468ae28a9ae27fd8aa684f62f
- Pull request: https://github.com/EazyPhe/djphelix.com/pull/44
- Last update: 2026-09-17

## Allowed paths

- src/data/site.ts (new Highlights entry only)
- src/pages/highlights.astro (page description only)
- public/media/highlights/behind-the-booth-*-v01.mp4
- public/media/highlights/behind-the-booth-*-v01.jpg
- .coordination/status/integrator/43-publish-behind-the-booth.md

## Completed

- The user explicitly authorized publication of the approved Behind the Booth v01 wide and vertical films.
- Created an isolated worktree from current origin/main. Original dirty checkout and prior films are preserved.
- Reviewed open PRs #19 and #32; neither currently changes a release path.
- Approved masters are 804 frames at 30fps (26.8 seconds), with native Resolve project and technical/visual QA completed.
- Added Behind the Booth as the first Highlight, with separate 1920x1080 and 1080x1920 web deliveries and matching posters.
- Web deliveries passed full decode, faststart, frame-count and unchanged AAC/decoded-audio checks. Source masters are preserved; all 16 sampled visual comparisons match the approved edit.
- Web assets copied into the release with SHA-256 verification: wide 29,988,333 bytes; vertical 32,436,279 bytes.
- Coordination self-tests passed (10 cases). Astro check passed with 0 errors, 0 warnings and 2 pre-existing deprecation hints. Production build passed (14 pages).
- Independent real-Chrome QA passed 282 assertions across desktop, tablet and mobile widths (1440, 1080, 834, 761, 760, 390 and 320). All eight film formats decode and play; switching, source unloading, persistence, keyboard focus, reduced motion, blocked storage and no-JavaScript fallbacks passed with no console errors or warnings.
- Full-site smoke passed 28 checks across all 14 routes at desktop and mobile widths.
- Independent product-diff and asset-hash review found no issues. Integrator independently reviewed the comparison sheets, desktop/mobile page captures and QA results.
- Fresh origin/main is still the reviewed base, and open PRs #19 and #32 have no overlapping paths.
- Initial commit 1448a033a346a80242a7367eaf212a1a5ed9e5f1 passed GitHub CI and Agent scope. The final status-only commit must pass the same checks before merge.
- Detailed local evidence: C:/Users/playa/Documents/Codex/2026-09-16/djphelix-new-video/outputs/behind-the-booth-web-release-v01/qa-local/.

## Next

- Merge only after final-commit CI and scope checks pass, then verify the Pages deployment, exact live asset hashes, byte-range delivery and browser playback.

## Blockers and requests

- None. No homepage, DNS, settings, workflow, dependency, or unrelated changes are in scope.
