import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { footerLinks } from '@/config/navigation';
import { siteConfig } from '@/config/site';

/** Permanent footer — minimal by design: brand, a trust cue, a couple of
 *  essential links, and the disclaimer. Not a second homepage. */
export function SiteFooter() {
  return (
    <footer className="border-border bg-subtle mt-auto border-t">
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="text-muted-foreground mt-3 inline-flex items-center gap-2 text-xs">
              <ShieldCheck className="text-primary size-3.5" aria-hidden />
              Every answer cites an official source.
            </p>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-6">
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-border text-muted-foreground mt-8 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Information only — always confirm with
            your airline or the relevant authority before you travel.
          </p>
          <p className="shrink-0">Made for travellers in India 🇮🇳</p>
        </div>
      </Container>
    </footer>
  );
}
