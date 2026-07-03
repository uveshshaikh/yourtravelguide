import { Search } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { primaryNav } from '@/config/navigation';
import { Kbd } from '@/components/ui/kbd';

/**
 * Permanent application header. Sticky, calm, premium: brand · primary nav ·
 * search · theme. Every nav item is a real, populated destination. Search stays
 * a compact entry point (the full instant search lives on the homepage & /search).
 */
export function SiteHeader() {
  const hasNav = primaryNav.length > 0;
  return (
    <header className="border-border/80 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-6">
        <Logo />

        {hasNav ? (
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="ml-auto flex items-center gap-1.5">
          {/* Compact search — full width only where it reads as the primary action. */}
          <a
            href="/search"
            aria-label="Search questions"
            className="group border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground hidden items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors sm:flex"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden lg:inline">Search</span>
            <Kbd className="ml-2 hidden lg:inline-flex">/</Kbd>
          </a>
          <a
            href="/search"
            aria-label="Search questions"
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-grid size-9 place-items-center rounded-lg transition-colors sm:hidden"
          >
            <Search className="size-5" aria-hidden />
          </a>

          <div className="bg-border mx-1 hidden h-5 w-px sm:block" aria-hidden />
          <ThemeToggle />
          {hasNav ? <MobileNav /> : null}
        </div>
      </Container>
    </header>
  );
}
