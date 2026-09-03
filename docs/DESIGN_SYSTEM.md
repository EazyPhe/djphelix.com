# DJ Phelix Design System

## Direction

The site uses a logo-led, editorial dark-mode system for a Cape Cod DJ practice. The owner-supplied neon lion is the primary identity, supported by a near-black field, magenta/violet light, wide negative space, refined type, and subdued event photography. The experience should feel composed, distinctive, and energetic without becoming visually noisy.

## Accepted concept set

The following locally stored built-in Image Gen explorations established the direction. They are review artifacts, not runtime images.

- [Logo-led home refresh](./review/concepts/home-hero-brand-refresh-concept.jpg): integrates the supplied lion with the existing message, DJ-console image, and booking actions while shifting the accent system to the logo palette.
- [Home hero](./review/concepts/home-hero-concept.png): dominant wordmark, large statement, small editorial index, dark field, coral primary action, pale outlined secondary action, and image held to the right.
- [Services](./review/concepts/services-concept.png): numbered service grid and spacious editorial hierarchy.
- [Home lower sections](./review/concepts/home-lower-concept.png): dark editorial panel rhythm and process structure.
- [Events and media](./review/concepts/events-media-concept.png): controlled color as a content accent rather than neon clutter.
- [Booking](./review/concepts/booking-concept.png): staged inquiry form, not a fake calendar or claim of live availability.
- [Mobile](./review/concepts/mobile-concept.png): compact wordmark/header, direct CTA, and an intentional off-canvas menu.

## Tokens and structure

| Element | Implementation |
| --- | --- |
| Canvas | Near-black `#08050b`; raised panels use aubergine-black `#100b14` and `#18101d`. |
| Accent | Magenta `#ff35d1` is the primary action color; violet `#6f2bff`, yellow `#ffe847`, and red `#ff3b2f` echo the lion artwork. |
| Type | Local Manrope variable font for identity, navigation, actions, and hero display; local IBM Plex Serif for editorial section display. No remote font fetch is required. |
| Layout | Wide desktop gutters, a two-column logo-and-image hero, thin rules, section indexes, and stacked mobile sections. |
| Motion | A four-pixel ambient hero-logo float and small hover/focus transitions; reduced-motion users receive no logo animation or animated progression. |
| Focus | A three-pixel yellow outline is visible against every dark surface. |
| Media | The supplied lion is used from `public/images/phelix-lion-logo.png`; local generated event imagery remains in `public/images/`; owner-supplied links remain centralized in `src/data/site.ts`. |

## Runtime image inventory

| File | Purpose |
| --- | --- |
| `public/images/phelix-lion-logo.png` | Optimized 768 × 768 RGBA runtime derivative of the owner-supplied lion; header, mobile menu, hero, footer, and PNG favicon source. |
| `public/images/hero-dj-console.png` | Abstracted, non-identifying DJ-console hero image, darkened beneath the logo-led treatment. |
| `public/images/wedding-celebration.png` | Anonymous warm wedding-room atmosphere. |
| `public/images/events-nightlife.png` | Anonymous contemporary event/nightlife atmosphere. |

The generated event images were created specifically for this project and copied into this repository. They do not represent real clients, venues, ratings, or past events. The lion artwork was supplied by the owner; the original upload remains outside the runtime tree.

## Above-the-fold copy source

The home hero is the primary fidelity reference. Its intended visible copy and actions are implemented as real HTML:

- `DJ Phelix`
- `Home`, `Services`, `Weddings`, `Events & Nightlife`, `About`, `Playlists`, `Mixes`, `Client Docs`, `Contact`
- `Check availability`
- `Music for the moment your room becomes unforgettable.`
- `DJ Phelix serves weddings, private events and nightlife across Cape Cod and surrounding areas.`
- `Explore services`

The logo-led concept preserves the same message and action sequence as the implementation. The fidelity ledger records that direct match, the palette translation, and responsive browser evidence.
