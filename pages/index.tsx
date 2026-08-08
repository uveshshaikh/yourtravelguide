import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import RuleCard from '../components/RuleCard';
import PlayfulLoader from '../components/PlayfulLoader';
import { rules } from '../data/rules';
import { Rule } from '../data/types';
import { airports } from '../data/airports';
import { buildRuleUrl, buildCategoryUrl, NEW_ARCH_CATEGORIES } from '../lib/urls';
import { labelFor } from '../lib/labels';

/**
 * Resolves a hardcoded homepage reference to its canonical URL. Throws at
 * build time if the slug doesn't exist, rather than silently falling back to
 * a legacy /rules/ URL — a broken build is preferable to a broken link.
 */
function canonicalHrefForSlug(slug: string): string {
  const rule = rules.find((r) => r.slug === slug);
  if (!rule) throw new Error(`canonicalHrefForSlug: no rule found for slug "${slug}"`);
  return buildRuleUrl(rule);
}

type HomeRule = Pick<Rule, 'slug' | 'title' | 'shortTitle' | 'category' | 'tags' | 'verdict' | 'lastUpdated'> & {
  subcategory?: string;
  searchTokens: string[];
};

interface HomeProps {
  allRules: HomeRule[];
  /** True only if every rule in data/rules.ts currently has at least one
   *  source citation -- computed at build time so this can't drift out of
   *  sync with the data the way a hardcoded claim could. */
  allRulesHaveSources: boolean;
  /** The single most recent lastUpdated date across all rules, already
   *  formatted at build time (not a raw ISO string formatted at render
   *  time) -- toLocaleDateString() run independently on the server and in
   *  the browser can produce subtly different output for the same date
   *  depending on each environment's ICU data, which React flags as a
   *  hydration mismatch. Formatting once in getStaticProps means server
   *  and client only ever display the same fixed string, never recompute
   *  it. Not a claim that every rule is this fresh -- just the true
   *  most-recent one. */
  mostRecentUpdateDisplay: string;
}

type VerdictFilter = 'all' | 'allowed' | 'not_allowed' | 'limited';

type NearbyAirport = {
  code: string;
  name: string;
  city: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
};

type PermissionStatusValue = 'prompt' | 'granted' | 'denied' | 'unsupported';

const MAX_NEARBY_DISTANCE_KM = 300;
// Two clean rows of two per category. The old 3 left an orphan card
// dangling on a second row of a 2-column grid; 4 fills both rows evenly,
// and anything more makes four stacked sections too tall before the
// "See all" affordance gets a chance to do its job.
const DEFAULT_SECTION_CARD_COUNT = 4;

// Phase H4: the filter is a quiet refinement control now (plain text,
// bold + colored only when active), not a row of solid-colored buttons --
// so it no longer needs full pill/border/shadow classes per option.
const verdictButtons: Array<{ id: VerdictFilter; label: string; activeText: string }> = [
  { id: 'allowed', label: 'Allowed', activeText: 'text-green-700' },
  { id: 'limited', label: 'Limited', activeText: 'text-amber-700' },
  { id: 'not_allowed', label: 'Not allowed', activeText: 'text-rose-700' },
];

const passportRuleSlugs = [
  'passport-photocopy-valid',
  'domestic-id-requirements',
  'aadhaar-digital-id',
  'printed-ticket-needed',
  'digital-boarding-pass',
  'name-mismatch-flight-ticket',
  'kids-id-requirement',
  'passport-expiry-validity',
];

/**
 * The handful of rules travellers most often arrive looking for -- a
 * starting point for anyone who doesn't yet know what to search. Curated
 * by slug (each verified to exist in data/rules.ts); any slug that stops
 * resolving is simply dropped rather than rendering a dead card.
 */
const popularRuleSlugs = [
  'water-bottle-airport',
  'power-bank-in-flight',
  'liquids-over-100ml',
  'medicines-in-flight',
  'domestic-id-requirements',
  'baggage-weight-size-limits',
];

const packingKeywords = new Set([
  'baggage',
  'packing',
  'bag',
  'fragile',
  'electronics',
  'power bank',
  'razor',
  'shampoo',
  'camera',
  'laptop',
  'liquid',
]);

const customsKeywords = new Set([
  'customs',
  'duty',
  'allowance',
  'cash',
  'gold',
  'alcohol',
  'tea',
  'coffee',
  'tobacco',
  'cigarettes',
  'duty free',
]);

const familyKeywords = new Set([
  'baby',
  'infant',
  'kids',
  'family',
  'pet',
  'pets',
  'wheelchair',
  'special assistance',
  'stroller',
  'formula',
]);

