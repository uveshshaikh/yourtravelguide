import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { sources } from '@/db/schema';
import { createSourceSchema, type CreateSourceInput } from '@/lib/knowledge/validation';
import { firstOrThrow, type Actor } from '@/repositories/_base';

/** Source repository — publications of an Authority, with archival provenance. */
export const sourceRepository = {
  async create(input: CreateSourceInput, actor?: Actor) {
    const data = createSourceSchema.parse(input);
    return firstOrThrow(
      await db
        .insert(sources)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'source',
    );
  },

  async getById(id: string) {
    return db.query.sources.findFirst({
      where: and(eq(sources.id, id), isNull(sources.deletedAt)),
    });
  },

  async listByAuthority(authorityId: string) {
    return db.query.sources.findMany({
      where: and(eq(sources.authorityId, authorityId), isNull(sources.deletedAt)),
    });
  },
};
