import type { Metadata } from "next";
import { PageShell } from "../../components/page-shell";
import { Section } from "../../components/section";
import { Container } from "../../components/container";
import { ContrastTable } from "../../components/contrast-table";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/**
 * Every token in styles/globals.css, rendered. The point is that the design
 * can be reviewed and rejected before a word of content is written, and that
 * a token nobody can see is a token nobody checked.
 *
 * This route is noindex and will not survive to production; it is a P1
 * artefact for the visual review gate in §7.
 */

const COLOURS = [
  { token: "--paper", use: "page ground" },
  { token: "--raised", use: "cards, rare" },
  { token: "--ink", use: "body text, headings" },
  { token: "--muted", use: "captions, metadata" },
  { token: "--rule", use: "1px separators" },
  { token: "--accent", use: "links, one live-status dot" },
  { token: "--wash", use: "derived — code blocks, selection ground" },
  { token: "--wash-strong", use: "derived — selection" },
  { token: "--rule-strong", use: "derived — emphasis hairline" },
];

const TYPE = [
  { token: "--text-display", use: "hero claim", sample: "I build the machinery" },
  { token: "--text-title", use: "page h1", sample: "Workflow Studio" },
  { token: "--text-heading", use: "section h2", sample: "Selected work" },
  { token: "--text-subheading", use: "h3", sample: "The tension" },
  { token: "--text-lead", use: "standfirst", sample: "A standfirst sits under the heading and sets up the argument." },
  { token: "--text-body", use: "prose", sample: "Body copy at seventeen pixels, because this is a reading site." },
  { token: "--text-small", use: "captions, table cells", sample: "Caption text and table cells." },
  { token: "--text-meta", use: "mono metadata, marginalia", sample: "available · Q4 2026 · Prayagraj, remote" },
];

const SPACE = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
const RADII = ["hair", "sm", "md"];
const MOTION = [
  { token: "--duration-instant", ms: "90ms", use: "colour change on hover" },
  { token: "--duration-fast", ms: "140ms", use: "control state" },
  { token: "--duration-base", ms: "190ms", use: "scroll-in. The ceiling — §5 caps motion at 200ms." },
];

function TokenName({ children }: { children: string }) {
  return <code className="font-mono text-meta text-muted">{children}</code>;
}

