# Issue 41 — Publish Bring the Energy

- Lane: integrator
- Branch: integrator/publish-bring-the-energy-41
- State: ready-for-integration; live publication authorized
- Base reviewed: f660162a50dba7d3d1efec072bdf51a569343949
- Pull request: https://github.com/EazyPhe/djphelix.com/pull/42
- Last update: 2026-09-17

## Allowed paths

- src/data/site.ts (new Highlights entry only)
- src/pages/highlights.astro (page description only)
- public/media/highlights/bring-the-energy-*-v03.mp4
- public/media/highlights/bring-the-energy-*-v03.jpg
- .coordination/status/integrator/41-publish-bring-the-energy.md

## Scope and authorization

- User approved the v03 widescreen and preserved vertical cuts and explicitly requested publication to the live site.
- Add both 30-second cuts as the newest Highlights film, preserving prior entries and current responsive player behavior.
- Create web delivery derivatives from approved masters; preserve original production media and deliverables.
- Use this isolated worktree. Open PRs #19 and #32 have no changed-path overlap. The original checkout contains unrelated dirty work and remains untouched.
- No homepage, DNS, repository settings, dependency or deployment configuration changes.

## Validation and next steps

- Web delivery: widescreen 36,173,947 bytes, SHA256 44bb8363f602a410ce9a614e4bc689a7807ca774498e9d9d78d4176a8c4aaa07; vertical 30,892,207 bytes, SHA256 235c31c06ae4a1780680b43908aaa0c625651a574e4ed6ece577005b923b1734.
- Both retain full resolution, 900 frames at 30 fps, stereo AAC at 48 kHz and faststart. Full decode passed. Source hashes matched before and after encoding. Original/output frame comparisons and audio waveform comparison passed.
- Approved posters copied without alteration. Earlier Highlights entries and player implementation are unchanged.
- npm run coordination:test: PASS (10 cases).
- npm run check: PASS (0 errors, 0 warnings; 2 existing deprecation hints in unrelated files).
- npm run build: PASS (14 pages).
- Local production preview: http://127.0.0.1:4401/highlights/.
- npm run coordination:check -- --base origin/main --head HEAD: PASS (7 scoped files). Open PR overlap separately checked; none.
- Independent Chrome 152 browser QA: PASS (216 assertions). All three films / six videos decode and advance. The new formats have correct dimensions and 30-second duration; both play at a mobile touch viewport. Responsive defaults, keyboard controls, format persistence, lazy loading, single-player behavior, reduced motion, blocked storage and no-JS links pass.
- Full-site smoke: PASS (all 14 built routes at desktop and mobile; 28 checks). HTTP 200, meaningful content, no page errors or overflow.
- Desktop, tablet, mobile and actual playback screenshots reviewed. No release-blocking findings. Physical iOS/Safari and Android devices were not tested.
- Main refetched after review remains f660162a50dba7d3d1efec072bdf51a569343949.
- Media and browser evidence are outside the repository at C:\Users\playa\Documents\Codex\2026-09-16\djphelix-new-video\outputs\bring-the-energy-web-release-v03.
- Publish through a reviewed PR, verify CI and Pages deployment, then verify both live formats.
