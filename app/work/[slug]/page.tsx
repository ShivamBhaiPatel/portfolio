import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../../content/projects";
import { PageShell } from "../../../components/page-shell";
import { Section } from "../../../components/section";
import { Container } from "../../../components/container";
import {
  WorkflowStudioDiagram,
  FlowTraceDiagram,
  PracharFlowDiagram,
} from "../../../components/diagrams";

export function generateStaticParams() {
  return projects
    .filter((p) => p.tier === "flagship" || p.tier === "featured")
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <div className="py-xl">
        <Container width="wide">
          {/* Breadcrumb Back link */}
          <div className="mb-md font-mono text-sm">
            <Link
              href="/#work"
              className="text-accent underline underline-offset-4 hover:opacity-80"
            >
              ← Back to selected work
            </Link>
          </div>

          <p className="font-mono text-meta tracking-meta text-muted uppercase mb-2xs">
            Architecture Case Study
          </p>
          <h1 className="text-display font-display text-ink text-3xl md:text-4xl leading-tight mb-sm">
            {project.name}
          </h1>
          <p className="text-xl text-muted leading-relaxed font-sans mb-lg">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-xs font-mono text-meta text-muted pb-md border-b border-rule mb-xl">
            {project.stack.map((item) => (
              <span
                key={item}
                className="bg-wash px-2 py-1 rounded-sm border border-rule text-ink"
              >
                {item}
              </span>
            ))}
            {project.live && project.live.status === "up" ? (
              <a
                href={project.live.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-accent underline underline-offset-4 font-semibold"
              >
                Live Deployment ↗
              </a>
            ) : null}
          </div>
        </Container>

        {/* 1. The Situation */}
        <Section title="1. The Situation" id="situation">
          <p className="text-body text-ink leading-relaxed">
            {project.situation ?? project.summary}
          </p>
        </Section>

        {/* 2. The Tension */}
        <Section title="2. The Constraint & Tension" id="tension">
          <p className="text-body text-ink leading-relaxed mb-md">
            {project.tension}
          </p>
        </Section>

        {/* 3. The Decision */}
        <Section title="3. The Architecture Decision" id="decision">
          <p className="text-body text-ink leading-relaxed mb-md">
            {project.decision}
          </p>
          <div className="bg-raised p-md rounded-sm border border-rule mt-sm">
            <h3 className="font-mono text-meta uppercase tracking-meta text-muted mb-xs">
              Consequence &amp; Verified Outcome
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              {project.consequence}
            </p>
          </div>
        </Section>

        {/* 4. The Architecture Diagram */}
        <Section title="4. System Architecture" id="diagram" width="wide">
          {project.slug === "workflow-studio" && <WorkflowStudioDiagram />}
          {project.slug === "flowtrace" && <FlowTraceDiagram />}
          {project.slug === "pracharflow" && <PracharFlowDiagram />}
        </Section>

        {/* 5. The Evidence */}
        <Section title="5. Verbatim Code Evidence" id="evidence">
          <div className="space-y-md">
            {project.evidence.map((ev, i) => (
              <div
                key={i}
                className="bg-wash rounded-sm p-md border border-rule font-mono text-xs text-ink overflow-x-auto"
              >
                <div className="flex flex-wrap items-center justify-between gap-xs text-muted text-meta tracking-meta uppercase mb-xs border-b border-rule pb-xs font-mono">
                  <span>Artifact Excerpt</span>
                  <span className="normal-case text-ink font-medium">{ev.source}</span>
                </div>
                <pre className="whitespace-pre-wrap">{ev.quote}</pre>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. What it Cost / Roadmap */}
        <Section title="6. Trade-offs & What's Left" id="costs">
          {project.whatItCost ? (
            <p className="text-body text-ink leading-relaxed mb-md">
              {project.whatItCost}
            </p>
          ) : null}

          {project.roadmap && project.roadmap.length > 0 ? (
            <div className="mt-md pt-md border-t border-rule">
              <h3 className="font-mono text-meta uppercase tracking-meta text-muted mb-xs">
                Active Roadmap
              </h3>
              <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-muted">
                {project.roadmap.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </Section>

        <Container width="wide" className="pt-xl mt-xl border-t border-rule">
          <Link
            href="/#work"
            className="font-mono text-sm text-accent underline underline-offset-4 hover:opacity-80"
          >
            ← Back to all selected work
          </Link>
        </Container>
      </div>
    </PageShell>
  );
}
