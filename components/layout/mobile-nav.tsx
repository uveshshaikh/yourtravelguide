'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { primaryNav } from '@/config/navigation';

/**
 * Mobile navigation — an accessible inline disclosure (not a modal overlay, so
 * no focus trap is required). Toggle exposes aria-expanded/controls; Escape and
 * link selection close it. Shown only below the `md` breakpoint.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-grid size-9 place-items-center rounded-md transition-colors"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="border-border bg-background absolute inset-x-0 top-full border-b shadow-sm"
        >
          <nav aria-label="Primary" className="flex flex-col gap-1 px-4 py-3">
            {primaryNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-foreground hover:bg-muted rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
