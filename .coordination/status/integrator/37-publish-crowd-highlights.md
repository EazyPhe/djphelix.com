# Issue 37 — Publish Every Kind of Crowd

- Role: integrator
- Branch: `integrator/publish-crowd-highlights-37`
- State: in progress
- Base reviewed: `4bd8d57cff6197ac49515333b35f9a75243dd8da`
- Issue: https://github.com/EazyPhe/djphelix.com/issues/37
- Pull request: draft pending first coherent commit
- Last update: 2026-09-16

## Authorization and scope

The owner explicitly requested publishing the completed Every Kind of Crowd promo on the live highlights page. Add both approved 30-second formats as the newest highlight while retaining Feel the Room. This isolated worktree owns only the following paths:

- `src/data/site.ts` — new highlight metadata only
- `src/pages/highlights.astro` — page description only
- `public/media/highlights/every-kind-of-crowd-wide-v01.mp4`
- `public/media/highlights/every-kind-of-crowd-vertical-v01.mp4`
- `public/media/highlights/every-kind-of-crowd-wide-v01.jpg`
- `public/media/highlights/every-kind-of-crowd-vertical-v01.jpg`
- This status file

No deployment configuration, dependency, DNS, repository settings, or other page changes. Use the existing protected PR and Pages workflow. Open PRs #19 and #32 have no changed-file overlap. The original site's unrelated dirty work remains untouched.

## Approved media

Source directory: `M:/Business/CleverCatCorp/djphelix-video-production/hybrid-002/review`.

| Publication asset | Bytes | SHA-256 |
| --- | ---: | --- |
| every-kind-of-crowd-wide-v01.mp4 | 42370255 | c06ae1b7808e0518913ee2333c128252d2fca7de2ac4cff0eb5c5bf503f44829 |
| every-kind-of-crowd-vertical-v01.mp4 | 42026366 | 00a4afc3574c06dd752c9c2f86b67dafe82b0344c07d8588cf885c5e9fb290bb |
| every-kind-of-crowd-wide-v01.jpg | 331569 | a0388b4dbed4e45fca68a82be60e9abe8882bc5440b8846f5959e362725cc014 |
| every-kind-of-crowd-vertical-v01.jpg | 208754 | c1124d4b55983947d8c2f801e2b695df5ef7708012330c77bc164c95e106f16e |

Total new public payload: 84,936,944 bytes. Both videos are 900 frames at 30 fps, H.264/yuv420p/Rec.709, AAC48k stereo, faststart. Picture duration is exactly 30 seconds; the 30.016-second container includes AAC padding. Technical audio and sampled decoded-picture checks passed in production; subjective listening is not claimed.

## Remaining

- Copy exact approved media and add metadata.
- Run required checks, responsive playback QA, and independent patch/link review.
- Require green checks and current main before protected merge.
- Verify deployment, live page, and public asset hashes.
