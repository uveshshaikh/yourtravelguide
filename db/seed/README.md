# Seed infrastructure

Framework only (Sprint 2). No travel data is seeded here.

- `index.ts` defines the `Seeder` contract and an ordered runner.
- Seeders must be **idempotent** (safe to re-run) and registered in `SEEDERS` in
  dependency order (authorities → entities → sources → evidence → …).
- Real reference-data seeders arrive in a later sprint; they compose the same
  repositories the app uses, so seeded data passes the same validation and
  trust rules as production writes.
