import type {
  AirlineView,
  AirportView,
  BreadcrumbItemView,
  CategoryResultView,
  CountryView,
  DecisionView,
  DocumentView,
  EntityResultView,
  JourneyStepView,
  JourneyView,
  ProfileView,
  QuestionResultView,
} from '@/lib/knowledge/view';
import type { ComparisonColumn, ComparisonRow } from '@/components/decision/comparison-table';

/**
 * Representative MOCK data for the Sprint-3B demo pages — shaped exactly like the
 * Sprint-2 view-models. This lives OUTSIDE components (components never hardcode
 * rules); a later sprint replaces it with resolver output.
 */

export const powerBankBreadcrumb: BreadcrumbItemView[] = [
  { label: 'Home', href: '/' },
  { label: 'Baggage', href: '#' },
  { label: 'Batteries & power banks', href: '#' },
  { label: 'Power bank in flight' },
];

export const powerBankDecision: DecisionView = {
  id: 'demo-power-bank',
  slug: 'power-bank-in-flight',
  question: 'Can I carry a power bank on a flight in India?',
  verdict: 'allowed_with_conditions',
  answer: 'Yes — in your cabin bag only, up to 100 Wh without airline approval.',
  conditions: [
    { label: 'Max capacity', value: '100 Wh' },
    { label: 'Carriage', value: 'Cabin only' },
    { label: 'With airline approval', value: '100–160 Wh' },
    { label: 'Spare batteries', value: 'Cabin only' },
  ],
  appliesTo: {
    origin: 'India',
    travelType: 'both',
    airlines: ['IndiGo', 'Air India', 'Vistara'],
    dependsOn: ['carriage'],
  },
  exceptions: [
    {
      id: 'ex-1',
      appliesTo: 'Power banks over 160 Wh',
      detail: 'Prohibited on all flights, in cabin or checked baggage.',
      verdictOverride: 'not_allowed',
    },
    {
      id: 'ex-2',
      appliesTo: 'Checked baggage',
      detail: 'Power banks must never be placed in checked baggage.',
      verdictOverride: 'not_allowed',
    },
  ],
  warnings: [
    {
      id: 'w-1',
      tone: 'danger',
      title: 'Never pack a power bank in checked baggage',
      detail: 'Lithium batteries in the hold are a fire risk and are prohibited by regulation.',
    },
    {
      id: 'w-2',
      tone: 'warning',
      title: 'Protect the terminals',
      detail: 'Keep power banks in original packaging or tape exposed terminals to prevent shorts.',
    },
  ],
  trust: {
    confidence: 'confirmed',
    evidenceLevel: 'government_regulation',
    lastVerified: '2026-06-15',
    reviewDue: '2026-09-13',
    reviewState: 'current',
    version: 3,
    reviewedBy: 'YourTravelGuide editorial',
    validity: 'stable',
  },
  sources: [
    {
      id: 's-1',
      authority: 'DGCA',
      authorityCode: 'dgca',
      title: 'Carriage of lithium batteries and power banks',
      url: 'https://www.dgca.gov.in/',
      evidenceLevel: 'government_regulation',
      publishedAt: '2024-03-01',
      archivedUrl: 'https://web.archive.org/',
    },
    {
      id: 's-2',
      authority: 'BCAS',
      title: 'Items prohibited in checked baggage',
      url: 'https://www.bcasindia.gov.in/',
      evidenceLevel: 'government_regulation',
    },
  ],
  overview: [
    'Power banks are lithium-ion batteries, so aviation rules treat them as dangerous goods. They may only travel in the aircraft cabin, never in checked baggage, because a battery fire in the hold cannot be reached and fought during flight.',
    'Capacity is measured in watt-hours (Wh). Up to 100 Wh needs no approval; 100–160 Wh is allowed only with your airline’s consent; above 160 Wh is banned outright. To convert milliamp-hours: Wh = (mAh ÷ 1000) × voltage (usually 3.7 V).',
  ],
  examples: [
    'A 10,000 mAh power bank at 3.7 V ≈ 37 Wh — allowed in the cabin, no approval needed.',
    'A 27,000 mAh power bank ≈ 100 Wh — at the no-approval limit; anything larger needs airline consent.',
  ],
  faqs: [
    {
      id: 'f-1',
      question: 'How many power banks can I carry?',
      answer:
        'Most Indian airlines allow up to two spare power banks per passenger in the cabin. Always check your airline for the exact limit.',
    },
    {
      id: 'f-2',
      question: 'Can I use a power bank during the flight?',
      answer:
        'Many airlines ask you not to charge devices from a power bank in-flight. Keep it switched off and stowed unless the crew permits use.',
    },
  ],
  relatedQuestions: [
    {
      id: 'rq-1',
      label: 'Can I carry a laptop in checked baggage?',
      href: '#',
      verdict: 'allowed_with_conditions',
    },
    {
      id: 'rq-2',
      label: 'Are spare lithium batteries allowed?',
      href: '#',
      verdict: 'allowed_with_conditions',
    },
    {
      id: 'rq-3',
      label: 'Can I carry a power bank over 20000 mAh?',
      href: '#',
      verdict: 'allowed_with_conditions',
    },
    {
      id: 'rq-4',
      label: 'Is a laptop charger allowed in cabin baggage?',
      href: '#',
      verdict: 'allowed',
    },
  ],
  relatedTopics: [
    { id: 'rt-1', label: 'Cabin baggage rules', href: '#' },
    { id: 'rt-2', label: 'Lithium batteries', href: '#' },
    { id: 'rt-3', label: 'Airport security', href: '#' },
  ],
  versions: [
    {
      version: 3,
      date: '2026-06-15',
      summary: 'Re-verified against DGCA circular — no change.',
      changeReason: 'Scheduled review',
    },
    { version: 2, date: '2025-11-20', summary: 'Clarified the 100–160 Wh airline-approval band.' },
    { version: 1, date: '2025-08-01', summary: 'Initial answer published.' },
  ],
  intent: 'verdict',
  decisionType: 'verdict',
  riskLevel: 'high',
};

