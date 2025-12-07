import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import RuleCard from '../components/RuleCard';
import PlayfulLoader from '../components/PlayfulLoader';
import { rules } from '../data/rules';
import { Rule } from '../data/types';
import { airports } from '../data/airports';

type HomeRule = Pick<Rule, 'slug' | 'title' | 'shortTitle' | 'category' | 'tags' | 'verdict' | 'lastUpdated'> & {
  searchTokens: string[];
};

interface HomeProps {
  allRules: HomeRule[];
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
const DEFAULT_SECTION_CARD_COUNT = 3;

const verdictButtons: Array<{
  id: VerdictFilter;
  label: string;
  bg: string;
  border: string;
  hover: string;
  active: string;
}> = [
  {
    id: 'allowed',
    label: 'Allowed',
    bg: 'bg-green-50 text-green-700',
    border: 'border-green-200',
    hover: 'hover:bg-green-100 hover:text-green-900',
    active: 'bg-green-500 text-white border-green-500 shadow-[0_12px_30px_-18px_rgba(34,197,94,0.7)]',
  },
  {
    id: 'limited',
    label: 'Limited',
    bg: 'bg-amber-50 text-amber-700',
    border: 'border-amber-200',
    hover: 'hover:bg-amber-100 hover:text-amber-900',
    active: 'bg-amber-500 text-white border-amber-500 shadow-[0_12px_30px_-18px_rgba(245,158,11,0.7)]',
  },
  {
    id: 'not_allowed',
    label: 'Not Allowed',
    bg: 'bg-rose-50 text-rose-700',
    border: 'border-rose-200',
    hover: 'hover:bg-rose-100 hover:text-rose-900',
    active: 'bg-rose-500 text-white border-rose-500 shadow-[0_12px_30px_-18px_rgba(244,63,94,0.65)]',
  },
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

const heroHighlights = [
  {
    href: '/first-flight',
    eyebrow: 'Journey coach',
    title: '😊 First-time flyer guide',
    description: 'Seven calm steps with friendly reminders before each checkpoint.',
    accent: 'text-blue-500',
    searchKeywords: ['first flight', 'first-time flyer', 'new flyer', 'beginner'],
  },
  {
    href: '/rules/airport-security-behavior-tips',
    eyebrow: 'Security ready',
    title: '✈️ Airport security tips',
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

const quickSearchSuggestions = [
  'power bank cabin bag',
  'passport expiry rule',
  'duty free allowance',
  'baby food security check',
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
  tags: rule.tags,
  verdict: rule.verdict,
  lastUpdated: rule.lastUpdated,
  searchTokens: buildRuleSearchTokens(rule),
});

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


export default function Home({ allRules }: HomeProps) {
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
    flights: false,
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

  const flightsRules = useMemo(
    () => searchFilteredRules.filter(rule => rule.category === 'flight'),
    [searchFilteredRules]
  );
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

  const categoryNav = [
    { id: 'documents', label: '🪪 Documents & IDs' },
    { id: 'flights', label: '✈️ Flights' },
    { id: 'packing', label: '🎒 Packing Tips' },
    { id: 'customs', label: '💰 Customs & Duty' },
    { id: 'family', label: '👶 Travelling with Family' },
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

  return (
    <>
      <Layout>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-sky-500/30 to-transparent" />
          <div className="absolute -top-16 left-4 h-56 w-56 rounded-full bg-cyan-300/50 blur-[140px]" />
          <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-indigo-400/40 blur-[140px]" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            YourTravelGuide prep desk
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            Know what’s allowed <span className="bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">before you leave home</span>.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-3xl mx-auto lg:mx-0">
            Clear answers for your flight—documents, packing, customs, and travelling with family. Simple, current, and reassuring.
          </p>
        </div>
        <div className="relative mt-10 max-w-6xl mx-auto grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <div className="rounded-[28px] border border-white/25 bg-white/95/5 p-5 sm:p-6 backdrop-blur-xl shadow-[0_30px_90px_-60px_rgba(15,23,42,0.9)] flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-left">
                <p className="text-[11px] uppercase tracking-[0.45em] text-white/70 font-semibold">Quick rule finder</p>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Ask the exact airport question on your mind.</h2>
                <p className="text-sm text-white/80">Try “first-time flyer guide”, “airport security tips”, or “duty free allowance”—we answer with the matching guides, sections, and rules.</p>
              </div>
              <div className="relative">
                <SearchBar value={searchQuery} onChange={handleSearchInputChange} onClear={handleClearSearch} />
              </div>
              {!hasSearchQuery && (
                <div className="mt-3 text-left">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/70 font-semibold">Popular checks</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {quickSearchSuggestions.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSearchInputChange(item)}
                        className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-sm font-semibold text-white/85 hover:bg-white/25"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {hasSearchQuery && (
              <div className="mt-5 space-y-4 rounded-[24px] border border-slate-100 bg-white/98 p-4 sm:p-5 text-slate-900 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.85)]">
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
                                    href={`/rules/${rule.slug}`}
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
          <div className="rounded-[32px] border border-white/50 bg-white/95 px-5 py-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.75)] flex flex-col gap-5 h-full">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">Featured guides</p>
              <p className="text-xl font-bold text-slate-900 mt-1">Save time with our most-read walk-throughs.</p>
            </div>
            <div className="grid gap-4 content-start">
              {heroHighlights.map(card => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="rounded-2xl border border-slate-100 bg-white px-4 py-4 text-slate-900 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg transition flex flex-col gap-1"
                >
                  <p className={`text-[11px] font-semibold uppercase tracking-wide ${card.accent}`}>{card.eyebrow}</p>
                  <h3 className="mt-2 text-lg font-bold flex items-center gap-2">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.8)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Plan by goal</p>
                <h2 className="text-2xl font-bold text-slate-900">Jump into the section you need right now</h2>
              </div>
            </div>
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:snap-none">
              {journeyShortcuts.map(shortcut => (
                <button
                  key={shortcut.id}
                  type="button"
                  onClick={() => scrollToSection(shortcut.id)}
                  className="text-left rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 hover:border-blue-200 hover:bg-white transition shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] min-w-[220px] snap-center md:min-w-0 h-full"
                >
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {shortcut.emoji}
                  </span>
                  <p className="mt-3 text-base font-semibold text-slate-900">{shortcut.title}</p>
                  <p className="text-sm text-slate-600">{shortcut.helper}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 mb-10 grid gap-6 md:grid-cols-[2fr,3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Verdict filters</p>
            <div className="flex flex-wrap gap-3">
              {verdictButtons.map(option => {
                const isActive = verdictFilter === option.id;
                const palette = isActive ? option.active : `${option.bg} ${option.border}`;
                const hoverClass = isActive ? 'hover:opacity-90' : option.hover;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleVerdictClick(option.id)}
                    type="button"
                    className={`filter-pill ${hoverClass} ${palette}`}
                  >
                    {option.label}
                  </button>
                );
              })}
              <button
                onClick={() => setVerdictFilter('all')}
                disabled={!hasVerdictFilter}
                type="button"
                className={`filter-pill filter-pill--reset ${hasVerdictFilter ? 'bg-white' : 'bg-slate-50'}`}
              >
                Clear
              </button>
            </div>
          </div>
          <div>
            {hasSearchQuery ? (
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Search snapshot</p>
                <p className="text-sm text-slate-600">
                  {hasSearchResults
                    ? `Showing ${searchFilteredRules.length} match${searchFilteredRules.length > 1 ? 'es' : ''} for “${trimmedSearch}”.`
                    : `No matches for “${trimmedSearch}” yet.`}
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Jump to topics</p>
                <div className="flex flex-wrap gap-2">
                  {categoryNav.map(link => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      type="button"
                      className="topic-chip"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {hasSearchQuery ? (
          <section className="mb-12 scroll-mt-24" id="search-results">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Search results</p>
                <h2 className="text-2xl font-bold text-slate-900">Results for “{trimmedSearch}”</h2>
              </div>
              {hasSearchResults && (
                <span className="text-sm text-slate-500">{searchFilteredRules.length} match{searchFilteredRules.length > 1 ? 'es' : ''} found</span>
              )}
            </div>
            {hasSearchResults ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchFilteredRules.map(rule => (
                  <RuleCard key={`search-${rule.slug}`} rule={rule} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-slate-200 border-dashed">
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
              <section className="mb-12 scroll-mt-24" id="documents">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">Passport & Ticket Rules</p>
                    <h2 className="text-2xl font-bold text-slate-900">Documents & IDs</h2>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    {passportRules.length > DEFAULT_SECTION_CARD_COUNT && (
                      <button
                        type="button"
                        onClick={() => toggleSection('documents')}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        {expandedSections.documents ? 'Show less' : `Show ${passportRules.length - DEFAULT_SECTION_CARD_COUNT} more`}
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(expandedSections.documents ? passportRules : passportRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={rule.slug} rule={rule} contextLabel="Documents & ID" />
                  ))}
                </div>
              </section>
            )}

            <section className="mb-12 scroll-mt-24" id="flights">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Flights · Batteries · Security</p>
                  <h2 className="text-2xl font-bold text-slate-900">Flights</h2>
                </div>
                {flightsRules.length > DEFAULT_SECTION_CARD_COUNT && (
                  <button
                    type="button"
                    onClick={() => toggleSection('flights')}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {expandedSections.flights ? 'Show less' : `Show ${flightsRules.length - DEFAULT_SECTION_CARD_COUNT} more`}
                  </button>
                )}
              </div>
              {flightsRules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(expandedSections.flights ? flightsRules : flightsRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={`flight-${rule.slug}`} rule={rule} contextLabel="Flight Rule" />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No flight rules available right now.</p>
              )}
            </section>

            <section className="mb-12 scroll-mt-24" id="packing">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Packing Tips</p>
                  <h2 className="text-2xl font-bold text-slate-900">Packing Tips</h2>
                </div>
                {packingRules.length > DEFAULT_SECTION_CARD_COUNT && (
                  <button
                    type="button"
                    onClick={() => toggleSection('packing')}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {expandedSections.packing ? 'Show less' : `Show ${packingRules.length - DEFAULT_SECTION_CARD_COUNT} more`}
                  </button>
                )}
              </div>
              {packingRules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(expandedSections.packing ? packingRules : packingRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={`packing-${rule.slug}`} rule={rule} contextLabel="Packing Tip" />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No packing tips available right now.</p>
              )}
            </section>

            <section className="mb-12 scroll-mt-24" id="customs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Customs & Duty</p>
                  <h2 className="text-2xl font-bold text-slate-900">Customs & Duty</h2>
                </div>
                {customsRules.length > DEFAULT_SECTION_CARD_COUNT && (
                  <button
                    type="button"
                    onClick={() => toggleSection('customs')}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {expandedSections.customs ? 'Show less' : `Show ${customsRules.length - DEFAULT_SECTION_CARD_COUNT} more`}
                  </button>
                )}
              </div>
              {customsRules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(expandedSections.customs ? customsRules : customsRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={`customs-${rule.slug}`} rule={rule} contextLabel="Customs & Duty" />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No customs rules available right now.</p>
              )}
            </section>

            <section className="mb-12 scroll-mt-24" id="family">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Travelling with Family</p>
                  <h2 className="text-2xl font-bold text-slate-900">Travelling with Family</h2>
                </div>
                {familyRules.length > DEFAULT_SECTION_CARD_COUNT && (
                  <button
                    type="button"
                    onClick={() => toggleSection('family')}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {expandedSections.family ? 'Show less' : `Show ${familyRules.length - DEFAULT_SECTION_CARD_COUNT} more`}
                  </button>
                )}
              </div>
              {familyRules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(expandedSections.family ? familyRules : familyRules.slice(0, DEFAULT_SECTION_CARD_COUNT)).map(rule => (
                    <RuleCard key={`family-${rule.slug}`} rule={rule} contextLabel="Family Travel" />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No family travel rules available right now.</p>
              )}
            </section>
          </>
        )}

      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400 font-semibold">Nearby airports</p>
            <h2 className="text-2xl font-semibold text-slate-900">Find airports close to you in one tap.</h2>
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
  return {
    props: {
      allRules: rules.map(toHomeRule),
    },
  };
};

