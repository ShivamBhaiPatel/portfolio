"use client";

import { useEffect, useState } from "react";

/**
 * Spec §5: "Contrast target: WCAG AA (4.5:1 body, 3:1 large) in both themes.
 * To be verified, not assumed."
 *
 * So this verifies it, live, from the values the browser actually resolved —
 * not from a table typed by hand next to the tokens. Switch the theme control
 * in the masthead and the numbers recompute. If someone edits a token to
 * something that fails, this goes red on the next page load rather than at
 * the Lighthouse gate in P4.
 */

type Row = { fg: string; bg: string; ratio: number; need: number; note?: string };

const FOREGROUNDS = ["ink", "muted", "accent"] as const;
const BACKGROUNDS = ["paper", "raised"] as const;

function srgbToLinear(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Accepts whatever getComputedStyle hands back — rgb(), oklab(), a hex. */
function luminance(color: string, probe: HTMLElement): number | null {
  probe.style.color = color;
  const resolved = getComputedStyle(probe).color;
  const m = resolved.match(/(-?[\d.]+)/g);
  if (!m || m.length < 3) return null;
  const [r, g, b] = m.map(Number) as [number, number, number];
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function ContrastTable() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    function measure() {
      const probe = document.createElement("span");
      probe.style.display = "none";
      document.body.appendChild(probe);
      const cs = getComputedStyle(document.documentElement);
      const lum = (token: string) => luminance(cs.getPropertyValue(`--${token}`).trim(), probe);

      const out: Row[] = [];
      for (const bg of BACKGROUNDS) {
        const lb = lum(bg);
        for (const fg of FOREGROUNDS) {
          const lf = lum(fg);
          if (lb === null || lf === null) continue;
          const [hi, lo] = lb > lf ? [lb, lf] : [lf, lb];
          out.push({ fg, bg, ratio: (hi + 0.05) / (lo + 0.05), need: 4.5 });
        }
        // The focus ring is a UI indicator, so 1.4.11's 3:1 applies, not 4.5.
        const lb2 = lum(bg);
        const la = lum("accent");
        if (lb2 !== null && la !== null) {
          const [hi, lo] = lb2 > la ? [lb2, la] : [la, lb2];
          out.push({
            fg: "accent (focus ring)",
            bg,
            ratio: (hi + 0.05) / (lo + 0.05),
            need: 3,
            note: "1.4.11 non-text",
          });
        }
      }
      probe.remove();
      setRows(out);
    }

    measure();
    // Recompute when the OS preference flips underneath us.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", measure);
    // ...and when the masthead toggle writes data-theme.
    const obs = new MutationObserver(measure);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      mq.removeEventListener("change", measure);
      obs.disconnect();
    };
  }, []);

  if (!rows) {
    return (
      <p className="font-mono text-meta text-muted">Measuring…</p>
    );
  }

  return (
    <table className="w-full border-collapse text-small">
      <caption className="sr-only">
        Measured contrast ratio of each foreground token against each background
        token, in the currently active theme.
      </caption>
      <thead>
        <tr className="border-b border-rule-strong text-left">
          <th scope="col" className="py-2xs pr-sm font-mono text-meta tracking-meta uppercase font-medium">
            Pair
          </th>
          <th scope="col" className="py-2xs pr-sm font-mono text-meta tracking-meta uppercase font-medium">
            Ratio
          </th>
          <th scope="col" className="py-2xs font-mono text-meta tracking-meta uppercase font-medium">
            AA
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const pass = r.ratio >= r.need;
          return (
            <tr key={`${r.fg}-${r.bg}`} className="border-b border-rule">
              <td className="py-2xs pr-sm font-mono text-meta">
                <span style={{ color: `var(--${r.fg.startsWith("accent") ? "accent" : r.fg})` }}>
                  {r.fg}
                </span>
                <span className="text-muted"> on {r.bg}</span>
              </td>
              <td className="py-2xs pr-sm font-mono text-meta tabular-nums">
                {r.ratio.toFixed(2)}:1
              </td>
              <td className="py-2xs font-mono text-meta">
                {/* Never colour alone: the word carries the verdict. */}
                {pass ? "pass" : "FAIL"}
                <span className="text-muted"> · needs {r.need}</span>
                {r.note ? <span className="text-muted"> · {r.note}</span> : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
