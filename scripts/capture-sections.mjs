import { chromium } from "file:///C:/Users/patel/AppData/Roaming/npm/node_modules/playwright/index.mjs";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3005", { waitUntil: "networkidle" });
  
  // Temporarily hide sticky header to prevent it from overlaying elements during section screenshots
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
  });

  const sections = ["work", "secondary", "experience", "principles", "contact"];
  for (const s of sections) {
    const el = await page.$(`#${s}`);
    if (el) {
      await el.screenshot({ path: `.verify/section_${s}.png` });
      console.log(`saved .verify/section_${s}.png`);
    }
  }
  await browser.close();
}
main();
