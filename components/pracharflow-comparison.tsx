export function PracharFlowComparison() {
  return (
    <div className="w-full rounded-sm border border-rule bg-wash/30 p-sm sm:p-md font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-rule mb-sm font-mono text-meta">
        <span className="text-accent font-semibold tracking-meta uppercase">
          Engineering Trade-off Analysis
        </span>
        <span className="text-muted">
          Generative Diffusion vs. Skia Engine
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-rule text-meta text-muted uppercase">
              <th className="py-1.5 pr-3 font-semibold">Dimension</th>
              <th className="py-1.5 px-3 font-semibold">Generative Diffusion</th>
              <th className="py-1.5 pl-3 font-semibold text-accent">Deterministic Skia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule/60 text-ink">
            <tr>
              <td className="py-2 pr-3 font-semibold text-muted">Devanagari / Gujarati</td>
              <td className="py-2 px-3 text-muted">Hallucinates ligatures &amp; broken conjuncts</td>
              <td className="py-2 pl-3 text-ink font-medium">Native HarfBuzz font shaping (100% accurate)</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 font-semibold text-muted">Brand &amp; Emblems</td>
              <td className="py-2 px-3 text-muted">Distorts official party logos &amp; vectors</td>
              <td className="py-2 pl-3 text-ink font-medium">Bit-exact rasterization into typed layout slots</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 font-semibold text-muted">Execution Latency</td>
              <td className="py-2 px-3 text-muted">8–15s per image on GPU infrastructure</td>
              <td className="py-2 pl-3 text-accent font-medium">&lt;150ms on standard CPU JVM container</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 font-semibold text-muted">Reproducibility</td>
              <td className="py-2 px-3 text-muted">Stochastic output across random seeds</td>
              <td className="py-2 pl-3 text-ink font-medium">100% deterministic, bit-exact rendering</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
