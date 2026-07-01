import Link from 'next/link';
import { Plane } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/** Wordmark + mark. Links home; used in header and footer. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2 font-semibold tracking-tight', className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="bg-primary text-primary-foreground grid size-7 place-items-center rounded-md">
        <Plane className="size-4" aria-hidden />
      </span>
      <span className="text-[0.95rem]">
        Your<span className="text-primary">Travel</span>Guide
      </span>
    </Link>
  );
}
