# 5. Migrations and reversibility

- **Status:** Accepted
- **Date:** 2026-06-30

## Context

Rule 5 requires every migration to be reversible. Drizzle Kit generates only
forward ("up") SQL from the schema diff; it has no native down-migration.

## Decision

Every generated migration ships with a **hand-written, reviewed companion
`*.down.sql`** in `drizzle/`. The forward file is authored by
`pnpm db:generate`; the down file is written and reviewed in the same PR and must
be proven to restore the prior schema state.

Operational policy:

- **Forward-only in production by default.** Rollbacks are exceptional and run
  from the `*.down.sql` via the documented runbook, never ad hoc.
- **Additive, small migrations.** Prefer additive changes (new nullable column,
  new table) whose reverse is a safe drop. Destructive changes (drop/rename a
  column holding data) require a two-step expand→contract migration so each step
  is independently reversible without data loss.
- **Never edit an applied migration.** A change is a new migration (mirrors the
  model's own append-only principle).
- CI runs `pnpm db:generate --check` (or equivalent) to ensure the committed
  migration matches the schema — no drift.

## Consequences

- Rollback is always defined and reviewed, not improvised.
- The expand→contract rule keeps even destructive evolution reversible at each
  step, protecting a live production database.
- Slightly more authoring effort per migration — accepted for a system meant to
  run for a decade against real traveller-facing data.
