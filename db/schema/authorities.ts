import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { auditColumns, idColumn, softDeleteColumn } from '@/db/schema/_helpers';
import { evidenceLevelEnum } from '@/db/schema/enums';

/**
 * Authority — a body whose word counts (DGCA, BCAS, CBIC, Passport Seva, RBI,
 * embassy, airline, airport, ICAO/IATA). Provenance starts here.
 */
export const authorities = pgTable(
  'authorities',
  {
    ...idColumn,
    code: text('code').notNull(),
    name: text('name').notNull(),
    /** null = international / not country-specific. */
    jurisdictionCountry: text('jurisdiction_country'),
    websiteUrl: text('website_url'),
    /** Evidence tier this authority's sources default to. */
    defaultEvidenceLevel: evidenceLevelEnum('default_evidence_level').notNull(),
    description: text('description'),
    ...auditColumns,
    ...softDeleteColumn,
  },
  (t) => [
    uniqueIndex('authorities_code_uniq').on(t.code),
    index('authorities_jurisdiction_idx').on(t.jurisdictionCountry),
  ],
);
