# Issue 33 - Homepage hero video playback

- Lane: integrator
- Branch: integrator/hero-playback-33
- State: in-progress
- Base reviewed: 36d9345f0aa82aa31ba948352ef77d5e6496848f
- Pull request: draft pending
- Last update: 2026-09-05

## Allowed paths

- src/pages/index.astro
- .coordination/status/integrator/33-hero-playback.md

## Findings and scope

- The live WebM decodes only two frames in Chrome, then reports MediaError code 3.
- Browser tests confirm that the existing MP4 plays normally at desktop and mobile-emulated sizes.
- Remove only the broken WebM source selection. Preserve the MP4, poster, content, styles, playback behavior, and reduced-motion support.
- Open PRs 19 and 32 do not change the homepage. The original checkout and other worktrees are untouched.

## Next

- Run scope self-tests, Astro checks, production build, responsive browser playback, looping, scroll visibility, and reduced-motion tests.
- Integrate only after required checks pass, then verify the live release.
