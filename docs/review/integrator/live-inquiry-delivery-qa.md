# Live Inquiry Delivery — QA Record

- Issue: #14
- Pull request: #15
- Branch: `integrator/live-inquiry-delivery`
- Reviewed commit: `f7160e850376cc10a3a6b7924b396a8854d8a65f`
- Review date: 2026-09-04
- Browser path: Playwright Core with installed Google Chrome 152
- Browser plugin status: not available in this session

## Flow under test

`/contact/` → complete the booking inquiry → submit by POST to the configured FormSubmit route → continue to `/inquiry-received/` after provider acceptance.

The provider request was intercepted during local QA so no real email or provider activation was triggered before deployment.

## Commands

```text
npm run coordination:test
npm run check
npm run build
node <temporary Playwright QA script outside the repository>
```

## Build and static checks

| Check | Result |
|---|---|
| Coordination self-test | Passed, 10 cases |
| Astro and TypeScript check | Passed, 0 errors; 2 pre-existing hints outside this change |
| Production build | Passed, 12 static pages generated |
| New confirmation route | Generated at `/inquiry-received/` |
| Form endpoint | Configured for the approved temporary inbox |
| Form method | POST |
| Spam control | Provider-supported `_honey` field present |
| Success redirect | Absolute production URL present |
| Privacy placeholder | Removed |

## Browser assertions

Thirty-nine automated assertions passed across desktop `1440 × 1000` and mobile `390 × 844` viewports. The checks covered:

- Page identity and meaningful rendered content
- No horizontal overflow
- Visible working submit control
- Correct FormSubmit action and POST method
- Honeypot, subject, success URL, source URL, template, and autoresponse fields
- Intercepted submission payload containing the entered inquiry data
- Direct-email fallback
- Operational privacy notice and provider-retention disclosure
- Branded confirmation page and non-reservation language
- No page errors or relevant console warnings/errors

## Visual review

The change intentionally extends the existing DJ Phelix design system rather than introducing a new visual concept. Review points:

1. The booking form retains the existing two-column desktop and single-column mobile structure.
2. The active submit button uses the established primary magenta treatment.
3. Status, fallback, consent, and sensitive-information copy remain readable without crowding the form.
4. The privacy notice uses the existing dark bands, serif headings, magenta labels, borders, and spacing system.
5. The confirmation page matches the current hero and process-section patterns.
6. Desktop and mobile captures show no clipping, collision, or accidental horizontal scrolling.

## Evidence

- `live-inquiry-delivery/booking-desktop.png`
- `live-inquiry-delivery/booking-mobile.png`
- `live-inquiry-delivery/privacy-desktop.png`
- `live-inquiry-delivery/privacy-mobile.png`
- `live-inquiry-delivery/success-desktop.png`
- `live-inquiry-delivery/success-mobile.png`
- `live-inquiry-delivery/qa-results.json`

## Remaining release gate

FormSubmit requires one activation email after the first submission from the deployed production form. The release is not considered end-to-end complete until the activation link is approved and a second live inquiry is confirmed in Gmail.
