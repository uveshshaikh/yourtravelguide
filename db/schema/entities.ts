import { pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { auditColumns, idColumn, softDeleteColumn } from '@/db/schema/_helpers';

/**
 * Real-world entity reference tables. These are the *nouns* facts and claims
 * attach to and that Scope references. They are intentionally thin — behaviour
 * lives in Claims (Blueprint Part 2). Codes are the stable join keys used in
 * claim Scope arrays.
 */

export const countries = pgTable(
  'countries',
  {
    ...idColumn,
    /** ISO 3166-1 alpha-2, e.g. "IN", "AE". */
    code: text('code').notNull(),
    name: text('name').notNull(),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [uniqueIndex('countries_code_uniq').on(t.code)],
);

export const airlines = pgTable(
  'airlines',
  {
    ...idColumn,
    /** IATA code, e.g. "6E" (IndiGo), "AI" (Air India). */
    code: text('code').notNull(),
    name: text('name').notNull(),
    countryCode: text('country_code'),
    websiteUrl: text('website_url'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [uniqueIndex('airlines_code_uniq').on(t.code)],
);

export const airports = pgTable(
  'airports',
  {
    ...idColumn,
    /** IATA code, e.g. "DEL", "BOM". */
    code: text('code').notNull(),
    name: text('name').notNull(),
    /** City + country directly answer "where is this airport / which terminal". */
    city: text('city'),
    countryCode: text('country_code'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [uniqueIndex('airports_code_uniq').on(t.code)],
);

export const documents = pgTable(
  'documents',
  {
    ...idColumn,
    /** e.g. "passport", "aadhaar", "oci-card". */
    code: text('code').notNull(),
    name: text('name').notNull(),
    category: text('category'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [uniqueIndex('documents_code_uniq').on(t.code)],
);

export const travelItems = pgTable(
  'travel_items',
  {
    ...idColumn,
    /** e.g. "power-bank", "ghee", "razor". */
    code: text('code').notNull(),
    name: text('name').notNull(),
    category: text('category'),
    /** Search synonyms — feeds the alias layer, not authoritative. */
    aliases: text('aliases').array(),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [uniqueIndex('travel_items_code_uniq').on(t.code)],
);

export const travellerProfiles = pgTable(
  'traveller_profiles',
  {
    ...idColumn,
    /** e.g. "medical", "infant", "unaccompanied-minor", "senior". */
    code: text('code').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [uniqueIndex('traveller_profiles_code_uniq').on(t.code)],
);
