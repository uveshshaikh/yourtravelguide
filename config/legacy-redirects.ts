/**
 * Legacy URL → canonical /question/[slug] redirect map.
 *
 * The live production site (yourtravelguide.in) runs a different URL
 * architecture (/airport-rules/cabin-baggage/..., /travel-documents/...,
 * /customs/...) than this codebase (/question/[slug]). Every entry here maps
 * a real, currently-indexed legacy URL to the canonical question that answers
 * the SAME search intent — verified against the legacy site's actual sitemap
 * and, for ambiguous cases, its actual page content (not slug/string
 * similarity alone).
 *
 * Deliberately excludes:
 *  - Legacy URLs with no real equivalent in the Knowledge Core yet (e.g.
 *    bluetooth headphones, CPAP, pets, wheelchairs-as-equipment) — these are
 *    NOT redirected to something unrelated; they 404 until real content
 *    exists. See the migration audit report for the full list.
 *  - Static/legal pages (/about, /privacy-policy, /terms, ...) and
 *    category/hub pages (/airport-rules, /customs, ...) — this codebase has
 *    no indexable equivalent for either today, and their only conceptual
 *    analogue (/search) is itself noindexed, so redirecting to it would
 *    destroy rather than preserve their SEO value. Flagged separately, not
 *    redirected.
 *
 * `consolidated: true` marks a legacy page that covered a broader "umbrella"
 * intent (e.g. a general "sharp objects" page) now served by the single
 * closest specific canonical question, rather than a 1:1 topic match.
 */