const matchesKeywords = (rule: HomeRule, keywords: Set<string>) =>
  rule.tags.some(tag => keywords.has(tag.toLowerCase()));

const verdictBadgeLabels: Record<Rule['verdict']['status'], string> = {
  allowed: 'Allowed',
  limited: 'Limited',
  not_allowed: 'Not allowed',
};

const verdictBadgeStyles: Record<Rule['verdict']['status'], string> = {
  allowed: 'bg-green-100 text-green-700',
  limited: 'bg-amber-100 text-amber-700',
  not_allowed: 'bg-rose-100 text-rose-700',
};

// Text-only verdict colour for the curated "Popular travel questions"
// list. That section is editorial, not a database view, so the status
// reads as a coloured word under the question rather than a filled pill --
// the pill treatment stays in the directory's RuleCards, keeping the two
// sections visually distinct.
const verdictTextStyles: Record<Rule['verdict']['status'], string> = {
  allowed: 'text-green-700',
  limited: 'text-amber-700',
  not_allowed: 'text-rose-700',
};

const heroHighlights = [
  {
    href: '/first-flight',
    eyebrow: 'Journey coach',
    title: 'First-time flyer guide',
    description: 'Seven calm steps with friendly reminders before each checkpoint.',
    accent: 'text-blue-500',
    searchKeywords: ['first flight', 'first-time flyer', 'new flyer', 'beginner'],
  },
  {
    href: canonicalHrefForSlug('airport-security-behavior-tips'),
    eyebrow: 'Security ready',
    title: 'Airport security tips',
    description: 'Easy tips for trays, security queues, and family lanes.',
    accent: 'text-amber-500',
    searchKeywords: ['security tips', 'cisf', 'security lane', 'airport security'],
  },
];

const journeyShortcuts = [
  {
    id: 'documents',
    emoji: '🪪',
    title: 'Check IDs before you leave',
    helper: 'Passport vs. Aadhaar, minors, name mismatches.',
  },
  {
    id: 'packing',
    emoji: '🎒',
    title: 'Pack without last-minute guessing',
    helper: 'Liquids, power banks, blades, fragile items.',
  },
  {
    id: 'family',
    emoji: '👶',
    title: 'Move smoother with kids & elders',
    helper: 'Family lanes, strollers, meds, extra time.',
  },
];

// Short, factual summaries of what's actually in each category (mirrors the
// real subcategories in lib/labels.ts) -- not marketing copy, just a map so
// the browse cards below don't render with no description.
const categoryEmojis: Record<string, string> = {
  'airport-rules': '🛄',
  'travel-documents': '🪪',
  customs: '💰',
};

const categoryDescriptions: Record<string, string> = {
  'airport-rules': 'Security & baggage',
  'travel-documents': 'IDs & documentation',
  customs: 'Duty & limits',
};

// The three canonical category hubs, derived from the existing
// NEW_ARCH_CATEGORIES export and buildCategoryUrl()/labelFor() helpers --
// no hardcoded slugs, labels, or URLs.
const categoryHubs = NEW_ARCH_CATEGORIES.map((category) => ({
  category,
  label: labelFor(category),
  description: categoryDescriptions[category] ?? '',
  emoji: categoryEmojis[category] ?? '📄',
  href: buildCategoryUrl(category),
}));

const quickSearchSuggestions = [
  'Water bottle',
  'Power bank',
  'Passport',
  'Medicines',
];

const stopwords = new Set([
  'a',
  'an',
  'and',
  'are',
  'can',
  'do',
  'does',
  'how',
  'i',
  'is',
  'it',
  'may',
  'me',
  'my',
  'of',
  'on',
  'or',
  'should',
  'take',
  'that',
  'the',
  'this',
  'to',
  'we',
  'what',
  'when',
  'where',
  'which',
  'with',
  'you',
]);

const sanitizeText = (input: string) => input.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

const splitTokens = (input: string) => sanitizeText(input).split(/\s+/).filter(Boolean);

const getSearchTokens = (input: string) => splitTokens(input).filter(token => !stopwords.has(token));

const getTokenCandidates = (token: string) => {
  const forms = new Set<string>([token]);
  if (token.endsWith('ies')) forms.add(token.slice(0, -3) + 'y');
  if (token.endsWith('es')) forms.add(token.slice(0, -2));
  if (token.endsWith('s')) forms.add(token.slice(0, -1));
  if (!token.endsWith('s')) forms.add(`${token}s`);
  return Array.from(forms);
};

