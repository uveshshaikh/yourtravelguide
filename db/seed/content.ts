import type {
  AnswerKind,
  DecisionType,
  EntityType,
  EvidenceLevel,
  Intent,
  RiskLevel,
  TimePhase,
  Verdict,
  Volatility,
} from '@/lib/knowledge/types';

/**
 * The verified-question content registry — the SINGLE source of truth for both
 * the database seed (db/seed/seed-content.ts) and the homepage/search category
 * grouping (services/resolver/catalog.ts). Add a question here once and it flows
 * into the seed AND the browse-by-category UI automatically — nothing is
 * hardcoded twice, and the site grows as this list grows.
 *
 * This module is PURE DATA (no DB / repository imports) so it is safe to import
 * into client-facing server components without pulling in the driver.
 *
 * CONTENT SAFETY: every answer here is written from well-established rules for
 * Indian travellers and attributed to the correct authority. Entries whose exact
 * figure/threshold an editor should confirm before public launch carry
 * `signoff: true`; the seed still marks them "last verified" today because we are
 * publishing them for that editorial review. Never treat these as final law.
 */

/** The seven traveller-facing (librarian) categories, in display order. */
export const CATEGORIES = [
  'Documents & visas',
  'Baggage & items',
  'Security & screening',
  'Customs & duty-free',
  'At the airport',
  'Money & currency',
  'Health & vaccines',
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * Traveller-INTENT groups — the homepage's discovery axis (journey stage +
 * situation), in canonical order. The homepage renders only the groups that
 * actually contain verified questions, so it grows automatically and never shows
 * an empty stage.
 *
 * IA NOTE (scale-to-10,000 design): proposals like "Passport & Visa",
 * "Documents & Identity", "Flights & Airlines" and "Electronics" were evaluated
 * as candidate TOP-LEVEL categories and deliberately NOT added as such — they
 * overlap with existing groups (Documents, At the airport, Packing) and adding
 * them would fragment a traveller's single mental journey across near-duplicate
 * buckets. Per the merge rule, they instead became SUBCATEGORIES (see
 * `SUBCATEGORIES` below) — this is what keeps the top-level nav simple as the
 * library grows into the thousands, instead of accumulating flat categories.
 * "Baggage" is the one genuine addition: it answers a different question
 * ("how big/heavy can my bag be") than "Packing" ("what can I put in it"), the
 * same split real airline sites use, and it already has verified content.
 * "Emergency situations" was broadened and is now called "Travel Problems" —
 * plain, findable language for flight delays/cancellations/missed flights,
 * lost baggage/documents, and medical emergencies abroad. Real Indian
 * travellers search "flight delayed what to do" / "lost baggage complaint" /
 * "lost passport abroad" — not "disruption", the internal-sounding term a
 * regulator or airline ops team would use. "Travel Problems" was chosen over
 * "Flight Problems" / "Delays & Cancellations" because the group's scope is
 * broader than flights (it also covers lost documents and medical
 * emergencies) — a narrower label would misrepresent what's in it.
 *
 * APPROVED REFINEMENT (kept at ≤12 primary categories): "Boarding" and
 * "Arrival" were removed as top-level categories — both were already empty (no
 * verified questions) and are exactly the kind of thin category the 12-cap
 * exists to prevent. "Boarding" folds into "At the airport" (subcategory
 * "Boarding & entry", already in use); "Arrival" folds into "International
 * travel" (subcategory "Arrival"). Nothing is lost — both remain valid
 * SUBCATEGORIES the moment real content needs them.
 */
export const INTENT_GROUPS = [
  'Before you book',
  'Before you fly',
  'Packing',
  'Baggage',
  'At the airport',
  'Airport security',
  'International travel',
  'Family travel',
  'Medical travel',
  'Documents',
  'Money & customs',
  'Travel Problems',
] as const;

export type IntentGroup = (typeof INTENT_GROUPS)[number];

/**
 * Category → Subcategory → Question. Subcategories are plain strings (not a
 * closed union) so the library scales to thousands of questions without a type
 * change — this registry only documents the canonical DISPLAY ORDER per group;
 * an unlisted subcategory is simply appended alphabetically, so nothing breaks
 * as new subcategories are introduced.
 */
export const SUBCATEGORIES: Partial<Record<IntentGroup, readonly string[]>> = {
  Packing: ['Electronics', 'Liquids & toiletries', 'Food', 'Alcohol & tobacco'],
  Baggage: ['Cabin baggage', 'Checked baggage', 'Airline allowance'],
  'Airport security': [
    'Screening process',
    'Sharp & restricted items',
    'Prohibited items',
    'Electronics',
  ],
  Documents: ['Passport & visa', 'Identity & digital ID', 'Tickets & identity matching'],
  'Money & customs': [
    'Cash & currency limits',
    'Duty-free allowance',
    'Gold & jewellery',
    'Declarations',
  ],
  // "Boarding & entry" absorbs the former top-level "Boarding" category.
  'At the airport': ['Check-in & timing', 'Boarding & entry', 'Special assistance'],
  'Family travel': ['Infants & babies', 'Passport & visa', 'Unaccompanied minors'],
  'Medical travel': [
    'Medicines',
    'Prescription medicines',
    'Insulin & devices',
    'Certificates & vaccination',
  ],
  // "Arrival" absorbs the former top-level "Arrival" category; Customs &
  // declarations is reserved for when real country-specific content exists (see
  // the entity-hub plan). "Immigration" now has its first real question.
  'International travel': ['Immigration', 'Customs & declarations', 'Arrival'],
  'Travel Problems': [
    'Flight delays & cancellations',
    'Lost & damaged baggage',
    'Lost documents',
    'Medical emergencies abroad',
  ],
};

/** A real-world subject an answer attaches to (referential integrity). */
export interface SeedSubject {
  type: Extract<EntityType, 'travel_item' | 'document' | 'traveller_profile'>;
  code: string;
  name: string;
  /** Optional grouping label on travel items / documents. */
  itemCategory?: string;
  description?: string;
}

export interface SeedQuestion {
  slug: string;
  category: Category;
  question: string;
  subject: SeedSubject;
  authority: AuthorityCode;
  /**
   * Traveller-intent group — how the homepage DISCOVERS questions (by where you
   * are in the journey / your situation), not by librarian category. Optional:
   * defaults from the question's category (see CATEGORY_TO_INTENT).
   */
  intentGroup?: IntentGroup;
  /** Second hierarchy level within the intent group, e.g. "Electronics". */
  subcategory?: string;
  /** Decision type — drives the verdict VOCABULARY (see AnswerKind). Default 'carry'. */
  answerKind?: AnswerKind;
  /** Stored polarity — reshaped into the right words by `answerKind`. */
  verdict: Verdict;
  /** One-sentence, answer-first summary. */
  summary: string;
  /** 2–4 short label→value conditions. Kept deliberately small. */
  conditions?: Record<string, string>;
  travelType?: ('domestic' | 'international')[];
  profiles?: string[];
  riskLevel: RiskLevel;
  volatility?: Volatility;
  timePhase: TimePhase;
  intent: Intent;
  decisionType: DecisionType;
  /** Provenance. */
  source: { title: string; url: string; publishedAt?: string };
  assertion: string;
  evidenceLevel: EvidenceLevel;
  /** Slugs of related questions (bidirectional "you should also know" links). */
  related?: string[];
  /** True → an editor should confirm the exact figure before public launch. */
  signoff?: boolean;
  /**
   * True → this question is seeded by a different module (e.g. power-bank.ts).
   * It still appears in the category map, but seed-content.ts skips creating it.
   */
  seededElsewhere?: boolean;
}

export type AuthorityCode = 'dgca' | 'bcas' | 'cbic' | 'mea' | 'boi' | 'rbi' | 'mohfw';

export const AUTHORITIES: Record<
  AuthorityCode,
  { name: string; websiteUrl: string; defaultEvidenceLevel: EvidenceLevel; description: string }
> = {
  dgca: {
    name: 'Directorate General of Civil Aviation',
    websiteUrl: 'https://www.dgca.gov.in/',
    defaultEvidenceLevel: 'government_regulation',
    description: 'India’s civil aviation regulator.',
  },
  bcas: {
    name: 'Bureau of Civil Aviation Security',
    websiteUrl: 'https://www.bcasindia.gov.in/',
    defaultEvidenceLevel: 'government_regulation',
    description: 'India’s civil aviation security regulator (screening & cabin rules).',
  },
  cbic: {
    name: 'Central Board of Indirect Taxes and Customs',
    websiteUrl: 'https://www.cbic.gov.in/',
    defaultEvidenceLevel: 'government_regulation',
    description: 'India’s customs authority (duty-free allowances & declarations).',
  },
  mea: {
    name: 'Ministry of External Affairs — Passport Seva',
    websiteUrl: 'https://www.passportindia.gov.in/',
    defaultEvidenceLevel: 'government_advisory',
    description: 'Issues Indian passports and travel-document guidance.',
  },
  boi: {
    name: 'Bureau of Immigration, India',
    websiteUrl: 'https://boi.gov.in/',
    defaultEvidenceLevel: 'government_advisory',
    description: 'Immigration & visa facilitation for travel to and from India.',
  },
  rbi: {
    name: 'Reserve Bank of India',
    websiteUrl: 'https://www.rbi.org.in/',
    defaultEvidenceLevel: 'government_regulation',
    description: 'India’s central bank (foreign-exchange & currency rules).',
  },
  mohfw: {
    name: 'Ministry of Health and Family Welfare',
    websiteUrl: 'https://www.mohfw.gov.in/',
    defaultEvidenceLevel: 'government_advisory',
    description: 'India’s health ministry (vaccination & health advisories).',
  },
};

// Shared subjects (reused across several questions).
const GENERAL: SeedSubject = {
  type: 'traveller_profile',
  code: 'general-traveller',
  name: 'General traveller',
  description: 'Any traveller, no special profile.',
};
const MEDICINES: SeedSubject = {
  type: 'travel_item',
  code: 'medicines',
  name: 'Medicines',
  itemCategory: 'Health',
};
const ALCOHOL: SeedSubject = {
  type: 'travel_item',
  code: 'alcohol',
  name: 'Alcohol',
  itemCategory: 'Restricted',
};

