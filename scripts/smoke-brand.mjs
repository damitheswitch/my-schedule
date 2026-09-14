import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";

const SEED = {
  courses: [
    { id: "ml", name: "Machine Learning", short: "Machine Learning", code: "AI502", credits: 3, teachers: ["Dr. Li"] },
    { id: "cv", name: "Computer Vision", short: "Computer Vision", code: "AI503", credits: 2, teachers: ["Dr. Wang"] },
    { id: "zh", name: "Comprehensive Chinese", short: "Comprehensive Chinese", code: "FL201", credits: 2, teachers: ["Ms. Chen"] },
  ],
  meetings: [
    { id: "ml-mon", courseId: "ml", campus: "South", day: "Mon", sectionStart: 1, sectionEnd: 2, start: "08:30", end: "10:05", weeks: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], weeksLabel: "2-17", room: "G-514" },
    { id: "cv-tue", courseId: "cv", campus: "North", day: "Tue", sectionStart: 5, sectionEnd: 6, start: "14:00", end: "15:35", weeks: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], weeksLabel: "2-17", room: "A-203" },
    { id: "zh-wed", courseId: "zh", campus: "South", day: "Wed", sectionStart: 3, sectionEnd: 4, start: "10:25", end: "12:00", weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], weeksLabel: "1-17", room: "B-120" },
    { id: "ml-thu", courseId: "ml", campus: "North", day: "Thu", sectionStart: 7, sectionEnd: 8, start: "16:00", end: "17:35", weeks: [2,4,6,8,10,12,14,16], weeksLabel: "2-16", room: "C-310" },
  ],
  updatedAt: Date.now(),
};

async function main() {
  const browser = await chromium.launch();
  const errors = [];
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  // 1. First-run onboarding (fresh storage)
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "shots/onboarding-desktop.png" });

  // 2. Seeded main app — desktop
  await page.evaluate((seed) => {
    localStorage.setItem("my-schedule", JSON.stringify(seed));
    localStorage.setItem("my-schedule-onboarded", "1");
    localStorage.setItem("my-schedule-seen-version", "1.3.0");
  }, SEED);
  await page.goto(BASE + "/?week=3", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "shots/app-desktop.png" });

  // 3. Meeting detail → edit dialog
  await page.click("text=Machine Learning >> nth=0").catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: "shots/meeting-panel.png" });
  const editBtn = page.locator("text=Edit class");
  if (await editBtn.count()) {
    await editBtn.first().click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: "shots/editor.png" });
    await page.keyboard.press("Escape");
  }

  // 4. Mobile viewport
  await ctx.close();
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mpage = await mctx.newPage();
  mpage.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  mpage.on("pageerror", (e) => errors.push(String(e)));
  await mpage.goto(BASE, { waitUntil: "domcontentloaded" });
  await mpage.waitForTimeout(1200);
  await mpage.evaluate((seed) => {
    localStorage.setItem("my-schedule", JSON.stringify(seed));
    localStorage.setItem("my-schedule-onboarded", "1");
    localStorage.setItem("my-schedule-seen-version", "1.3.0");
  }, SEED);
  await mpage.goto(BASE + "/?week=3", { waitUntil: "domcontentloaded" });
  await mpage.waitForTimeout(1200);
  await mpage.screenshot({ path: "shots/app-mobile.png" });

  // 5. Mobile editor (add class)
  await mpage.click('[aria-label="Add a class"]').catch(() => {});
  await mpage.waitForTimeout(400);
  await mpage.screenshot({ path: "shots/editor-mobile.png" });

  await browser.close();
  console.log(JSON.stringify({ errors }, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
