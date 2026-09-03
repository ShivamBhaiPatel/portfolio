import type { ReactNode } from "react";

/**
 * The measured column. Spec §5 layout rules: "Single measured column, ~68ch
 * for prose. Not a full-bleed 1440px grid."
 *
 * `width` names the reason, not the number, so that changing what "prose"
 * means is one edit in styles/globals.css.
 *
 *   prose   68ch — running text. The default, and it should stay the default.
 *   narrow  52ch — a standfirst or a pull quote that wants to break earlier.
 *   wide    84ch — tables and code blocks, which do not obey a reading measure.
 *   shell   78rem — the outer bound for a full-bleed band's *contents*.
 */
const WIDTH = {
  prose: "var(--measure-prose)",
  narrow: "var(--measure-narrow)",
  wide: "var(--measure-wide)",
  shell: "var(--measure-shell)",
  diagram: "var(--measure-diagram)",
} as const;

export type ContainerWidth = keyof typeof WIDTH;

export function Container({
  width = "prose",
  as: As = "div",
  className = "",
  children,
}: {
  width?: ContainerWidth;
  as?: "div" | "section" | "header" | "footer" | "article" | "nav";
  className?: string;
  children: ReactNode;
}) {
  return (
    <As
      className={`mx-auto w-full px-gutter md:px-gutter-lg ${className}`}
      style={{ maxWidth: WIDTH[width] }}
    >
      {children}
    </As>
  );
}
