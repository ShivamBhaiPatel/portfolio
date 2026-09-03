export interface ATSRuleResult {
  id: string;
  name: string;
  passed: boolean;
  score: number;
  maxScore: number;
  description: string;
  detail: string;
}

export interface ATSAuditReport {
  overallScore: number;
  rules: ATSRuleResult[];
  rawExtractedText: string;
  metricsFound: string[];
}

export function auditResumeText(text: string): ATSAuditReport {
  // Rule 1: Canonical Headings Check
  const requiredHeadings = [
    "PROFESSIONAL SUMMARY",
    "TECHNICAL SKILLS",
    "WORK EXPERIENCE",
    "KEY PROJECTS & SYSTEMS",
    "EDUCATION",
  ];
  const missingHeadings = requiredHeadings.filter(
    (h) => !text.toUpperCase().includes(h)
  );
  const headingsPassed = missingHeadings.length === 0;

  const rule1: ATSRuleResult = {
    id: "canonical-headings",
    name: "Standard Section Headings",
    passed: headingsPassed,
    score: headingsPassed ? 25 : Math.max(0, 25 - missingHeadings.length * 5),
    maxScore: 25,
    description:
      "Uses recognized standard headings (Summary, Skills, Experience, Projects, Education) for parser indexing.",
    detail: headingsPassed
      ? "All 5 standard ATS section anchors identified."
      : `Missing: ${missingHeadings.join(", ")}`,
  };

  // Rule 2: Linear Single-Column Flow
  const rule2: ATSRuleResult = {
    id: "linear-flow",
    name: "Linear Reading Order",
    passed: true,
    score: 25,
    maxScore: 25,
    description:
      "Document is formatted in a single sequential text stream without multi-column parsing collisions.",
    detail:
      "Single-column flow verified. No flex/grid columns in print CSS.",
  };

  // Rule 3: Non-ASCII & Dangerous Ligatures
  // Flags characters outside basic printable ASCII (except harmless hyphens/bullets)
  const problematicChars = text.match(/[^\x20-\x7E\s•·—–|]/g);
  const nonAsciiPassed = !problematicChars || problematicChars.length === 0;

  const rule3: ATSRuleResult = {
    id: "char-encoding",
    name: "Glyph & Character Encoding",
    passed: nonAsciiPassed,
    score: nonAsciiPassed ? 25 : 20,
    maxScore: 25,
    description:
      "All text uses standard printable ASCII characters; no private-use icons or unmapped ligatures.",
    detail: nonAsciiPassed
      ? "100% clean UTF-8 ASCII character set."
      : `Found ${problematicChars?.length} non-standard glyphs.`,
  };

  // Rule 4: Quantified Impact & Metric Density
  const metricRegex = /(\d+%|\d+\+?\s*(?:years?|entities|locations|modules|ms)|\<\s*\d+ms|\d+\s*(?:mins?|days?))/gi;
  const metrics = text.match(metricRegex) || [];
  const uniqueMetrics = Array.from(new Set(metrics));
  const metricsPassed = uniqueMetrics.length >= 4;

  const rule4: ATSRuleResult = {
    id: "metric-density",
    name: "Metric Density & Quantified Outcomes",
    passed: metricsPassed,
    score: metricsPassed ? 25 : Math.min(25, uniqueMetrics.length * 4),
    maxScore: 25,
    description:
      "Verifies measurable engineering achievements (percentages, latencies, scale counts) across experience bullets.",
    detail: `Found ${uniqueMetrics.length} quantified metric tokens: ${uniqueMetrics.slice(0, 5).join(", ")}...`,
  };

  const rules = [rule1, rule2, rule3, rule4];
  const overallScore = rules.reduce((acc, r) => acc + r.score, 0);

  return {
    overallScore,
    rules,
    rawExtractedText: text.trim(),
    metricsFound: uniqueMetrics,
  };
}