export const TRAVEL_QUESTIONS: SeedQuestion[] = [
  // ── Existing power-bank pages (seeded by power-bank.ts; listed for grouping) ──
  {
    slug: 'can-i-carry-a-power-bank-on-a-flight',
    category: 'Baggage & items',
    subcategory: 'Electronics',
    question: 'Can I carry a power bank on a flight?',
    subject: {
      type: 'travel_item',
      code: 'power-bank',
      name: 'Power bank',
      itemCategory: 'Electronics',
    },
    authority: 'dgca',
    verdict: 'allowed_with_conditions',
    summary: 'Yes — carry it in your cabin bag only, up to 100 Wh without airline approval.',
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Carriage of lithium batteries and power banks',
      url: 'https://www.dgca.gov.in/',
    },
    assertion: 'Power banks up to 100 Wh are allowed in cabin baggage only.',
    evidenceLevel: 'government_regulation',
    // Realises the "Power bank → Laptop → Chargers → Batteries → Cabin baggage"
    // discovery chain from real, already-verified questions.
    related: [
      'can-i-carry-a-laptop-in-hand-baggage',
      'can-i-carry-a-charger-on-a-flight',
      'can-i-carry-spare-batteries-on-a-flight',
      'what-is-the-cabin-baggage-size-and-weight-limit',
    ],
    seededElsewhere: true,
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-power-bank-in-checked-baggage',
    category: 'Baggage & items',
    subcategory: 'Electronics',
    question: 'Can I carry a power bank in checked baggage?',
    subject: {
      type: 'travel_item',
      code: 'power-bank',
      name: 'Power bank',
      itemCategory: 'Electronics',
    },
    authority: 'dgca',
    verdict: 'not_allowed',
    summary: 'No — power banks must never go in checked baggage. Always carry them in the cabin.',
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Carriage of lithium batteries and power banks',
      url: 'https://www.dgca.gov.in/',
    },
    assertion: 'Power banks are prohibited in checked baggage (fire risk).',
    evidenceLevel: 'government_regulation',
    seededElsewhere: true,
    signoff: true,
  },

  // ── Documents & visas ──────────────────────────────────────────────────────
  {
    slug: 'how-much-passport-validity-do-i-need-to-travel-abroad',
    category: 'Documents & visas',
    subcategory: 'Passport & visa',
    question: 'How much passport validity do I need to travel abroad?',
    subject: {
      type: 'document',
      code: 'passport',
      name: 'Passport',
      itemCategory: 'Travel document',
    },
    authority: 'mea',
    answerKind: 'validity',
    verdict: 'allowed_with_conditions',
    summary:
      'Most countries require your passport to be valid for at least 6 months beyond your travel dates.',
    conditions: {
      'Validity needed': 'Usually 6 months beyond your return date',
      'Blank pages': 'Keep at least 2 free',
      Check: 'Confirm your destination’s exact rule',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Passport validity for international travel',
      url: 'https://www.passportindia.gov.in/',
    },
    assertion:
      'Most destinations require at least six months of passport validity beyond the travel dates.',
    evidenceLevel: 'government_advisory',
    related: [
      'do-i-need-a-visa-to-travel-abroad',
      'do-children-need-a-passport-to-fly-internationally',
    ],
    signoff: true,
  },
  {
    slug: 'do-i-need-a-visa-to-travel-abroad',
    category: 'Documents & visas',
    subcategory: 'Passport & visa',
    question: 'Do I need a visa to travel abroad?',
    subject: { type: 'document', code: 'visa', name: 'Visa', itemCategory: 'Travel document' },
    authority: 'boi',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'It depends on your destination — some countries are visa-free or visa-on-arrival for Indian passport holders, others need a visa in advance.',
    conditions: {
      'Visa-free / on arrival': 'Available for several countries',
      Others: 'Apply before you travel',
      Check: 'Your destination’s official visa portal',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: { title: 'Visa requirements for Indian travellers', url: 'https://boi.gov.in/' },
    assertion: 'Visa requirements for Indian passport holders vary by destination country.',
    evidenceLevel: 'government_advisory',
    // Realises the "Passport → Visa → International travel → Customs" chain with
    // the real international-travel questions that exist today.
    related: [
      'how-much-passport-validity-do-i-need-to-travel-abroad',
      'do-i-need-a-yellow-fever-vaccine-to-travel',
      'what-is-the-duty-free-allowance-when-returning-to-india',
    ],
    signoff: true,
  },
  {
    slug: 'what-id-do-i-need-for-a-domestic-flight-in-india',
    category: 'Documents & visas',
    subcategory: 'Identity & digital ID',
    question: 'What ID do I need for a domestic flight in India?',
    subject: {
      type: 'document',
      code: 'domestic-flight-id',
      name: 'Government photo ID',
      itemCategory: 'Travel document',
    },
    authority: 'bcas',
    answerKind: 'requirement',
    verdict: 'allowed',
    summary:
      'Yes — you need one original government-issued photo ID that matches the name on your ticket.',
    conditions: {
      Accepted: 'Passport, Aadhaar, driving licence, voter ID, PAN',
      'Must match': 'The name on your ticket',
      Format: 'Original — physical or valid digital (mAadhaar / DigiLocker)',
    },
    travelType: ['domestic'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Acceptable identity documents for air travel',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'A valid government-issued photo ID matching the ticket is required for domestic flights.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-use-digital-aadhaar-as-id-for-a-domestic-flight'],
    signoff: true,
  },
  {
    slug: 'do-children-need-a-passport-to-fly-internationally',
    category: 'Documents & visas',
    subcategory: 'Passport & visa',
    question: 'Do children need a passport to fly internationally?',
    subject: {
      type: 'document',
      code: 'passport',
      name: 'Passport',
      itemCategory: 'Travel document',
    },
    authority: 'mea',
    intentGroup: 'Family travel',
    answerKind: 'requirement',
    verdict: 'allowed',
    summary:
      'Yes — every traveller, including infants, needs their own valid passport to fly abroad.',
    conditions: {
      Infants: 'Need their own passport',
      Visa: 'May also be required for the child',
      Apply: 'Through Passport Seva',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: { title: 'Passports for minors', url: 'https://www.passportindia.gov.in/' },
    assertion: 'Every international traveller, including infants, must hold their own passport.',
    evidenceLevel: 'government_advisory',
    related: ['how-much-passport-validity-do-i-need-to-travel-abroad'],
  },
  {
    slug: 'can-i-use-digital-aadhaar-as-id-for-a-domestic-flight',
    category: 'Documents & visas',
    subcategory: 'Identity & digital ID',
    question: 'Can I use digital Aadhaar as ID for a domestic flight?',
    subject: {
      type: 'document',
      code: 'aadhaar',
      name: 'Aadhaar',
      itemCategory: 'Travel document',
    },
    authority: 'bcas',
    answerKind: 'acceptance',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — Aadhaar in the mAadhaar or DigiLocker app is accepted as photo ID for domestic flights.',
    conditions: {
      'Apps accepted': 'mAadhaar, DigiLocker',
      Screenshots: 'Not accepted — open it live in the app',
      Backup: 'Carry another ID just in case',
    },
    travelType: ['domestic'],
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Digital identity documents at airports',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion: 'Aadhaar in mAadhaar / DigiLocker is accepted as valid ID for domestic air travel.',
    evidenceLevel: 'government_regulation',
    related: ['what-id-do-i-need-for-a-domestic-flight-in-india'],
    signoff: true,
  },

  // ── Baggage & items ────────────────────────────────────────────────────────
  {
    slug: 'how-much-liquid-can-i-carry-in-hand-baggage',
    category: 'Baggage & items',
    subcategory: 'Liquids & toiletries',
    question: 'How much liquid can I carry in hand baggage?',
    subject: { type: 'travel_item', code: 'liquids', name: 'Liquids', itemCategory: 'Toiletries' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'On international flights, liquids must be in containers of 100 ml or less, together in one clear resealable bag.',
    conditions: {
      'Container limit': '100 ml each',
      Bag: 'One transparent ~1-litre pouch',
      Exempt: 'Medicines & baby food (declare them)',
    },
    travelType: ['international'],
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'threshold',
    decisionType: 'threshold',
    source: {
      title: 'Liquids, aerosols and gels in cabin baggage',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'International cabin liquids are limited to 100 ml containers in one transparent bag.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-medicines-in-hand-baggage'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-medicines-in-hand-baggage',
    category: 'Baggage & items',
    intentGroup: 'Medical travel',
    subcategory: 'Medicines',
    question: 'Can I carry medicines in hand baggage?',
    subject: MEDICINES,
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — carry medicines in your hand baggage, ideally with a prescription or doctor’s note.',
    conditions: {
      'Carry-on': 'Keep them with you, not in checked bags',
      Liquids: 'Medical liquids are exempt from the 100 ml rule',
      Proof: 'A prescription helps at security & customs',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Carriage of medicines and medical items',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'Medicines are allowed in hand baggage; medical liquids are exempt from the liquid limit.',
    evidenceLevel: 'government_regulation',
    related: [
      'how-much-liquid-can-i-carry-in-hand-baggage',
      'can-i-carry-prescription-medicines-abroad',
    ],
  },
  {
    slug: 'can-i-carry-an-asthma-inhaler-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Medical travel',
    subcategory: 'Medicines',
    question: 'Can I carry an asthma inhaler on a flight?',
    subject: {
      type: 'travel_item',
      code: 'asthma-inhaler',
      name: 'Asthma inhaler',
      itemCategory: 'Health',
    },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — carry your inhaler in hand baggage; it’s exempt from the 100 ml liquids rule, and a prescription helps at security.',
    conditions: {
      Carriage: 'Hand baggage, not checked bags',
      Liquids: 'Exempt from the 100 ml rule',
      Proof: 'A prescription or doctor’s letter helps at security',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Carriage of medicines and medical items',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'Asthma inhalers are allowed in hand baggage and exempt from the liquids limit, the same medical exemption that applies to other prescribed medicines.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-medicines-in-hand-baggage', 'can-i-carry-insulin-on-a-flight'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-laptop-in-hand-baggage',
    category: 'Baggage & items',
    subcategory: 'Electronics',
    question: 'Can I carry a laptop in hand baggage?',
    subject: { type: 'travel_item', code: 'laptop', name: 'Laptop', itemCategory: 'Electronics' },
    authority: 'bcas',
    verdict: 'allowed',
    summary:
      'Yes — laptops are allowed in hand baggage; take them out separately at the security scanner.',
    conditions: {
      Screening: 'Remove from your bag at the scanner',
      'Power banks': 'Cabin only, never in checked bags',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Electronics in cabin baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Laptops are permitted in cabin baggage and screened separately.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-a-power-bank-on-a-flight', 'can-i-carry-a-charger-on-a-flight'],
  },
  {
    slug: 'can-i-carry-alcohol-on-a-flight',
    category: 'Baggage & items',
    subcategory: 'Alcohol & tobacco',
    question: 'Can I carry alcohol on a flight?',
    subject: ALCOHOL,
    authority: 'dgca',
    verdict: 'allowed_with_conditions',
    summary:
      'You can carry sealed alcohol within limits — up to 5 litres per person — and it must stay unopened in flight.',
    conditions: {
      Quantity: 'Up to 5 litres (24%–70% ABV), sealed retail packaging',
      'Over 70% ABV': 'Not allowed',
      Drinking: 'Only what the cabin crew serve you',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Carriage of alcoholic beverages', url: 'https://www.dgca.gov.in/' },
    assertion:
      'Sealed alcoholic beverages up to 5 litres (24–70% ABV) are permitted; over 70% ABV is prohibited.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-alcohol-can-i-bring-into-india-duty-free'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-food-in-hand-baggage-on-a-domestic-flight',
    category: 'Baggage & items',
    subcategory: 'Food',
    question: 'Can I carry food in hand baggage on a domestic flight?',
    subject: { type: 'travel_item', code: 'food', name: 'Food', itemCategory: 'Consumables' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — solid packed food is fine in hand baggage on domestic flights; liquids and gravies follow the liquid limits.',
    conditions: {
      'Solid food': 'Allowed (snacks, dry food)',
      'Liquids / curries': 'Follow liquid limits',
      International: 'Destinations may restrict fresh food',
    },
    travelType: ['domestic'],
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Food items in cabin baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Solid food is allowed in domestic cabin baggage; liquid food follows the liquids rule.',
    evidenceLevel: 'government_regulation',
  },

  {
    slug: 'can-i-carry-perfume-on-a-flight',
    category: 'Baggage & items',
    subcategory: 'Liquids & toiletries',
    question: 'Can I carry perfume on a flight?',
    subject: { type: 'travel_item', code: 'perfume', name: 'Perfume', itemCategory: 'Toiletries' },
    authority: 'bcas',
    answerKind: 'carry',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — in the cabin, perfume follows the 100 ml liquids rule; in checked baggage there’s no quantity limit.',
    conditions: {
      Cabin: 'Up to 100 ml per bottle, inside your clear liquids bag',
      'Checked baggage': 'No quantity limit',
      'Duty-free': 'Sealed tamper-evident (STEB) bag is fine',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Liquids, aerosols and gels in cabin baggage',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'Perfume follows the cabin liquids limit (100 ml per container) but is unrestricted in checked baggage.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-liquid-can-i-carry-in-hand-baggage'],
    signoff: true,
  },
  {
    slug: 'what-is-the-cabin-baggage-size-and-weight-limit',
    category: 'Baggage & items',
    // First-class member of the new "Baggage" journey group (bag-level rules),
    // distinct from "Packing" (item-level carry rules).
    intentGroup: 'Baggage',
    subcategory: 'Cabin baggage',
    question: 'What is the cabin baggage size and weight limit?',
    subject: {
      type: 'travel_item',
      code: 'cabin-baggage',
      name: 'Cabin baggage',
      itemCategory: 'Baggage',
    },
    authority: 'dgca',
    answerKind: 'carry',
    verdict: 'allowed_with_conditions',
    summary:
      'Most Indian airlines allow one cabin bag up to 7 kg and about 115 cm total (55×35×25 cm) — but limits vary by airline and fare.',
    conditions: {
      'Typical weight': '7 kg (economy)',
      'Typical size': '55 × 35 × 25 cm (~115 cm total)',
      'Personal item': 'Usually one small bag (e.g. laptop bag) allowed',
      Check: 'Your airline and fare — limits vary',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Cabin baggage allowance (airline policy)', url: 'https://www.dgca.gov.in/' },
    assertion:
      'Indian carriers commonly permit ~7 kg and ~115 cm cabin baggage, varying by airline and fare class.',
    evidenceLevel: 'government_advisory',
    related: ['can-i-carry-a-power-bank-on-a-flight'],
    signoff: true,
  },

  // ── Security & screening ───────────────────────────────────────────────────
  {
    slug: 'can-i-carry-a-lighter-on-a-flight',
    category: 'Security & screening',
    subcategory: 'Sharp & restricted items',
    question: 'Can I carry a lighter on a flight?',
    subject: { type: 'travel_item', code: 'lighter', name: 'Lighter', itemCategory: 'Restricted' },
    authority: 'bcas',
    verdict: 'not_allowed',
    summary:
      'No — lighters and matchboxes are not allowed in either cabin or checked baggage on flights in India.',
    conditions: {
      Cabin: 'Not allowed',
      Checked: 'Not allowed',
      Note: 'Rules differ abroad — follow Indian rules here',
    },
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Prohibited items — lighters and matches',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'Lighters and matches are prohibited in both cabin and checked baggage on flights in India.',
    evidenceLevel: 'government_regulation',
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-razor-in-hand-baggage',
    category: 'Security & screening',
    subcategory: 'Sharp & restricted items',
    question: 'Can I carry a razor in hand baggage?',
    subject: { type: 'travel_item', code: 'razor', name: 'Razor', itemCategory: 'Toiletries' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Cartridge and disposable razors are fine in cabin bags; loose razor blades and straight razors are not.',
    conditions: {
      Allowed: 'Safety / cartridge & disposable razors',
      'Not allowed': 'Loose blades, straight razors, box cutters',
      Blades: 'Pack these in checked baggage',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Sharp items in cabin baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Cartridge/disposable razors are allowed in the cabin; loose blades and straight razors are not.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-scissors-in-hand-baggage', 'can-i-carry-a-nail-cutter-in-hand-baggage'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-knife-in-checked-baggage',
    category: 'Security & screening',
    subcategory: 'Sharp & restricted items',
    question: 'Can I carry a knife in checked baggage?',
    subject: { type: 'travel_item', code: 'knife', name: 'Knife', itemCategory: 'Restricted' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Knives aren’t allowed in the cabin, but most can go in checked baggage if securely wrapped.',
    conditions: {
      Cabin: 'Not allowed',
      Checked: 'Allowed, securely sheathed / wrapped',
      Note: 'Weapons need proper licence & declaration',
    },
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Sharp objects and tools', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Knives are prohibited in cabin baggage but permitted in checked baggage when securely packed.',
    evidenceLevel: 'government_regulation',
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-drone-on-a-flight',
    category: 'Security & screening',
    subcategory: 'Electronics',
    question: 'Can I carry a drone on a flight?',
    subject: { type: 'travel_item', code: 'drone', name: 'Drone', itemCategory: 'Electronics' },
    authority: 'dgca',
    verdict: 'allowed_with_conditions',
    summary:
      'You can usually carry a drone in cabin baggage, but its lithium battery and DGCA drone rules apply.',
    conditions: {
      Carriage: 'Cabin (for the lithium battery)',
      Battery: 'Follow 100 / 160 Wh limits',
      Flying: 'Needs DGCA registration & no-fly-zone rules',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Carriage and operation of drones', url: 'https://www.dgca.gov.in/' },
    assertion:
      'Drones are carried in cabin baggage subject to battery limits; operation needs DGCA compliance.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-a-power-bank-on-a-flight', 'can-i-carry-spare-batteries-on-a-flight'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-an-e-cigarette-or-vape-on-a-flight',
    category: 'Security & screening',
    subcategory: 'Prohibited items',
    question: 'Can I carry an e-cigarette or vape on a flight?',
    subject: {
      type: 'travel_item',
      code: 'e-cigarette',
      name: 'E-cigarette / vape',
      itemCategory: 'Restricted',
    },
    authority: 'cbic',
    verdict: 'not_allowed',
    summary:
      'No — e-cigarettes and vapes are banned in India; you can’t carry or import them, and never in checked bags.',
    conditions: {
      'India ban': 'Sale, import & carriage are prohibited',
      'Checked bags': 'Never (battery fire risk)',
      Penalty: 'Can be seized, with fines',
    },
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Prohibition of Electronic Cigarettes Act, 2019',
      url: 'https://www.cbic.gov.in/',
    },
    assertion:
      'E-cigarettes and vapes are banned in India under PECA 2019; import and carriage are prohibited.',
    evidenceLevel: 'government_regulation',
    signoff: true,
  },

  // ── Customs & duty-free ────────────────────────────────────────────────────
  {
    slug: 'how-much-gold-can-i-bring-into-india-from-abroad',
    category: 'Customs & duty-free',
    subcategory: 'Gold & jewellery',
    question: 'How much gold can I bring into India from abroad?',
    subject: { type: 'travel_item', code: 'gold', name: 'Gold', itemCategory: 'Valuables' },
    authority: 'cbic',
    verdict: 'allowed_with_conditions',
    summary:
      'Returning Indian residents get a duty-free gold jewellery allowance; anything above it attracts customs duty.',
    conditions: {
      'Female passenger': 'Up to ₹1,00,000 of jewellery',
      'Male passenger': 'Up to ₹50,000 of jewellery',
      Condition: 'After staying abroad more than 1 year',
      'Above limit': 'Declare and pay duty',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'after',
    intent: 'threshold',
    decisionType: 'threshold',
    source: {
      title: 'Baggage Rules — gold and jewellery allowance',
      url: 'https://www.cbic.gov.in/',
    },
    assertion:
      'Eligible returning residents may bring gold jewellery duty-free up to ₹1,00,000 (female) / ₹50,000 (male).',
    evidenceLevel: 'government_regulation',
    related: ['what-is-the-duty-free-allowance-when-returning-to-india'],
    signoff: true,
  },
  {
    slug: 'how-many-cigarettes-can-i-bring-into-india-duty-free',
    category: 'Customs & duty-free',
    subcategory: 'Duty-free allowance',
    question: 'How many cigarettes can I bring into India duty-free?',
    subject: {
      type: 'travel_item',
      code: 'cigarettes',
      name: 'Cigarettes',
      itemCategory: 'Restricted',
    },
    authority: 'cbic',
    verdict: 'allowed_with_conditions',
    summary:
      'You can bring a limited quantity of tobacco into India duty-free; more than that must be declared.',
    conditions: {
      Cigarettes: 'Up to 100',
      Cigars: 'Up to 25',
      Tobacco: 'Up to 125 g',
      'Above limit': 'Declare and pay duty',
    },
    travelType: ['international'],
    riskLevel: 'medium',
    timePhase: 'after',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Baggage Rules — tobacco allowance', url: 'https://www.cbic.gov.in/' },
    assertion: 'Duty-free tobacco allowance is 100 cigarettes / 25 cigars / 125 g tobacco.',
    evidenceLevel: 'government_regulation',
    related: ['what-is-the-duty-free-allowance-when-returning-to-india'],
    signoff: true,
  },
  {
    slug: 'how-much-alcohol-can-i-bring-into-india-duty-free',
    category: 'Customs & duty-free',
    subcategory: 'Duty-free allowance',
    question: 'How much alcohol can I bring into India duty-free?',
    subject: ALCOHOL,
    authority: 'cbic',
    verdict: 'allowed_with_conditions',
    summary:
      'You can bring up to 2 litres of alcohol into India duty-free; anything extra is dutiable.',
    conditions: {
      'Duty-free': 'Up to 2 litres',
      'Above limit': 'Declare and pay duty',
      Age: '18 years and older',
    },
    travelType: ['international'],
    riskLevel: 'medium',
    timePhase: 'after',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Baggage Rules — alcohol allowance', url: 'https://www.cbic.gov.in/' },
    assertion: 'The duty-free alcohol allowance into India is 2 litres.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-alcohol-on-a-flight'],
    signoff: true,
  },
  {
    slug: 'what-is-the-duty-free-allowance-when-returning-to-india',
    category: 'Customs & duty-free',
    subcategory: 'Duty-free allowance',
    question: 'What is the duty-free allowance when returning to India?',
    subject: GENERAL,
    authority: 'cbic',
    verdict: 'allowed_with_conditions',
    summary:
      'Indian residents returning from abroad get a duty-free allowance of ₹50,000 on general goods.',
    conditions: {
      Residents: 'Up to ₹50,000 of goods',
      'From Nepal / Bhutan / Myanmar': 'Lower limit applies',
      'Above limit': 'Declare on the red channel',
    },
    travelType: ['international'],
    riskLevel: 'medium',
    timePhase: 'after',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Baggage Rules — general free allowance', url: 'https://www.cbic.gov.in/' },
    assertion: 'The general duty-free allowance for returning Indian residents is ₹50,000.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-gold-can-i-bring-into-india-from-abroad'],
    signoff: true,
  },

  // ── At the airport ─────────────────────────────────────────────────────────
  {
    slug: 'how-early-should-i-reach-the-airport',
    category: 'At the airport',
    subcategory: 'Check-in & timing',
    question: 'How early should I reach the airport?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'recommendation',
    verdict: 'allowed',
    summary:
      'Recommended — reach about 2 hours before domestic flights and 3 hours before international departures.',
    conditions: {
      Domestic: '~2 hours before departure',
      International: '~3 hours before departure',
      'Peak times': 'Add a buffer for early mornings & festivals',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'timing',
    decisionType: 'procedure',
    source: { title: 'Recommended airport reporting times', url: 'https://www.dgca.gov.in/' },
    assertion:
      'Travellers are advised to arrive ~2 hours before domestic and ~3 hours before international flights.',
    evidenceLevel: 'government_advisory',
    related: ['is-web-check-in-mandatory-for-flights'],
    signoff: true,
  },
  {
    slug: 'is-web-check-in-mandatory-for-flights',
    category: 'At the airport',
    subcategory: 'Check-in & timing',
    question: 'Is web check-in mandatory for flights?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'requirement',
    verdict: 'not_allowed',
    summary:
      'Not mandatory — web check-in isn’t legally required, but many airlines prefer it and may charge for airport counter check-in.',
    conditions: {
      When: 'Opens ~48 h, closes ~60–90 min before departure',
      Bags: 'Drop checked luggage at the counter',
      'Airport check-in': 'Some airlines charge a fee',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'procedure',
    decisionType: 'procedure',
    source: {
      title: 'Web check-in and airport check-in policies',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'Web check-in is not legally mandatory, but airline policies increasingly favour or require it.',
    evidenceLevel: 'government_advisory',
    related: ['how-early-should-i-reach-the-airport'],
    signoff: true,
  },
  {
    slug: 'can-i-use-digiyatra-for-domestic-flights',
    category: 'At the airport',
    subcategory: 'Boarding & entry',
    question: 'Can I use DigiYatra for domestic flights?',
    subject: GENERAL,
    authority: 'bcas',
    answerKind: 'eligibility',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — DigiYatra offers paperless, face-recognition entry at many major Indian airports, and it’s optional.',
    conditions: {
      How: 'Register once in the DigiYatra app',
      Where: 'Available at major airports (list is growing)',
      Optional: 'You can still use the normal ID gates',
    },
    travelType: ['domestic'],
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'procedure',
    decisionType: 'procedure',
    source: { title: 'DigiYatra facial-recognition entry', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'DigiYatra provides optional facial-recognition airport entry at participating Indian airports.',
    evidenceLevel: 'government_advisory',
    signoff: true,
  },

  // ── Money & currency ───────────────────────────────────────────────────────
  {
    slug: 'how-much-cash-can-i-carry-on-a-domestic-flight',
    category: 'Money & currency',
    subcategory: 'Cash & currency limits',
    question: 'How much cash can I carry on a domestic flight?',
    subject: GENERAL,
    authority: 'cbic',
    verdict: 'allowed_with_conditions',
    summary:
      'There’s no legal cap on cash for domestic flights, but large amounts can be questioned — carry proof of source.',
    conditions: {
      'Legal limit': 'None for domestic travel',
      'Large sums': 'Above ~₹2 lakh may be checked by tax officials',
      Tip: 'Carry receipts or bank proof',
    },
    travelType: ['domestic'],
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Carrying cash on domestic flights', url: 'https://www.cbic.gov.in/' },
    assertion:
      'No legal cap exists on domestic cash, but large sums may be scrutinised by tax authorities.',
    evidenceLevel: 'government_advisory',
    signoff: true,
  },
  {
    slug: 'how-much-foreign-currency-can-i-carry-abroad-from-india',
    category: 'Money & currency',
    subcategory: 'Cash & currency limits',
    question: 'How much foreign currency can I carry abroad from India?',
    subject: GENERAL,
    authority: 'rbi',
    verdict: 'allowed_with_conditions',
    summary:
      'You can carry foreign exchange for travel within RBI limits — cash in foreign currency is capped, the rest via card/forex.',
    conditions: {
      'Foreign cash': 'Up to USD 3,000 (or equivalent) per trip',
      'Total forex': 'Within your annual LRS limit',
      Declare: 'Above USD 5,000 cash / USD 10,000 total on arrival',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Foreign exchange for travellers (FEMA)', url: 'https://www.rbi.org.in/' },
    assertion:
      'Foreign currency cash is generally capped at USD 3,000 per trip, with the balance in card/forex.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-indian-currency-can-i-carry-when-going-abroad'],
    signoff: true,
  },
  {
    slug: 'how-much-indian-currency-can-i-carry-when-going-abroad',
    category: 'Money & currency',
    subcategory: 'Cash & currency limits',
    question: 'How much Indian currency can I carry when going abroad?',
    subject: GENERAL,
    authority: 'rbi',
    verdict: 'allowed_with_conditions',
    summary:
      'Indian residents can carry up to ₹25,000 in Indian currency notes when travelling abroad.',
    conditions: {
      Limit: 'Up to ₹25,000 in INR notes',
      'Applies to': 'Indian residents',
      'Foreign currency': 'Separate RBI limits apply',
    },
    travelType: ['international'],
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'threshold',
    decisionType: 'threshold',
    source: { title: 'Export of Indian currency (FEMA)', url: 'https://www.rbi.org.in/' },
    assertion:
      'Indian residents may carry up to ₹25,000 in Indian currency notes when travelling abroad.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-foreign-currency-can-i-carry-abroad-from-india'],
    signoff: true,
  },

  // ── Health & vaccines ──────────────────────────────────────────────────────
  {
    slug: 'do-i-need-a-yellow-fever-vaccine-to-travel',
    category: 'Health & vaccines',
    subcategory: 'Certificates & vaccination',
    question: 'Do I need a yellow fever vaccine to travel?',
    subject: {
      type: 'document',
      code: 'vaccination-certificate',
      name: 'Vaccination certificate',
      itemCategory: 'Health document',
    },
    authority: 'mohfw',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'A yellow fever vaccination certificate is required only if you’re arriving from or transiting a yellow-fever risk country.',
    conditions: {
      'Needed if': 'Coming from / through a risk country (parts of Africa & S. America)',
      Proof: 'Carry the yellow (ICVP) card',
      'India entry': 'You can be quarantined without it',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: { title: 'Yellow fever vaccination requirements', url: 'https://www.mohfw.gov.in/' },
    assertion:
      'A yellow fever certificate is required when arriving from or transiting a risk country.',
    evidenceLevel: 'government_advisory',
    signoff: true,
  },
  {
    slug: 'can-i-carry-prescription-medicines-abroad',
    category: 'Health & vaccines',
    subcategory: 'Prescription medicines',
    question: 'Can I carry prescription medicines abroad?',
    subject: MEDICINES,
    authority: 'mohfw',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — carry prescription medicines abroad with a doctor’s prescription; some drugs are restricted in certain countries.',
    conditions: {
      Carry: 'In original packaging with the prescription',
      Check: 'Your destination’s banned / controlled-drug list',
      Quantity: 'Personal-use amounts only',
    },
    travelType: ['international'],
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Travelling with medicines', url: 'https://www.mohfw.gov.in/' },
    assertion:
      'Prescription medicines may be carried abroad with documentation, subject to destination rules.',
    evidenceLevel: 'government_advisory',
    related: ['can-i-carry-medicines-in-hand-baggage'],
    signoff: true,
  },

  // ── Electronics (Packing) — powers the discovery cluster ────────────────────
  {
    slug: 'can-i-carry-a-charger-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Electronics',
    question: 'Can I carry a charger on a flight?',
    subject: { type: 'travel_item', code: 'charger', name: 'Charger', itemCategory: 'Electronics' },
    authority: 'bcas',
    verdict: 'allowed',
    summary: 'Yes — chargers and cables are allowed in both cabin and checked baggage.',
    conditions: {
      Cabin: 'Allowed',
      Checked: 'Allowed',
      Tip: 'Keep power banks in the cabin only',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Electronics in baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Chargers and charging cables are permitted in cabin and checked baggage.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-a-power-bank-on-a-flight', 'can-i-carry-spare-batteries-on-a-flight'],
  },
  {
    slug: 'can-i-carry-spare-batteries-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Electronics',
    question: 'Can I carry spare batteries on a flight?',
    subject: {
      type: 'travel_item',
      code: 'spare-batteries',
      name: 'Spare batteries',
      itemCategory: 'Electronics',
    },
    authority: 'dgca',
    verdict: 'allowed_with_conditions',
    summary:
      'Spare lithium batteries must go in the cabin only, terminals protected; ordinary AA/AAA cells are fine either way.',
    conditions: {
      'Lithium spares': 'Cabin only — never in checked baggage',
      Protection: 'Tape terminals or keep in original packaging',
      'AA / AAA': 'Allowed in cabin and checked',
    },
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Carriage of lithium batteries and power banks',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'Spare lithium batteries are cabin-only with protected terminals; dry cells are unrestricted.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-a-power-bank-on-a-flight', 'can-i-carry-a-charger-on-a-flight'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-bluetooth-speaker-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Electronics',
    question: 'Can I carry a Bluetooth speaker on a flight?',
    subject: {
      type: 'travel_item',
      code: 'bluetooth-speaker',
      name: 'Bluetooth speaker',
      itemCategory: 'Electronics',
    },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — carry it in the cabin (for its battery) and keep it switched off during the flight.',
    conditions: {
      Carriage: 'Cabin preferred (built-in lithium battery)',
      Inflight: 'Keep it switched off — no playing music onboard',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Portable electronic devices', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Bluetooth speakers are allowed, carried in the cabin for the battery and switched off in flight.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-a-power-bank-on-a-flight', 'can-i-carry-a-laptop-in-hand-baggage'],
  },
  {
    slug: 'can-i-carry-a-hair-dryer-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Electronics',
    question: 'Can I carry a hair dryer on a flight?',
    subject: {
      type: 'travel_item',
      code: 'hair-dryer',
      name: 'Hair dryer',
      itemCategory: 'Electronics',
    },
    authority: 'bcas',
    verdict: 'allowed',
    summary:
      'Yes — hair dryers and electric trimmers are allowed in both cabin and checked baggage.',
    conditions: { Cabin: 'Allowed', Checked: 'Allowed' },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Personal electronic appliances', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Hair dryers and electric grooming appliances are permitted in cabin and checked bags.',
    evidenceLevel: 'government_regulation',
  },
  {
    slug: 'can-i-carry-scissors-in-hand-baggage',
    category: 'Security & screening',
    intentGroup: 'Airport security',
    subcategory: 'Sharp & restricted items',
    question: 'Can I carry scissors in hand baggage?',
    subject: {
      type: 'travel_item',
      code: 'scissors',
      name: 'Scissors',
      itemCategory: 'Restricted',
    },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Small round-tipped scissors with blades under 6 cm are usually allowed in the cabin; larger or pointed ones must go in checked baggage.',
    conditions: {
      Cabin: 'Blades under 6 cm, round-tipped',
      'Not in cabin': 'Long or pointed blades',
      Larger: 'Pack in checked baggage',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Sharp items in cabin baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Scissors with blades under 6 cm are permitted in the cabin; larger blades are not.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-a-razor-in-hand-baggage', 'can-i-carry-a-nail-cutter-in-hand-baggage'],
    signoff: true,
  },

  // ── Family travel ───────────────────────────────────────────────────────────
  {
    slug: 'can-i-carry-baby-food-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Family travel',
    subcategory: 'Infants & babies',
    question: 'Can I carry baby food on a flight?',
    subject: { type: 'travel_item', code: 'baby-food', name: 'Baby food', itemCategory: 'Family' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — baby food and formula are allowed through security in reasonable quantities, even over 100 ml. Declare them.',
    conditions: {
      Allowed: 'Reasonable quantities for the journey',
      'Over 100 ml': 'Exempt from the liquids limit for infants',
      Security: 'Declare them for separate screening',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Liquids exemptions — baby food', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Baby food and formula are exempt from the cabin liquids limit in reasonable amounts.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-breast-milk-on-a-flight', 'how-much-liquid-can-i-carry-in-hand-baggage'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-breast-milk-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Family travel',
    subcategory: 'Infants & babies',
    question: 'Can I carry breast milk on a flight?',
    subject: {
      type: 'travel_item',
      code: 'breast-milk',
      name: 'Breast milk',
      itemCategory: 'Family',
    },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — expressed breast milk is allowed through security in reasonable quantities, even over 100 ml. Declare it.',
    conditions: {
      Allowed: 'Reasonable quantities, with or without the baby',
      'Over 100 ml': 'Exempt from the liquids limit',
      Security: 'Declare it for separate screening',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Liquids exemptions — breast milk', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Expressed breast milk is exempt from the cabin liquids limit in reasonable amounts.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-baby-food-on-a-flight'],
    signoff: true,
  },

  // ── Medical travel ──────────────────────────────────────────────────────────
  {
    slug: 'can-i-carry-insulin-on-a-flight',
    category: 'Health & vaccines',
    intentGroup: 'Medical travel',
    subcategory: 'Insulin & devices',
    question: 'Can I carry insulin on a flight?',
    subject: { type: 'travel_item', code: 'insulin', name: 'Insulin', itemCategory: 'Health' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — carry insulin and its syringes in the cabin with a prescription; they’re exempt from the liquids limit.',
    conditions: {
      Carriage: 'Cabin baggage, kept cool if possible',
      Liquids: 'Exempt from the 100 ml rule',
      Proof: 'Carry a prescription or doctor’s letter for syringes',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Medicines and medical devices', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Insulin and its delivery equipment are allowed in the cabin with documentation, exempt from the liquids limit.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-medicines-in-hand-baggage'],
    signoff: true,
  },

  // ── Toiletries & food (Packing) — the same liquids rule, common items ───────
  {
    slug: 'can-i-carry-coconut-oil-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Liquids & toiletries',
    question: 'Can I carry coconut oil on a flight?',
    subject: {
      type: 'travel_item',
      code: 'coconut-oil',
      name: 'Coconut oil',
      itemCategory: 'Toiletries',
    },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — in the cabin it counts as a liquid (100 ml per container); in checked baggage there’s no limit.',
    conditions: {
      Cabin: 'Up to 100 ml per container, in your clear liquids bag',
      'Checked baggage': 'No quantity limit',
      Note: 'It may solidify in the cold — still treated as a liquid',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Liquids, aerosols and gels in cabin baggage',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'Coconut oil follows the cabin liquids limit (100 ml) and is unrestricted in checked baggage.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-liquid-can-i-carry-in-hand-baggage', 'can-i-carry-ghee-on-a-flight'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-ghee-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Food',
    question: 'Can I carry ghee on a flight?',
    subject: { type: 'travel_item', code: 'ghee', name: 'Ghee', itemCategory: 'Food' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — ghee is treated as a liquid/gel: up to 100 ml per container in the cabin, and no limit in checked baggage.',
    conditions: {
      Cabin: 'Up to 100 ml per container',
      'Checked baggage': 'No limit — pack it well-sealed',
      Customs: 'Your destination may restrict dairy — check on arrival',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Liquids and gels in cabin baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Ghee is treated as a gel under the cabin liquids limit; unrestricted in checked baggage.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-pickle-on-a-flight', 'how-much-liquid-can-i-carry-in-hand-baggage'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-pickle-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Food',
    question: 'Can I carry pickle on a flight?',
    subject: { type: 'travel_item', code: 'pickle', name: 'Pickle', itemCategory: 'Food' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — because of the oil and brine, pickle is a liquid in the cabin (100 ml limit); pack larger jars in checked baggage.',
    conditions: {
      Cabin: 'Up to 100 ml per container',
      'Checked baggage': 'No limit — seal it in a leak-proof box',
      Customs: 'Some countries restrict homemade food — check on arrival',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Liquids and gels in cabin baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Pickle counts as a liquid under the cabin limit; unrestricted in checked baggage.',
    evidenceLevel: 'government_regulation',
    related: [
      'can-i-carry-ghee-on-a-flight',
      'can-i-carry-food-in-hand-baggage-on-a-domestic-flight',
    ],
    signoff: true,
  },
  {
    slug: 'can-i-carry-dry-fruits-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Food',
    question: 'Can I carry dry fruits on a flight?',
    subject: { type: 'travel_item', code: 'dry-fruits', name: 'Dry fruits', itemCategory: 'Food' },
    authority: 'bcas',
    verdict: 'allowed',
    summary: 'Yes — dry fruits and nuts are solid food, allowed in both cabin and checked baggage.',
    conditions: {
      Cabin: 'Allowed',
      Checked: 'Allowed',
      Customs: 'Your destination may restrict some foods — check on arrival',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Food items in baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Dry fruits and nuts are solid foods permitted in cabin and checked baggage.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-food-in-hand-baggage-on-a-domestic-flight'],
  },
  {
    slug: 'can-i-carry-chocolates-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Food',
    question: 'Can I carry chocolates on a flight?',
    subject: { type: 'travel_item', code: 'chocolates', name: 'Chocolates', itemCategory: 'Food' },
    authority: 'bcas',
    verdict: 'allowed',
    summary: 'Yes — chocolates are solid food, allowed in both cabin and checked baggage without restriction.',
    conditions: {
      Cabin: 'Allowed',
      Checked: 'Allowed',
      Customs: 'Your destination may restrict some foods — check on arrival',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Food items in baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Chocolates are a solid food permitted in cabin and checked baggage without restriction.',
    evidenceLevel: 'government_regulation',
    related: [
      'can-i-carry-dry-fruits-on-a-flight',
      'can-i-carry-food-in-hand-baggage-on-a-domestic-flight',
    ],
  },
  {
    slug: 'can-i-carry-toothpaste-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Liquids & toiletries',
    question: 'Can I carry toothpaste on a flight?',
    subject: {
      type: 'travel_item',
      code: 'toothpaste',
      name: 'Toothpaste',
      itemCategory: 'Toiletries',
    },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — toothpaste is a gel: up to 100 ml (100 g) per tube in the cabin, and no limit in checked baggage.',
    conditions: {
      Cabin: 'Up to 100 ml / 100 g per tube, in your liquids bag',
      'Checked baggage': 'No limit',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Liquids, aerosols and gels', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Toothpaste is a gel subject to the 100 ml cabin limit; unrestricted in checked baggage.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-liquid-can-i-carry-in-hand-baggage'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-shampoo-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Liquids & toiletries',
    question: 'Can I carry shampoo on a flight?',
    subject: { type: 'travel_item', code: 'shampoo', name: 'Shampoo', itemCategory: 'Toiletries' },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — up to 100 ml per bottle in the cabin (in your clear bag); larger bottles go in checked baggage.',
    conditions: {
      Cabin: 'Up to 100 ml per bottle',
      'Checked baggage': 'No limit',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Liquids, aerosols and gels', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Shampoo follows the 100 ml cabin liquids limit; unrestricted in checked baggage.',
    evidenceLevel: 'government_regulation',
    related: ['how-much-liquid-can-i-carry-in-hand-baggage'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-deodorant-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Liquids & toiletries',
    question: 'Can I carry deodorant on a flight?',
    subject: {
      type: 'travel_item',
      code: 'deodorant',
      name: 'Deodorant',
      itemCategory: 'Toiletries',
    },
    authority: 'bcas',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — stick and roll-on deodorants are fine; sprays and aerosols follow the 100 ml cabin liquids rule.',
    conditions: {
      'Stick / roll-on': 'Allowed in cabin and checked',
      'Spray / aerosol': 'Up to 100 ml in the cabin; personal quantities in checked',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Liquids, aerosols and gels', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Deodorant sprays follow the cabin liquids/aerosol limit; sticks are unrestricted.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-perfume-on-a-flight'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-camera-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Electronics',
    question: 'Can I carry a camera on a flight?',
    subject: { type: 'travel_item', code: 'camera', name: 'Camera', itemCategory: 'Electronics' },
    authority: 'bcas',
    verdict: 'allowed',
    summary:
      'Yes — cameras are allowed in cabin and checked baggage; keep spare batteries in the cabin.',
    conditions: {
      Cabin: 'Allowed (recommended, so it isn’t damaged)',
      Checked: 'Allowed',
      'Spare batteries': 'Cabin only',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Electronics in baggage', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'Cameras are permitted in cabin and checked baggage; spare batteries must be in the cabin.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-spare-batteries-on-a-flight', 'can-i-carry-a-laptop-in-hand-baggage'],
  },
  {
    slug: 'can-i-carry-a-smartwatch-on-a-flight',
    category: 'Baggage & items',
    intentGroup: 'Packing',
    subcategory: 'Electronics',
    question: 'Can I carry a smartwatch on a flight?',
    subject: {
      type: 'travel_item',
      code: 'smartwatch',
      name: 'Smartwatch',
      itemCategory: 'Electronics',
    },
    authority: 'bcas',
    verdict: 'allowed',
    summary: 'Yes — wear it or pack it. Smartwatches are allowed in cabin and checked baggage.',
    conditions: { Cabin: 'Allowed (wear or carry)', Checked: 'Allowed' },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Portable electronic devices', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Smartwatches are permitted in cabin and checked baggage.',
    evidenceLevel: 'government_regulation',
  },
  {
    slug: 'can-i-carry-a-nail-cutter-in-hand-baggage',
    category: 'Security & screening',
    intentGroup: 'Airport security',
    subcategory: 'Sharp & restricted items',
    question: 'Can I carry a nail cutter in hand baggage?',
    subject: {
      type: 'travel_item',
      code: 'nail-cutter',
      name: 'Nail cutter',
      itemCategory: 'Toiletries',
    },
    authority: 'bcas',
    verdict: 'allowed',
    summary: 'Yes — an ordinary nail cutter is allowed in cabin baggage.',
    conditions: {
      Cabin: 'Allowed',
      'With a file': 'A small attached file is generally fine',
      Note: 'Separate long metal files may be questioned',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Personal grooming items in cabin baggage',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion: 'Ordinary nail cutters are permitted in cabin baggage.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-scissors-in-hand-baggage', 'can-i-carry-a-razor-in-hand-baggage'],
    signoff: true,
  },

  // ── Travel Problems — activates a previously-empty category ────────────────
  {
    slug: 'am-i-entitled-to-compensation-if-my-flight-is-delayed',
    category: 'At the airport',
    intentGroup: 'Travel Problems',
    subcategory: 'Flight delays & cancellations',
    question: 'Am I entitled to compensation if my flight is delayed?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'Depends on the delay — DGCA rules require the airline to provide facilities (meals, refreshments, and in longer delays, a refund or alternate flight), scaled to how long the delay is.',
    conditions: {
      'Short delay': 'Meals/refreshments after a set waiting time',
      'Longer delay': 'Airline must offer a refund or an alternate flight',
      Cause: 'Airline-caused delays are covered; weather/ATC delays are not',
    },
    riskLevel: 'medium',
    timePhase: 'during',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Civil Aviation Requirements — facilitation for delayed flights',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'DGCA’s Civil Aviation Requirements mandate passenger facilitation for flight delays, scaled by delay length and airline fault.',
    evidenceLevel: 'government_regulation',
    related: [
      'am-i-eligible-for-a-refund-if-my-flight-is-cancelled',
      'am-i-eligible-for-compensation-if-i-am-denied-boarding',
    ],
    signoff: true,
  },
  {
    slug: 'am-i-eligible-for-a-refund-if-my-flight-is-cancelled',
    category: 'At the airport',
    intentGroup: 'Travel Problems',
    subcategory: 'Flight delays & cancellations',
    question: 'Am I eligible for a refund if my flight is cancelled?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'eligibility',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — if the airline cancels your flight, DGCA rules entitle you to a full refund or an alternate flight, plus compensation if you weren’t told in advance.',
    conditions: {
      Choice: 'Full refund or an alternate flight, your choice',
      'Short notice': 'Additional compensation if informed less than 2 weeks before',
      'Your own cancellation': 'Follows the airline’s normal fare/refund rules instead',
    },
    riskLevel: 'medium',
    timePhase: 'during',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Civil Aviation Requirements — flight cancellations',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'DGCA rules entitle passengers to a refund or alternate flight when the airline cancels a flight, with extra compensation for short-notice cancellations.',
    evidenceLevel: 'government_regulation',
    related: [
      'am-i-entitled-to-compensation-if-my-flight-is-delayed',
      'am-i-eligible-for-compensation-if-i-am-denied-boarding',
    ],
    signoff: true,
  },
  {
    slug: 'am-i-eligible-for-compensation-if-i-am-denied-boarding',
    category: 'At the airport',
    intentGroup: 'Travel Problems',
    subcategory: 'Flight delays & cancellations',
    question: 'Am I eligible for compensation if I am denied boarding?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'eligibility',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — if you’re denied boarding due to overbooking despite holding a confirmed ticket and checking in on time, DGCA rules entitle you to an alternate flight and compensation.',
    conditions: {
      Condition: 'Confirmed ticket, checked in on time, denied due to overbooking',
      Compensation: 'Scaled to how much later the alternate flight arrives',
      'Not covered': 'Being denied for safety, security, or documentation reasons',
    },
    riskLevel: 'medium',
    timePhase: 'during',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Civil Aviation Requirements — denied boarding',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'DGCA rules entitle passengers denied boarding due to overbooking to an alternate flight and compensation.',
    evidenceLevel: 'government_regulation',
    related: [
      'am-i-entitled-to-compensation-if-my-flight-is-delayed',
      'am-i-eligible-for-a-refund-if-my-flight-is-cancelled',
    ],
    signoff: true,
  },
  {
    slug: 'am-i-eligible-for-compensation-if-my-baggage-is-lost',
    category: 'At the airport',
    intentGroup: 'Travel Problems',
    subcategory: 'Lost & damaged baggage',
    question: 'Am I eligible for compensation if my baggage is lost?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'eligibility',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — airlines are liable for lost or damaged checked baggage, up to a set limit; file a report at the airport before you leave the baggage-claim area.',
    conditions: {
      'File immediately': 'Report at the airline’s baggage desk before leaving the airport',
      Liability: 'Capped per passenger — higher on international, lower on domestic flights',
      Valuables: 'Cash, jewellery and electronics are often excluded — check the airline’s policy',
    },
    riskLevel: 'medium',
    timePhase: 'after',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Carriage by Air Act — baggage liability',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'Airlines carry liability for lost or damaged checked baggage up to a capped limit, under the Carriage by Air Act and DGCA rules.',
    evidenceLevel: 'government_regulation',
    related: ['what-is-the-checked-baggage-weight-limit-for-domestic-flights'],
    signoff: true,
  },
  {
    slug: 'am-i-eligible-for-a-refund-if-i-miss-my-flight',
    category: 'At the airport',
    intentGroup: 'Travel Problems',
    subcategory: 'Flight delays & cancellations',
    question: 'Am I eligible for a refund if I miss my flight?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'eligibility',
    verdict: 'not_allowed',
    summary:
      'Generally no — missing your flight (a "no-show") usually forfeits the fare; some fare types allow a fee-based rebooking, so check your ticket conditions.',
    conditions: {
      'Standard fares': 'Fare is forfeited — no automatic refund',
      'Flexible fares': 'May allow rebooking for a fee',
      'Airline-caused misses': 'E.g. a delayed connecting flight are usually handled separately',
    },
    riskLevel: 'medium',
    timePhase: 'during',
    intent: 'requirement',
    decisionType: 'requirement',
    source: { title: 'No-show and missed-flight fare rules', url: 'https://www.dgca.gov.in/' },
    assertion:
      'A missed flight (no-show) generally forfeits the fare, subject to the ticket’s fare rules.',
    evidenceLevel: 'government_advisory',
    signoff: true,
  },

  // ── Baggage — fills the previously-empty "Checked baggage" subcategory ─────
  {
    slug: 'what-is-the-checked-baggage-weight-limit-for-domestic-flights',
    category: 'Baggage & items',
    intentGroup: 'Baggage',
    subcategory: 'Checked baggage',
    question: 'What is the checked baggage weight limit for domestic flights?',
    subject: {
      type: 'travel_item',
      code: 'checked-baggage',
      name: 'Checked baggage',
      itemCategory: 'Baggage',
    },
    authority: 'dgca',
    answerKind: 'carry',
    verdict: 'allowed_with_conditions',
    summary:
      'Most Indian airlines allow 15 kg of checked baggage in economy on domestic flights — but the exact limit varies by airline and fare class.',
    conditions: {
      'Typical limit': '15 kg (economy, domestic)',
      'Above the limit': 'Excess baggage charges apply, set by the airline',
      Check: 'Your airline and fare — limits and charges vary',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'threshold',
    decisionType: 'threshold',
    source: {
      title: 'Checked baggage allowance (airline policy)',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'Indian carriers commonly permit ~15 kg of checked baggage in economy on domestic flights, varying by airline and fare class.',
    evidenceLevel: 'government_advisory',
    related: [
      'what-is-the-cabin-baggage-size-and-weight-limit',
      'am-i-eligible-for-compensation-if-my-baggage-is-lost',
    ],
    signoff: true,
  },

  // ── Documents — NRI / OCI + digital boarding pass ───────────────────────────
  {
    slug: 'do-oci-cardholders-need-a-visa-to-travel-to-india',
    category: 'Documents & visas',
    subcategory: 'Passport & visa',
    question: 'Do OCI cardholders need a visa to travel to India?',
    subject: {
      type: 'document',
      code: 'oci-card',
      name: 'OCI card',
      itemCategory: 'Travel document',
    },
    authority: 'mea',
    answerKind: 'requirement',
    verdict: 'not_allowed',
    summary:
      'No — a valid OCI (Overseas Citizen of India) card lets you enter and stay in India without a visa, for as long as the card is valid.',
    conditions: {
      Requires: 'A valid OCI card alongside your foreign passport',
      Covers: 'Multiple entry, indefinite stay',
      Note: 'Carry both documents together when travelling',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Overseas Citizen of India (OCI) scheme',
      url: 'https://www.passportindia.gov.in/',
    },
    assertion: 'A valid OCI card exempts the holder from needing a visa to enter India.',
    evidenceLevel: 'government_advisory',
    related: [
      'do-i-need-a-visa-to-travel-abroad',
      'how-much-passport-validity-do-i-need-to-travel-abroad',
    ],
    signoff: true,
  },
  {
    slug: 'is-a-digital-boarding-pass-accepted-at-indian-airports',
    category: 'Documents & visas',
    intentGroup: 'At the airport',
    subcategory: 'Boarding & entry',
    question: 'Is a digital boarding pass accepted at Indian airports?',
    subject: {
      type: 'document',
      code: 'boarding-pass',
      name: 'Boarding pass',
      itemCategory: 'Travel document',
    },
    authority: 'bcas',
    answerKind: 'acceptance',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes — a digital (mobile app or e-mail) boarding pass is accepted at security and boarding at Indian airports; carry a charged phone as backup isn’t guaranteed.',
    conditions: {
      Accepted: 'Airline app, SMS or email boarding pass',
      'Keep handy': 'Screen brightness up, phone charged',
      International: 'Some transit airports abroad still prefer a printed copy',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    source: { title: 'Digital boarding pass acceptance', url: 'https://www.bcasindia.gov.in/' },
    assertion: 'Digital boarding passes are accepted for security and boarding at Indian airports.',
    evidenceLevel: 'government_regulation',
    related: [
      'is-web-check-in-mandatory-for-flights',
      'can-i-use-digital-aadhaar-as-id-for-a-domestic-flight',
      'can-i-use-digiyatra-for-domestic-flights',
    ],
    signoff: true,
  },

  // ── Gap-audit additions — closing critical/high-priority coverage gaps ─────
  {
    slug: 'do-i-need-a-printed-ticket-to-enter-the-airport',
    category: 'At the airport',
    subcategory: 'Boarding & entry',
    question: 'Do I need a printed ticket to enter the airport?',
    subject: GENERAL,
    authority: 'bcas',
    answerKind: 'requirement',
    verdict: 'not_allowed',
    summary:
      'No — a printed ticket isn’t required. CISF checks a valid ticket/boarding pass (digital is fine) with matching photo ID at the terminal entry gate, before check-in.',
    conditions: {
      'Terminal gate': 'Valid ticket/boarding pass + matching photo ID, digital is accepted',
      'Non-travellers': 'Need an entry pass to accompany you past the gate',
      Note: 'This is separate from the security screening after check-in',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: { title: 'Airport terminal access control', url: 'https://www.bcasindia.gov.in/' },
    assertion:
      'CISF terminal entry checks require a valid ticket/boarding pass (digital accepted) and matching photo ID; a printed copy is not mandatory.',
    evidenceLevel: 'government_regulation',
    related: [
      'is-a-digital-boarding-pass-accepted-at-indian-airports',
      'what-id-do-i-need-for-a-domestic-flight-in-india',
      'how-early-should-i-reach-the-airport',
    ],
    signoff: true,
  },
  {
    slug: 'can-i-correct-a-name-spelling-mistake-on-my-flight-ticket',
    category: 'Documents & visas',
    subcategory: 'Tickets & identity matching',
    question: 'Can I correct a name spelling mistake on my flight ticket?',
    subject: {
      type: 'document',
      code: 'flight-ticket',
      name: 'Flight ticket',
      itemCategory: 'Travel document',
    },
    authority: 'dgca',
    answerKind: 'acceptance',
    verdict: 'allowed_with_conditions',
    summary:
      'Usually yes — most airlines allow a minor spelling correction for a fee; a major name change (different person) generally isn’t allowed and needs a fresh booking.',
    conditions: {
      'Minor correction': 'Airlines usually allow this for a fee',
      'Major change': 'Not allowed — book a new ticket in the correct name',
      Why: 'The name must match your ID for security and boarding',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'procedure',
    decisionType: 'procedure',
    source: { title: 'Passenger name correction policies', url: 'https://www.dgca.gov.in/' },
    assertion:
      'Airlines commonly permit minor name-spelling corrections for a fee; major name changes require a new booking, since the ticket name must match the traveller’s ID.',
    evidenceLevel: 'government_advisory',
    related: ['what-id-do-i-need-for-a-domestic-flight-in-india'],
    signoff: true,
  },
  {
    slug: 'what-are-the-rules-for-unaccompanied-minors-travelling-alone',
    category: 'Documents & visas',
    intentGroup: 'Family travel',
    subcategory: 'Unaccompanied minors',
    question: 'What are the rules for unaccompanied minors travelling alone?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'Children travelling alone need the airline’s Unaccompanied Minor (UM) service — typically required for younger children and optional for older teens, with an adult escorting them to and from the gate.',
    conditions: {
      'Younger children': 'UM service usually mandatory (exact age band set by the airline)',
      'Older teens': 'Often optional — check your airline’s policy',
      Escort: 'An adult drops off and collects the child at the gate',
      Fee: 'Airlines typically charge for the UM service',
    },
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Unaccompanied minor carriage policies',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'Airlines require an Unaccompanied Minor service for children travelling alone, with age thresholds and fees varying by airline.',
    evidenceLevel: 'government_advisory',
    related: ['do-children-need-a-passport-to-fly-internationally'],
    signoff: true,
  },
  {
    slug: 'can-i-request-wheelchair-assistance-at-the-airport',
    category: 'At the airport',
    subcategory: 'Special assistance',
    question: 'Can I request wheelchair assistance at the airport?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'eligibility',
    verdict: 'allowed',
    summary:
      'Yes — free wheelchair and mobility assistance is available on request; book it with your airline in advance (typically at least 48 hours before departure) for a smoother experience.',
    conditions: {
      Cost: 'Free of charge',
      'Book ahead': 'Request via your airline, ideally 48+ hours before departure',
      'On the day': 'Also available at the airport, but pre-booking is more reliable',
    },
    riskLevel: 'low',
    timePhase: 'before',
    intent: 'procedure',
    decisionType: 'procedure',
    source: {
      title: 'Facilitation of persons with disabilities and reduced mobility',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'DGCA guidelines require airlines to provide free wheelchair and mobility assistance on request, ideally booked in advance.',
    evidenceLevel: 'government_regulation',
    related: ['how-early-should-i-reach-the-airport'],
  },
  {
    slug: 'what-is-the-red-and-green-channel-at-indian-customs',
    category: 'Customs & duty-free',
    subcategory: 'Declarations',
    question: 'What is the red and green channel at Indian customs?',
    subject: GENERAL,
    authority: 'cbic',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'Green channel is for passengers with nothing to declare (within duty-free limits); Red channel is for anything above your allowance or that must be declared.',
    conditions: {
      'Green channel': 'Nothing to declare — within your duty-free allowance',
      'Red channel': 'Above the allowance, or carrying restricted/dutiable goods',
      Risk: 'Walking through Green with undeclared dutiable goods can mean fines or seizure',
    },
    riskLevel: 'high',
    timePhase: 'after',
    intent: 'procedure',
    decisionType: 'procedure',
    source: { title: 'Customs channel system at Indian airports', url: 'https://www.cbic.gov.in/' },
    assertion:
      'Indian customs uses a Green (nothing to declare) and Red (declaration required) channel system for arriving passengers.',
    evidenceLevel: 'government_regulation',
    related: [
      'what-is-the-duty-free-allowance-when-returning-to-india',
      'how-much-gold-can-i-bring-into-india-from-abroad',
    ],
  },
  {
    slug: 'do-i-need-a-transit-visa-for-a-connecting-international-flight',
    category: 'Documents & visas',
    intentGroup: 'International travel',
    subcategory: 'Immigration',
    question: 'Do I need a transit visa for a connecting international flight?',
    subject: {
      type: 'document',
      code: 'transit-visa',
      name: 'Transit visa',
      itemCategory: 'Travel document',
    },
    authority: 'boi',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'It depends on your transit country and airport — many exempt Indian passport holders who stay airside, but some require a transit visa even if you don’t leave the airport.',
    conditions: {
      'Staying airside': 'Often exempt, but not everywhere',
      'Changing terminals / collecting baggage': 'More likely to need one',
      Check: 'Your transit country’s official visa rules before booking',
    },
    travelType: ['international'],
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: {
      title: 'Transit visa requirements for connecting flights',
      url: 'https://boi.gov.in/',
    },
    assertion:
      'Transit visa requirements for connecting international flights vary by transit country and are not universally exempt for Indian passport holders.',
    evidenceLevel: 'government_advisory',
    related: ['do-i-need-a-visa-to-travel-abroad'],
    signoff: true,
  },
  {
    slug: 'is-there-a-minimum-age-for-an-infant-to-fly',
    category: 'Documents & visas',
    intentGroup: 'Family travel',
    subcategory: 'Infants & babies',
    question: 'Is there a minimum age for an infant to fly?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'Most airlines allow infants to fly from a few days old, but very young infants often need a doctor’s fitness certificate — the exact minimum age varies by airline.',
    conditions: {
      Typical: 'Domestic travel allowed from a few days old, with variation by airline',
      'Very young infants': 'May need a doctor’s medical fitness certificate',
      Fare: 'Infants under 2 usually travel on a lap seat at a reduced fare',
    },
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    source: { title: 'Carriage of infants — airline policies', url: 'https://www.dgca.gov.in/' },
    assertion:
      'Airlines set a minimum age for infant travel, often requiring medical clearance for very young infants; the exact threshold varies by airline.',
    evidenceLevel: 'government_advisory',
    related: ['do-children-need-a-passport-to-fly-internationally'],
    signoff: true,
  },

  // ── First-time-flyer journey — closes real gaps found while redesigning the
  // First-time Flyers collection into a staged, step-by-step guide ──────────
  {
    slug: 'what-happens-at-airport-security-screening',
    category: 'Security & screening',
    subcategory: 'Screening process',
    question: 'What happens at airport security screening?',
    subject: GENERAL,
    authority: 'bcas',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'You’ll walk through a metal detector or body scanner, your hand baggage goes through an X-ray, and laptops/liquids are usually screened separately — a pat-down happens only if something alarms.',
    conditions: {
      'Before the scanner': 'Take out laptops and your liquids bag; empty pockets',
      'Body scan': 'Walk through a metal detector or full-body scanner',
      'Hand baggage': 'X-ray screened alongside you',
      'If flagged': 'A brief pat-down or manual bag check follows',
    },
    riskLevel: 'medium',
    timePhase: 'before',
    intent: 'procedure',
    decisionType: 'procedure',
    source: {
      title: 'Passenger security screening procedure',
      url: 'https://www.bcasindia.gov.in/',
    },
    assertion:
      'Indian airport security screening involves a body scan, X-ray of hand baggage, and separate screening of electronics and liquids, with additional checks only if something is flagged.',
    evidenceLevel: 'government_regulation',
    related: [
      'how-much-liquid-can-i-carry-in-hand-baggage',
      'can-i-carry-a-lighter-on-a-flight',
      'can-i-carry-a-laptop-in-hand-baggage',
    ],
    signoff: true,
  },
  {
    slug: 'what-happens-during-boarding-at-the-airport',
    category: 'At the airport',
    subcategory: 'Boarding & entry',
    question: 'What happens during boarding at the airport?',
    subject: GENERAL,
    authority: 'dgca',
    answerKind: 'requirement',
    verdict: 'allowed_with_conditions',
    summary:
      'Boarding usually starts about 45 minutes before departure, called by zone or group, with the gate typically closing 20–25 minutes before departure — arrive at the gate early, since a closed gate can mean denied boarding.',
    conditions: {
      'Boarding starts': '~45 minutes before departure (varies by airline/airport)',
      Called: 'By zone, group, or row — listen for your announcement',
      'Gate closes': '~20–25 minutes before departure',
      'If you’re late': 'The gate may close before you arrive — you could miss the flight',
    },
    riskLevel: 'high',
    timePhase: 'before',
    intent: 'timing',
    decisionType: 'procedure',
    source: { title: 'Boarding and gate-closure timing', url: 'https://www.dgca.gov.in/' },
    assertion:
      'Boarding typically begins around 45 minutes before departure and gates commonly close 20–25 minutes before departure, though exact timing varies by airline and airport.',
    evidenceLevel: 'government_advisory',
    related: [
      'how-early-should-i-reach-the-airport',
      'am-i-eligible-for-a-refund-if-i-miss-my-flight',
    ],
    signoff: true,
  },
  {
    slug: 'can-i-use-my-phone-during-a-flight',
    category: 'Security & screening',
    subcategory: 'Electronics',
    question: 'Can I use my phone during a flight?',
    subject: {
      type: 'travel_item',
      code: 'mobile-phone',
      name: 'Mobile phone',
      itemCategory: 'Electronics',
    },
    authority: 'dgca',
    answerKind: 'carry',
    verdict: 'allowed_with_conditions',
    summary:
      'Yes, in flight/airplane mode — regular calls aren’t allowed onboard, but Wi-Fi, messaging and offline use are fine once the crew permits electronics use.',
    conditions: {
      Required: 'Switch to flight/airplane mode',
      'Voice calls': 'Not allowed during the flight',
      'Wi-Fi / data': 'Only if the aircraft offers inflight Wi-Fi',
      Timing: 'Follow crew instructions on when devices may be used',
    },
    riskLevel: 'low',
    timePhase: 'during',
    intent: 'verdict',
    decisionType: 'verdict',
    source: {
      title: 'Use of portable electronic devices in flight',
      url: 'https://www.dgca.gov.in/',
    },
    assertion:
      'Mobile phones must be switched to flight/airplane mode in the air; voice calls are not permitted, though other uses are allowed once crew permits electronics use.',
    evidenceLevel: 'government_regulation',
    related: ['can-i-carry-a-power-bank-on-a-flight'],
    signoff: true,
  },
];

/** slug → category, for the homepage/search grouping (single source of truth). */
export const categoryForSlug = (slug: string): Category | undefined =>
  TRAVEL_QUESTIONS.find((q) => q.slug === slug)?.category;

/** Default intent group when a question doesn't declare one — from its category. */
const CATEGORY_TO_INTENT: Record<Category, IntentGroup> = {
  'Documents & visas': 'Documents',
  'Baggage & items': 'Packing',
  'Security & screening': 'Airport security',
  'Customs & duty-free': 'Money & customs',
  'At the airport': 'At the airport',
  'Money & currency': 'Money & customs',
  'Health & vaccines': 'Medical travel',
};

/** One honest line describing each intent group (shown on discovery cards). */
export const INTENT_GROUP_META: Record<IntentGroup, string> = {
  'Before you book': 'Plan before you pay.',
  'Before you fly': 'Get ready the day before.',
  Packing: 'What you can put in your bag — and what stays home.',
  Baggage: 'Bag size, weight and airline allowances.',
  'At the airport': 'Check-in, timing, boarding and getting through.',
  'Airport security': 'What passes screening — and what doesn’t.',
  'International travel': 'Crossing borders — immigration, customs and arrival.',
  'Family travel': 'Flying with kids, infants and elders.',
  'Medical travel': 'Medicines, devices and medical needs.',
  Documents: 'Passports, visas and accepted IDs — from application to gate.',
  'Money & customs': 'Cash, gold, currency and allowances.',
  'Travel Problems': 'Delays, cancellations, lost baggage and what to do if things go wrong.',
};

/**
 * slug → traveller-intent group. Explicit on the question, else derived from its
 * category. This is the homepage's discovery axis (auto-populated from the Core).
 */
export function intentGroupForSlug(slug: string): IntentGroup {
  const q = TRAVEL_QUESTIONS.find((x) => x.slug === slug);
  if (!q) return 'Packing';
  return q.intentGroup ?? CATEGORY_TO_INTENT[q.category];
}

/**
 * slug → subcategory (second hierarchy level), if tagged. Used to break a large
 * intent group into scannable clusters (e.g. Packing → Electronics / Liquids /
 * Food) without adding more top-level nav.
 */
export function subcategoryForSlug(slug: string): string | undefined {
  return TRAVEL_QUESTIONS.find((q) => q.slug === slug)?.subcategory;
}

/**
 * Canonical display order for a group's subcategories (from SUBCATEGORIES);
 * anything not listed is appended alphabetically, so new subcategories never
 * require a code change as the library scales.
 */
export function orderSubcategories(group: string, names: readonly string[]): string[] {
  const known = SUBCATEGORIES[group as IntentGroup] ?? [];
  const knownPresent = known.filter((n) => names.includes(n));
  const rest = names.filter((n) => !known.includes(n)).sort();
  return [...knownPresent, ...rest];
}

/**
 * slug → decision type (AnswerKind), which determines the verdict VOCABULARY.
 * Defaults to 'carry' for anything not in the registry.
 */
export const answerKindForSlug = (slug: string): AnswerKind =>
  TRAVEL_QUESTIONS.find((q) => q.slug === slug)?.answerKind ?? 'carry';

/**
 * Real traveller demand order for the homepage "Popular" section. Only slugs that
 * exist AND are verified will show (the catalog filters); the list grows as more
 * verified questions are added. Never a fabricated ranking — just known demand.
 */
export const PREFERRED_POPULAR: string[] = [
  'can-i-carry-a-power-bank-on-a-flight',
  'can-i-use-digital-aadhaar-as-id-for-a-domestic-flight',
  'how-much-passport-validity-do-i-need-to-travel-abroad',
  'can-i-carry-medicines-in-hand-baggage',
  'can-i-carry-perfume-on-a-flight',
  'can-i-carry-a-razor-in-hand-baggage',
  'can-i-carry-a-laptop-in-hand-baggage',
  'how-much-liquid-can-i-carry-in-hand-baggage',
  'do-children-need-a-passport-to-fly-internationally',
  'what-is-the-cabin-baggage-size-and-weight-limit',
  'what-is-the-duty-free-allowance-when-returning-to-india',
  'what-is-the-checked-baggage-weight-limit-for-domestic-flights',
  'is-a-digital-boarding-pass-accepted-at-indian-airports',
  'am-i-eligible-for-a-refund-if-my-flight-is-cancelled',
  'do-oci-cardholders-need-a-visa-to-travel-to-india',
  'do-i-need-a-printed-ticket-to-enter-the-airport',
  'can-i-correct-a-name-spelling-mistake-on-my-flight-ticket',
  'what-is-the-red-and-green-channel-at-indian-customs',
];

/**
 * The signature "Before you leave for the airport" checklist — action-worded
 * last-minute questions mapped to REAL verified answers. Only items whose answer
 * is verified render (fail-closed); the order is the natural pre-departure flow.
 */
export const PREFLIGHT_CHECKLIST: { slug: string; label: string }[] = [
  {
    slug: 'how-much-passport-validity-do-i-need-to-travel-abroad',
    label: 'Is my passport valid enough?',
  },
  { slug: 'what-id-do-i-need-for-a-domestic-flight-in-india', label: 'Do I have the right ID?' },
  {
    slug: 'can-i-use-digital-aadhaar-as-id-for-a-domestic-flight',
    label: 'Is DigiLocker / Aadhaar accepted?',
  },
  { slug: 'is-web-check-in-mandatory-for-flights', label: 'Do I need web check-in?' },
  {
    slug: 'what-is-the-cabin-baggage-size-and-weight-limit',
    label: 'Is my cabin bag within the limit?',
  },
  { slug: 'can-i-carry-a-power-bank-on-a-flight', label: 'Can I carry my power bank?' },
];

/**
 * Curated traveller-type COLLECTIONS — a cross-cutting discovery axis, distinct
 * from journey-stage categories. Each collection is hand-picked from EXISTING
 * verified questions only (no new facts, just selection) — this is deliberately
 * conservative: personas without enough real content today (students, business
 * travellers, foreign tourists, pet travellers, solo/female travellers) are NOT
 * listed here yet. Adding their dedicated content is the natural way to "unlock"
 * a real collection for them later; the catalog only renders a collection once
 * it has a handful of real verified questions.
 */
export interface TravellerCollectionStage {
  label: string;
  slugs: string[];
}

export interface TravellerCollection {
  id: string;
  label: string;
  description: string;
  /**
   * Flat (unordered) collections: a simple curated topic bundle.
   * Journey collections (e.g. First-time flyers) use `stages` instead — an
   * ORDERED sequence matching the traveller's real journey, not category order,
   * not alphabetical, not popularity. Never reuses a slug across two stages, so
   * the page never shows the same question twice.
   */
  slugs?: string[];
  stages?: TravellerCollectionStage[];
}

/** Every slug in a collection, flattened — used for the fail-closed live count. */
export function collectionSlugs(c: TravellerCollection): string[] {
  return c.stages ? c.stages.flatMap((s) => s.slugs) : (c.slugs ?? []);
}

export const TRAVELLER_COLLECTIONS: TravellerCollection[] = [
  {
    id: 'first-time-flyers',
    label: 'First-time flyers',
    description:
      'Flying for the first time? Follow this in order — everything you need, in the order you’ll actually need it.',
    // A JOURNEY, not a topic dump: ordered exactly as a first-time domestic
    // flyer experiences it. "Can I carry a lighter?" earlier sat in a flat,
    // unordered list with no context — it now appears ONCE, inside Security,
    // as the concrete answer to "what's prohibited", which is where it
    // actually belongs in the traveller's journey.
    stages: [
      {
        label: 'Before you leave home',
        slugs: [
          'what-is-the-cabin-baggage-size-and-weight-limit',
          'what-is-the-checked-baggage-weight-limit-for-domestic-flights',
          'how-early-should-i-reach-the-airport',
        ],
      },
      {
        label: 'Going to the airport',
        slugs: [
          'do-i-need-a-printed-ticket-to-enter-the-airport',
          'what-id-do-i-need-for-a-domestic-flight-in-india',
        ],
      },
      {
        label: 'Check-in',
        slugs: [
          'is-web-check-in-mandatory-for-flights',
          'is-a-digital-boarding-pass-accepted-at-indian-airports',
        ],
      },
      {
        label: 'Security',
        slugs: [
          'what-happens-at-airport-security-screening',
          'how-much-liquid-can-i-carry-in-hand-baggage',
          'can-i-carry-a-lighter-on-a-flight',
        ],
      },
      {
        label: 'Boarding',
        slugs: ['what-happens-during-boarding-at-the-airport'],
      },
      {
        label: 'During the flight',
        slugs: ['can-i-use-my-phone-during-a-flight', 'can-i-carry-a-power-bank-on-a-flight'],
      },
      {
        label: 'After landing',
        slugs: ['am-i-eligible-for-compensation-if-my-baggage-is-lost'],
      },
    ],
  },
  {
    id: 'family-travellers',
    label: 'Travelling with children',
    description: 'What families flying with kids and infants need to know.',
    slugs: [
      'do-children-need-a-passport-to-fly-internationally',
      'can-i-carry-baby-food-on-a-flight',
      'can-i-carry-breast-milk-on-a-flight',
      'how-much-liquid-can-i-carry-in-hand-baggage',
      'what-is-the-cabin-baggage-size-and-weight-limit',
      'what-are-the-rules-for-unaccompanied-minors-travelling-alone',
      'is-there-a-minimum-age-for-an-infant-to-fly',
    ],
  },
  {
    id: 'medical-travellers',
    label: 'Medical travellers',
    description: 'Travelling with medicines, insulin or a health condition.',
    slugs: [
      'can-i-carry-medicines-in-hand-baggage',
      'can-i-carry-prescription-medicines-abroad',
      'can-i-carry-insulin-on-a-flight',
    ],
  },
  {
    id: 'international-travellers',
    label: 'International travellers',
    description: 'Crossing borders from India — documents, health and money.',
    slugs: [
      'how-much-passport-validity-do-i-need-to-travel-abroad',
      'do-i-need-a-visa-to-travel-abroad',
      'do-i-need-a-yellow-fever-vaccine-to-travel',
      'how-much-foreign-currency-can-i-carry-abroad-from-india',
      'what-is-the-duty-free-allowance-when-returning-to-india',
      'how-much-gold-can-i-bring-into-india-from-abroad',
    ],
  },
  {
    id: 'nri-oci-travellers',
    label: 'NRIs & OCI cardholders',
    description: 'Returning to India, or visiting as an NRI or OCI cardholder.',
    slugs: [
      'do-oci-cardholders-need-a-visa-to-travel-to-india',
      'how-much-passport-validity-do-i-need-to-travel-abroad',
      'what-is-the-duty-free-allowance-when-returning-to-india',
      'how-much-gold-can-i-bring-into-india-from-abroad',
    ],
  },
];

/**
 * Query-expansion synonyms for search (NOT new facts — just how Indian
 * travellers phrase the same question). Applied before fuzzy matching so
 * "e-visa", "hand baggage" or a common misspelling still finds the right
 * verified answer. Keep modest and honest; this is UX, not content.
 */
export const SEARCH_SYNONYMS: [pattern: string, canonical: string][] = [
  ['e-visa', 'visa'],
  ['evisa', 'visa'],
  ['e visa', 'visa'],
  ['hand baggage', 'cabin baggage'],
  ['hand bag', 'cabin baggage'],
  ['cabin bag', 'cabin baggage'],
  ['check in', 'check-in'],
  ['checkin', 'check-in'],
  ['id proof', 'ID'],
  ['adhar card', 'aadhaar'],
  ['adhaar', 'aadhaar'],
  ['digital locker', 'digilocker'],
  ['driving license', 'driving licence'],
  ['lithium battery', 'battery'],
  ['li-ion battery', 'battery'],
  ['duty free', 'duty-free'],
  ['suitcase', 'baggage'],
  ['trolley bag', 'baggage'],
  ['dslr', 'camera'],
  ['syringe', 'insulin'],
  ['syringes', 'insulin'],
  ['need passport', 'ID'],
  ['cabin luggage', 'cabin baggage'],
];

/** One honest line describing what each category covers (for the category cards). */
export const CATEGORY_META: Record<Category, string> = {
  'Documents & visas': 'Passports, visas and the ID you need to fly.',
  'Baggage & items': 'What you can pack in cabin and checked bags.',
  'Security & screening': 'Prohibited items and what to expect at screening.',
  'Customs & duty-free': 'Allowances and what to declare on arrival.',
  'At the airport': 'Check-in, timing and getting through faster.',
  'Money & currency': 'Cash, foreign exchange and currency limits.',
  'Health & vaccines': 'Vaccination rules and travelling with medicines.',
};

/**
 * The official authorities that actually back published answers — derived from
 * the content registry, never a hardcoded marketing list. Ordered as declared.
 */
export function authoritiesCovered(): { code: string; name: string; description: string }[] {
  const used = new Set(TRAVEL_QUESTIONS.map((q) => q.authority));
  return (Object.keys(AUTHORITIES) as AuthorityCode[])
    .filter((code) => used.has(code))
    .map((code) => ({
      code: code.toUpperCase(),
      name: AUTHORITIES[code].name,
      description: AUTHORITIES[code].description,
    }));
}

/** slug → authority code, for per-source attribution (e.g. the Trust Center). */
export const authorityForSlug = (slug: string): AuthorityCode | undefined =>
  TRAVEL_QUESTIONS.find((q) => q.slug === slug)?.authority;

/**
 * Full authority profile (name, site, description, and how many questions in
 * the REGISTRY cite it) — the registry count, not a live DB count, since this
 * powers a static trust page; `catalog.authoritiesWithLiveCounts()` cross-checks
 * against what's actually verified right now for the number shown to users.
 */
export function authorityProfiles(): {
  code: string;
  name: string;
  websiteUrl: string;
  description: string;
  questionCount: number;
}[] {
  const used = new Set(TRAVEL_QUESTIONS.map((q) => q.authority));
  return (Object.keys(AUTHORITIES) as AuthorityCode[])
    .filter((code) => used.has(code))
    .map((code) => ({
      code: code.toUpperCase(),
      name: AUTHORITIES[code].name,
      websiteUrl: AUTHORITIES[code].websiteUrl,
      description: AUTHORITIES[code].description,
      questionCount: TRAVEL_QUESTIONS.filter((q) => q.authority === code).length,
    }));
}

/**
 * slug → short applicability label ("Domestic flights", "International travel"…).
 * Descriptive only — travelType is deliberately kept out of the claim scope so
 * the resolver never hides a page from a visitor without a travel context.
 */
export function appliesToLabel(slug: string): string {
  const tt = TRAVEL_QUESTIONS.find((q) => q.slug === slug)?.travelType;
  if (!tt || tt.length === 0) return 'All travellers';
  if (tt.includes('domestic') && tt.includes('international')) return 'Domestic & international';
  return tt[0] === 'domestic' ? 'Domestic flights' : 'International travel';
}
