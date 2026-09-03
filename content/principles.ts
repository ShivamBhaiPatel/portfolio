export type Principle = {
  title: string;
  statement: string;
  evidence: string;
};

export const principles: Principle[] = [
  {
    title: "Compiler-Enforced Boundaries",
    statement:
      "I put boundaries where the compiler can enforce them rather than relying on developer discipline.",
    evidence:
      "In Workflow Studio, packages/core/tsconfig.json sets types: ['node'], so importing the VS Code editor API into the engine triggers an immediate build failure instead of a runtime crash.",
  },
  {
    title: "Honest Failure over False Greens",
    statement:
      "A visible failure is cheap; an unverified false green that silently reports success is catastrophic.",
    evidence:
      "In FlowTrace, the engine refuses to accept a model's claim of step success unless destination DOM state passes strict assertion rules. If a save dialog cannot be confirmed, it fails loudly.",
  },
  {
    title: "Deterministic Composition over Hallucination",
    statement:
      "When correctness is non-negotiable, choose deterministic parametric composition over generative diffusion.",
    evidence:
      "In PracharFlow, campaign creatives require exact political party symbols and regional Devanagari typography. We use Skia parametric layout trees with typed slots to guarantee deterministic layout and typography rendering in under 150ms.",
  },
  {
    title: "Aggregator Architecture over Adversarial Scraping",
    statement:
      "Avoid brittle, adversarial anti-bot battles by designing upstream aggregation and verified client telemetry.",
    evidence:
      "In DealDekho, price tracking pairs multi-aggregator ingestion via nexus-service with real user telemetry from the ShopLens extension rather than fragile direct scraping.",
  },
];