export interface LegacyRedirect {
  source: string;
  destination: string;
  consolidated?: true;
}

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  {
    source: '/airport-rules/cabin-baggage/power-bank-in-flight',
    destination: '/question/can-i-carry-a-power-bank-on-a-flight',
  },
  // Not in the live sitemap — caught only by cross-referencing actual Search
  // Console performance data (9 real impressions, 1 real click). A second,
  // shorter URL scheme (/rules/...) exists alongside /airport-rules/... for
  // at least this topic and is still indexed. Without this cross-check it
  // would have silently 404'd after migration despite being a real,
  // currently-clicked page — exactly the risk this phase exists to catch.
  {
    source: '/rules/asthma-inhaler-flight',
    destination: '/question/can-i-carry-an-asthma-inhaler-on-a-flight',
  },
  {
    source: '/rules/sharp-objects-in-flight',
    destination: '/question/can-i-carry-scissors-in-hand-baggage',
    consolidated: true,
  },
  {
    source: '/travel-documents/passport/passport-expiry-validity',
    destination: '/question/how-much-passport-validity-do-i-need-to-travel-abroad',
  },
  {
    source: '/travel-documents/domestic-flight-id/name-mismatch-flight-ticket',
    destination: '/question/can-i-correct-a-name-spelling-mistake-on-my-flight-ticket',
  },
  {
    source: '/airport-rules/cabin-baggage/laptops-electronics',
    destination: '/question/can-i-carry-a-laptop-in-hand-baggage',
  },
  {
    source: '/airport-rules/cabin-baggage/camera-dslr-in-flight',
    destination: '/question/can-i-carry-a-camera-on-a-flight',
  },
  {
    source: '/airport-rules/cabin-baggage/dry-cells-spare-batteries',
    destination: '/question/can-i-carry-spare-batteries-on-a-flight',
  },
  {
    source: '/airport-rules/liquids-aerosols-gels/perfume-in-flight',
    destination: '/question/can-i-carry-perfume-on-a-flight',
  },
  {
    source: '/airport-rules/liquids-aerosols-gels/shampoo-and-lotions',
    destination: '/question/can-i-carry-shampoo-on-a-flight',
  },
  {
    source: '/airport-rules/liquids-aerosols-gels/liquids-over-100ml',
    destination: '/question/how-much-liquid-can-i-carry-in-hand-baggage',
  },
  {
    source: '/airport-rules/liquids-aerosols-gels/hair-oil-ghee-flight',
    destination: '/question/can-i-carry-ghee-on-a-flight',
  },
  {
    source: '/airport-rules/cabin-baggage/medicines-in-flight',
    destination: '/question/can-i-carry-medicines-in-hand-baggage',
  },
  {
    source: '/airport-rules/cabin-baggage/insulin-syringes-flight',
    destination: '/question/can-i-carry-insulin-on-a-flight',
  },
  {
    source: '/airport-rules/cabin-baggage/asthma-inhaler-flight',
    destination: '/question/can-i-carry-an-asthma-inhaler-on-a-flight',
  },
  {
    source: '/airport-rules/cabin-baggage/baby-food-formula-flight',
    destination: '/question/can-i-carry-baby-food-on-a-flight',
  },
  {
    source: '/airport-rules/cabin-baggage/food-and-snacks-in-flight',
    destination: '/question/can-i-carry-food-in-hand-baggage-on-a-domestic-flight',
  },
  {
    source: '/airport-rules/cabin-baggage/chocolates-on-flight',
    destination: '/question/can-i-carry-chocolates-on-a-flight',
  },
  {
    source: '/airport-rules/restricted-items/razor-cartridge-vs-blade',
    destination: '/question/can-i-carry-a-razor-in-hand-baggage',
  },
  {
    source: '/airport-rules/restricted-items/sharp-objects-in-flight',
    destination: '/question/can-i-carry-scissors-in-hand-baggage',
    consolidated: true,
  },
  {
    source: '/airport-rules/restricted-items/knife-zero-tolerance',
    destination: '/question/can-i-carry-a-knife-in-checked-baggage',
  },
  {
    source: '/airport-rules/liquids-aerosols-gels/aerosol-cans',
    destination: '/question/can-i-carry-deodorant-on-a-flight',
    consolidated: true,
  },
  {
    source: '/airport-rules/restricted-items/matches-lighters',
    destination: '/question/can-i-carry-a-lighter-on-a-flight',
  },
  {
    source: '/travel-documents/domestic-flight-id/domestic-id-requirements',
    destination: '/question/what-id-do-i-need-for-a-domestic-flight-in-india',
  },
  {
    source: '/travel-documents/domestic-flight-id/aadhaar-digital-id',
    destination: '/question/can-i-use-digital-aadhaar-as-id-for-a-domestic-flight',
  },
  {
    source: '/airport-rules/security-screening/digital-boarding-pass',
    destination: '/question/is-a-digital-boarding-pass-accepted-at-indian-airports',
  },
  {
    source: '/airport-rules/security-screening/printed-ticket-needed',
    destination: '/question/do-i-need-a-printed-ticket-to-enter-the-airport',
  },
  {
    source: '/airport-rules/security-screening/electronics-security-tray',
    destination: '/question/what-happens-at-airport-security-screening',
    consolidated: true,
  },
  {
    source: '/airport-rules/checked-baggage/baggage-weight-size-limits',
    destination: '/question/what-is-the-checked-baggage-weight-limit-for-domestic-flights',
  },
  {
    source: '/airport-rules/hand-baggage-size-weight/cabin-bag-count-dimensions',
    destination: '/question/what-is-the-cabin-baggage-size-and-weight-limit',
  },
  {
    source: '/customs/foreign-currency/carrying-cash-flight',
    destination: '/question/how-much-foreign-currency-can-i-carry-abroad-from-india',
  },
  {
    source: '/customs/gold-jewellery/gold-jewellery-limit',
    destination: '/question/how-much-gold-can-i-bring-into-india-from-abroad',
  },
  {
    source: '/customs/duty-free-allowance/duty-free-alcohol-allowance',
    destination: '/question/how-much-alcohol-can-i-bring-into-india-duty-free',
  },
  {
    source: '/customs/duty-free-allowance/cigarettes-tobacco-restrictions',
    destination: '/question/how-many-cigarettes-can-i-bring-into-india-duty-free',
  },
];
