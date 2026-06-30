# `repositories/` — data access layer

The **only** layer that talks to the database (`db/`). Repositories expose
intention-revealing methods (e.g. `getClaimsForItem(...)`) and hide Drizzle query
details. Services call repositories; nothing else does.

**Why this boundary exists**

- It keeps SQL/ORM concerns out of business logic, so the schema can evolve
  without rewriting services.
- It is the seam where caching, read-replicas, or a different store can be
  introduced later with zero change to callers (Blueprint: "Projections are
  disposable; adapters are swappable").

Empty in Sprint 1 — no schema exists yet.
