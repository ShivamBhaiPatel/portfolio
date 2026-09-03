import fs from "node:fs";
import path from "node:path";

const DIRS_TO_SCAN = ["app", "components", "content"];
const EXCLUDED_FILES = [
  "components/resume-sheet.tsx", // ATS paper document layout intentionally uses physical black/charcoal print values
];

const RAW_PALETTE_REGEX = /\b(text|bg|border|ring|fill|stroke|from|via|to)-(neutral|slate|gray|zinc|stone|emerald|amber|red|blue|indigo)-[0-9]+/g;

let violations = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== "out") {
        scanDir(fullPath);
      }
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      if (EXCLUDED_FILES.includes(relPath)) continue;

      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content.split("\n");

      lines.forEach((line, lineIdx) => {
        const matches = line.match(RAW_PALETTE_REGEX);
        if (matches) {
          for (const match of matches) {
            console.error(`[PALETTE GUARD FAILURE] ${relPath}:${lineIdx + 1} uses raw framework palette utility "${match}". Use design tokens (--ink, --muted, --paper, --rule, --wash, --accent).`);
            violations++;
          }
        }
      });
    }
  }
}

for (const d of DIRS_TO_SCAN) {
  if (fs.existsSync(d)) {
    scanDir(d);
  }
}

if (violations > 0) {
  console.error(`\nFound ${violations} palette guard violation(s). Build aborted.`);
  process.exit(1);
} else {
  console.log("? Palette guard passed: 0 raw framework palette utilities found.");
}
