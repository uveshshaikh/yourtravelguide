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
    url: process.env.DATABASE_URL ?? '',
  },
  strict: true,
  verbose: true,
});
