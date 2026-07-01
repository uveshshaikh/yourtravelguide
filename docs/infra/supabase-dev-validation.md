# Supabase dev validation — Sprint 2 Knowledge Core

How to reproduce the infrastructure validation that proved the Sprint-2 knowledge
core works on real Supabase PostgreSQL before Sprint 3. This is validation
tooling/documentation only — it changes no schema or repository logic.

## Connection model (two roles, two connections)

| Env var        | Supabase connection            | Port | Used by                                             |
| -------------- | ------------------------------ | ---- | --------------------------------------------------- |
| `DATABASE_URL` | Transaction pooler (Supavisor) | 6543 | App runtime (`db/index.ts`, `prepare:false, max:1`) |
| `DIRECT_URL`   | Session pooler                 | 5432 | Migrations (`drizzle.config.ts`)                    |

Migrations must use `DIRECT_URL` — transaction-mode pooling (6543) can't run DDL +
advisory locks reliably. `drizzle.config.ts` prefers `DIRECT_URL`, falling back to
`DATABASE_URL` for local single-connection setups.

Gotchas confirmed during validation:

- `NEXT_PUBLIC_SUPABASE_URL` must be the **bare** project origin (no `/rest/v1/`).
- URL-encode special characters in the DB password (`@` → `%40`, etc.).
- Use the **session pooler** string for `DIRECT_URL` (the `db.<ref>.supabase.co`
  direct host is IPv6-only and typically fails from IPv4 networks).

## Reproduce

```bash
# 1. Configure .env.local (see .env.example) with dev-project credentials.
# 2. Apply the migration (uses DIRECT_URL / 5432):
pnpm db:migrate
# 3. Run the repository integration tests against the real database:
RUN_SUPABASE_IT=1 pnpm exec vitest run tests/integration/knowledge-repositories.supabase.test.ts
```

The Supabase suite is **gated** on `RUN_SUPABASE_IT=1`, so normal `pnpm test` /
CI stays on the offline pglite suite. It **truncates all `public` tables before
and after** so the dev database is left clean; it never touches the `drizzle`
migration journal.

## Validated outcome (dev project, PostgreSQL 17.6, ap-south-1)

- Schema: 24/24 tables, 20/20 enums — exact match, zero drift.
- Constraints: partial-unique single-home index, 2 GIN scope indexes, 21 FKs.
- Repositories: create / read / update / soft-delete / version history / scope +
  claim + evidence resolution / review scheduling / transactions / contracts — all
  pass on real Postgres.
- Security: `postgres` role is not a raw superuser; RLS role trio
  (`anon`/`authenticated`/`service_role`) present → RLS-ready; RLS/policies at 0
  (production RLS intentionally deferred).
- Performance: resolver hot query is index-backed; ~15ms base round-trip.

## Deferred to production hardening (not done here)

- Enable RLS + policies; connect the app via a least-privilege role (not `postgres`).
- Rotate dev credentials before production; never reuse the dev DB password.
