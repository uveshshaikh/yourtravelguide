# 4. Knowledge model design

- **Status:** Accepted
- **Date:** 2026-06-30

## Context

Sprint 2 implements the reusable truth layer from the Knowledge Platform
Blueprint. The model must still hold at 250 countries, 500 airlines, 2,000
airports, 100,000 claims, and millions of users — and power web, search, AI, and
future APIs without redesign.

## Decision

**Layering.** Authority → Source → Evidence → Fact → Claim → {Topic, Journey},
with cross-cutting Review and immutable version history. One decision unit
(`Claim`) models item rules _and_ airline/airport/country policies — not three
systems.

**Single home for truth (Rule 2).** A Fact exists once, enforced by a partial
unique index on `(subject_type, subject_code, key) WHERE deleted_at IS NULL`.

**Trust is derived, never entered (Rule 2).** A Fact/Claim `evidence_level` is
the highest tier of its linked Evidence, computed in the repository; `confidence`
is derived from tier × verification recency; `review_due` from volatility. None
are free inputs — the create APIs take `evidenceIds`, not a tier. This makes it
structurally impossible for a node's stated trust to diverge from its evidence.
`evidence_level`/`confidence` on the node are a denormalised cache of the linked
evidence (for query/sort at 100k-claim scale), not a second source of truth.

**Clear ownership (Rule 3).** Every Fact and Claim has a required
`owner_authority_id`. Sources/Evidence inherit ownership via their Authority.
Topics deliberately have **no** owning authority — a _question_ has no regulator;
its authority is its Claims', and its editorial maintenance is tracked via
`reviews`.

**Referential integrity for polymorphic subjects (Rule 3).** Facts/Claims
reference their subject by `(subject_type, subject_code)`, which no single FK can
constrain. Repositories call `entityRepository.exists()` before writing, so a
claim can never point at a non-existent airline/country.

**Codes as join keys (Rule 1).** Scope stores entity _codes_ (IATA/ISO) in
arrays, not FKs, so resolution needs no joins and scales with GIN indexes on
`scope_airlines`/`scope_destination`. Codes are stable natural keys; the surrogate
`id` remains the internal PK.

**Version history from day one (Rule 8).** Facts and Claims — the mutable,
trust-bearing nodes — have append-only `*_versions` tables plus `superseded_by_id`.
Sources and Evidence are immutable-by-convention with `superseded_by_id` for
corrections (a new row, never an in-place edit). Reference entities and Topics are
audited (`created_at`/`updated_at`) and can gain version tables when their change
history becomes a product surface — a conscious tier, not an omission.

**No speculative fields (Rule 7).** Removed `airlines.icao` and `airports.icao`
(IATA suffices today; re-add via reversible migration when a feed needs ICAO).
Removed `topics.owner_authority_id` (see ownership above). Every remaining field
maps to a traveller decision or platform maintenance (see
`docs/architecture/knowledge-relationships.md`).

**Soft delete (Constitution).** Knowledge is never hard-deleted. Retirement =
`state='retired'` + `deleted_at`. Rows and versions remain for audit; repositories
filter `deleted_at IS NULL` by default.

**Repositories expose business concepts (Rule 6).** `record`, `resolveForContext`,
`listDueForReview`, `history`, `retire` — never raw query builders. Repositories
are the only layer touching Drizzle.

## Consequences

- Trust cannot silently drift from evidence; freshness is computed, not trusted.
- Resolution (`claimRepository.resolveForContext`) is the single primitive every
  surface consumes — web, search, AI, tools, API — satisfying Rule 4.
- Adding a country/airline/corridor is pure data: new entity + scoped claims,
  zero schema change (Rule 1).
