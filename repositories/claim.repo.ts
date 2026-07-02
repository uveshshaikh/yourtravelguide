import { and, eq, inArray, isNull, lte } from 'drizzle-orm';
import { db } from '@/db';
import {
  authorities,
  claimEvidence,
  claimExceptions,
  claimFacts,
  claimVersions,
  claims,
  evidence,
  sources,
} from '@/db/schema';
import { AppError } from '@/lib/errors';
import { deriveConfidence } from '@/lib/knowledge/confidence';
import { highestEvidence, isFactualTier } from '@/lib/knowledge/evidence';
import { resolve, type Scope, type TravelContext } from '@/lib/knowledge/scope';
import { computeReviewDue } from '@/lib/knowledge/volatility';
import {
  createClaimExceptionSchema,
  createClaimSchema,
  type CreateClaimExceptionInput,
  type CreateClaimInput,
} from '@/lib/knowledge/validation';
import { entityRepository } from '@/repositories/entity.repo';
import { firstOrThrow, type Actor } from '@/repositories/_base';
import type { EvidenceLevel } from '@/lib/knowledge/types';

type ClaimRow = typeof claims.$inferSelect;

/** Map a claim row's scope columns to a domain Scope value object. */
function scopeFromRow(row: ClaimRow): Scope {
  return {
    origin: row.scopeOrigin,
    destination: row.scopeDestination,
    transit: row.scopeTransit,
    travelType: row.scopeTravelType,
    carriage: row.scopeCarriage,
    airline: row.scopeAirlines,
    airport: row.scopeAirports,
    profile: row.scopeProfiles,
    validFrom: row.validFrom,
    validUntil: row.validUntil,
  };
}

/**
 * Claim repository — the decision layer. Airline/airport/country "policies" and
 * item "rules" are all Claims (one decision model). `resolveForContext` is the
 * shared resolution primitive every surface consumes (Blueprint Part 4).
 */
