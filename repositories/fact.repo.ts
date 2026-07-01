import { and, eq, inArray, isNull, lte } from 'drizzle-orm';
import { db } from '@/db';
import { evidence, factEvidence, factVersions, facts } from '@/db/schema';
import { AppError } from '@/lib/errors';
import { deriveConfidence } from '@/lib/knowledge/confidence';
import { highestEvidence, isFactualTier } from '@/lib/knowledge/evidence';
import { computeReviewDue } from '@/lib/knowledge/volatility';
import { createFactSchema, type CreateFactInput } from '@/lib/knowledge/validation';
import { entityRepository } from '@/repositories/entity.repo';
import { firstOrThrow, type Actor } from '@/repositories/_base';
import type { EvidenceLevel } from '@/lib/knowledge/types';

/**
 * Fact repository — the atomic truth layer.
 *
 * `record()` is the only way a fact enters. It guarantees the invariants that
 * make a fact trustworthy and single-homed:
 *  - the subject entity exists (Rule 3 integrity for the polymorphic subject),
 *  - it is backed by real, factual-tier Evidence (Rule 2: tier is DERIVED here,
 *    never supplied),
 *  - confidence + review-due are computed, not hand-set,
 *  - an immutable v1 is written alongside the live row (Rule 8).
 * The DB partial-unique index guarantees one live fact per (subject, key).
 */
export const factRepository = {
  async record(input: CreateFactInput, actor?: Actor) {
    const data = createFactSchema.parse(input);

    if (!(await entityRepository.exists(data.subjectType, data.subjectCode))) {
      throw AppError.validation(
        `Unknown ${data.subjectType} "${data.subjectCode}" — create the entity before facts about it.`,
      );
    }

    // Derive the evidence tier from the linked evidence (never trust an input).
    const evidenceRows = await db.query.evidence.findMany({
      where: and(inArray(evidence.id, data.evidenceIds), isNull(evidence.deletedAt)),
      columns: { id: true, evidenceLevel: true },
    });
    if (evidenceRows.length !== data.evidenceIds.length) {
      throw AppError.validation('One or more evidence records do not exist.');
    }
    const levels = evidenceRows.map((e): EvidenceLevel => e.evidenceLevel);
    const evidenceLevel = highestEvidence(levels);
    if (evidenceLevel === null || !isFactualTier(evidenceLevel)) {
      throw AppError.validation(
        'A fact must be established by government/operator/standard evidence (tiers 1–5). ' +
          'Expert/traveller evidence may only supplement.',
      );
    }

    const lastVerifiedAt = data.lastVerifiedAt ?? null;
    const volatility = data.volatility ?? 'medium';
    const confidence = deriveConfidence(evidenceLevel, lastVerifiedAt);
    const reviewDue = lastVerifiedAt ? computeReviewDue(lastVerifiedAt, volatility) : null;

    return db.transaction(async (tx) => {
      const fact = firstOrThrow(
        await tx
          .insert(facts)
          .values({
            subjectType: data.subjectType,
            subjectCode: data.subjectCode,
            key: data.key,
            label: data.label,
            valueType: data.valueType,
            value: data.value,
            unit: data.unit ?? null,
            ownerAuthorityId: data.ownerAuthorityId,
            evidenceLevel,
            confidence,
            volatility,
            lastVerifiedAt,
            reviewDue,
            state: 'draft',
            currentVersion: 1,
            createdBy: actor,
            updatedBy: actor,
          })
          .returning(),
        'fact',
      );

      await tx
        .insert(factEvidence)
        .values(data.evidenceIds.map((evidenceId) => ({ factId: fact.id, evidenceId })));

      await tx.insert(factVersions).values({
        factId: fact.id,
        version: 1,
        valueType: fact.valueType,
        value: fact.value,
        unit: fact.unit,
        evidenceLevel,
        confidence,
        verifiedAt: lastVerifiedAt,
        changeReason: 'initial',
        createdBy: actor,
      });

      return fact;
    });
  },

  /** Single-home lookup — the canonical value for (subject, key). */
  async getBySubjectKey(
    subjectType: CreateFactInput['subjectType'],
    subjectCode: string,
    key: string,
  ) {
    return db.query.facts.findFirst({
      where: and(
        eq(facts.subjectType, subjectType),
        eq(facts.subjectCode, subjectCode),
        eq(facts.key, key),
        isNull(facts.deletedAt),
      ),
    });
  },

  async getById(id: string) {
    return db.query.facts.findFirst({
      where: and(eq(facts.id, id), isNull(facts.deletedAt)),
    });
  },

  /** Facts whose review is due on/before `asOf` — feeds the maintenance queue. */
  async listDueForReview(asOf: Date = new Date()) {
    return db.query.facts.findMany({
      where: and(lte(facts.reviewDue, asOf), isNull(facts.deletedAt)),
    });
  },

  /** Full immutable version history for a fact (newest first). */
  async history(factId: string) {
    return db.query.factVersions.findMany({
      where: eq(factVersions.factId, factId),
      orderBy: (v, { desc }) => [desc(v.version)],
    });
  },

  /**
   * Retire a fact — soft delete + lifecycle state. Knowledge is never hard
   * deleted; the row and its versions remain for audit (Constitution).
   */
  async retire(id: string, actor?: Actor) {
    return firstOrThrow(
      await db
        .update(facts)
        .set({ state: 'retired', deletedAt: new Date(), updatedBy: actor, updatedAt: new Date() })
        .where(and(eq(facts.id, id), isNull(facts.deletedAt)))
        .returning(),
      'fact',
    );
  },
};