const tokenMatches = (token: string, haystack: Set<string>) =>
  getTokenCandidates(token).some(candidate => haystack.has(candidate));

const buildRuleSearchText = (rule: Rule) => {
  const overview = rule.richContent?.overview ?? [];
  const tips = rule.richContent?.tips ?? [];
  const checklistEntries = rule.richContent?.checklists ?? [];
  const checklistText = checklistEntries.flatMap(entry => [entry.title, ...entry.items]).join(' ');

  return [
    rule.title,
    rule.shortTitle,
    rule.verdict.summary,
    rule.category,
    rule.tags.join(' '),
    (rule.howToComply ?? []).join(' '),
    (rule.extraNotes ?? []).join(' '),
    rule.richContent?.quickAnswer ?? '',
    overview.join(' '),
    tips.join(' '),
    checklistText,
  ].join(' ');
};

const buildTokenSet = (text: string) => new Set(splitTokens(text));

const buildRuleSearchTokens = (rule: Rule) => Array.from(buildTokenSet(buildRuleSearchText(rule)));

const toHomeRule = (rule: Rule): HomeRule => ({
  slug: rule.slug,
  title: rule.title,
  shortTitle: rule.shortTitle,
  category: rule.category,
  subcategory: 'subcategory' in rule ? (rule as { subcategory?: string }).subcategory : undefined,
  tags: rule.tags,
  verdict: rule.verdict,
  lastUpdated: rule.lastUpdated,
  searchTokens: buildRuleSearchTokens(rule),
});

// Same date format RuleDetail.tsx uses, kept consistent across the site.
const formatDisplayDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(earthRadiusKm * c * 10) / 10;
};