export const claimRepository = {
  async record(input: CreateClaimInput, actor?: Actor) {
    const data = createClaimSchema.parse(input);

    if (!(await entityRepository.exists(data.subjectType, data.subjectCode))) {
      throw AppError.validation(
        `Unknown ${data.subjectType} "${data.subjectCode}" — create the entity first.`,
      );
    }

    const evidenceRows = await db.query.evidence.findMany({
      where: and(inArray(evidence.id, data.evidenceIds), isNull(evidence.deletedAt)),
      columns: { id: true, evidenceLevel: true },
    });
    if (evidenceRows.length !== data.evidenceIds.length) {
      throw AppError.validation('One or more cited evidence records do not exist.');
    }
    const evidenceLevel = highestEvidence(evidenceRows.map((e): EvidenceLevel => e.evidenceLevel));
    if (evidenceLevel === null || !isFactualTier(evidenceLevel)) {
      throw AppError.validation('A verdict must cite factual-tier evidence (tiers 1–5).');
    }

    const scope = data.scope ?? {};
    const lastVerifiedAt = data.lastVerifiedAt ?? null;
    const volatility = data.volatility ?? 'medium';
    const confidence = deriveConfidence(evidenceLevel, lastVerifiedAt);
    const reviewDue = lastVerifiedAt ? computeReviewDue(lastVerifiedAt, volatility) : null;

    return db.transaction(async (tx) => {
      const claim = firstOrThrow(
        await tx
          .insert(claims)
          .values({
            subjectType: data.subjectType,
            subjectCode: data.subjectCode,
            question: data.question,
            verdict: data.verdict,
            resolverDimensions: data.resolverDimensions ?? null,
            validity: data.validity ?? 'stable',
            summary: data.summary,
            conditions: data.conditions ?? null,
            scopeOrigin: scope.origin ?? null,
            scopeDestination: scope.destination ?? null,
            scopeTransit: scope.transit ?? null,
            scopeTravelType: scope.travelType ?? null,
            scopeCarriage: scope.carriage ?? null,
            scopeAirlines: scope.airline ?? null,
            scopeAirports: scope.airport ?? null,
            scopeProfiles: scope.profile ?? null,
            validFrom: scope.validFrom ?? null,
            validUntil: scope.validUntil ?? null,
            ownerAuthorityId: data.ownerAuthorityId,
            evidenceLevel,
            confidence,
            volatility,
            riskLevel: data.riskLevel ?? 'medium',
            lastVerifiedAt,
            reviewDue,
            state: 'draft',
            currentVersion: 1,
            createdBy: actor,
            updatedBy: actor,
          })
          .returning(),
        'claim',
      );

      await tx
        .insert(claimEvidence)
        .values(data.evidenceIds.map((evidenceId) => ({ claimId: claim.id, evidenceId })));

      if (data.factIds && data.factIds.length > 0) {
        await tx
          .insert(claimFacts)
          .values(data.factIds.map((factId) => ({ claimId: claim.id, factId })));
      }

      await tx.insert(claimVersions).values({
        claimId: claim.id,
        version: 1,
        verdict: claim.verdict,
        validity: claim.validity,
        summary: claim.summary,
        conditions: claim.conditions,
        evidenceLevel,
        confidence,
        verifiedAt: lastVerifiedAt,
        changeReason: 'initial',
        createdBy: actor,
      });

      return claim;
    });
  },

  /** All published, live claims about a subject (the pool for resolution). */
  async findPublishedForSubject(subjectType: CreateClaimInput['subjectType'], subjectCode: string) {
    return db.query.claims.findMany({
      where: and(
        eq(claims.subjectType, subjectType),
        eq(claims.subjectCode, subjectCode),
        eq(claims.state, 'published'),
        isNull(claims.deletedAt),
      ),
    });
  },

  /**
   * Resolve the applicable claims for a traveller context, best-first
   * (most-specific-wins, then highest evidence). The first result is the answer;
   * the rest form the basis for a "depends on…" presentation. The one method
   * web, search, AI, tools, and APIs all call.
   */
  async resolveForContext(
    subjectType: CreateClaimInput['subjectType'],
    subjectCode: string,
    context: TravelContext,
  ): Promise<ClaimRow[]> {
    const pool = await this.findPublishedForSubject(subjectType, subjectCode);
    const withScope = pool.map((row) => ({ ...row, scope: scopeFromRow(row) }));
    return resolve(withScope, context);
  },

  async getById(id: string) {
    return db.query.claims.findFirst({
      where: and(eq(claims.id, id), isNull(claims.deletedAt)),
    });
  },

  async listDueForReview(asOf: Date = new Date()) {
    return db.query.claims.findMany({
      where: and(lte(claims.reviewDue, asOf), isNull(claims.deletedAt)),
    });
  },

  async history(claimId: string) {
    return db.query.claimVersions.findMany({
      where: eq(claimVersions.claimId, claimId),
      orderBy: (v, { desc }) => [desc(v.version)],
    });
  },

  /** Attach a profile-specific exception (overlay, not a duplicated claim). */
  async addException(input: CreateClaimExceptionInput, actor?: Actor) {
    const data = createClaimExceptionSchema.parse(input);
    return firstOrThrow(
      await db
        .insert(claimExceptions)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'claim exception',
    );
  },

  /**
   * Revise a published claim's answer in place (verdict / summary / conditions),
   * appending a new immutable version. Used when the content registry changes the
   * wording or polarity of an existing answer — history is preserved (Rule: keep
   * version history from day one).
   */
  async revise(
    id: string,
    input: {
      verdict: CreateClaimInput['verdict'];
      summary: string;
      conditions?: CreateClaimInput['conditions'];
      lastVerifiedAt?: Date | null;
    },
    actor?: Actor,
  ) {
    const existing = await this.getById(id);
    if (!existing) throw AppError.notFound('Claim not found.');
    const nextVersion = existing.currentVersion + 1;
    const lastVerifiedAt = input.lastVerifiedAt ?? existing.lastVerifiedAt;
    const conditions = input.conditions ?? existing.conditions ?? null;

    return db.transaction(async (tx) => {
      const updated = firstOrThrow(
        await tx
          .update(claims)
          .set({
            verdict: input.verdict,
            summary: input.summary,
            conditions,
            lastVerifiedAt,
            currentVersion: nextVersion,
            updatedBy: actor,
            updatedAt: new Date(),
          })
          .where(and(eq(claims.id, id), isNull(claims.deletedAt)))
          .returning(),
        'claim',
      );
      await tx.insert(claimVersions).values({
        claimId: id,
        version: nextVersion,
        verdict: updated.verdict,
        validity: updated.validity,
        summary: updated.summary,
        conditions,
        evidenceLevel: updated.evidenceLevel,
        confidence: updated.confidence,
        verifiedAt: lastVerifiedAt,
        changeReason: 'content revision',
        createdBy: actor,
      });
      return updated;
    });
  },

  /** Transition a claim to `published` so it enters the resolution pool. */
  async publish(id: string, actor?: Actor) {
    return firstOrThrow(
      await db
        .update(claims)
        .set({ state: 'published', updatedBy: actor, updatedAt: new Date() })
        .where(and(eq(claims.id, id), isNull(claims.deletedAt)))
        .returning(),
      'claim',
    );
  },

  async retire(id: string, actor?: Actor) {
    return firstOrThrow(
      await db
        .update(claims)
        .set({ state: 'retired', deletedAt: new Date(), updatedBy: actor, updatedAt: new Date() })
        .where(and(eq(claims.id, id), isNull(claims.deletedAt)))
        .returning(),
      'claim',
    );
  },

  /** Cited evidence for a claim, joined to its source + owning authority. */
  async evidenceWithSource(claimId: string) {
    return db
      .select({
        evidenceId: evidence.id,
        evidenceLevel: evidence.evidenceLevel,
        sourceId: sources.id,
        sourceTitle: sources.title,
        sourceUrl: sources.url,
        publishedAt: sources.publishedAt,
        archivedUrl: sources.archivedUrl,
        authorityName: authorities.name,
        authorityCode: authorities.code,
      })
      .from(claimEvidence)
      .innerJoin(evidence, eq(claimEvidence.evidenceId, evidence.id))
      .innerJoin(sources, eq(evidence.sourceId, sources.id))
      .innerJoin(authorities, eq(sources.authorityId, authorities.id))
      .where(and(eq(claimEvidence.claimId, claimId), isNull(evidence.deletedAt)));
  },

  /** Profile-specific exceptions attached to a claim. */
  async exceptions(claimId: string) {
    return db.query.claimExceptions.findMany({
      where: and(eq(claimExceptions.claimId, claimId), isNull(claimExceptions.deletedAt)),
    });
  },
};
