# YourTravelGuide.com

YourTravelGuide.com is a **simple, fast, clean information site** that helps users quickly check:
> Is this allowed when I travel (especially flights)?

## Features

- **Search**: Quickly find rules for items like power banks, perfumes, etc.
- **Clear Verdicts**: Green for Allowed, Red for Not Allowed, Amber for Limited.
- **Detailed Rules**: How to comply, why the rule exists, and official sources.
- **Offline Capable**: Static site generation for speed and reliability.
- **Mini Tools**: Quick baggage, liquids, medicines, and passport helpers people share.

## Tech Stack

- **Next.js** (Pages Router)
- **TypeScript**
- **Tailwind CSS**
- **Static Site Generation (SSG)**

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Analytics (optional)

To enable Google Analytics 4 tracking:

1. Create a GA4 property and copy its measurement ID (format `G-XXXXXXX`).
2. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX` to `.env.local` (create the file if it does not exist).
3. Restart `npm run dev` so Next.js can pick up the new environment variable.

Without this variable the site simply skips loading the GA scripts.

## Adding New Rules

Add new rule objects to `data/rules.ts`. The site will automatically generate the new pages at build time.

> ✍️ **Content quality matters.** Before drafting any page, read `docs/content-guidelines.md` for the AdSense + SEO checklist (original writing, E-A-T footer, FAQs, internal links, etc.).

## SEO Rollout Plan

| Tier | Topics Range | Focus | Action Plan |
| --- | --- | --- | --- |
| Tier 1 | 1–10 | Highest-volume, urgent searches (battery rules, liquids, IDs, baggage) | Launch 10–15 Tier 1 rule pages first to capture immediate traffic spikes. |
| Tier 2 | 11–20 | Still high volume yet less urgent (medical aids, food specifics, customs staples) | Add 5–10 Tier 2 rules each month to sustain steady growth. |
| Tier 3 | 21–35 | Broader evergreen queries (documents, packing hacks, duty-free nuances) | Schedule in quarterly batches once Tier 1/2 are live. |
| Tier 4 | 36–50 | Complementary, nice-to-have guidance (pet nuances, niche tools) | Fill gaps during maintenance cycles or alongside product updates. |

Following this order keeps publishing aligned with search demand and supports scaling to millions of visitors over time.

## Tier Mapping & Progress

Track rule creation by tier. Check items off only after the corresponding page is live and searchable.

### Tier 1 — Highest Priority (urgent, high search)
- [x] Power bank in flight (`power-bank-in-flight`)
- [x] Laptop in cabin / checked baggage (`laptops-electronics`)
- [x] Mobile phone in check-in (`mobile-phone-in-check-in`)
- [x] Camera (DSLR) & lenses (`camera-dslr-in-flight`)
- [x] Perfume & deodorant (`perfume-in-flight`)
- [x] Sanitizer (`sanitizer-in-flight`)
- [x] Medicines with/without prescription (`medicines-in-flight`)
- [x] Fruits (mangoes etc.) (`food-and-snacks-in-flight` covers fruits segment)
- [x] Water bottle at airport/security (`water-bottle-airport`)
- [x] Razor / shaving items (`razor-cartridge-vs-blade`)
- [ ] Smart baggage (removable battery focus) (`smart-baggage-removable-battery`)
- [ ] Drone batteries & carrying rules (`drone-batteries-flight`)
- [ ] Multiple phones / laptops limit (`multiple-devices-limit-flight`)
- [ ] Hand tools (screwdriver, hammer deep-dive) (`hand-tools-kit-flight`)
- [ ] Vapes / e-cigarettes in flight (`vapes-e-cigarettes-flight`)
- [ ] Duty-free liquids during connecting flights (`duty-free-liquids-connecting-flights`)
- [ ] Gift-wrapped items with scissors/tape (`gift-wrapped-items-security`)
- [ ] Empty vs filled water bottles in cabin (`empty-vs-full-bottle`)
- [ ] Alcohol in cabin vs check-in baggage (`alcohol-cabin-vs-checked`)

### Tier 2 — High Priority
- [x] Dry cells & spare batteries (`dry-cells-spare-batteries`)
- [x] Smart luggage battery rules (`smart-luggage`)
- [x] Bluetooth headphones (`bluetooth-headphones-flight`)
- [x] Shampoo / lotions / liquids (`shampoo-and-lotions`)
- [x] Nail polish / remover (`nail-polish-remover`)
- [x] Asthma inhaler (`asthma-inhaler-flight`)
- [x] Baby food / formula (`baby-food-formula-flight`)
- [x] Homemade food (veg / non-veg) (`food-and-snacks-in-flight`)
- [x] Dry snacks (chips, biscuits) (`food-and-snacks-in-flight`)
- [x] Cigarettes / matchbox / lighter (`cigarettes-tobacco-restrictions`, `matches-lighters`)
- [ ] Security tray removal checklist (`security-tray-checklist`)
- [ ] Fragile baggage packing checklist (`fragile-baggage-checklist`)
- [ ] Battery label requirement explainer (`battery-label-requirement`)
- [ ] Oversized baggage (sports gear + instruments) (`oversized-baggage-sports-music`)
- [ ] Damaged / lost baggage claims (`baggage-claim-damage-lost`)
- [ ] Transit baggage during layovers (`transit-baggage-layovers`)

### Tier 3 — Broad Use
- [x] Scissors size rule (`sharp-objects-in-flight`)
- [x] Hand tools (`hand-tools-flight`)
- [x] Fragile item packing (`fragile-items-packing`)
- [x] Chocolates (`chocolates-on-flight`)
- [x] Tea / coffee powder (`tea-coffee-powder`)
- [x] Alcohol bottle duty-free limits (`duty-free-alcohol-allowance`)
- [x] Gold jewellery limit (`gold-jewellery-limit`)
- [x] Cash limits in travel (`carrying-cash-flight`)
- [ ] Device count limits (multiple phones, laptops) (`multiple-devices-limit-flight`)
- [x] Pets in cabin/cargo (`pets-in-flight`)
- [ ] Transit / connecting flight guide (`transit-connecting-flight-guide`)
- [ ] Security line shortcuts (`security-line-shortcuts`)
- [ ] Food rules before vs after security (`airport-food-before-after-security`)
- [ ] Flight delay / cancellation compensation in India (`flight-delay-compensation-india`)
- [ ] Medical assistance at the airport (`airport-medical-assistance`)
- [ ] Immigration refusal steps (`immigration-refusal-steps`)
- [ ] Lost passport emergency process (`lost-passport-at-airport`)
- [ ] Best seats for comfort / safety / quick exit (`best-aircraft-seats-guide`)
- [ ] Duty-free shopping tips (`duty-free-shopping-tips`)
- [ ] Avoid common airport scams (`airport-scam-avoidance`)
- [ ] Pack liquids to avoid leaks (`packing-liquids-no-leak`)
- [ ] PDF checklists for cabin bag & docs (`travel-checklist-pdf-guides`)

### Tier 4 — Supporting Topics
- [x] ID required for domestic flights (`domestic-id-requirements`)
- [x] Aadhaar picture accepted or not (`aadhaar-digital-id`)
- [x] Printed ticket needed or not (`printed-ticket-needed`)
- [x] Duty-free liquids when returning (`duty-free-liquids-return`)
- [x] Prohibited items customs list (`prohibited-items-customs`)
- [x] Wheelchairs & medical devices (`wheelchairs-walking-sticks`, `cpap-medical-devices`)
- [x] Tickets: digital only? (`digital-boarding-pass`)
- [x] Security tray rules (`electronics-security-tray`, `airport-security-behavior-tips`)
- [x] Passport photocopy valid? (`passport-photocopy-valid`)
- [x] Name mismatch on ticket? (`name-mismatch-flight-ticket`)
- [x] Do kids need ID? (`kids-id-requirement`)
- [x] Passport expiry (6 months) rules (`passport-expiry-validity`)
- [ ] Baby stroller at gate rules
- [ ] Electronics that always trigger security checks (dedicated list)
- [ ] DigiLocker ID acceptance (`digilocker-id-acceptance`)
- [ ] Name mismatch on ticket vs ID (`name-mismatch-id-guidance`)
- [ ] Passport expiry 6-month deep dive (`passport-expiry-six-month-rule`)
- [ ] Minor travel consent letters (`minor-travel-consent-letter`)
- [ ] Passport photocopy policy refresher (`passport-photocopy-policy`)

### Completion Goals

| Tier | Pages | Status |
| --- | --- | --- |
| 1 | 10 pages | Goal: Complete ASAP ✅ |
| 2 | 10 pages | After Tier 1 ✅ |
| 3 | 10 pages | Month 2–3 (in progress – 9/10) |
| 4 | 10 pages | Month 3–4 (in progress – 7/10) |

Total initial launch target: **40 pages**. Traffic goal after Tier 1+2: **300K–1M monthly visits**.

### Content Cadence

| Week | Task |
| --- | --- |
| Week 1 | Publish all Tier 1 pages |
| Week 2 | Publish 5 Tier 2 pages |
| Week 3 | Publish 5 Tier 2 pages |
| Week 4 | Review updates + publish 5 Tier 3 pages |

Repeat the cadence monthly and update the tier checklist whenever a page ships.

## License

MIT


