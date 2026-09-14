/**
 * Render Kebiao brand assets (PWA icons + OG card) from the seal-mark SVG via
 * headless Chromium. Run: `node scripts/render-brand-assets.mjs`.
 *
 * Outputs:
 *   public/icons/icon-192.png          — PWA icon
 *   public/icons/icon-512.png          — PWA icon
 *   public/icons/icon-512-maskable.png — maskable (art inside the safe zone)
 *   public/og.jpg                      — 1200×630 share card
 */
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outIcons = join(root, "public/icons");

const SEAL = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="6" width="36" height="36" rx="5" fill="#A6192E"/>
  <rect x="9" y="9" width="30" height="30" rx="3" fill="none" stroke="#FAF6EF" stroke-width="1.5" opacity="0.9"/>
  <text x="24" y="28.5" text-anchor="middle" fill="#FAF6EF" font-family="'Noto Serif SC','Songti SC',serif" font-weight="900" font-size="14" letter-spacing="-0.5">课表</text>
  <path d="M15 33.5c2-2.4 4-2.4 6-0.8s4 1.6 6-0.8 4-2.4 6 0" stroke="#C9A227" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.85"/>
</svg>`;

const ICON_PAGE = (size, sealSize, maskable = false) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; }
  body {
    width: ${size}px; height: ${size}px;
    display: grid; place-items: center;
    background: ${maskable ? "#FAF6EF" : "transparent"};
  }
</style></head><body>${SEAL(sealSize)}</body></html>`;

const OG_PAGE = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;700;900&display=swap">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #FAF6EF;
    font-family: Inter, system-ui, sans-serif;
    color: #1A1613;
    position: relative;
    overflow: hidden;
  }
  .frame {
    position: absolute; inset: 28px;
    border: 1px solid #D9D0C2;
    border-radius: 20px;
  }
  .gold-rule {
    position: absolute; left: 80px; right: 80px; bottom: 120px;
    height: 1px; background: linear-gradient(90deg, transparent, #C9A227, transparent);
  }
  .center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 26px;
  }
  .wordmark {
    font-family: 'Noto Serif SC', serif;
    font-weight: 900; font-size: 96px; letter-spacing: -0.02em;
    display: flex; align-items: baseline; gap: 28px;
  }
  .zh { color: #A6192E; font-size: 84px; }
  .tag {
    font-size: 30px; font-weight: 500; color: #4A413B; letter-spacing: 0.01em;
  }
  .foot {
    position: absolute; bottom: 62px; left: 0; right: 0;
    text-align: center; font-size: 20px; letter-spacing: 0.32em;
    color: #8A7F76; text-transform: uppercase; font-weight: 600;
  }
</style></head>
<body>
  <div class="frame"></div>
  <div class="center">
    ${SEAL(120)}
    <div class="wordmark">Kebiao <span class="zh">课表</span></div>
    <div class="tag">Your class schedule, one prompt away.</div>
  </div>
  <div class="gold-rule"></div>
  <div class="foot">therealchina.net</div>
</body></html>`;

async function main() {
  mkdirSync(outIcons, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();

    for (const [file, size, sealPx, maskable] of [
      ["icon-192.png", 192, 148, false],
      ["icon-512.png", 512, 396, false],
      ["icon-512-maskable.png", 512, 316, true],
    ]) {
      await page.setViewportSize({ width: size, height: size });
      await page.setContent(ICON_PAGE(size, sealPx, maskable), { waitUntil: "networkidle" });
      await page.screenshot({
        path: join(outIcons, file),
        omitBackground: !maskable,
      });
      console.log("wrote", file);
    }

    // Android launcher icons — one PNG per density bucket under res/mipmap-*.
    for (const [density, px] of [
      ["mdpi", 48],
      ["hdpi", 72],
      ["xhdpi", 96],
      ["xxhdpi", 144],
      ["xxxhdpi", 192],
    ]) {
      const dir = join(root, `android/app/src/main/res/mipmap-${density}`);
      mkdirSync(dir, { recursive: true });
      const sealPx = Math.round(px * 0.78);
      await page.setViewportSize({ width: px, height: px });
      await page.setContent(ICON_PAGE(px, sealPx), { waitUntil: "networkidle" });
      await page.screenshot({ path: join(dir, "ic_launcher.png"), omitBackground: true });
      console.log(`wrote mipmap-${density}/ic_launcher.png`);
    }

    await page.setViewportSize({ width: 1200, height: 630 });
    await page.setContent(OG_PAGE, { waitUntil: "networkidle" });
    // Give the webfonts a beat to swap in.
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(root, "public/og.jpg"), type: "jpeg", quality: 88 });
    console.log("wrote og.jpg");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
