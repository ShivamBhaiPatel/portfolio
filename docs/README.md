# docs

Working documentation for this site. Everything here exists so that a decision
made once does not have to be re-derived — or, worse, quietly reversed by
someone who never knew the reason.

| File | What it holds |
|---|---|
| [`decisions.md`](./decisions.md) | The standing decisions: what was chosen, what was rejected, and why. Read before changing anything structural. |
| [`status-worker.md`](./status-worker.md) | The project status system — the two-layer design, what is built, and the three steps left to switch it on. |
| [`remaining-work.md`](./remaining-work.md) | Outstanding work with enough context to pick it up cold. |

The full specification, review history and content inventory is in
[`../PORTFOLIO_SPEC.md`](../PORTFOLIO_SPEC.md).

> **`PORTFOLIO_SPEC.md` must not be published.** It contains a recruiter's
> salary-band assessment, a candid critique of the site's weaknesses, and notes
> on client relationships. It is fine in a private repository and actively
> harmful in a public one. **If this repository is ever made public, remove or
> relocate that file first.** The same applies to anything quoted from it here.

## Why documentation lives in the repo

Most of the reasoning behind this site was produced in review conversations.
Conversations are not durable: the next person to touch the code — or the next
agent — sees the result and not the argument, and reasonable-looking changes then
undo deliberate ones. That happened several times while this site was being
built, which is the reason these files exist.

The rule: **if a decision would be surprising to someone reading only the code,
it belongs here.**
