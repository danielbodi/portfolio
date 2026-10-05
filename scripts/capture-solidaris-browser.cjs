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
const storybook = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/storybook/releases/2.1.0-devkit-0.7.2/';
const dashboard = 'https://solidaris-danielbodigil.github.io/solidaris-plectrum/dashboard/#/design-system/overview';
const viewport = { width: 1600, height: 900 };

const pause = (page, ms) => page.waitForTimeout(ms);

function encode(raw, output, focusX) {
  // The discovery clip gets a small zoom; the dashboard stays fully framed
  // so both the recommendation drawer and provenance labels remain legible.
  // Ease the move to a stop at both ends. Upscaling before zoompan gives its
  // integer crop coordinates enough precision to avoid one-pixel stepping.
  const easeIn = '(1-cos(PI*(on-100)/75))/2';
  const easeOut = '(1+cos(PI*(on-430)/75))/2';
  const zoom = `1+0.06*if(lt(on,100),0,if(lt(on,175),${easeIn},if(lt(on,430),1,if(lt(on,505),${easeOut},0))))`;
  const filter = focusX == null
    ? 'fps=25,scale=1280:720,format=yuv420p'
    : `fps=25,scale=3200:1800:flags=lanczos,zoompan=z='${zoom}':x='(iw-iw/zoom)*${focusX}':y='(ih-ih/zoom)*0.25':d=1:s=1280x720:fps=25,format=yuv420p`;
  execFileSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', '1', '-i', raw, '-an', '-vf', filter,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '22',
    '-movflags', '+faststart', output,
  ], { stdio: 'inherit' });
}

async function record(browser, name, workflow, focusX) {
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
    encode(await video.path(), output, focusX);
    console.log(`${name}: ${output}`);
  } catch (error) {
    await context.close().catch(() => {});
    throw error;
  }
}

async function catalogue(page) {
  await page.goto(`${storybook}iframe.html?id=start-here-catalogue--docs&viewMode=docs`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: 'Find a component' }).waitFor();
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
  await pause(page, 1900);
  await page.getByRole('button', { name: 'Reported' }).click();
  await pause(page, 2000);
  await page.getByRole('tab', { name: 'Overview' }).click();
  await page.getByText('Unknown until an external application reports').waitFor();
  await pause(page, 11000);
}

(async () => {
  fs.mkdirSync(path.join(assets, 'videos'), { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    if (process.env.CAPTURE_ONLY !== 'dashboard') {
      await record(browser, 'solidaris-component-discovery', catalogue, 0.43);
    }
    if (process.env.CAPTURE_ONLY !== 'catalogue') {
      await record(browser, 'solidaris-core-insights', coreInsights, null);
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
