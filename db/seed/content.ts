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

/** The seven traveller-facing categories, in display order. */
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
    seededElsewhere: true,
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-power-bank-in-checked-baggage',
    category: 'Baggage & items',
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
    related: ['how-much-passport-validity-do-i-need-to-travel-abroad'],
    signoff: true,
  },
  {
    slug: 'what-id-do-i-need-for-a-domestic-flight-in-india',
    category: 'Documents & visas',
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
    question: 'Do children need a passport to fly internationally?',
    subject: {
      type: 'document',
      code: 'passport',
      name: 'Passport',
      itemCategory: 'Travel document',
    },
    authority: 'mea',
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
    slug: 'can-i-carry-a-laptop-in-hand-baggage',
    category: 'Baggage & items',
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
  },
  {
    slug: 'can-i-carry-alcohol-on-a-flight',
    category: 'Baggage & items',
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

  // ── Security & screening ───────────────────────────────────────────────────
  {
    slug: 'can-i-carry-a-lighter-on-a-flight',
    category: 'Security & screening',
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
    signoff: true,
  },
  {
    slug: 'can-i-carry-a-knife-in-checked-baggage',
    category: 'Security & screening',
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
    related: ['can-i-carry-a-power-bank-on-a-flight'],
    signoff: true,
  },
  {
    slug: 'can-i-carry-an-e-cigarette-or-vape-on-a-flight',
    category: 'Security & screening',
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
];

/** slug → category, for the homepage/search grouping (single source of truth). */
export const categoryForSlug = (slug: string): Category | undefined =>
  TRAVEL_QUESTIONS.find((q) => q.slug === slug)?.category;

/**
 * slug → decision type (AnswerKind), which determines the verdict VOCABULARY.
 * Defaults to 'carry' for anything not in the registry.
 */
export const answerKindForSlug = (slug: string): AnswerKind =>
  TRAVEL_QUESTIONS.find((q) => q.slug === slug)?.answerKind ?? 'carry';

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
