# DJP-WEB-HERO-001 — Integration QA

- Branch: `integrator/web-hero-001`
- Base: `fa4befc4e4c3164896b3e1fe19f41e0977f99338`
- Date: 2026-09-04
- Scope: Homepage hero video integration only

## Implementation

- Added a silent 10.67-second looping hero video.
- Added WebM/VP9 as the preferred source and MP4/H.264 as the fallback.
- Added a 1280 × 720 poster image for initial load and fallback display.
- Preserved the homepage headline, mission-led copy, lion artwork, and calls to action.
- Pauses playback while the hero is outside the viewport.
- Disables motion and displays the poster when reduced motion is requested.

## Media validation

| Asset | Codec | Size | Audio | Full decode |
| --- | --- | ---: | --- | --- |
| `djphelix-home-hero-v1.webm` | VP9, 1280 × 720, 30 fps | 3.33 MB | None | Pass |
| `djphelix-home-hero-v1.mp4` | H.264 High, 1280 × 720, 30 fps | 3.21 MB | None | Pass |
| `djphelix-home-hero-v1-poster.jpg` | JPEG, 1280 × 720 | 41 KB | N/A | Pass |

## Automated validation

- `npm run coordination:test`: pass, 10 cases.
- `npm run check`: pass, 0 errors; two pre-existing deprecation hints elsewhere in the site.
- `npm run build`: pass, 12 static pages generated.
- `git diff --check`: pass.

## Browser validation

Chrome 152 was tested against the local production build:

- Desktop: 1440 × 900, autoplay active, WebM selected, no horizontal overflow.
- Tablet: 768 × 1024, autoplay active, responsive navigation and hero composition verified.
- Mobile: 390 × 844 through DevTools device emulation, autoplay active, responsive copy/buttons verified.
- Reduced motion: 390 × 844, video paused and hidden, poster displayed.

## Evidence

- `desktop-1440x900.png`
- `tablet-768x1024.png`
- `mobile-390x844.png`
- `mobile-reduced-motion-390x844.png`
