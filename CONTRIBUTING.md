# Contributing to YourTravelGuide

Everything here serves the **Product Constitution**. When a coding choice and a
deadline conflict, the Constitution wins. When in doubt, re-read it.

## Engineering principles (the short version)

1. **One fact, one home.** Never hardcode or duplicate an atomic fact.
2. **One fact, one owner.** Every fact traces to a single authority.
3. **Truth is normalized; delivery is projected.** Pages/tools/search/AI are views.
4. **Trust travels with the fact.** Source + verified date flow into every surface.
5. **Fail closed.** No verified value → refuse or stay silent, never guess.
6. **Simple beats clever.** The smallest thing that works, every time.

## Workflow

### Branching

- `main` — always releasable; protected; deploys to production via Vercel.
- `feat/<scope>-<short-desc>` · `fix/<scope>-<short-desc>` · `chore/...` — short-lived.
- Open a PR early; keep it small and single-purpose.

### Commits

[Conventional Commits](https://www.conventionalcommits.org), enforced by commitlint:

```
type(scope): subject
# e.g. feat(knowledge): add claim resolver
```

Types: `feat fix docs style refactor perf test build ci chore revert`.

### Before you push

```bash
pnpm check   # typecheck + lint + format + unit tests
```

Husky runs `lint-staged` on commit and validates the commit message. Do not bypass
hooks (`--no-verify`) — fix the underlying issue.

### Pull requests

- Fill in the PR template, including the checklist.
- CI (lint, typecheck, format, unit, build, e2e) must be green.
- At least one CODEOWNER review for protected paths.
- Squash-merge; the squash title must be a valid Conventional Commit.

## Server vs client

- Default to **Server Components**. Add `'use client'` only when you need state,
  effects, or browser APIs.
- **Never** import server-only modules (`db`, `lib/supabase/server`, server env)
  into a Client Component. `lib/env.ts` throws if server env is read on the client.
- Read public config via `clientEnv`; server secrets via `env` (server only).

## Adding UI

```bash
pnpm dlx shadcn@latest add <component>
```

Components reference design tokens (CSS variables), never raw colours.

## Architecture decisions

Material decisions get an ADR in [`docs/adr`](docs/adr). Copy the template, number
it sequentially, and link it from the PR.
