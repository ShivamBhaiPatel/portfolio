export type Principle = {
  title: string;
  statement: string;
  evidence: string;
};

export const principles: Principle[] = [
  {
    title: "Compile-Time Boundaries over Runtime Discipline",
    statement:
      "Enforce architectural separation where the compiler can catch violations rather than trusting team conventions or documentation.",
    evidence:
      "In Workflow Studio, packages/core/tsconfig.json scopes types strictly to Node. Any accidental import of VS Code UI or editor APIs into the core engine triggers an immediate build-time error rather than a runtime failure.",
  },
  {
    title: "State Verification over False Greens",
    statement:
      "A fast, loud failure is cheap to fix; an unverified false green that silently reports success masks catastrophic defects.",
    evidence:
      "In FlowTrace, the replay engine refuses to mark an automation step complete until the destination DOM state satisfies strict assertion rules. Replaying a save button click requires verifying subsequent modal state mutation.",
  },
  {
    title: "Deterministic Canvas over Generative Hallucination",
    statement:
      "When business requirements demand 100% typography accuracy and brand fidelity, choose deterministic code composition over stochastic AI models.",
    evidence:
      "In PracharFlow, regional campaigns require exact political symbols and Devanagari/Gujarati script rendering. We built a Java 21 / Skia compositor with typed layout slots, delivering sub-150ms rendering with zero GPU overhead.",
  },
  {
    title: "Upstream Aggregation over Adversarial Scraping",
    statement:
      "Avoid brittle, high-maintenance anti-bot arms races by pairing upstream price comparison APIs with verified client-side telemetry.",
    evidence:
      "In DealDekho, catalog indexing pairs upstream aggregator APIs with price verification telemetry from the ShopLens browser extension rather than maintaining fragile direct scrapers against marketplace bot guards.",
  },
];
