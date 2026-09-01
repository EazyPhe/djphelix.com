# DJ Phelix Design System

## Direction

The site uses a calm, editorial dark-mode system for a Cape Cod DJ practice: measured spotlight color, wide negative space, refined type, and photography that shows the work without relying on a generic DJ silhouette, turntable decoration, or animated equalizer treatment. The experience should feel composed before it feels loud.

## Accepted concept set

The following locally stored built-in Image Gen explorations established the direction. They are review artifacts, not runtime images.

- [Home hero](./review/concepts/home-hero-concept.png): dominant wordmark, large statement, small editorial index, dark field, coral primary action, pale outlined secondary action, and image held to the right.
- [Services](./review/concepts/services-concept.png): numbered service grid and spacious editorial hierarchy.
- [Home lower sections](./review/concepts/home-lower-concept.png): dark editorial panel rhythm and process structure.
- [Events and media](./review/concepts/events-media-concept.png): controlled color as a content accent rather than neon clutter.
- [Booking](./review/concepts/booking-concept.png): staged inquiry form, not a fake calendar or claim of live availability.
- [Mobile](./review/concepts/mobile-concept.png): compact wordmark/header, direct CTA, and an intentional off-canvas menu.

## Tokens and structure

| Element | Implementation |
| --- | --- |
| Canvas | Near-black `#090c0f`; raised panels use restrained blue-black tones. |
| Accent | Coral `#ff6843` for the primary action; pale blue `#78c8e5` for controlled emphasis and focus. |
| Type | Local Manrope variable font for identity, navigation, actions, and hero display; local IBM Plex Serif for editorial section display. No remote font fetch is required. |
| Layout | Wide desktop gutters, a two-column image-led hero, thin rules, section indexes, and stacked mobile sections. |
| Motion | Small hover/focus transitions only; reduced-motion users receive no transform/animated progression. |
| Media | Local generated abstract/event imagery in `public/images/`; all owner-supplied links remain centralized in `src/data/site.ts`. |

## Runtime image inventory

| File | Purpose |
| --- | --- |
| `public/images/hero-dj-console.png` | Abstracted, non-identifying DJ-console hero image with controlled coral and blue light. |
| `public/images/wedding-celebration.png` | Anonymous warm wedding-room atmosphere. |
| `public/images/events-nightlife.png` | Anonymous contemporary event/nightlife atmosphere. |

The generated source images were created specifically for this project and copied into this repository. They do not represent real clients, venues, ratings, or past events.

## Above-the-fold copy source

The home hero is the primary fidelity reference. Its intended visible copy and actions are implemented as real HTML:

- `DJ Phelix`
- `Home`, `Services`, `Weddings`, `Events & Nightlife`, `About`, `Mixes`, `Contact`
- `Check availability`
- `Music for the moment your room becomes unforgettable.`
- `DJ Phelix serves weddings, private events and nightlife across Cape Cod and surrounding areas.`
- `Explore services`

The generated concept uses the same `Services` and `Mixes` labels as the implemented navigation, in the same order. The fidelity ledger records that direct match alongside the typography translation.
