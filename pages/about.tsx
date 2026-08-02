import Link from 'next/link';
import Layout from '../components/Layout';

const sources = [
  { emoji: '✈️', label: 'BCAS — Bureau of Civil Aviation Security', href: 'https://bcasindia.gov.in' },
  { emoji: '🛂', label: 'DGCA — Directorate General of Civil Aviation', href: 'https://dgca.gov.in' },
  { emoji: '🛃', label: 'CBIC — Central Board of Indirect Taxes & Customs', href: 'https://cbic.gov.in' },
  { emoji: '📦', label: 'IATA Dangerous Goods Regulations', href: 'https://www.iata.org/en/programs/cargo/dgr/' },
];

const stats = [
  { value: '52+', label: 'Rules covered', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
  { value: '3', label: 'Topic categories', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-100' },
  { value: '2026', label: 'Last full audit', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
  { value: '100%', label: 'Free to use', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
];

const covers = [
  {
    emoji: '🛄',
    title: 'Airport Rules',
    desc: 'Cabin bag limits, liquids & gels, restricted items, and what CISF checks at security.',
    href: '/airport-rules',
    accent: 'border-blue-200 hover:bg-blue-50 hover:border-blue-300',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    emoji: '🛂',
    title: 'Travel Documents',
    desc: 'Valid IDs for domestic flights, passport rules, OCI card, and documents for minors.',
    href: '/travel-documents',
    accent: 'border-violet-200 hover:bg-violet-50 hover:border-violet-300',
    badge: 'bg-violet-100 text-violet-700',
  },
  {
    emoji: '🛃',
    title: 'Customs',
    desc: 'Duty-free limits, gold allowances, FEMA cash rules, and green vs red channel.',
    href: '/customs',
    accent: 'border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700',
  },
];

const process = [
  { step: '01', title: 'Source', desc: 'Every rule traces back to an official BCAS, DGCA, CBIC, or IATA document.' },
  { step: '02', title: 'Verify', desc: 'We cross-check against the circular date and confirm nothing conflicts with airline policies.' },
  { step: '03', title: 'Publish', desc: 'Written in plain language — verdict first, details below, source linked at the bottom.' },
  { step: '04', title: 'Audit', desc: 'Full site review every quarter; any major policy change triggers an instant update.' },
];

export default function About() {
  const pageTitle = 'About YourTravelGuide — India Airport Rules Explained';
  const pageDescription =
    "Learn why YourTravelGuide was built, how we source and verify every airport and customs rule, and what makes us India's plain-language travel reference.";

  return (
    <Layout title={pageTitle} description={pageDescription} canonicalPath="/about">

      {/* ── Hero banner ───────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 pb-16">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-blue-200 mb-3">About Us</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-5">
            Helping Indian travellers<br className="hidden sm:block" /> know what is allowed.
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
            A free, continuously updated reference for airport rules, travel documents, and customs — sourced from
            official BCAS, DGCA, and Customs circulars and written so you can check in under a minute.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
          {stats.map(s => (
            <div key={s.label} className={`rounded-2xl border p-5 text-center shadow-md ${s.bg}`}>
              <p className={`text-4xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Why we built this ─────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Why we built this</h2>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <p className="text-slate-600 leading-relaxed">
              YourTravelGuide started as a shared note among friends asking the same questions before every trip —
              &ldquo;Can I carry this in my cabin bag?&rdquo;, &ldquo;Do I need a printed ticket?&rdquo;, &ldquo;How much cash can I bring from abroad?&rdquo;
              Official sources exist, but they are scattered across BCAS circulars, DGCA handbooks, and CBIC duty-free PDFs
              that take real time to find and parse.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We turned that note into a structured site — one page per rule, verdict first, full context below. The goal
              is simple: you should never be surprised at the security counter or customs belt because of something you
              could have checked in 30 seconds.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The site has since grown to 52+ rules across cabin baggage, checked baggage, travel documents, first-time
              flying, and customs. Every rule page links directly to the official regulation it is based on.
            </p>
          </div>
        </section>

        {/* ── How we keep it accurate ───────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <h2 className="text-2xl font-extrabold text-slate-900">How we keep it accurate</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {process.map(p => (
              <div key={p.step} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-4">
                <span className="text-3xl font-black text-slate-100 leading-none select-none w-10 flex-shrink-0">{p.step}</span>
                <div>
                  <p className="font-bold text-slate-900 mb-1">{p.title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-slate-600 leading-relaxed">
            Found something outdated? Email{' '}
            <a href="mailto:yourtravelguidecontactus@gmail.com" className="text-blue-600 font-semibold hover:underline">
              yourtravelguidecontactus@gmail.com
            </a>{' '}
            — we verify and update within 48 hours.
          </div>
        </section>

        {/* ── What we cover ─────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <h2 className="text-2xl font-extrabold text-slate-900">What we cover</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {covers.map(card => (
              <Link
                key={card.href}
                href={card.href}
                className={`group block rounded-2xl border bg-white p-5 transition-all shadow-sm ${card.accent}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xl rounded-xl px-2 py-1 ${card.badge}`}>{card.emoji}</span>
                  <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{card.title}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                <p className="mt-3 text-xs font-semibold text-blue-500 group-hover:gap-2 transition-all">Browse rules →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Official sources ──────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Our primary sources</h2>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <p className="text-sm text-slate-400 mb-5 font-medium uppercase tracking-wide">We source exclusively from official bodies</p>
            <div className="space-y-3">
              {sources.map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-white border border-slate-200 px-5 py-4 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <span className="text-xl">{s.emoji}</span>
                  <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors text-sm sm:text-base">{s.label}</span>
                  <span className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors text-sm">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Disclaimer ────────────────────────────────────────────────── */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-xs text-slate-400 leading-relaxed">
            YourTravelGuide is an independent informational website and is not affiliated with BCAS, DGCA, or any Indian
            government body. Rules change — always verify critical requirements with the official source or your airline
            before travel. See our{' '}
            <Link href="/disclaimer" className="underline hover:text-slate-600 transition-colors">
              full disclaimer
            </Link>
            .
          </p>
        </div>

      </div>
      </div>
    </Layout>
  );
}

