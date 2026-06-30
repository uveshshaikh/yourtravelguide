# 2. Technology stack

- **Status:** Accepted
- **Date:** 2026-06-30

## Context

We need a stack that supports a normalized knowledge graph powering many surfaces
(web, search, AI, tools, API), is type-safe end to end, and is maintainable by a
small team for a decade. Hosting is Vercel; the data store is Supabase.

## Decision

Next.js (App Router) · TypeScript (strict) · Supabase Postgres · Drizzle ORM ·
Supabase Auth via `@supabase/ssr` · Zod · React Query + Server Components ·
Tailwind v4 + shadcn/ui + Lucide · Vitest + Playwright · ESLint + Prettier + Husky ·
pnpm.

Key rationale:

- **App Router + Server Components** keep data resolution on the server, close to the
  knowledge graph, and minimise client JS — aligned with "built for the worst moment".
- **Drizzle** gives type-safe SQL with transparent, reviewable queries (no heavy
  abstraction hiding what runs), and migrations as committed artifacts.
- **Zod** is the single validation language for env, inputs, and (later) fact shapes.
- **pnpm** with non-hoisted modules catches phantom-dependency bugs early.
- **Abstractions over SDKs we don't yet need** (logging, observability) — we add the
  vendor when we use it, behind a stable seam, honouring "avoid unnecessary deps".

## Consequences

- Strict TS + non-hoisted pnpm add minor friction for large correctness gains.
- Supabase couples auth + DB + storage; acceptable for velocity, and the repository
  layer isolates the rest of the app from that coupling.
- Tailwind v4 is CSS-first (theme in `app/globals.css`), so there is no JS Tailwind
  config to maintain.
