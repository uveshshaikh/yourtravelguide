import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { footerColumns } from '@/config/navigation';
import { siteConfig } from '@/config/site';

/** Permanent footer: brand + trust cue + a real, working sitemap. */
export function SiteFooter() {
  return (
    <footer className="border-border bg-subtle mt-auto border-t">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand + trust */}
          <div className="max-w-sm">
            <Logo />
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Clear, source-verified travel answers for Indian travellers — before, during, and
              after every trip.
            </p>
            <p className="text-muted-foreground mt-4 inline-flex items-center gap-2 text-xs">
              <ShieldCheck className="text-primary size-4" aria-hidden />
              Every answer cites an official source.
            </p>
          </div>

          {/* Sitemap columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-foreground text-xs font-semibold tracking-wide uppercase">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
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

        <div className="border-border text-muted-foreground mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed">
            © {new Date().getFullYear()} {siteConfig.name}. Information only — always confirm with
            your airline or the relevant authority before you travel.
          </p>
          <p className="shrink-0">Made for travellers in India 🇮🇳</p>
        </div>
      </Container>
    </footer>
  );
}
