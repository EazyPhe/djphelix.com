# Issue 47 — Yarmouth Seaside Festival Bonfire

- Lane: integrator (owner-directed publication)
- Branch: integrator/yarmouth-bonfire-2026
- State: in-progress
- Base reviewed: main at branch creation on 2026-09-27; exact SHA to be recorded with QA
- Pull request: pending first implementation commit
- Last update: 2026-09-27

## Allowed paths

- src/data/events.ts
- .coordination/status/integrator/47-yarmouth-bonfire-2026.md

## Task contract

Publish one confirmed public DJ Phelix booking on October 10, 2026, 18:00–21:00 local time at Bass River Beach (Smuggler's Beach), South Yarmouth, Massachusetts. Preserve all existing events and all other site behavior.

## Sources and reconciliation

- Owner confirms DJ Phelix's booking and requests website publication.
- https://yarmouthseasidefestival.com/event-schedule/ confirms date, time and venue.
- https://yarmouthseasidefestival.com/bonfire-2/ confirms location and suggests blankets/beach chairs.
- https://yarmouthseasidefestival.com/ confirms free admission and family-oriented festival.
- Organizer's bonfire page still credits a different DJ. Owner's new direct confirmation is authoritative for this site's performer listing; owner informed of discrepancy. Do not copy other-performer or food-vendor details.

## Validation pending

- Preserve all 12 Sailing Cow entries exactly.
- Confirm unique slug, date, time, supported tags and chronological placement.
- Run coordination self-tests, Astro check and production build.
- Check rendered event and filters at desktop, tablet and mobile widths.
- Pass required GitHub checks, integrate by pull request, and verify live deployment.

## Boundaries

No changes to design, navigation, dependencies, forms, hosting, DNS or deployment settings. Open PRs #19 and #32 were reviewed for scope; neither declares changes to event data.