// ── Entities ────────────────────────────────────────────────────────────────
export const airlines: AirlineView[] = [
  { code: '6E', name: 'IndiGo', countryCode: 'IN', href: '#' },
  { code: 'AI', name: 'Air India', countryCode: 'IN', href: '#' },
];
export const airports: AirportView[] = [
  { code: 'DEL', name: 'Indira Gandhi International', city: 'Delhi', countryCode: 'IN', href: '#' },
  {
    code: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj',
    city: 'Mumbai',
    countryCode: 'IN',
    href: '#',
  },
];
export const countries: CountryView[] = [
  { code: 'AE', name: 'United Arab Emirates', href: '#' },
  { code: 'TH', name: 'Thailand', href: '#' },
];
export const documents: DocumentView[] = [
  { code: 'passport', name: 'Passport', category: 'International travel', href: '#' },
  { code: 'aadhaar', name: 'Aadhaar', category: 'Domestic ID', href: '#' },
];
export const profiles: ProfileView[] = [
  {
    code: 'medical',
    name: 'Medical traveller',
    description: 'Carrying medicines or devices',
    href: '#',
  },
  { code: 'infant', name: 'Travelling with an infant', description: 'Under 2 years', href: '#' },
];
export const journeys: JourneyView[] = [
  {
    slug: 'first-international-trip',
    title: 'Your first international trip',
    description: 'Passport to arrival, step by step',
    stepCount: 8,
    href: '#',
  },
];

// ── Search ──────────────────────────────────────────────────────────────────
export const questionResults: QuestionResultView[] = [
  {
    id: 'qr-1',
    question: 'Can I carry a power bank on a flight?',
    href: '#',
    verdict: 'allowed_with_conditions',
    summary: 'Cabin only, up to 100 Wh.',
  },
  {
    id: 'qr-2',
    question: 'Can I carry a power bank in checked baggage?',
    href: '#',
    verdict: 'not_allowed',
    summary: 'Prohibited — fire risk.',
  },
];
export const categoryResults: CategoryResultView[] = [
  {
    id: 'cr-1',
    title: 'Batteries & power banks',
    href: '#',
    description: 'Power banks, spare batteries, laptops',
    count: 12,
  },
];
export const entityResults: EntityResultView[] = [
  { id: 'er-1', kind: 'airline', label: 'IndiGo', sublabel: '6E · India', href: '#' },
  {
    id: 'er-2',
    kind: 'airport',
    label: 'Delhi (DEL)',
    sublabel: 'Indira Gandhi International',
    href: '#',
  },
];
export const relatedSearches = [
  'power bank checked baggage',
  'laptop in flight',
  '20000 mAh power bank',
  'lithium battery rules',
];

// ── Journey ─────────────────────────────────────────────────────────────────
export const journeySteps: JourneyStepView[] = [
  {
    id: 'j-1',
    phase: 'before',
    title: 'Check your documents',
    description: 'Passport validity, visa, IDs',
    status: 'done',
    href: '#',
  },
  {
    id: 'j-2',
    phase: 'before',
    title: 'Pack to the rules',
    description: 'Power banks, liquids, restricted items',
    status: 'current',
    href: '#',
  },
  {
    id: 'j-3',
    phase: 'during',
    title: 'Security & immigration',
    description: 'What happens at each checkpoint',
    status: 'upcoming',
    href: '#',
  },
  {
    id: 'j-4',
    phase: 'after',
    title: 'Customs on arrival',
    description: 'Duty-free limits and declarations',
    status: 'upcoming',
    href: '#',
  },
];

// ── Comparison ──────────────────────────────────────────────────────────────
export const comparisonColumns: ComparisonColumn[] = [
  { key: 'indigo', label: 'IndiGo' },
  { key: 'airindia', label: 'Air India' },
];
export const comparisonRows: ComparisonRow[] = [
  { label: 'Cabin baggage', cells: ['7 kg', '8 kg'] },
  { label: 'Power bank (no approval)', cells: ['≤ 100 Wh', '≤ 100 Wh'] },
  { label: 'Spare batteries', cells: ['Cabin only', 'Cabin only'] },
];