export default function Styleguide() {
  return (
    <PageShell>
      <Section rule={false} width="wide" kicker="P1 · design system" label="Styleguide intro">
        <h1 className="text-title">Tokens</h1>
        <p className="mt-md text-lead" style={{ maxWidth: "var(--measure-narrow)" }}>
          Everything the site is allowed to look like, in one place. If a value
          is not on this page, it does not exist in a component either.
        </p>
        <p className="mt-md text-small text-muted" style={{ maxWidth: "var(--measure-prose)" }}>
          Switch the control in the masthead to check both themes. It cycles
          system → light → dark, so the OS preference stays reachable after a
          reader has overridden it once.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="colour" title="Colour" width="wide" kicker="six tokens, three derived">
        <p className="mb-lg" style={{ maxWidth: "var(--measure-prose)" }}>
          Six values, taken verbatim from spec §5. The three derived tokens are{" "}
          <code className="font-mono">color-mix()</code> of those six rather than
          new hexes, so §5 check 1 — no colour outside the token table — stays
          true by construction instead of by discipline.
        </p>

        <ul className="grid gap-sm sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {COLOURS.map((c) => (
            <li key={c.token} className="border border-rule rounded-sm overflow-hidden">
              <div
                className="h-16 border-b border-rule"
                style={{ backgroundColor: `var(${c.token})` }}
                aria-hidden="true"
              />
              <div className="p-2xs">
                <TokenName>{c.token}</TokenName>
                <p className="text-meta text-muted mt-3xs">{c.use}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-subheading mt-2xl mb-sm">Measured contrast</h3>
        <p className="mb-md text-small text-muted" style={{ maxWidth: "var(--measure-prose)" }}>
          Computed in the browser from the resolved variables, for the theme
          currently active. Not a table someone typed.
        </p>
        <ContrastTable />
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="faces" title="Typefaces" width="wide" kicker="all three SIL OFL 1.1">
        <div className="grid gap-lg md:grid-cols-3">
          <div>
            <p className="font-mono text-meta tracking-meta text-muted uppercase mb-2xs">
              Display · Fraunces
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-title)", lineHeight: "var(--leading-title)" }}>
              Handgloves 1234
            </p>
            <p className="text-small text-muted mt-2xs">
              Headings only. Soft serif with an optical-size axis — this is the
              token carrying §5&rsquo;s &ldquo;human touch&rdquo; requirement.
            </p>
          </div>
          <div>
            <p className="font-mono text-meta tracking-meta text-muted uppercase mb-2xs">
              Body · Instrument Sans
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-title)", lineHeight: "var(--leading-title)" }}>
              Handgloves 1234
            </p>
            <p className="text-small text-muted mt-2xs">
              Deliberately not Inter, and deliberately not{" "}
              <code className="font-mono">system-ui</code> — §5 check 4.
            </p>
          </div>
          <div>
            <p className="font-mono text-meta tracking-meta text-muted uppercase mb-2xs">
              Technical · JetBrains Mono
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-title)", lineHeight: "var(--leading-title)" }}>
              Handgloves 1234
            </p>
            <p className="text-small text-muted mt-2xs">
              Quoted artefacts, file paths, metrics, status. §5 check 9 lives here.
            </p>
          </div>
        </div>

        <p className="mt-lg text-small text-muted" style={{ maxWidth: "var(--measure-prose)" }}>
          Self-hosted through <code className="font-mono">next/font/local</code>{" "}
          from <code className="font-mono">/fonts</code>. Licence notices and the
          OFL obligations we meet are in{" "}
          <code className="font-mono">fonts/LICENSES.txt</code>.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="type" title="Type scale" width="wide" kicker="~1.25 ratio · fluid at the top two">
        <dl className="m-0">
          {TYPE.map((t) => (
            <div key={t.token} className="border-t border-rule py-md first:border-t-0">
              <dt className="mb-2xs flex flex-wrap items-baseline gap-2xs">
                <TokenName>{t.token}</TokenName>
                <span className="text-meta text-muted">{t.use}</span>
              </dt>
              <dd className="m-0">
                <p
                  style={{
                    fontSize: `var(${t.token})`,
                    fontFamily: t.token === "--text-meta" ? "var(--font-mono)" : undefined,
                    letterSpacing: t.token === "--text-meta" ? "var(--tracking-meta)" : undefined,
                    lineHeight:
                      t.token === "--text-display"
                        ? "var(--leading-display)"
                        : t.token === "--text-title"
                          ? "var(--leading-title)"
                          : undefined,
                  }}
                >
                  {t.sample}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="measure" title="Measure" width="wide" kicker="§5: a single ~68ch column">
        <p className="mb-md text-small text-muted">
          The four widths, drawn. Prose is the default and should stay the
          default; wide exists for tables and code, which do not obey a reading
          measure.
        </p>
        <ul className="list-none p-0 m-0 space-y-2xs">
          {(["narrow", "prose", "wide", "shell"] as const).map((w) => (
            <li key={w} className="flex items-center gap-sm">
              <span className="font-mono text-meta text-muted w-16 shrink-0">{w}</span>
              <span
                className="h-3 border border-rule bg-wash rounded-hair block"
                style={{ width: `min(100%, var(--measure-${w}))` }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="space" title="Spacing" width="wide" kicker="named steps, not a numeric ramp">
        <ul className="list-none p-0 m-0 space-y-2xs">
          {SPACE.map((s) => (
            <li key={s} className="flex items-center gap-sm">
              <span className="font-mono text-meta text-muted w-16 shrink-0">--spacing-{s}</span>
              <span
                className="h-3 bg-accent rounded-hair block"
                style={{ width: `var(--spacing-${s})` }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="geometry" title="Geometry" width="wide" kicker="4px is the ceiling">
        <p className="mb-md" style={{ maxWidth: "var(--measure-prose)" }}>
          §5 forbids rounded-2xl cards with a heavy shadow on everything, so the
          radii stop at 4px and there are <em>no</em> shadow tokens at all. That
          is not an omission — hierarchy is carried by whitespace, type scale and
          1px rules. A token that does not exist cannot be reached for.
        </p>
        <ul className="flex flex-wrap gap-sm list-none p-0 m-0">
          {RADII.map((r) => (
            <li key={r} className="text-center">
              <span
                className="block w-20 h-20 bg-wash border border-rule-strong"
                style={{ borderRadius: `var(--radius-${r})` }}
                aria-hidden="true"
              />
              <span className="font-mono text-meta text-muted">--radius-{r}</span>
            </li>
          ))}
        </ul>
        <div className="mt-lg">
          <p className="font-mono text-meta tracking-meta text-muted uppercase mb-2xs">
            Rules
          </p>
          <hr className="border-0 border-t border-rule" />
          <p className="text-meta text-muted mt-3xs mb-md">--rule · 1px hairline</p>
          <hr className="border-0 border-t-2 border-rule-strong" />
          <p className="text-meta text-muted mt-3xs">--rule-strong · 2px, table heads and emphasis</p>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="motion" title="Motion" width="wide" kicker="opacity and translate only">
        <p className="mb-md" style={{ maxWidth: "var(--measure-prose)" }}>
          Three durations, all under the 200ms ceiling §5 sets, and one easing
          curve. Hover a swatch to see it. Everything is cut to
          0.01ms globally under{" "}
          <code className="font-mono">prefers-reduced-motion: reduce</code> — the
          rule lives in <code className="font-mono">globals.css</code> so no
          component has to remember it.
        </p>
        <ul className="list-none p-0 m-0 space-y-2xs">
          {MOTION.map((m) => (
            <li key={m.token} className="flex flex-wrap items-center gap-sm">
              <span className="font-mono text-meta text-muted w-44 shrink-0">{m.token}</span>
              <span
                className="h-6 w-24 bg-wash border border-rule rounded-sm block
                           transition-colors ease-out hover:bg-wash-strong"
                style={{ transitionDuration: `var(${m.token})` }}
                aria-hidden="true"
              />
              <span className="text-small text-muted">
                {m.ms} — {m.use}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-md font-mono text-meta text-muted">
          --ease-out cubic-bezier(0.2, 0, 0, 1) · --rise 6px
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="focus" title="Focus and states" width="wide" kicker="tab through this section">
        <p className="mb-md" style={{ maxWidth: "var(--measure-prose)" }}>
          A 2px <TokenName>--accent</TokenName> outline at 3px offset, on{" "}
          <code className="font-mono">:focus-visible</code> only. It measures
          7.1:1 on light paper and 6.9:1 on charcoal, well past the 3:1 that
          WCAG 1.4.11 asks of a focus indicator. Nothing in the codebase is
          permitted to remove it without replacing it.
        </p>
        <div className="flex flex-wrap items-center gap-sm">
          <a href="#focus" className="text-accent underline underline-offset-4">
            A link
          </a>
          <button
            type="button"
            className="border border-rule rounded-sm px-sm py-2xs text-small
                       transition-colors duration-fast ease-out hover:border-rule-strong"
          >
            A button
          </button>
          <span className="inline-flex items-center gap-2xs font-mono text-meta text-muted">
            <span
              className="w-2 h-2 rounded-full bg-accent inline-block"
              aria-hidden="true"
            />
            live
          </span>
        </div>
        <p className="mt-md text-small text-muted" style={{ maxWidth: "var(--measure-prose)" }}>
          The status dot is the one decorative use of --accent §5 allows. It is
          never the only signal — the word &ldquo;live&rdquo; sits beside it, so
          the state survives both colour blindness and a monochrome print.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="prose" title="Prose specimen" kicker="measure: 68ch">
        <p>
          This paragraph runs at the prose measure, in Instrument Sans at 17px
          with 1.65 leading, which is the setting the case studies in §8 will
          use. It is here so the review can judge the reading experience rather
          than a colour grid — the type is most of the design, and a token table
          does not show whether a 500-word case study is comfortable to read.
        </p>
        <p className="mt-md">
          Inline technical material sits in <code className="font-mono">--font-mono</code>{" "}
          at 0.92em, because JetBrains Mono runs optically large next to
          Instrument Sans and matching the sizes exactly makes code look
          shouted. A file path reads{" "}
          <code className="font-mono">recorder/scripts/vendor-injected.mjs</code>,
          and a link reads <a href="#prose" className="text-accent underline underline-offset-4">like this</a>.
        </p>
        <figure className="mt-lg m-0">
          <pre className="bg-wash border border-rule rounded-sm p-sm overflow-x-auto text-small">
            <code>{`"@workflow-studio/core": "link:../workflow-studio/packages/core"`}</code>
          </pre>
          <figcaption className="font-mono text-meta text-muted mt-2xs">
            tradesense/package.json:21
          </figcaption>
        </figure>
        <p className="mt-md text-small text-muted">
          (The quoted-artefact treatment §5 check 9 asks for — a verbatim line in
          mono, credited to its path. The block scrolls on its own rather than
          letting the page scroll sideways.)
        </p>
      </Section>

      <Container width="wide" as="footer">
        <p className="py-xl font-mono text-meta text-muted border-t border-rule">
          noindex · not shipped · delete before P5
        </p>
      </Container>
    </PageShell>
  );
}
