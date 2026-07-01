import { Container } from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { SearchTrigger } from '@/components/layout/search-trigger';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { primaryNav } from '@/config/navigation';

/**
 * Permanent application header. Sticky, calm, minimal. Journey-framed primary
 * nav on desktop; a compact search entry point; theme toggle; disclosure menu
 * on mobile. `relative` anchors the mobile panel.
 */
export function SiteHeader() {
  return (
    <header className="border-border bg-background/90 supports-[backdrop-filter]:bg-background/75 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="relative flex h-16 items-center gap-4">
        <Logo />

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

        <div className="ml-auto flex items-center gap-1.5">
          <div className="hidden w-56 sm:block lg:w-64">
            <SearchTrigger size="bar" />
          </div>
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
