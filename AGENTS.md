# DJ Phelix Repository Guidance

## Scope

- This repository owns only the static website for `https://djphelix.com`.
- Keep business facts, contact details, service areas, media links, and form endpoint settings in `src/data/site.ts`.
- Do not invent pricing, availability, testimonials, venue relationships, insurance, equipment, travel limits, or legal terms. Record missing inputs in `docs/CONTENT_NEEDED.md`.

## Build and verification

- Use Astro with strict TypeScript and static output.
- Run `npm run check` and `npm run build` after material changes.
- Review the site in a real browser at desktop, tablet, and mobile widths before committing.
- Keep visual-review evidence and the fidelity ledger under `docs/review/`.
- Preserve keyboard access, visible focus, reduced-motion support, semantic landmarks, and honest static-form behavior.

## Git and deployment safety

- Keep changes scoped to this repository and stage exact paths only.
- Never commit secrets, `.env` files, build output, or generated dependency folders.
- Do not push, alter remotes, change Pages settings, change DNS, or publish from this repository.
- The GitHub Pages workflow is preparation only; human deployment steps belong in `README.md`.
