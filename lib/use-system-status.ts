"use client";

import { useState, useEffect } from "react";
import { projects } from "../content/projects";

export type ProjectStatusMap = Record<
  string,
  { status: "up" | "down" | "slow"; note: string; latencyMs?: number }
>;

// Layer 1: Synchronous build-time baked defaults (Works with zero JS, instant render)
const defaultStatuses: ProjectStatusMap = Object.fromEntries(
  projects.map((p) => [
    p.slug,
    {
      status: p.live?.status || "up",
      note: p.live?.note || (p.live?.status === "up" ? "Live" : p.repo ? "GitHub" : "Prototype"),
    },
  ])
);

export function useSystemStatus() {
  const [statuses, setStatuses] = useState<ProjectStatusMap>(defaultStatuses);

  useEffect(() => {
    // Layer 2: Cloudflare Worker freshness upgrade applied after paint
    const endpoint = process.env.NEXT_PUBLIC_STATUS_ENDPOINT;
    if (!endpoint) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    fetch(endpoint, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Status probe failed");
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.systems)) {
          const freshMap: ProjectStatusMap = { ...defaultStatuses };
          for (const s of data.systems) {
            freshMap[s.slug] = {
              status: s.status,
              note: s.note,
              latencyMs: s.latencyMs,
            };
          }
          setStatuses(freshMap);
        }
      })
      .catch(() => {
        // Silent fallback: keeps Layer 1 baked defaults without any flicker or layout shift
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return statuses;
}
