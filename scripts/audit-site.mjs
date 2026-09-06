import { chromium } from "file:///C:/Users/patel/AppData/Roaming/npm/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "http://localhost:3005";
const OUTPUT_DIR = path.resolve(process.cwd(), ".verify");

async function runAudit() {
  console.log("Launching Chromium to audit portfolio at", BASE_URL);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const auditResults = {
    routes: {},
    links: [],
    modals: {},
    consoleErrors: [],
    pageErrors: [],
  };

  page.on("console", (msg) => {
    if (msg.type() === "error") auditResults.consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    auditResults.pageErrors.push(err.message);
  });

  // 1. Audit Home Route (Desktop)
  console.log("--- 1. Testing Homepage at Desktop (1440x900) ---");
  await page.setViewportSize({ width: 1440, height: 900 });
  const homeResp = await page.goto(BASE_URL, { waitUntil: "networkidle" });
  auditResults.routes["/"] = homeResp?.status();
  await page.screenshot({ path: path.join(OUTPUT_DIR, "desktop_home.png"), fullPage: false });

  // Gather all links on the page
  const linkHandles = await page.$$("a");
  console.log(`Found ${linkHandles.length} anchor elements on homepage.`);
  for (const handle of linkHandles) {
    const text = (await handle.innerText()).trim().replace(/\n+/g, " ");
    const href = await handle.getAttribute("href");
    auditResults.links.push({ text, href });
  }

  // Check modals
  console.log("--- 2. Testing Modals & Interactive Elements ---");
  // Test ATS resume preview button
  const atsBtn = await page.$("button:has-text('ATS Resume Preview')");
  if (atsBtn) {
    console.log("Found ATS Resume Preview button, clicking...");
    await atsBtn.click();
    await page.waitForTimeout(600);
    auditResults.modals.resumeModalOpen = await page.isVisible("text=CURRICULUM VITAE");
    await page.screenshot({ path: path.join(OUTPUT_DIR, "resume_modal.png") });
    
    // Check ATS Audit Drawer inside modal
    const inspectBtn = await page.$("button:has-text('Run ATS Compliance Audit')");
    if (inspectBtn) {
      console.log("Found Run ATS Compliance Audit button, clicking...");
      await inspectBtn.click();
      await page.waitForTimeout(600);
      auditResults.modals.atsAuditDrawerOpen = await page.isVisible("text=ATS Compliance Audit");
      await page.screenshot({ path: path.join(OUTPUT_DIR, "ats_audit_drawer.png") });
      
      // Close drawer
      const closeDrawerBtn = await page.$("button[aria-label='Close audit']");
      if (closeDrawerBtn) await closeDrawerBtn.click();
      await page.waitForTimeout(300);
    }

    // Close modal
    const closeModalBtn = await page.$("button[aria-label='Close preview']");
    if (closeModalBtn) await closeModalBtn.click();
    await page.waitForTimeout(300);
  }

  // 3. Test Tablet Viewport (768x1024)
  console.log("--- 3. Testing Tablet Viewport (768x1024) ---");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const tabletScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const tabletClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  auditResults.tabletOverflow = tabletScrollWidth > tabletClientWidth;
  await page.screenshot({ path: path.join(OUTPUT_DIR, "tablet_768.png") });

  // 4. Test Mobile Viewport (390x844)
  console.log("--- 4. Testing Mobile Viewport (390x844) ---");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const mobileClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  auditResults.mobileOverflow = mobileScrollWidth > mobileClientWidth;
  await page.screenshot({ path: path.join(OUTPUT_DIR, "mobile_390.png") });

  // 5. Test Case Studies & Dedicated Routes
  console.log("--- 5. Testing Routes & Case Studies ---");
  const routesToTest = [
    "/resume",
    "/styleguide",
    "/work/workflow-studio",
    "/work/flowtrace",
    "/work/pracharflow"
  ];

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const r of routesToTest) {
    const res = await page.goto(`${BASE_URL}${r}`, { waitUntil: "networkidle" });
    auditResults.routes[r] = res?.status();
    const title = await page.title();
    console.log(`Route ${r}: Status ${res?.status()}, Title: "${title}"`);
    const cleanName = r.replace(/[/]/g, "_");
    await page.screenshot({ path: path.join(OUTPUT_DIR, `route${cleanName}.png`) });
  }

  await browser.close();

  fs.writeFileSync(path.join(OUTPUT_DIR, "audit_summary.json"), JSON.stringify(auditResults, null, 2));
  console.log("Audit complete! Results saved to .verify/audit_summary.json");
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
