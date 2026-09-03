"use client";

import { type Project } from "../content/projects";
import { useSystemStatus } from "../lib/use-system-status";

export function ProjectTable({ projects }: { projects: Project[] }) {
  const dynamicStatuses = useSystemStatus();

  return (
    <div className="w-full max-w-full overflow-x-auto border border-rule rounded-sm bg-raised/30 my-md">
      <table className="w-full min-w-[600px] text-left border-collapse font-sans text-sm">
        <thead>
          <tr className="border-b border-rule font-mono text-meta tracking-meta text-muted uppercase bg-wash/50">
            <th className="py-sm px-md font-medium">Project</th>
            <th className="py-sm px-md font-medium">Architecture / Summary</th>
            <th className="py-sm px-md font-medium">Stack</th>
            <th className="py-sm px-md font-medium text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {projects.map((p) => {
            const current = dynamicStatuses[p.slug] || {
              status: p.live?.status || "down",
              note: p.live?.note || "In progress",
            };

            return (
              <tr key={p.slug} className="group hover:bg-wash transition-colors">
                <td className="py-md px-md font-medium text-ink align-top">
                  {current.status !== "down" && p.live?.url ? (
                    <a
                      href={p.live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors hover:underline underline-offset-2"
                    >
                      {p.name}
                    </a>
                  ) : p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors hover:underline underline-offset-2"
                    >
                      {p.name}
                    </a>
                  ) : (
                    <span>{p.name}</span>
                  )}
                </td>
                <td className="py-md px-md text-muted align-top max-w-sm">
                  <p className="text-ink">{p.summary}</p>
                  {p.evidence[0] ? (
                    <p className="font-mono text-meta text-muted mt-1">
                      {p.evidence[0].source}
                    </p>
                  ) : null}
                </td>
                <td className="py-md px-md font-mono text-meta text-muted align-top">
                  <div className="flex flex-wrap gap-1">
                    {p.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="bg-wash/90 text-ink px-1.5 py-0.5 rounded-sm border border-rule-strong font-mono text-meta"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-md px-md font-mono text-meta text-right align-top whitespace-nowrap">
                  {current.status === "down" ? (
                    <span className="text-muted">{current.note || "In redeployment"}</span>
                  ) : p.live?.url ? (
                    <a
                      href={p.live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-2 hover:opacity-80"
                    >
                      {current.note ? `${current.note.replace(/\s*↗$/, "")} ↗` : "Live ↗"}
                    </a>
                  ) : p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-ink underline underline-offset-2"
                    >
                      GitHub ↗
                    </a>
                  ) : (
                    <span className="text-muted">
                      {current.note || "Spec"}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
