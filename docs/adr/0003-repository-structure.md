# 3. Layered repository structure

- **Status:** Accepted
- **Date:** 2026-06-30

## Context

The Knowledge Platform Blueprint mandates a strict separation: normalized truth, a
single Resolver, and disposable projections. The folder structure must make that
separation physical so it cannot erode under deadline pressure.

## Decision

A layered structure with enforced dependency direction:

```
app / features   (delivery)        →  may use services, components, lib, config
services         (business)        →  may use repositories, lib
repositories     (data access)     →  may use db, lib
db               (driver + schema) →  may use lib/env
lib / config / types               (foundation, depend on nothing app-specific)
```

Rules enforced socially (review) and partly mechanically (ESLint
`no-restricted-imports` blocks deep relative paths; the `@/` alias is mandatory):

- `app/` is a thin routing layer — no business logic.
- Only `repositories/` touch `db/`.
- `features/` never import other `features/`.
- Client Components never import server-only modules.

## Consequences

- The Resolver and data access can be tested without a framework.
- Schema/store changes stay behind the repository boundary.
- Slightly more indirection than a flat structure — deliberate, and worth it at scale.
- The previous Pages Router app is quarantined in `legacy/` (lint/test/build ignore it)
  pending content migration, so it neither blocks CI nor pollutes the new structure.
