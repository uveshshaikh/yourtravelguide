import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load .env.local for local migration commands (CI injects env directly).
config({ path: '.env.local' });

/**
 * Drizzle Kit — migration tooling configuration.
 *
 * Sprint 1 ships the connection + tooling wiring ONLY. No schema/tables yet
 * (per scope). `db/schema` is an empty barrel; the knowledge-graph schema
 * arrives in a later sprint and will be picked up automatically from here.
 */
export default defineConfig({
  schema: './db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // Migrations run over the DIRECT/session connection (Supabase port 5432),
    // never the transaction pooler (6543): pooler transaction mode can't run
    // DDL + advisory locks reliably. Falls back to DATABASE_URL for local/non-
    // Supabase setups where a single connection string serves both roles.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? '',
  },
  strict: true,
  verbose: true,
});
