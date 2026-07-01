import 'dotenv/config';

/**
 * Seed framework — INFRASTRUCTURE ONLY (Sprint 2 scope: no travel data).
 *
 * Defines the ordered, idempotent seeder contract. Real seeders (reference
 * entities, authorities) are added in a later sprint and registered in `SEEDERS`
 * in dependency order. Each seeder MUST be idempotent (safe to re-run) so seeding
 * is repeatable across environments.
 */
export interface Seeder {
  readonly name: string;
  run(): Promise<void>;
}

/** Registered seeders, executed in array order (respect dependencies). */
export const SEEDERS: readonly Seeder[] = [];

export async function runSeeders(seeders: readonly Seeder[] = SEEDERS): Promise<void> {
  for (const seeder of seeders) {
    console.log(`[seed] running: ${seeder.name}`);
    await seeder.run();
  }
  console.log(`[seed] complete (${seeders.length} seeders)`);
}

// Allow `tsx db/seed/index.ts` as a script entry point.
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeeders().catch((error) => {
    console.error('[seed] failed', error);
    process.exit(1);
  });
}
