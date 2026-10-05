/* Capture real Plectrum browser workflows for the Solidaris case study.
 * Requires Playwright from the sibling solidaris-nx checkout (or PLAYWRIGHT_MODULE)
 * and ffmpeg on PATH. Recordings are labelled by their actual source in the story.
 * Run: node scripts/capture-solidaris-browser.cjs
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const playwrightModule = process.env.PLAYWRIGHT_MODULE || path.resolve(__dirname, '../../solidaris-nx/node_modules/playwright');
const { chromium } = require(playwrightModule);
const assets = path.resolve(__dirname, '../public');
const rawDir = fs.mkdtempSync(path.join(os.tmpdir(), 'plectrum-browser-capture-'));
// STORYBOOK_URL points the catalogue capture at a local build (with trailing slash).
const storybook = process.env.STORYBOOK_URL || 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/releases/2.1.0-devkit-0.7.2/';
const dashboard = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/dashboard/#/design-system/overview';
const viewport = { width: 1600, height: 900 };

const pause = (page, ms) => page.waitForTimeout(ms);

function encode(raw, output, focusX, seconds) {
  // The discovery clip gets a small zoom; the dashboard stays fully framed
  // so both the recommendation drawer and provenance labels remain legible.
  // zoompan snaps its crop to whole pixels, which reads as stepping on a slow
  // zoom. perspective samples the source at fractional corner positions
  // instead, so every frame moves by a sub-pixel amount. A smootherstep curve
  // starts and stops the move without a visible jolt.
  const fps = 50;
  const ramp = (start, length) => `clip((on-${start})/${length},0,1)`;
  const smooth = p => `(${p}*${p}*${p}*(${p}*(${p}*6-15)+10))`;
  const zoomIn = smooth(ramp(4 * fps, 3 * fps));
  const zoomOut = smooth(ramp(17.2 * fps, 3 * fps));
  const z = `(1+0.06*(${zoomIn}-${zoomOut}))`;
  const left = `(W-W/${z})*${focusX}`;
  const top = `(H-H/${z})*0.25`;
  const right = `(${left}+W/${z})`;
  const bottom = `(${top}+H/${z})`;
  const filter = focusX == null
    ? `fps=${fps},scale=1280:720:flags=lanczos,format=yuv420p`
    : `fps=${fps},scale=2560:1440:flags=lanczos,` +
      `perspective=x0='${left}':y0='${top}':x1='${right}':y1='${top}':x2='${left}':y2='${bottom}':x3='${right}':y3='${bottom}':interpolation=cubic:eval=frame,` +
      'scale=1280:720:flags=lanczos,format=yuv420p';
  execFileSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', '1', ...(seconds ? ['-t', String(seconds)] : []), '-i', raw, '-an', '-vf', filter,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20',
    '-movflags', '+faststart', output,
  ], { stdio: 'inherit' });
}

async function record(browser, name, workflow, focusX, seconds) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: viewport },
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await workflow(page);
    if (errors.length) throw new Error(`${name} page errors: ${errors.join('; ')}`);
    const video = page.video();
    await context.close();
    const output = path.join(assets, 'videos', `${name}.mp4`);
    encode(await video.path(), output, focusX, seconds);
    console.log(`${name}: ${output}`);
  } catch (error) {
    await context.close().catch(() => {});
    throw error;
  }
}

const drawerDocs = page => page.frameLocator('#storybook-preview-iframe').locator('h1', { hasText: /^Drawer$/ });

// A local dev Storybook compiles each page on first visit. Load both pages
// once, unrecorded, so the take shows them as quickly as a static build would.
async function warmCatalogue(browser) {
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(`${storybook}iframe.html?id=start-here-catalogue--docs&viewMode=docs`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Accordion', exact: true }).first().waitFor({ timeout: 120000 });
    await page.goto(`${storybook}?path=/docs/custom-components-drawer--docs`, { waitUntil: 'domcontentloaded' });
    await drawerDocs(page).waitFor({ timeout: 120000 });
  } finally {
    await page.close();
  }
}

async function catalogue(page) {
  await page.goto(`${storybook}iframe.html?id=start-here-catalogue--docs&viewMode=docs`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: 'Find a component' }).waitFor();
  await page.getByRole('link', { name: 'Accordion', exact: true }).first().waitFor();
  await pause(page, 2700);
  const search = page.getByRole('searchbox');
  await search.click();
  await search.pressSequentially('side panel', { delay: 125 });
  await pause(page, 3500);
  if (!(await page.getByText('5 / 51 components').count())) throw new Error('Catalogue search result changed');
  await page.screenshot({ path: path.join(assets, 'screenshots/solidaris/component-discovery-poster.png') });
  const drawer = page.getByRole('link', { name: 'Drawer', exact: true }).first();
  await drawer.hover();
  await pause(page, 2000);
  await drawer.click();
  await page.waitForURL(/custom-components-drawer--docs/, { timeout: 20000 });
  await drawerDocs(page).waitFor({ timeout: 30000 });
  await pause(page, 6000);
  // Keep the documented component and its Core ownership in view.
  await page.mouse.move(1000, 630);
  await page.mouse.wheel(0, 550);
  await pause(page, 6000);
}

async function coreInsights(page) {
  await page.goto(dashboard, { waitUntil: 'domcontentloaded' });
  await page.getByText('Demo data: component usage is scanned from this repository; agent counts and local components are invented.').waitFor();
  await pause(page, 3100);
  await page.getByRole('tab', { name: 'Agent & MCP' }).click();
  await pause(page, 3700);
  await page.getByText('Details', { exact: true }).first().click();
  await pause(page, 2700);
  await page.screenshot({ path: path.join(assets, 'screenshots/solidaris/core-insights-poster.png') });
  await pause(page, 2600);
  await page.getByRole('button', { name: 'Close details' }).click();
  await pause(page, 1500);
  // Leave Agent & MCP before switching source: it has no reported data yet,
  // so switching there would show an empty state mid-take.
  await page.getByRole('tab', { name: 'Overview' }).click();
  await pause(page, 1800);
  await page.getByRole('button', { name: 'Reported' }).click();
  await page.getByText('Unknown until an external application reports').waitFor();
  await pause(page, 5500);
}

(async () => {
  fs.mkdirSync(path.join(assets, 'videos'), { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    if (process.env.CAPTURE_ONLY !== 'dashboard') {
      await warmCatalogue(browser);
      await record(browser, 'solidaris-component-discovery', catalogue, 0.43, 24.5);
    }
    if (process.env.CAPTURE_ONLY !== 'catalogue') {
      await record(browser, 'solidaris-core-insights', coreInsights, null);
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
