/**
 * Drizzle schema barrel — the knowledge graph.
 *
 * Layered per the Knowledge Platform Blueprint:
 *   Authority → Source → Evidence → Fact → Claim → {Topic, Journey}
 * with cross-cutting Review + immutable version history.
 *
 * `db/index.ts` and drizzle-kit both consume this single barrel.
 */
export * from '@/db/schema/enums';

// Provenance
export * from '@/db/schema/authorities';
export * from '@/db/schema/sources';
export * from '@/db/schema/evidence';

// Real-world entity references
export * from '@/db/schema/entities';

// Truth
export * from '@/db/schema/facts';

// Decision
export * from '@/db/schema/claims';

// Composition
export * from '@/db/schema/topics';
export * from '@/db/schema/journeys';

// Trust / lifecycle
export * from '@/db/schema/reviews';
