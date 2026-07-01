/**
 * Repository barrel — the ONLY layer that talks to the database.
 * Services and (later) route handlers import repositories from here; nothing
 * else touches Drizzle. Each repository exposes business concepts (record,
 * resolveForContext, listDueForReview), never raw query builders (Rule 6).
 */
export { authorityRepository } from '@/repositories/authority.repo';
export { sourceRepository } from '@/repositories/source.repo';
export { evidenceRepository } from '@/repositories/evidence.repo';
export { entityRepository } from '@/repositories/entity.repo';
export { factRepository } from '@/repositories/fact.repo';
export { claimRepository } from '@/repositories/claim.repo';
export { topicRepository } from '@/repositories/topic.repo';
export { journeyRepository } from '@/repositories/journey.repo';
export { reviewRepository } from '@/repositories/review.repo';
