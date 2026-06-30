# YourTravelGuide

A **Travel Decision Platform** for Indian travellers — source-verified answers that
reduce confusion and anxiety before, during, and after every trip. Not a blog, not
an affiliate site, not an SEO site.

> The product is governed by the **Product Constitution** and the locked planning
> docs (Phase 1 Architecture, Phase 2 Research, Knowledge Platform Blueprint).
> Engineering decisions are recorded as ADRs in [`docs/adr`](docs/adr).

## Tech stack

| Concern         | Choice                                  |
| --------------- | --------------------------------------- |
| Framework       | Next.js (App Router)                    |
| Language        | TypeScript (strict)                     |
| Database        | Supabase PostgreSQL                     |
| ORM             | Drizzle ORM                             |
| Auth            | Supabase Auth (`@supabase/ssr`)         |
| Validation      | Zod                                     |
| Data fetching   | React Query + Server Components         |
| Styling / UI    | Tailwind CSS v4 · shadcn/ui · Lucide    |
| Testing         | Vitest (unit) · Playwright (e2e)        |
| Tooling         | ESLint · Prettier · Husky · lint-staged |
| Hosting         | Vercel                                  |
| Package manager | pnpm                                    |

## Getting started

```bash
corepack enable pnpm        # activate pnpm via the version pinned in package.json
pnpm install
cp .env.example .env.local  # then fill in real values
pnpm dev                    # http://localhost:3000
```

The app **fails fast** if `.env.local` is missing or malformed — environment is
validated by [`lib/env.ts`](lib/env.ts) at boot.

## Scripts

| Command            | Purpose                                |
| ------------------ | -------------------------------------- |
| `pnpm dev`         | Start the dev server                   |
| `pnpm build`       | Production build                       |
| `pnpm check`       | typecheck + lint + format + unit tests |
| `pnpm test`        | Unit tests (Vitest)                    |
| `pnpm test:e2e`    | End-to-end tests (Playwright)          |
| `pnpm db:generate` | Generate Drizzle migrations            |
| `pnpm db:migrate`  | Apply migrations                       |

## Repository layout

```
app/            Routing layer ONLY (layouts, pages, route handlers) — thin.
features/       Self-contained vertical feature slices (no cross-feature imports).
components/     Shared UI. `ui/` = shadcn primitives.
services/       Business logic / orchestration (the Resolver lives here).
repositories/   The only layer that talks to the database.
db/             Drizzle client + schema (empty in Sprint 1).
lib/            Framework-agnostic utilities (env, logger, errors, supabase).
config/         Site metadata, feature flags.
providers/      Global React context providers.
hooks/          Shared client hooks.
types/          Shared primitive types.
emails/         Transactional email templates.
tests/          Test setup + Playwright e2e (unit tests are colocated).
docs/           Plan docs, ADRs, engineering guides.
legacy/         The previous Pages Router site, preserved for content migration.
```

Each structural folder has a `README.md` explaining its boundaries.

## The `legacy/` folder

The prior production site (Pages Router) is preserved under `legacy/` with full git
history. Its verified content (DGCA/BCAS/CBIC facts) is migrated into the knowledge
graph in a later sprint — no verified work is discarded.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All work follows Conventional Commits and
must pass `pnpm check`. Production code on `main` is protected by CI.

## License

MIT
