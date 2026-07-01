import { and, eq, isNull } from 'drizzle-orm';
import { db } from '@/db';
import {
  airlines,
  airports,
  authorities,
  countries,
  documents,
  travelItems,
  travellerProfiles,
} from '@/db/schema';
import type { EntityType } from '@/lib/knowledge/types';
import { createEntitySchema } from '@/lib/knowledge/validation';
import { firstOrThrow, type Actor } from '@/repositories/_base';

/**
 * Entity reference repository — the real-world nouns claims/facts attach to.
 *
 * `exists()` gives repositories a way to enforce referential integrity for the
 * *polymorphic* subject reference (subjectType + subjectCode), which no single
 * FK can express. Fact/Claim writes call it so a claim can never point at a
 * non-existent airline/country (Rule 3).
 */
export const entityRepository = {
  /** True if an entity of `type` with `code` exists and is live. */
  async exists(type: EntityType, code: string): Promise<boolean> {
    switch (type) {
      case 'country':
        return Boolean(
          await db.query.countries.findFirst({
            where: and(eq(countries.code, code), isNull(countries.deletedAt)),
            columns: { id: true },
          }),
        );
      case 'airline':
        return Boolean(
          await db.query.airlines.findFirst({
            where: and(eq(airlines.code, code), isNull(airlines.deletedAt)),
            columns: { id: true },
          }),
        );
      case 'airport':
        return Boolean(
          await db.query.airports.findFirst({
            where: and(eq(airports.code, code), isNull(airports.deletedAt)),
            columns: { id: true },
          }),
        );
      case 'document':
        return Boolean(
          await db.query.documents.findFirst({
            where: and(eq(documents.code, code), isNull(documents.deletedAt)),
            columns: { id: true },
          }),
        );
      case 'travel_item':
        return Boolean(
          await db.query.travelItems.findFirst({
            where: and(eq(travelItems.code, code), isNull(travelItems.deletedAt)),
            columns: { id: true },
          }),
        );
      case 'traveller_profile':
        return Boolean(
          await db.query.travellerProfiles.findFirst({
            where: and(eq(travellerProfiles.code, code), isNull(travellerProfiles.deletedAt)),
            columns: { id: true },
          }),
        );
      case 'authority':
        return Boolean(
          await db.query.authorities.findFirst({
            where: and(eq(authorities.code, code), isNull(authorities.deletedAt)),
            columns: { id: true },
          }),
        );
    }
  },

  async createCountry(input: { code: string; name: string }, actor?: Actor) {
    const data = createEntitySchema.parse(input);
    return firstOrThrow(
      await db
        .insert(countries)
        .values({ ...data, createdBy: actor, updatedBy: actor })
        .returning(),
      'country',
    );
  },

  async createAirline(
    input: { code: string; name: string; countryCode?: string; websiteUrl?: string },
    actor?: Actor,
  ) {
    const base = createEntitySchema.parse({ code: input.code, name: input.name });
    return firstOrThrow(
      await db
        .insert(airlines)
        .values({
          ...base,
          countryCode: input.countryCode,
          websiteUrl: input.websiteUrl,
          createdBy: actor,
          updatedBy: actor,
        })
        .returning(),
      'airline',
    );
  },

  async createAirport(
    input: { code: string; name: string; city?: string; countryCode?: string },
    actor?: Actor,
  ) {
    const base = createEntitySchema.parse({ code: input.code, name: input.name });
    return firstOrThrow(
      await db
        .insert(airports)
        .values({
          ...base,
          city: input.city,
          countryCode: input.countryCode,
          createdBy: actor,
          updatedBy: actor,
        })
        .returning(),
      'airport',
    );
  },

  async createTravelItem(
    input: { code: string; name: string; category?: string; aliases?: string[] },
    actor?: Actor,
  ) {
    const base = createEntitySchema.parse({ code: input.code, name: input.name });
    return firstOrThrow(
      await db
        .insert(travelItems)
        .values({
          ...base,
          category: input.category,
          aliases: input.aliases,
          createdBy: actor,
          updatedBy: actor,
        })
        .returning(),
      'travel item',
    );
  },

  async createDocument(input: { code: string; name: string; category?: string }, actor?: Actor) {
    const base = createEntitySchema.parse({ code: input.code, name: input.name });
    return firstOrThrow(
      await db
        .insert(documents)
        .values({ ...base, category: input.category, createdBy: actor, updatedBy: actor })
        .returning(),
      'document',
    );
  },

  async createTravellerProfile(
    input: { code: string; name: string; description?: string },
    actor?: Actor,
  ) {
    const base = createEntitySchema.parse({ code: input.code, name: input.name });
    return firstOrThrow(
      await db
        .insert(travellerProfiles)
        .values({ ...base, description: input.description, createdBy: actor, updatedBy: actor })
        .returning(),
      'traveller profile',
    );
  },
};
