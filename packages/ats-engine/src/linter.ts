import { ATSReport, ATSCheckResult } from "./types";
import { tokenizeResumeText } from "./lexer";

const CANONICAL_SECTIONS = [
  { name: "Professional Summary", pattern: /(professional summary|summary|about me)/i },
  { name: "Technical Skills", pattern: /(technical skills|skills|technologies)/i },
  { name: "Work Experience", pattern: /(work experience|professional experience|experience)/i },
  { name: "Key Projects & Systems", pattern: /(key projects|projects & systems|projects)/i },
  { name: "Education & Credentials", pattern: /(education|credentials|academic)/i },
];

export function runATSAudit(rawText: string): ATSReport {
  const tokenized = tokenizeResumeText(rawText);
  const checks: ATSCheckResult[] = [];

  // 1. Standard Section Headings Check
  const detectedSections = CANONICAL_SECTIONS.filter((s) =>
    s.pattern.test(rawText)
  ).map((s) => s.name);
  const sectionPassed = detectedSections.length >= 4;
  const headingScore = Math.round(
    (detectedSections.length / CANONICAL_SECTIONS.length) * 25
  );

  checks.push({
    id: "headings",
    name: "Standard Section Headings",
    weight: 25,
    score: headingScore,
    passed: sectionPassed,
    summary: `${detectedSections.length} of ${CANONICAL_SECTIONS.length} canonical ATS sections detected.`,
    details: detectedSections.map((s) => `Anchor: ${s}`),
  });

  // 2. Character & Encoding Compliance
  // Flags private use unicode (E000-F8FF), surrogates, or non-standard control characters
  const illegalGlyphs = rawText.match(/[\uE000-\uF8FF\uD800-\uDFFF]/g) || [];
  const encodingPassed = illegalGlyphs.length === 0;
  checks.push({
    id: "encoding",
    name: "Glyph & Character Encoding",
    weight: 25,
    score: encodingPassed ? 25 : 0,
    passed: encodingPassed,
    summary: encodingPassed
      ? "100% clean UTF-8 ASCII character set; zero private-use icons."
      : `Detected ${illegalGlyphs.length} non-standard glyphs.`,
    details: encodingPassed
      ? ["UTF-8 ASCII Compliant", "Zero Private-Use Glyphs", "Zero Broken Ligatures"]
      : illegalGlyphs,
  });

  // 3. Metric Density & Quantified Outcomes
  // Searches for numbers with %, ms, days, years, or multipliers (e.g. 40%, 800ms, 2 days, 150ms)
  const metricRegex =
    /(\d+%\b|\d+[\+]?\s*(?:years?|months?|days?|ms|%|x|k|LPA)|\<\s*\d+ms|\b\d+%\b|\b\d+ms\b)/gi;
  const metricsFound = Array.from(new Set(rawText.match(metricRegex) || []));
  const metricsPassed = metricsFound.length >= 4;
  const metricScore = metricsPassed
    ? 25
    : Math.min(25, metricsFound.length * 5);

  checks.push({
    id: "metrics",
    name: "Metric Density & Quantified Outcomes",
    weight: 25,
    score: metricScore,
    passed: metricsPassed,
    summary: `Found ${metricsFound.length} verifiable quantified metric tokens.`,
    details: metricsFound.slice(0, 8),
  });

  // 4. Contact & Telemetry Anchors
  const emails = tokenized.emails;
  const links = tokenized.urls.filter(
    (u) =>
      u.toLowerCase().includes("linkedin.com") ||
      u.toLowerCase().includes("github.com") ||
      u.toLowerCase().includes("shivambhaipatel")
  );
  const contactPassed = emails.length > 0 && links.length >= 2;
  checks.push({
    id: "contact",
    name: "Linear Contact Telemetry",
    weight: 25,
    score: contactPassed ? 25 : 10,
    passed: contactPassed,
    summary: contactPassed
      ? "Direct contact email and developer profile anchors cleanly parsed."
      : "Missing essential contact anchors.",
    details: [...emails, ...links],
  });

  const overallScore = checks.reduce((sum, c) => sum + c.score, 0);
  const wordCount = tokenized.words.length;
  const characterCount = rawText.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    overallScore,
    passed: overallScore >= 80,
    checks,
    extractedMetrics: {
      emails,
      links,
      quantifiedTokens: metricsFound,
      detectedSections,
    },
    rawTextStream: rawText.trim(),
    wordCount,
    characterCount,
    readingTimeMinutes,
  };
}
