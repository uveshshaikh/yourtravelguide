import { seedPowerBank } from '@/db/seed/power-bank';

/** Entry point for `pnpm db:seed` — seeds the one verified production topic. */
seedPowerBank()
  .then((result) => {
    console.log('[seed] power-bank:', result);
    process.exit(0);
  })
  .catch((error) => {
    console.error('[seed] failed:', error);
    process.exit(1);
  });
