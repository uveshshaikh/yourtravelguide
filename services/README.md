# `services/` — application / business logic

Framework-agnostic logic that orchestrates repositories and enforces rules.
This is where the **Resolver** (Knowledge Platform Blueprint, Part 4) will live:
the one place that, given a traveller context, resolves the applicable Claims +
Facts + trust metadata that every surface (web, search, AI, tools, API) consumes.

**Rules**

- Services depend on `repositories/` (data access) and `lib/`, never on React,
  `app/`, or `features/`. They are callable from a route handler, a tool, a CLI
  script, or a test with no framework wiring.
- Services throw `AppError` (see `lib/errors.ts`) for expected failures.

Empty in Sprint 1.
