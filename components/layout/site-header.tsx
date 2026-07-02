import { Search } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { SearchTrigger } from '@/components/layout/search-trigger';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { primaryNav } from '@/config/navigation';

/**
 * Permanent application header. Sticky, calm, minimal. Search is the primary
 * navigation, so it gets the most prominent slot. Primary nav + mobile menu
 * render ONLY when there are real destinations (no dead links).
 */
export function SiteHeader() {
  const hasNav = primaryNav.length > 0;
  return (
    <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/65 sticky top-0 z-40 border-b backdrop-blur-lg">
      <Container className="flex h-16 items-center gap-4">
        <Logo />

        {hasNav ? (
          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {primaryNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        {/* Search — the prominent, primary action. */}
        <div className="ml-auto hidden max-w-sm flex-1 sm:block">
          <SearchTrigger />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:ml-0">
          <a
            href="/search"
            aria-label="Search questions"
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-grid size-9 place-items-center rounded-lg transition-colors sm:hidden"
          >
            <Search className="size-5" aria-hidden />
          </a>
          <ThemeToggle />
          {hasNav ? <MobileNav /> : null}
        </div>
      </Container>
    </header>
  );
}
