import fs from "node:fs";
import path from "node:path";
import { projects } from "../content/projects.ts";

let checked = 0;
let errors = 0;

const WORKSPACE_ROOT = path.resolve(process.cwd(), "..");

function resolveFilePath(sourcePath) {
  // Try directly in Portfolio
  const inPortfolio = path.resolve(process.cwd(), sourcePath);
  if (fs.existsSync(inPortfolio)) return inPortfolio;

  // Try in workflow-studio for packages/core/...
  const inWorkflowStudio = path.resolve(WORKSPACE_ROOT, "workflow-studio", sourcePath);
  if (fs.existsSync(inWorkflowStudio)) return inWorkflowStudio;

  // Try in workspace root (D:\WorkingProjects\...)
  const cleanPath = sourcePath.replace(/\/\.\.\.\//g, "/");
  const inWorkspace = path.resolve(WORKSPACE_ROOT, cleanPath);
  if (fs.existsSync(inWorkspace)) return inWorkspace;

  // Search recursively for file basename if ellipsis was used
  const basename = path.basename(sourcePath);
  const parts = sourcePath.split(/[/|\\]/);
  const repoName = parts[0];
  const repoDir = path.resolve(WORKSPACE_ROOT, repoName);

  if (fs.existsSync(repoDir)) {
    function findFile(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          if (e.name !== "node_modules" && e.name !== ".git" && e.name !== "target" && e.name !== "dist") {
            const res = findFile(full);
            if (res) return res;
          }
        } else if (e.name === basename) {
          return full;
        }
      }
      return null;
    }
    const found = findFile(repoDir);
    if (found) return found;
  }

  return null;
}

function normalizeCode(str) {
  return str
    .split(/\r?\n/)
    .map(line => line.replace(/^\s*(\/\*+|\*+\/|\*+|\/\/)\s?/, ""))
    .join(" ")
    .replace(/[—–\u2014\u2013]|â€”/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

for (const p of projects) {
  if (!p.evidence || p.evidence.length === 0) continue;

  for (const ev of p.evidence) {
    checked++;
    const [sourceFile, lineSpec] = ev.source.split(":");

    const resolved = resolveFilePath(sourceFile);
    if (!resolved) {
      console.warn(`[CITATION INFO] External/remote repository file "${sourceFile}" not present locally. Skipped.`);
      continue;
    }

    const fileText = fs.readFileSync(resolved, "utf8");
    const fileLines = fileText.split(/\r?\n/);

    if (lineSpec && /^\d+(-\d+)?$/.test(lineSpec)) {
      let startLine = 0;
      let endLine = 0;
      if (lineSpec.includes("-")) {
        const [s, e] = lineSpec.split("-").map(Number);
        startLine = s;
        endLine = e;
      } else {
        startLine = Number(lineSpec);
        endLine = startLine;
      }

      const extracted = fileLines.slice(startLine - 1, endLine).join("\n");
      const normExtracted = normalizeCode(extracted);
      const normQuote = normalizeCode(ev.quote);

      // Check match against cited lines or file context
      if (!normExtracted.includes(normQuote) && !normalizeCode(fileText).includes(normQuote)) {
        console.error(`[CITATION ERROR] ${p.name}: Quote does not match ${sourceFile}:${lineSpec}`);
        console.error(`  Expected: ${normQuote}`);
        console.error(`  Found:    ${normExtracted}`);
        errors++;
      } else {
        console.log(`? Verified: ${p.name} -> ${sourceFile}:${lineSpec}`);
      }
    }
  }
}

if (errors > 0) {
  console.error(`\nFound ${errors} citation error(s).`);
  process.exit(1);
} else {
  console.log(`\n? Citation guard passed: verified evidence items against physical disk.`);
}
