# DJ Phelix Website

The static, responsive website for `https://djphelix.com`. It is built with Astro and TypeScript and is designed for GitHub Pages deployment, while keeping all business facts and delivery details owner-editable.

## Local run and verification

Prerequisite: Node.js 22 or newer and npm.

```powershell
npm install
npm run dev -- --host 127.0.0.1 --port 4322
```

Open `http://localhost:4322`. Port `4322` keeps local review isolated from other sites that may use Astro's default port.

Before handoff or deployment preparation, run:

```powershell
npm run check
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

`npm run check` performs Astro/TypeScript diagnostics. `npm run build` creates the deployable static files in `dist/`; that directory is intentionally not committed.

## Editable launch information

Use [src/data/site.ts](./src/data/site.ts) as the one source for the owner-supplied facts:

- service area and canonical site details;
- booking email, phone, social links, and form endpoint;
- approved photo, video, and mix links;
- navigation and broad service/event labels.

The booking form is deliberately honest. With `booking.formEndpoint` blank, it validates locally and explains that nothing was sent. When an owner-approved HTTPS endpoint is added, it becomes a native `POST` form. If an inquiry email is supplied, it appears as a direct fallback. Do not add endpoint credentials or secrets to this repository; configure an integration that accepts the public form payload without exposing credentials in client code.

See [docs/CONTENT_NEEDED.md](./docs/CONTENT_NEEDED.md) for every unconfirmed launch input.

## Content and visual evidence

- [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) records the implemented visual system and local generated assets.
- [docs/review/FIDELITY_LEDGER.md](./docs/review/FIDELITY_LEDGER.md) connects accepted concepts to the final desktop, tablet, mobile, and interaction review screenshots.
- [docs/TASK_LOG.md](./docs/TASK_LOG.md) records the build and QA handoff.

All visual assets are local to this repository. No remote image is hotlinked.

## Manual deployment checklist for `djphelix.com`

This repository contains a GitHub Actions workflow as deployment preparation only. The following actions must be performed manually by the site owner in the relevant accounts; this project does not make hosting, GitHub Pages, or DNS changes.

1. Review the completed build locally, confirm the owner-supplied facts in `src/data/site.ts`, and make sure a real inquiry endpoint and/or email fallback is configured before accepting bookings.
2. In the GitHub repository's **Settings → Pages**, select **GitHub Actions** as the build source. Review the generated workflow at [.github/workflows/deploy.yml](./.github/workflows/deploy.yml), then allow its next push to the default branch to run.
3. After the workflow succeeds, use GitHub Pages' custom-domain field to request `djphelix.com` and wait for its domain verification result. Enable HTTPS only after GitHub reports that the certificate is ready.
4. In Squarespace's DNS panel, first export or record the current zone. Preserve all existing MX, TXT, verification, and unrelated records. Update only the records required by GitHub Pages after checking GitHub's current custom-domain instructions for the account: the `www` host normally uses a CNAME to `EazyPhe.github.io`, while the apex uses GitHub Pages' current A-record set.
5. Wait for DNS propagation, then verify both `https://djphelix.com` and `https://www.djphelix.com`, canonical redirects, HTTPS, the booking delivery route, and the privacy policy before announcing the site.

No DNS, GitHub Pages setting, repository remote, or deployment environment was changed during this build.

## Repository boundaries

- Keep source, local assets, and documentation in this repository.
- Do not commit `.env` files, secrets, build output, dependency folders, or temporary browser-review artifacts.
- Do not invent testimonials, pricing, availability, equipment lists, legal terms, venue claims, or owner biography details.