const getNearestAirports = (latitude: number, longitude: number, maxDistanceKm = MAX_NEARBY_DISTANCE_KM) =>
  airports
    .map(airport => ({
      ...airport,
      distanceKm: getDistanceKm(latitude, longitude, airport.latitude, airport.longitude),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .filter(airport => airport.distanceKm <= maxDistanceKm)
    .slice(0, 3);

const formatDriveTime = (distanceKm: number) => {
  const avgSpeedKmph = distanceKm < 80 ? 45 : 65;
  const minutes = Math.max(5, Math.round((distanceKm / avgSpeedKmph) * 60));
  if (minutes < 60) return `≈${minutes} min drive`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `≈${hours} hr drive` : `≈${hours} hr ${mins} min drive`;
};


export default function Home({ allRules, allRulesHaveSources, mostRecentUpdateDisplay }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<VerdictFilter>('all');
  const [nearbyAirports, setNearbyAirports] = useState<NearbyAirport[]>([]);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'pending' | 'ready' | 'error'>('idle');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isSecureOrigin, setIsSecureOrigin] = useState<boolean | null>(null);
  const [permissionState, setPermissionState] = useState<PermissionStatusValue>('unsupported');
  const [isSearching, setIsSearching] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    documents: false,
    packing: false,
    customs: false,
    family: false,
  });
  const searchDelayRef = useRef<number | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lastSlug = sessionStorage.getItem('ytg:last-rule-slug');
    if (!lastSlug) return;
    const target = document.getElementById(`rule-${lastSlug}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    sessionStorage.removeItem('ytg:last-rule-slug');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const frame = window.requestAnimationFrame(() => {
      setIsSecureOrigin(Boolean(window.isSecureContext));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    if (!('permissions' in navigator) || typeof navigator.permissions?.query !== 'function') return;

    let cancelled = false;

    navigator.permissions
      .query({ name: 'geolocation' as PermissionName })
      .then(status => {
        if (cancelled) return;
        setPermissionState(status.state as PermissionStatusValue);
        status.onchange = () => setPermissionState(status.state as PermissionStatusValue);
      })
      .catch(() => {
        if (cancelled) return;
        setPermissionState('unsupported');
      });

    return () => {
      cancelled = true;
    };
  }, []);
  const hasVerdictFilter = verdictFilter !== 'all';
  const trimmedSearch = searchQuery.trim();
  const hasSearchQuery = trimmedSearch.length > 0;

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    if (searchDelayRef.current) {
      window.clearTimeout(searchDelayRef.current);
      searchDelayRef.current = null;
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (searchDelayRef.current) {
      window.clearTimeout(searchDelayRef.current);
    }
    if (!value.trim()) {
      setIsSearching(false);
      searchDelayRef.current = null;
      return;
    }
    setIsSearching(true);
    searchDelayRef.current = window.setTimeout(() => {
      setIsSearching(false);
      searchDelayRef.current = null;
    }, 450);
  };
  const handleFindAirports = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('Your browser does not support location sharing.');
      return;
    }

    if (isSecureOrigin === false) {
      setLocationStatus('error');
      setLocationError('Location only works on HTTPS or localhost. Open the secure site, then try again.');
      return;
    }

    if (permissionState === 'denied') {
      setLocationStatus('error');
      setLocationError('Location is blocked for this site. Click the padlock icon → Site settings → Allow location, then retry.');
      return;
    }

    setLocationStatus('pending');
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const nearest = getNearestAirports(latitude, longitude);
        setNearbyAirports(nearest);
        setLocationStatus('ready');
      },
      error => {
        setLocationStatus('error');
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location permission denied. We only use it once to show nearby airports.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError('We could not determine your location. Please try again.');
        } else {
          setLocationError('Something went wrong while fetching your location.');
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }, [isSecureOrigin, permissionState]);
  const queryTokens = useMemo(() => getSearchTokens(searchQuery), [searchQuery]);
  const fallbackTokens = useMemo(() => splitTokens(searchQuery), [searchQuery]);
  const activeTokens = queryTokens.length > 0 ? queryTokens : fallbackTokens;

  const ruleTokenSets = useMemo(() => {
    const map = new Map<string, Set<string>>();
    allRules.forEach(rule => {
      map.set(rule.slug, new Set(rule.searchTokens));
    });
    return map;
  }, [allRules]);

  const verdictFilteredRules = useMemo(() => {
    if (verdictFilter === 'all') return allRules;
    return allRules.filter(rule => rule.verdict.status === verdictFilter);
  }, [allRules, verdictFilter]);

  const searchFilteredRules = useMemo(() => {
    if (!activeTokens.length) return verdictFilteredRules;
    return verdictFilteredRules.filter(rule => {
      const haystack = ruleTokenSets.get(rule.slug);
      if (!haystack) return false;
      return activeTokens.every(token => tokenMatches(token, haystack));
    });
  }, [activeTokens, ruleTokenSets, verdictFilteredRules]);

  const heroPreviewRules = useMemo(() => {
    if (!hasSearchQuery) return [] as HomeRule[];
    return searchFilteredRules;
  }, [hasSearchQuery, searchFilteredRules]);

  const heroCardMatches = useMemo(() => {
    if (!hasSearchQuery || !activeTokens.length) return [] as typeof heroHighlights;
    return heroHighlights.filter(card => {
      const cardTokens = buildTokenSet(
        `${card.title} ${card.description} ${card.eyebrow} ${(card.searchKeywords ?? []).join(' ')}`
      );
      return activeTokens.every(token => tokenMatches(token, cardTokens));
    });
  }, [activeTokens, hasSearchQuery]);

  const heroShortcutMatches = useMemo(() => {
    if (!hasSearchQuery || !activeTokens.length) return [] as typeof journeyShortcuts;
    return journeyShortcuts.filter(shortcut => {
      const shortcutTokens = buildTokenSet(`${shortcut.title} ${shortcut.helper}`);
      return activeTokens.every(token => tokenMatches(token, shortcutTokens));
    });
  }, [activeTokens, hasSearchQuery]);

  const hasInlinePreviewContent =
    heroPreviewRules.length > 0 || heroCardMatches.length > 0 || heroShortcutMatches.length > 0;
  const showRuleScrollHint = heroPreviewRules.length > 6;

  const passportRules = useMemo(() => {
    const order = new Map(passportRuleSlugs.map((slug, index) => [slug, index]));
    return searchFilteredRules
      .filter(rule => order.has(rule.slug))
      .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
  }, [searchFilteredRules]);

  // Deliberately built from allRules, not searchFilteredRules: these are
  // fixed entry points into the site, so they shouldn't shuffle or vanish
  // when the status filter below them changes.
  const popularRules = useMemo(() => {
    const bySlug = new Map(allRules.map(rule => [rule.slug, rule]));
    return popularRuleSlugs
      .map(slug => bySlug.get(slug))
      .filter((rule): rule is HomeRule => rule !== undefined);
  }, [allRules]);

  const packingRules = useMemo(
    () => searchFilteredRules.filter(rule => matchesKeywords(rule, packingKeywords)),
    [searchFilteredRules]
  );
  const customsRules = useMemo(
    () => searchFilteredRules.filter(rule => matchesKeywords(rule, customsKeywords)),
    [searchFilteredRules]
  );
  const familyRules = useMemo(
    () => searchFilteredRules.filter(rule => matchesKeywords(rule, familyKeywords)),
    [searchFilteredRules]
  );

  // Labels match the section headings below exactly, so a nav item and the
  // heading it scrolls to can never read as two different things.
  const categoryNav = [
    { id: 'documents', label: 'Documents & IDs' },
    { id: 'packing', label: 'Packing Tips' },
    { id: 'customs', label: 'Customs & Duty' },
    { id: 'family', label: 'Travelling with Family' },
  ];

  const hasSearchResults = searchFilteredRules.length > 0;

  const handleVerdictClick = (id: VerdictFilter) => {
    setVerdictFilter(prev => (prev === id ? 'all' : id));
  };

  const toggleSection = (sectionId: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = useCallback((id: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Only facts this app can actually prove from its own data (see
  // getStaticProps) -- no badges, endorsements, or unverifiable claims.
  // Any entry whose underlying fact isn't true simply doesn't render.
  const trustPoints = [
    `${allRules.length} rules · ${categoryHubs.length} categories`,
    allRulesHaveSources ? 'Sources linked' : null,
    mostRecentUpdateDisplay ? `Reviewed ${mostRecentUpdateDisplay}` : null,
  ].filter((point): point is string => point !== null);

  return (
    <>
      <Layout canonicalPath="/">
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
          {/* P1.2: content column was previously narrower than the
              illustration column (1fr vs 1.1fr) -- the supporting image was
              literally wider than the primary search/hierarchy column.
              Flipped so content leads. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-14">

            {/* Left — headline + search. The one focal action on the page. */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
                Travel rules · India
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl font-black leading-[1.08] tracking-tight text-slate-900">
                Know what’s allowed <span className="text-blue-600">before you leave home</span>.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Find clear answers about airport rules, baggage, documents, and customs — with every rule linked to its source.
              </p>

              <div className="mt-7">
                <SearchBar value={searchQuery} onChange={handleSearchInputChange} onClear={handleClearSearch} />
                {/* P1-A: a live search has no submit action to label, so this
                    is a passive caption, not a button -- it just closes the
                    "is this live?" question the icon+placeholder alone don't
                    fully answer. Hidden once results are showing, since the
                    live update is then self-evident. */}
                {!hasSearchQuery && (
                  <p className="mt-2 text-xs text-slate-400">Results update instantly as you type.</p>
                )}
              </div>

              {!hasSearchQuery && (
                <div className="mt-4 flex flex-wrap items-center gap-x-2 text-sm">
                  <span className="text-slate-400 mr-1">Try:</span>
                  {quickSearchSuggestions.map((item, idx) => (
                    <Fragment key={item}>
                      <button
                        type="button"
                        onClick={() => handleSearchInputChange(item)}
                        className="inline-block py-2 font-medium text-slate-700 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 hover:decoration-blue-400 transition-colors"
                      >
                        {item}
                      </button>
                      {idx < quickSearchSuggestions.length - 1 && (
                        <span className="text-slate-300" aria-hidden="true">·</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              )}

              {!hasSearchQuery && trustPoints.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
                  {trustPoints.map(point => (
                    <li key={point} className="inline-flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* P1-C: a subtle fallback for someone who doesn't know what to
                  search -- deliberately one compact line, not the larger
                  card-based "Browse by what you need" section further down
                  the page. Reuses categoryHubs (buildCategoryUrl()-derived)
                  rather than any new/hardcoded URLs. */}
              {!hasSearchQuery && (
                <p className="mt-4 text-xs text-slate-400">
                  Not sure what to search?{' '}
                  {categoryHubs.map((hub, idx) => (
                    <Fragment key={hub.category}>
                      <Link href={hub.href} className="font-medium text-slate-500 hover:text-blue-600 underline decoration-slate-300 underline-offset-2 hover:decoration-blue-400 transition-colors">
                        {hub.label}
                      </Link>
                      {idx < categoryHubs.length - 1 && <span aria-hidden="true"> · </span>}
                    </Fragment>
                  ))}
                </p>
              )}

          {hasSearchQuery && (
            <div className="mt-4 space-y-4 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 text-slate-900 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.85)]">
                {isSearching ? (
                  <PlayfulLoader message="Checking the latest airport rules for you..." />
                ) : hasInlinePreviewContent ? (
                  <>
                    {heroCardMatches.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                          Guides & tools
                        </p>
                        <div className="grid gap-2">
                          {heroCardMatches.map(card => (
                            <Link
                              key={card.href}
                              href={card.href}
                              className="flex flex-col rounded-2xl border border-slate-100/80 bg-white/90 px-3 py-2 hover:border-blue-200 hover:bg-blue-50"
                            >
                              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                {card.eyebrow}
                              </span>
                              <span className="text-sm font-semibold text-slate-900">{card.title}</span>
                              <span className="text-xs text-slate-600">{card.description}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {heroShortcutMatches.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                          Jump to section
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {heroShortcutMatches.map(shortcut => (
                            <button
                              key={shortcut.id}
                              type="button"
                              onClick={() => scrollToSection(shortcut.id)}
                              className="rounded-full border border-slate-200/80 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                            >
                              {shortcut.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {heroPreviewRules.length > 0 && (
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-slate-700">
                          <span>
                            Showing {heroPreviewRules.length} rule result
                            {heroPreviewRules.length !== 1 ? 's' : ''} for “{trimmedSearch}”.
                          </span>
                          {showRuleScrollHint && (
                            <span className="text-xs font-medium text-slate-500">Scroll to explore more</span>
                          )}
                        </div>
                        <div className="relative mt-3">
                          <div className="max-h-80 overflow-y-auto pr-1" aria-live="polite">
                            <ul className="divide-y divide-slate-100">
                              {heroPreviewRules.map(rule => (
                                <li key={rule.slug}>
                                  <Link
                                    href={buildRuleUrl(rule)}
                                    className="group flex flex-col gap-1 rounded-2xl px-3 py-2 hover:bg-blue-50"
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                                        {rule.shortTitle}
                                      </p>
                                      <span
                                        className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${verdictBadgeStyles[rule.verdict.status]}`}
                                      >
                                        {verdictBadgeLabels[rule.verdict.status]}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-600">{rule.verdict.summary}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {showRuleScrollHint && (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent rounded-b-3xl" />
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-600">
                    No results for “{trimmedSearch}”. Try another keyword like power bank or stroller.
                  </p>
                )}
                </div>
              )}
            </div>

            {/* Right — supporting illustration. Sets context instantly and
                gives the hero warmth, without competing with the search. */}
            <div className="relative">
              {/* Container aspect matches the asset's own 1400x1161, so
                  object-cover crops essentially nothing. */}
              <div className="relative aspect-[6/5] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/hero-travel.png"
                  alt="A traveller checking her boarding pass beside a packed cabin bag in an airport departure area."
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: the primary post-hero discovery moment for anyone who
          doesn't yet know what to search. A hairline-divided list, not
          bordered/bg cards -- typography + whitespace carry the hierarchy
          (title, one-line answer, verdict as colored text), matching the
          Apple/Stripe/Google Flights reference this site follows elsewhere.
          Each row still surfaces the verdict + answer directly, so "Quick
          answers" below the heading is true at a glance, not just a promise
          you have to click through on.
          (The old standalone "Browse by what you need" category-card
          section was removed here, not compressed-and-relocated: the hero
          already has its own "Not sure what to search?" fallback linking
          to these exact 3 category URLs, so keeping a second copy anywhere
          on the page -- even a smaller one -- would still have been the
          duplicate navigation this phase is about removing.)
          Hidden during a search so it never competes with the user's own
          query. */}
      {!hasSearchQuery && popularRules.length > 0 && (
        <section className="bg-white border-b border-slate-200/60">
          {/* P1.4: asymmetric padding, not the symmetric py-14/py-20 this
              had before -- the top entry (right after the hero) keeps its
              full weight, but the bottom (the connector into "All travel
              rules") is tightened, since that combined gap was ~160px on
              desktop, well past what two sequential steps in one flow need. */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-10 sm:pb-14">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Popular travel questions</h2>
              <p className="mt-2 text-slate-600">Quick answers to the questions travellers ask most.</p>
            </div>
            {/* Editorial, not a card grid: hairline rules and typography
                carry this section, so it stays visually distinct from the
                directory's RuleCards below. Column-gap is wide (the text
                measure, not the container, sets the line length) and the
                row padding is symmetric, which fixes the earlier version
                where the divider crowded the next question's title. */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-14">
              {popularRules.map(rule => (
                <Link
                  key={`popular-${rule.slug}`}
                  href={buildRuleUrl(rule)}
                  className="group flex flex-col py-6 border-b border-slate-200/80 hover:border-blue-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <h3 className="text-[17px] font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {rule.shortTitle}
                  </h3>
                  <span
                    className={`mt-1.5 text-[11px] font-bold uppercase tracking-[0.08em] ${verdictTextStyles[rule.verdict.status]}`}
                  >
                    {verdictBadgeLabels[rule.verdict.status]}
                  </span>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {rule.verdict.summary}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-2 text-sm">
              <span className="text-slate-400 mr-1">Or read a guide:</span>
              {heroHighlights.map((card, idx) => (
                <Fragment key={card.href}>
                  <Link
                    href={card.href}
                    className="inline-block py-2 font-medium text-slate-600 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 hover:decoration-blue-400 transition-colors"
                  >
                    {card.title}
                  </Link>
                  {idx < heroHighlights.length - 1 && (
                    <span className="text-slate-300" aria-hidden="true">·</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 3: the complete directory. Deliberately quieter than the
          section above -- small eyebrow label (same pattern already used
          for the "Nearby airports" utility section below) instead of a big
          standalone intro, and one step down in heading size -- so it
          reads as "the full archive" rather than a second discovery
          moment. The topic nav here scrolls to same-page anchors, a
          different job from the hero's category-hub links (real pages),
          so it stays -- that's not the duplicate this phase is removing. */}
      {/* Top padding mirrors Popular Questions' reduced bottom padding
          (together forming the tightened connector gap); bottom padding
          stays generous since Nearby Airports below is a genuinely
          different, secondary utility that still deserves clear separation. */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-14 sm:pb-20">
        {!hasSearchQuery && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">All travel rules</h2>
            <p className="mt-1.5 text-slate-600">Complete directory of airport, document and customs rules.</p>
            {/* Pill nav: these jump to same-page anchors. Labels match the
                section headings they scroll to exactly, so a nav chip and
                its destination can never read as two different things. */}
            <div className="mt-5 flex flex-wrap gap-2">
              {categoryNav.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  type="button"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/60 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 mb-10 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
          <span className="text-slate-400 mr-2">Filter</span>
          <button
            type="button"
            onClick={() => setVerdictFilter('all')}
            className={`inline-flex items-center min-h-11 sm:min-h-0 px-2.5 py-1 rounded-md transition-colors ${!hasVerdictFilter ? 'font-semibold text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
          >
            All
          </button>
          {verdictButtons.map(option => {
            const isActive = verdictFilter === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleVerdictClick(option.id)}
                type="button"
                aria-pressed={isActive}
                className={`inline-flex items-center min-h-11 sm:min-h-0 px-2.5 py-1 rounded-md transition-colors ${isActive ? `font-semibold ${option.activeText}` : 'text-slate-500 hover:text-slate-800'}`}
              >
                {option.label}
              </button>
            );
          })}
          {hasSearchQuery && (
            <p className="ml-auto text-sm text-slate-500">
              {hasSearchResults
                ? `Showing ${searchFilteredRules.length} match${searchFilteredRules.length > 1 ? 'es' : ''} for “${trimmedSearch}”.`
                : `No matches for “${trimmedSearch}” yet.`}
            </p>
          )}
        </div>

        {hasSearchQuery ? (
          <section className="mb-16 scroll-mt-24" id="search-results">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Results for “{trimmedSearch}”</h2>
              {hasSearchResults && (
                <span className="text-sm text-slate-500">{searchFilteredRules.length} match{searchFilteredRules.length > 1 ? 'es' : ''} found</span>
              )}
            </div>
            {hasSearchResults ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchFilteredRules.map(rule => (
                  <RuleCard key={`search-${rule.slug}`} rule={rule} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                <p className="text-slate-500 text-lg">No rules found for “{trimmedSearch}”.</p>
                <button
                  onClick={handleClearSearch}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            {passportRules.length > 0 && (
              <section className="mb-16 scroll-mt-24" id="documents">
                <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 pb-3 mb-5">
                  <h3 className="min-w-0 text-xl font-bold text-slate-900">Documents & IDs</h3>
                  {passportRules.length > DEFAULT_SECTION_CARD_COUNT && (
                    <button
                      type="button"
                      onClick={() => toggleSection('documents')}
                      className="text-sm font-semibold text-blue-600 hover:underline whitespace-nowrap"
                    >
                      {expandedSections.documents ? 'Show less' : 'See all →'}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(expandedSections.documents ? passportRules : passportRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={rule.slug} rule={rule} />
                  ))}
                </div>
              </section>
            )}

            <section className="mb-16 scroll-mt-24" id="packing">
              <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 pb-3 mb-5">
                <h3 className="min-w-0 text-xl font-bold text-slate-900">Packing Tips</h3>
                {packingRules.length > DEFAULT_SECTION_CARD_COUNT && (
                  <button
                    type="button"
                    onClick={() => toggleSection('packing')}
                    className="text-sm font-semibold text-blue-600 hover:underline whitespace-nowrap"
                  >
                    {expandedSections.packing ? 'Show less' : 'See all →'}
                  </button>
                )}
              </div>
              {packingRules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(expandedSections.packing ? packingRules : packingRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={`packing-${rule.slug}`} rule={rule} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No packing tips available right now.</p>
              )}
            </section>

            <section className="mb-16 scroll-mt-24" id="customs">
              <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 pb-3 mb-5">
                <h3 className="min-w-0 text-xl font-bold text-slate-900">Customs & Duty</h3>
                {customsRules.length > DEFAULT_SECTION_CARD_COUNT && (
                  <button
                    type="button"
                    onClick={() => toggleSection('customs')}
                    className="text-sm font-semibold text-blue-600 hover:underline whitespace-nowrap"
                  >
                    {expandedSections.customs ? 'Show less' : 'See all →'}
                  </button>
                )}
              </div>
              {customsRules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(expandedSections.customs ? customsRules : customsRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={`customs-${rule.slug}`} rule={rule} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No customs rules available right now.</p>
              )}
            </section>

            <section className="mb-16 scroll-mt-24" id="family">
              <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 pb-3 mb-5">
                <h3 className="min-w-0 text-xl font-bold text-slate-900">Travelling with Family</h3>
                {familyRules.length > DEFAULT_SECTION_CARD_COUNT && (
                  <button
                    type="button"
                    onClick={() => toggleSection('family')}
                    className="text-sm font-semibold text-blue-600 hover:underline whitespace-nowrap"
                  >
                    {expandedSections.family ? 'Show less' : 'See all →'}
                  </button>
                )}
              </div>
              {familyRules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(expandedSections.family ? familyRules : familyRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={`family-${rule.slug}`} rule={rule} />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No family travel rules available right now.</p>
              )}
            </section>
          </>
        )}

      </div>

      <section className="bg-white border-t border-slate-200/60 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Nearby airports</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">Find airports close to you in one tap.</h2>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={handleFindAirports}
              disabled={locationStatus === 'pending'}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-white text-sm font-semibold shadow hover:bg-blue-500 disabled:opacity-60"
            >
              {locationStatus === 'pending' ? 'Locating…' : '📍 Show nearby airports (Allow location)'}
            </button>
            <div className="flex flex-col gap-1 text-xs text-slate-500">
              <p>We only use your location once to find nearby airports—nothing is stored or shared.</p>
              {permissionState === 'prompt' && isSecureOrigin === true && (
                <p>If you do not see a popup, click the padlock icon in your browser and allow location for this site.</p>
              )}
              {isSecureOrigin === false && (
                <p className="text-amber-600">Location only works on HTTPS or localhost. Open the secure version of this page and try again.</p>
              )}
              {permissionState === 'denied' && (
                <p className="text-amber-600">Location access is blocked. Click the padlock icon → Site settings → Allow location, then use the button again.</p>
              )}
            </div>
          </div>
          {locationStatus === 'pending' && (
            <div className="mt-4">
              <PlayfulLoader message="Scanning airports within 300 km of you..." />
            </div>
          )}
          {locationError && <p className="text-sm text-rose-600">{locationError}</p>}
          {locationStatus === 'ready' && nearbyAirports.length === 0 && (
            <p className="text-sm text-slate-600">
              No airports within {MAX_NEARBY_DISTANCE_KM} km of your location. Try searching your airport name above.
            </p>
          )}
          {locationStatus === 'ready' && nearbyAirports.length > 0 && (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyAirports.map(airport => (
                <div key={airport.code} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col gap-3 h-full">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{airport.city}</p>
                    <p className="text-xs text-slate-500">{airport.name}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-bold text-blue-600">{airport.distanceKm} km away</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-600">{formatDriveTime(airport.distanceKm)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold tracking-wide">{airport.code}</span>
                    <span className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600">Major hub</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>

    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // In a real app, you might fetch this from an API or file system
  // Since we import directly, it's available at build time
  const allRulesHaveSources = rules.every((rule) => rule.sources.length > 0);
  // ISO "YYYY-MM-DD" strings sort correctly lexicographically (same approach
  // as pages/sitemap.xml.ts's lastmod computation), so a plain string
  // comparison finds the most recent date without parsing.
  const mostRecentUpdate = rules.reduce(
    (latest, rule) => (rule.lastUpdated > latest ? rule.lastUpdated : latest),
    rules[0]?.lastUpdated ?? '',
  );
  const mostRecentUpdateDisplay = mostRecentUpdate ? formatDisplayDate(mostRecentUpdate) : '';

  return {
    props: {
      allRules: rules.map(toHomeRule),
      allRulesHaveSources,
      mostRecentUpdateDisplay,
    },
  };
};

