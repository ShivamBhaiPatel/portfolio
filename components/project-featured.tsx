import Link from "next/link";
import { type Project } from "../content/projects";
import { FlowTraceDiagram, PracharFlowDiagram } from "./diagrams";

export function ProjectFeatured({ project }: { project: Project }) {
  const isFlowTrace = project.slug === "flowtrace";

  return (
    <article className="my-xl rounded-sm border border-rule bg-raised p-md md:p-lg">
      <div className="flex flex-wrap items-baseline justify-between gap-xs mb-xs">
        <span className="font-mono text-meta tracking-meta text-muted uppercase">
          Featured System
        </span>
        {project.live && project.live.status === "up" ? (
          <span className="font-mono text-meta text-muted flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Live
          </span>
        ) : null}
      </div>

      <h3 className="text-display font-display text-ink text-xl md:text-2xl mb-xs">
        {project.name}
      </h3>
      <p className="text-body text-muted leading-relaxed mb-md">
        {project.summary}
      </p>

      {/* SVG Architecture Diagram */}
      {isFlowTrace ? <FlowTraceDiagram /> : <PracharFlowDiagram />}

      <div className="my-md space-y-sm text-sm text-ink leading-relaxed">
        <div>
          <strong className="font-mono text-meta uppercase tracking-meta text-muted block mb-2xs">
            The Constraint &amp; Trade-off
          </strong>
          <p>{project.tension}</p>
        </div>
        <div>
          <strong className="font-mono text-meta uppercase tracking-meta text-muted block mb-2xs">
            Architecture Decision
          </strong>
          <p>{project.decision}</p>
        </div>
      </div>

      {project.evidence[0] ? (
        <div className="my-md bg-wash rounded-sm p-sm border border-rule font-mono text-xs text-ink overflow-x-auto">
          <p className="text-muted text-meta tracking-meta uppercase mb-2xs">
            Verbatim artifact excerpt ({project.evidence[0].source}):
          </p>
          <pre className="whitespace-pre-wrap">{project.evidence[0].quote}</pre>
        </div>
      ) : null}

      <div className="mt-md pt-sm border-t border-rule flex flex-wrap items-center justify-between gap-sm">
        <div className="flex flex-wrap gap-xs font-mono text-meta text-muted">
          {project.stack.map((item) => (
            <span key={item} className="bg-wash px-2xs py-1 rounded-sm border border-rule">
              {item}
            </span>
          ))}
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="font-mono text-sm text-accent underline underline-offset-4 hover:opacity-80 whitespace-nowrap mt-xs sm:mt-0"
        >
          Case study →
        </Link>
      </div>
    </article>
  );
}
