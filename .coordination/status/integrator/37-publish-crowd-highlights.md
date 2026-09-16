# Issue 37 — Publish Every Kind of Crowd

- Role: integrator
- Branch: `integrator/publish-crowd-highlights-37`
- State: ready for integration; deployment verification follows merge
- Base reviewed: `4bd8d57cff6197ac49515333b35f9a75243dd8da`
- Issue: https://github.com/EazyPhe/djphelix.com/issues/37
- Pull request: https://github.com/EazyPhe/djphelix.com/pull/38
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

## Completed validation

- Product commit reviewed: `72db0e8d3e3d734435500cffaa865fc27916b395`.
- Copied the four exact approved assets and added the newest highlight; existing Feel the Room metadata and assets are unchanged.
- Coordination self-tests: 10/10. Scope check: seven assigned paths. Astro check: zero errors/warnings, two existing deprecation hints. Full production build passed.
- Browser review passed at 1440x900, 820x1180 and 390x844. Correct aspect ratios, stacked mobile players and no horizontal overflow. Mobile navigation exposes Highlights and closes correctly.
- All four players decoded and advanced without media errors. Switching players pauses the previous player; pause/resume and replay work. New vertical playback also passed at mobile width.
- Keyboard activation and visible yellow focus ring passed. With reduced motion enabled, initial reload made zero MP4 requests; videos retain preload=none and no autoplay. No browser console warnings/errors observed. Temporary browser emulation was cleared after review.
- Independent read-only QA by `crowd_scale_scout` passed: source/public/dist/committed hashes agree for all new assets, and all four existing media assets match the base.
- Full static audit covered 14 HTML pages, five CSS files, 694 internal references, 93 fragments and 193 ARIA references, with no broken navigation/assets/anchors/ARIA or duplicate IDs. Existing 404 canonical/og:url metadata exceptions are unchanged and outside this patch.
- Both GitHub checks passed at the product commit. Final documentation-only commit must also receive green checks before merge.

## Release steps

- Require green final-head checks and current main before the integrator's protected merge.
- Verify the existing Pages deployment, live page playback and public asset hashes.
- Record merge/deployment evidence in issue #37 and PR #38 after release; no bookkeeping-only deployment is needed.

## Rollback

Revert PR #38 through the normal protected PR flow to remove only this highlight, its four assets and this task record. No hosting or DNS change is involved.
