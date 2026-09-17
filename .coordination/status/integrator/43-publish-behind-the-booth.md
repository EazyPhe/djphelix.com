# Issue 43 — Publish Behind the Booth

- Lane: integrator
- Branch: integrator/publish-behind-the-booth-43
- State: in-progress
- Base reviewed: 6a33a4825d43844468ae28a9ae27fd8aa684f62f
- Pull request: pending first coherent commit
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
- Independent desktop, tablet, mobile and full-site browser QA is running against the production preview on port 4403.

## Next

- Open the draft PR and validate committed scope.
- Complete independent browser QA, then merge only after CI and scope checks pass; verify the Pages deployment and live media/playback.

## Blockers and requests

- None. No homepage, DNS, settings, workflow, dependency, or unrelated changes are in scope.
