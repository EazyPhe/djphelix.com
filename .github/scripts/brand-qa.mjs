import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = 'http://127.0.0.1:4173';
const outputDir = path.resolve('brand-qa-artifacts');
const results = [];
const viewports = [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: 'dark',
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('requestfailed', (request) => {
      failedRequests.push(`${request.url()} — ${request.failure()?.errorText || 'unknown error'}`);
    });

    const response = await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const home = await page.evaluate(() => {
      const heroCopy = document.querySelector('.hero-copy')?.getBoundingClientRect();
      const heroLogo = document.querySelector('.hero-brand-art')?.getBoundingClientRect();
      const rectanglesOverlap = heroCopy && heroLogo
        ? !(heroCopy.right <= heroLogo.left || heroLogo.right <= heroCopy.left || heroCopy.bottom <= heroLogo.top || heroLogo.bottom <= heroCopy.top)
        : null;
      const logos = [...document.querySelectorAll('img[src="/images/phelix-lion-logo.png"]')].map((image) => ({
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        inViewport: (() => {
          const rectangle = image.getBoundingClientRect();
          return rectangle.bottom > 0 && rectangle.top < innerHeight && rectangle.right > 0 && rectangle.left < innerWidth;
        })(),
      }));

      return {
        title: document.title,
        heading: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
        visibleTextLength: document.body.innerText.trim().length,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        frameworkOverlay: Boolean(document.querySelector('astro-dev-overlay, vite-error-overlay, nextjs-portal')),
        heroCopyLogoOverlap: rectanglesOverlap,
        logos,
        heroAnimation: getComputedStyle(document.querySelector('.hero-brand-art img')).animationName,
      };
    });

    assert.equal(response?.status(), 200, `${viewport.name}: home did not return 200`);
    assert.equal(home.title, 'DJ Phelix', `${viewport.name}: unexpected title`);
    assert.match(home.heading || '', /Music for the moment your room becomes unforgettable\./, `${viewport.name}: hero heading missing`);
    assert.ok(home.visibleTextLength > 500, `${viewport.name}: page appears blank`);
    assert.equal(home.horizontalOverflow, false, `${viewport.name}: horizontal overflow detected`);
    assert.equal(home.frameworkOverlay, false, `${viewport.name}: framework error overlay detected`);
    assert.equal(home.heroCopyLogoOverlap, false, `${viewport.name}: hero copy overlaps the lion logo`);
    const visibleLogos = home.logos.filter((logo) => logo.inViewport);
    assert.ok(home.logos.length >= 3, `${viewport.name}: expected repeated lion branding`);
    assert.ok(visibleLogos.length >= 2, `${viewport.name}: header and hero logos are not both visible`);
    assert.ok(visibleLogos.every((logo) => logo.complete && logo.naturalWidth > 0), `${viewport.name}: a visible lion logo failed to load`);
    assert.equal(home.heroAnimation, 'none', `${viewport.name}: reduced-motion preference was not respected`);

    await page.screenshot({
      path: path.join(outputDir, `home-${viewport.name}.png`),
      fullPage: false,
    });

    await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => {
      const target = document.activeElement;
      if (!(target instanceof HTMLElement)) return null;
      const style = getComputedStyle(target);
      return {
        tag: target.tagName,
        outlineStyle: style.outlineStyle,
        outlineWidth: Number.parseFloat(style.outlineWidth),
      };
    });
    assert.ok(focus && focus.tag === 'A', `${viewport.name}: keyboard focus did not enter the page`);
    assert.notEqual(focus.outlineStyle, 'none', `${viewport.name}: focus outline is not visible`);
    assert.ok(focus.outlineWidth >= 2, `${viewport.name}: focus outline is too thin`);

    let menu = null;
    if (viewport.name === 'mobile') {
      const toggle = page.locator('[data-menu-toggle]');
      await toggle.click();
      menu = {
        expandedAfterOpen: await toggle.getAttribute('aria-expanded'),
        openStateAfterOpen: await page.locator('[data-site-menu]').getAttribute('data-open'),
        closeVisible: await page.locator('[data-menu-close]').isVisible(),
      };
      assert.equal(menu.expandedAfterOpen, 'true', 'mobile: menu toggle did not report open');
      assert.equal(menu.openStateAfterOpen, 'true', 'mobile: navigation did not open');
      assert.equal(menu.closeVisible, true, 'mobile: close control is not visible');
      await page.screenshot({
        path: path.join(outputDir, 'mobile-menu-open.png'),
        fullPage: false,
      });
      await page.keyboard.press('Escape');
      menu.expandedAfterEscape = await toggle.getAttribute('aria-expanded');
      menu.openStateAfterEscape = await page.locator('[data-site-menu]').getAttribute('data-open');
      assert.equal(menu.expandedAfterEscape, 'false', 'mobile: Escape did not collapse toggle state');
      assert.equal(menu.openStateAfterEscape, 'false', 'mobile: Escape did not close navigation');
    }

    const footerLogo = page.locator('.brand-logo-footer');
    await footerLogo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    const footerLogoLoaded = await footerLogo.evaluate((image) => image.complete && image.naturalWidth > 0);
    assert.equal(footerLogoLoaded, true, `${viewport.name}: footer lion logo failed to load`);

    let booking = null;
    if (viewport.name === 'desktop') {
      await Promise.all([
        page.waitForURL('**/contact/', { waitUntil: 'networkidle' }),
        page.locator('.hero-actions .button-primary').click(),
      ]);
      await page.locator('[name="name"]').fill('QA Test');
      await page.locator('[name="email"]').fill('qa@example.invalid');
      await page.locator('[name="eventType"]').selectOption({ index: 1 });
      await page.locator('[name="eventDate"]').fill('2026-12-31');
      await page.locator('[name="location"]').fill('Cape Cod');
      await page.locator('[name="message"]').fill('Automated browser verification only.');
      await page.locator('[data-booking-submit]').click();
      booking = {
        url: page.url(),
        status: await page.locator('[data-booking-status]').innerText(),
        formAction: await page.locator('[data-booking-form]').getAttribute('action'),
      };
      assert.match(booking.url, /\/contact\/$/, 'desktop: primary CTA did not reach contact page');
      assert.match(booking.status, /have not been sent/i, 'desktop: no-endpoint form did not report an honest result');
      assert.equal(booking.formAction, null, 'desktop: form unexpectedly has a submission endpoint');
      await page.screenshot({
        path: path.join(outputDir, 'contact-no-endpoint.png'),
        fullPage: false,
      });
    }

    assert.deepEqual(consoleErrors, [], `${viewport.name}: browser console errors detected`);
    assert.deepEqual(pageErrors, [], `${viewport.name}: page errors detected`);
    assert.deepEqual(failedRequests, [], `${viewport.name}: failed requests detected`);

    results.push({ viewport, home, focus, menu, booking, consoleErrors, pageErrors, failedRequests });
    await context.close();
  }

  const routeContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const routePage = await routeContext.newPage();
  const routes = ['/', '/services/', '/weddings/', '/events-nightlife/', '/about/', '/playlists/', '/mixes/', '/contact/', '/privacy/'];
  const routeResults = [];
  for (const route of routes) {
    const response = await routePage.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    const headingCount = await routePage.locator('h1').count();
    routeResults.push({ route, status: response?.status(), headingCount });
    assert.equal(response?.status(), 200, `${route}: expected 200 response`);
    assert.equal(headingCount, 1, `${route}: expected one h1`);
  }
  await routeContext.close();

  await fs.writeFile(
    path.join(outputDir, 'qa-results.json'),
    `${JSON.stringify({ status: 'passed', results, routeResults }, null, 2)}\n`,
    'utf8',
  );
} catch (error) {
  await fs.writeFile(
    path.join(outputDir, 'qa-results.json'),
    `${JSON.stringify({ status: 'failed', error: error.stack || String(error), results }, null, 2)}\n`,
    'utf8',
  );
  throw error;
} finally {
  await browser.close();
}
