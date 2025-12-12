import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "YourTravelGuide – Know what’s allowed before you travel",
  description = "Check what items are allowed in flight, train, and bus travel in India. Simple, fast, and reliable rules."
}) => {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navItems = [
    { href: '/first-flight', label: 'First-flight guide' },
    { href: '/rules/airport-security-behavior-tips', label: 'Security tips' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  const normalizePath = (path: string) => {
    if (path === '/') return '/';
    return path.replace(/\/+$/, '');
  };
  const currentPath = normalizePath(router.asPath.split('?')[0] ?? '/');
  const isActive = (href: string) => currentPath === normalizePath(href);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      setShowScrollTop(window.scrollY > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileNav = () => setMobileNavOpen(false);
  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileNav}>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent transition group-hover:opacity-85">
              YourTravelGuide
            </span>
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/5 ring-1 ring-white/60 shadow-sm text-xl"
              role="img"
              aria-label="Small airplane"
            >
              🛩️
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-100/80 px-2 py-1 text-sm font-semibold text-slate-500 shadow-sm">
            {navItems.map(item => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    active
                      ? 'bg-white text-blue-600 shadow'
                      : 'hover:bg-white hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 hover:text-blue-600 hover:border-blue-200"
            onClick={() => setMobileNavOpen(prev => !prev)}
            aria-expanded={mobileNavOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileNavOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden">
            <div
              className="fixed inset-0 bg-slate-900/60"
              onClick={closeMobileNav}
              aria-hidden="true"
            />
            <div className="fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl border-l border-slate-200 flex flex-col p-6 gap-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-slate-900">Menu</p>
                <button
                  type="button"
                  onClick={closeMobileNav}
                  className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-blue-600"
                  aria-label="Close menu"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {navItems.map(item => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={`mobile-${item.href}`}
                      href={item.href}
                      onClick={closeMobileNav}
                      aria-current={active ? 'page' : undefined}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Need help?</p>
                <a href="mailto:contact@yourtravelguide.in" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  contact@yourtravelguide.in
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-5 right-4 sm:right-6 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition sm:bottom-6 z-40"
          aria-label="Scroll back to top"
        >
          <span className="hidden sm:inline">Back to top</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="text-center md:text-left space-y-2">
              <p className="text-lg font-semibold text-slate-900">YourTravelGuide</p>
              <p className="text-sm text-slate-500">A simple checklist for travelers to confirm what&apos;s allowed before they start their journey.</p>
              <p className="text-sm text-slate-500">
                Email <a href="mailto:contact@yourtravelguide.in" className="text-blue-600 font-semibold">contact@yourtravelguide.in</a> with any question.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm text-slate-600">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-400">Explore</p>
                <div className="flex flex-col gap-1">
                  <Link href="/" className="hover:text-blue-600">Rules</Link>
                  <Link href="/first-flight" className="hover:text-blue-600">First-flight guide</Link>
                  <Link href="/rules/airport-security-behavior-tips" className="hover:text-blue-600">Security tips</Link>
                  <Link href="/about" className="hover:text-blue-600">About</Link>
                </div>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-400">Policy</p>
                <div className="flex flex-col gap-1">
                  <Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-blue-600">Terms &amp; Conditions</Link>
                  <Link href="/disclaimer" className="hover:text-blue-600">Disclaimer</Link>
                  <Link href="/contact" className="hover:text-blue-600">Contact</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} YourTravelGuide. Information is for general guidance only. Always confirm with official airline or airport sources.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
