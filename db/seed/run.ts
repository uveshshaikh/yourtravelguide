import { seedContent } from '@/db/seed/seed-content';
import { seedPowerBank } from '@/db/seed/power-bank';

/** Entry point for `pnpm db:seed` — seeds the full verified-question catalog. */
async function main() {
  const powerBank = await seedPowerBank();
  const content = await seedContent();
  console.log('[seed] power-bank:', powerBank);
  console.log('[seed] content:', content);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('[seed] failed:', error);
    process.exit(1);
  });
