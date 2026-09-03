import type { ReactNode } from "react";
import { Container, type ContainerWidth } from "./container";

type Props = {
  id?: string;
  /** Visible heading. Rendered as <h2>. */
  title?: string;
  /** Screen-reader-only name, for sections whose heading is visual only. */
  label?: string;
  /** Mono kicker on the left — "01 / Production Systems". */
  kicker?: string;
  /** Optional mono subkicker on the right — "ARCHITECTURAL CONSTRAINTS & VERIFIABLE OUTCOMES". */
  subkicker?: string;
  width?: ContainerWidth;
  /** Hairline rule above the section. */
  rule?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  label,
  kicker,
  subkicker,
  width = "shell",
  rule = true,
  className = "",
  children,
}: Props) {
  const headingId = title && id ? `${id}-title` : undefined;

  // Extract numeral badge (e.g., "01") and label (e.g., "PRODUCTION SYSTEMS")
  const match = kicker ? kicker.match(/^(\d{2})\s*\/\s*(.+)$/) : null;
  const badge = match && match[1] ? match[1] : null;
  const tag = match && match[2] ? match[2].toUpperCase() : kicker ? kicker.toUpperCase() : "";

  return (
    <section
      id={id}
      aria-label={title ? undefined : label}
      aria-labelledby={title ? headingId : undefined}
      className={`pt-14 sm:pt-20 mt-14 sm:mt-20 ${
        rule ? "border-t border-rule" : ""
      } ${className}`}
    >
      <Container width={width}>
        {kicker ? (
          <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
            {badge ? (
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-wash text-ink border border-rule-strong shadow-2xs">
                {badge}
              </span>
            ) : null}
            <span className="font-mono text-[11px] tracking-widest uppercase text-muted font-semibold">
              {tag}
            </span>
            <div className="h-px flex-1 bg-rule" />
            {subkicker ? (
              <span className="hidden md:inline-block font-mono text-[10px] tracking-wider uppercase text-muted">
                {subkicker}
              </span>
            ) : null}
          </div>
        ) : null}
        {title ? (
          <h2
            id={headingId}
            className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-ink mb-4"
          >
            {title}
          </h2>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
