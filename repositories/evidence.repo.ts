import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { evidence } from '@/db/schema';
import { createEvidenceSchema, type CreateEvidenceInput } from '@/lib/knowledge/validation';
import { firstOrThrow, type Actor } from '@/repositories/_base';

/** Evidence repository — sourced assertions that back Facts and Claims. */
export const evidenceRepository = {
  async create(input: CreateEvidenceInput, actor?: Actor) {
    const data = createEvidenceSchema.parse(input);
    return firstOrThrow(
      await db
        .insert(evidence)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'evidence',
    );
  },

  async getById(id: string) {
    return db.query.evidence.findFirst({
      where: and(eq(evidence.id, id), isNull(evidence.deletedAt)),
    });
  },

  async listBySource(sourceId: string) {
    return db.query.evidence.findMany({
      where: and(eq(evidence.sourceId, sourceId), isNull(evidence.deletedAt)),
    });
  },
};
