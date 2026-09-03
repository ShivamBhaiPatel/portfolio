import { principles } from "../content/principles";

export function PrinciplesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg my-md">
      {principles.map((item) => (
        <div
          key={item.title}
          className="rounded-sm border border-rule bg-raised p-md"
        >
          <h3 className="font-mono text-meta tracking-meta text-accent uppercase mb-2xs">
            {item.title}
          </h3>
          <p className="text-body font-medium text-ink mb-xs leading-snug">
            {item.statement}
          </p>
          <p className="text-xs text-muted leading-relaxed border-t border-rule pt-xs font-sans">
            <span className="font-mono text-meta uppercase text-muted block mb-1">Evidence:</span>
            {item.evidence}
          </p>
        </div>
      ))}
    </div>
  );
}
