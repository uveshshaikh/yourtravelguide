# `features/` — vertical feature slices

Each subfolder is a self-contained feature (e.g. `knowledge/`, `search/`, `tools/`,
`trust/`). A feature owns its components, hooks, server actions, and validation —
everything specific to it — so it can be understood and changed in isolation.

**Rules**

- A feature may import from `lib/`, `components/ui/`, `services/`, `config/`, `types/`.
- A feature must **not** import from another feature directly. Share via `services/`
  or `components/` instead — this keeps features decoupled at 10-year scale.
- Cross-feature data flows through the `services/` layer (the Resolver, etc.),
  never through one feature reaching into another.

Empty in Sprint 1 — the foundation ships no features by design.
