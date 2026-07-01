import { Container } from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { footerColumns } from '@/config/navigation';
import { siteConfig } from '@/config/site';

/** Permanent footer: sitemap by domain + trust/legal + honest positioning line. */
export function SiteFooter() {
  return (
    <footer className="border-border bg-subtle border-t">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="text-muted-foreground mt-3 text-sm">
              Clear, source-verified answers for Indian travellers — before, during, and after every
              trip.
            </p>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-foreground text-xs font-semibold tracking-wide uppercase">
                {col.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-border text-muted-foreground mt-10 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Information only — always verify with
            your airline or the relevant authority before you travel.
          </p>
          <p>Made for travellers in India.</p>
        </div>
      </Container>
    </footer>
  );
}
