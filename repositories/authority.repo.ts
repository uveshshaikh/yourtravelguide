import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { authorities } from '@/db/schema';
import { createAuthoritySchema, type CreateAuthorityInput } from '@/lib/knowledge/validation';
import { firstOrThrow, type Actor } from '@/repositories/_base';

/** Authority repository — provenance roots. */
export const authorityRepository = {
  async create(input: CreateAuthorityInput, actor?: Actor) {
    const data = createAuthoritySchema.parse(input);
    return firstOrThrow(
      await db
        .insert(authorities)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'authority',
    );
  },

  async getByCode(code: string) {
    return db.query.authorities.findFirst({
      where: and(eq(authorities.code, code), isNull(authorities.deletedAt)),
    });
  },

  async getById(id: string) {
    return db.query.authorities.findFirst({
      where: and(eq(authorities.id, id), isNull(authorities.deletedAt)),
    });
  },

  async list() {
    return db.query.authorities.findMany({ where: isNull(authorities.deletedAt) });
  },
};
