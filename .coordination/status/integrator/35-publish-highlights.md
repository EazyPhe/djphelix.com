# Issue 35 — Publish approved Feel the Room highlights

- Role: integrator
- Branch: `integrator/publish-highlights-35`
- State: in-progress
- Base reviewed: `f706f057c3b312eb60ed986eec3ea5b503ef8406`
- Pull request: draft pending first coherent commit
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

## Remaining

- Implement and review the page, navigation and playback.
- Run coordination, Astro, production-build and responsive-browser checks; independently review the patch.
- Pass required checks on the final head, merge through the protected PR path, and verify live deployment.
