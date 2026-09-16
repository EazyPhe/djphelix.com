# Issue 35 — Publish approved Feel the Room highlights

- Role: integrator
- Branch: `integrator/publish-highlights-35`
- State: validated; awaiting protected merge and deployment verification
- Base reviewed: `f706f057c3b312eb60ed986eec3ea5b503ef8406`
- Pull request: https://github.com/EazyPhe/djphelix.com/pull/36
- Last update: 2026-09-16

## Authorization and scope

The owner approved both final videos and requested publication on the live highlights page. Add `/highlights/`, its Media-menu/footer links, and only the approved widescreen v01-web, corrected vertical v02, and their posters. The existing Pages workflow deploys after the protected merge.

## Allowed paths

- `src/pages/highlights.astro`
- `src/styles/highlights.css`
- `src/data/site.ts` — highlight metadata and Media/footer links only
- `public/media/highlights/feel-the-room-wide-v01.mp4`
- `public/media/highlights/feel-the-room-vertical-v02.mp4`
- `public/media/highlights/feel-the-room-wide-v01.jpg`
- `public/media/highlights/feel-the-room-vertical-v02.jpg`
- This status file

## Preflight

- Original checkout has unrelated dirty work and remains untouched.
- Separate worktree created from refreshed `origin/main`.
- Open PRs #19 and #32 currently change only their status files and a service component; no changed-file overlap.
- Both approved media hashes match the production delivery manifest; total public media payload is 60,502,326 bytes including posters.
- No DNS, repository settings, workflow edits, dependency upgrades, raw footage, project files, or unrelated site changes are part of this release.

## Completed validation

- Product patch reviewed at `f2b550187ea73b399492dbe5854368fb742c98c1`; this follow-up changes only the task record.
- Coordination self-tests (10 cases), scope validation, Astro check and production build passed. Astro reported zero errors/warnings and two existing deprecation hints.
- Independent read-only review found no patch defects. All four public and built media hashes match the approved production assets. The site-wide scan covered 14 HTML pages, 672 internal references and 93 anchors without missing visitor links, assets, anchors, duplicate IDs or unresolved ARIA targets.
- Real-browser review at 1440x900, 820x1180 and 390x844: posters and aspect ratios render correctly; mobile layout stacks and has no horizontal overflow.
- Widescreen and portrait playback advance with a 22.016-second container duration. Starting portrait pauses widescreen; pause, completed playback and replay work. Keyboard Enter starts playback and exposes the visible focus ring.
- Desktop and mobile Media menus expose Highlights. Mobile selection closes the menu and reaches the page.
- Reduced-motion emulation still waits for user playback. Network observation confirmed no MP4 requests on initial page load; browser console reported no errors/warnings.
- Existing 404 canonical metadata issue (`/404/` versus `404.html`) is unchanged and outside this release.

## Remaining

- Require successful checks on the final PR head and current main, then protected squash merge.
- Verify the existing Pages deployment and both public video URLs. Record the merge SHA, deployment run and live checks in issue #35 / PR #36 to avoid a post-release bookkeeping-only deployment.
