/* Run against the dev server. PLAYWRIGHT_MODULE can point to a local installation.
 * Example: node scripts/check-scroll-motion.cjs
 */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseURL = process.env.PORTFOLIO_URL || 'https://localhost:5173';
const target = '#selected-work [data-scroll-reveal-children] > :first-child';

async function instrument(page) {
  await page.addInitScript(() => {
    window.revealEvents = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      if (Array.isArray(frames) && frames[0]?.translate) {
        window.revealEvents.push({
          testId: this.dataset.motionTest,
          translate: frames[0].translate,
          duration: options.duration,
          time: performance.now()
        });
      }
      return animate.call(this, frames, options);
    };
  });
}

async function scroll(page, y) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await page.waitForTimeout(90);
}

async function sample(page) {
  return page.evaluate(async () => {
    const url = performance.getEntriesByType('resource').find((entry) => entry.name.includes('/src/ui/components/background/backgroundMotion.ts')).name;
    const motion = await import(url);
    return motion.read(performance.now());
  });
}

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [];
  try {
    const page = await browser.newPage({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
    page.on('pageerror', (error) => errors.push(error.message));
    await instrument(page);
    await page.goto(baseURL);
    await page.locator(target).waitFor();
    await page.waitForTimeout(1000);
    const box = await page.locator(target).evaluate((element) => {
      element.dataset.motionTest = 'card';
      const rect = element.getBoundingClientRect();
      return { top: rect.top + scrollY, height: rect.height };
    });
    const count = () => page.evaluate(() => window.revealEvents.filter((event) => event.testId === 'card').length);
    assert.equal(await count(), 0, 'Offscreen content has not animated');

    await scroll(page, box.top - 550);
    await page.waitForFunction(() => window.revealEvents.some((event) => event.testId === 'card'));
    assert.equal(await count(), 1, 'Reveals when scrolling down');
    assert.equal(await page.evaluate(() => window.revealEvents.find((event) => event.testId === 'card').translate), '0 44px');
    await page.waitForTimeout(850);
    assert.equal(await page.locator(target).evaluate((element) => getComputedStyle(element).opacity), '1');
    await scroll(page, box.top - 520);
    await scroll(page, box.top - 550);
    assert.equal(await count(), 1, 'No replay while reading');
    assert(await page.evaluate(() => Number(document.querySelector('[style*="--background-opacity"]').style.getPropertyValue('--background-opacity')) < 0.6), 'Background is quieter below the hero');

    // Enter the exit buffer, then re-enter: that alone must not re-arm.
    await scroll(page, box.top - 930);
    await scroll(page, box.top - 550);
    assert.equal(await count(), 1, 'Viewport-edge jitter does not replay');
    await scroll(page, box.top + box.height + 180);
    await scroll(page, box.top + box.height - 260);
    await page.waitForFunction(() => window.revealEvents.filter((event) => event.testId === 'card').length === 2);
    assert.equal(await page.evaluate(() => window.revealEvents.filter((event) => event.testId === 'card')[1].translate), '0 -44px', 'Upward re-entry reverses the movement');

    await page.locator(target + ' a').first().focus();
    assert.equal(await page.locator(target).evaluate((element) => getComputedStyle(element).opacity), '1', 'Keyboard focus cancels the reveal immediately');

    await scroll(page, 0);
    await page.waitForTimeout(700);
    for (let y = 80; y <= 800; y += 80) await scroll(page, y);
    const down = await sample(page);
    assert(down.flow > 0.002 && down.flow <= 0.28, 'Scroll adds capped wave energy');
    assert(down.presenceY > 0.5, 'Waves follow downward input');
    assert(down.scrollY > 0 && down.scrollY < 0.105, 'Background depth is shallow');
    for (let y = 720; y >= 160; y -= 80) await scroll(page, y);
    const up = await sample(page);
    assert(up.presenceY < 0.5, 'Waves reverse with upward input');
    await scroll(page, 0);
    await page.waitForTimeout(1800);
    const settled = await sample(page);
    assert(settled.flow < 0.001 && Math.abs(settled.scrollY) < 0.001, 'Waves settle and parallax returns at the top');

    // Live reduced-motion toggle cancels both the reveal and wave response.
    await scroll(page, box.top - 550);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(120);
    assert.equal(await page.locator(target).evaluate((element) => getComputedStyle(element).opacity), '1');
    const reducedCount = await count();
    await scroll(page, 0);
    await scroll(page, box.top - 550);
    assert.equal(await count(), reducedCount, 'Reduced motion does not start reveals');
    const reduced = await sample(page);
    assert.equal(reduced.flow, 0);
    assert.equal(reduced.scrollY, 0);

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(baseURL + '/work/solidaris');
    await page.locator('.visual-story').waitFor();
    await page.waitForTimeout(900);
    // Use an actual authored chapter id, independently of changes to copy.
    const chapterId = await page.locator('.visual-story section[id]').nth(1).getAttribute('id');
    await page.goto(baseURL + '/work/solidaris#' + chapterId);
    await page.waitForTimeout(900);
    const chapter = page.locator('#' + chapterId);
    const headingBox = await chapter.boundingBox();
    assert(headingBox.y >= 80 && headingBox.y <= 150, 'Deep links land below the fixed navigation');
    assert.equal(await chapter.locator('[data-scroll-reveal]').first().evaluate((element) => getComputedStyle(element).opacity), '1');
    assert(await page.locator('.visual-story [data-scroll-reveal]').count() > 20, 'Lazy case route has independent copy and media reveals');
    assert(await page.evaluate(() => window.revealEvents.every((event) => event.duration === 700)), 'Inner-page reveals use the calmer duration');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);

    // In-app navigation must register the newly mounted route, too.
    await page.locator('a[href="/about"]').first().click();
    await page.waitForURL('**/about');
    await page.locator('h1').filter({ hasText: 'About' }).waitFor();
    await page.waitForTimeout(900);
    assert(await page.locator('li[data-scroll-reveal]').count() >= 5, 'Timeline shares reversible reveals');

    const mobile = await browser.newPage({
      ignoreHTTPSErrors: true,
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1'
    });
    mobile.on('pageerror', (error) => errors.push(error.message));
    await instrument(mobile);
    await mobile.goto(baseURL);
    await mobile.locator(target).waitFor();
    await mobile.locator(target).scrollIntoViewIfNeeded();
    await mobile.waitForTimeout(700);
    assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'No mobile horizontal overflow');
    assert(await mobile.locator('canvas').evaluateAll((canvases) => canvases.some((canvas) => !!canvas.getContext('2d'))), 'Mobile Canvas2D fallback renders');
    assert(await mobile.evaluate(() => window.revealEvents.length > 0), 'Mobile content reveals work');

    const reducedPage = await browser.newPage({ ignoreHTTPSErrors: true, reducedMotion: 'reduce' });
    await instrument(reducedPage);
    await reducedPage.goto(baseURL);
    await reducedPage.locator(target).scrollIntoViewIfNeeded();
    await reducedPage.waitForTimeout(200);
    assert.equal(await reducedPage.evaluate(() => window.revealEvents.length), 0, 'Initial reduced-motion preference skips reveals');
    assert.equal(await reducedPage.locator(target).evaluate((element) => getComputedStyle(element).opacity), '1');
    assert.deepEqual(errors, [], 'No browser runtime errors');
    console.log('PASS: bidirectional reveals, exit buffer, focus, settling waves, reduced motion, deep links, route changes, and mobile fallback.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
