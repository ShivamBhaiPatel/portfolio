"use client";

import { useEffect, useState } from "react";

/**
 * Spec §5 Tokens: dark is "prefers-color-scheme + explicit toggle". Both, not
 * either — so this has three states, and "system" is one of them. A two-state
 * toggle silently overrides the OS preference the first time it is touched and
 * never gives it back, which is the common bug.
 *
 * Storage contract, shared with app/theme-script.ts:
 *   localStorage["theme"] === "light" | "dark"  -> data-theme on <html>
 *   absent                                      -> no attribute, media query rules
 */
const MODES = ["system", "light", "dark"] as const;
type Mode = (typeof MODES)[number];

const LABEL: Record<Mode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function read(): Mode {
  try {
    const v = localStorage.getItem("theme");
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    // Private mode, or site data blocked. System preference is a fine answer.
    return "system";
  }
}

function apply(mode: Mode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
  try {
    if (mode === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", mode);
  } catch {
    // Non-fatal: the choice just does not survive a reload.
  }
}

export function ThemeToggle() {
  // Server-rendered as "system" and corrected on mount. The inline script in
  // app/layout.tsx has already painted the right colours by then, so this
  // catches up the button label only — there is no flash to fix here.
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(read());
    setMounted(true);
  }, []);

  const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length] as Mode;

  return (
    <button
      type="button"
      onClick={() => {
        apply(next);
        setMode(next);
      }}
      // The visible text already reads "Theme: Light"; the label spells out
      // what pressing it does, which the visible text cannot.
      aria-label={`Theme: ${LABEL[mode]}. Activate to switch to ${LABEL[next].toLowerCase()}.`}
      className="font-mono text-meta tracking-meta text-muted uppercase
                 border border-rule rounded-sm min-h-[44px] px-2.5 py-1.5 md:min-h-0 md:px-2xs md:py-3xs
                 transition-colors duration-fast ease-out
                 hover:text-ink hover:border-rule-strong cursor-pointer active:scale-95 inline-flex items-center justify-center"
    >
      {/* suppressHydrationWarning: the label is intentionally different after
          mount, because only the client knows what is in localStorage. */}
      <span suppressHydrationWarning>{mounted ? LABEL[mode] : LABEL.system}</span>
    </button>
  );
}
