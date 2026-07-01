import { type LucideIcon, Building2, FileText, Globe, Plane, Route, Users } from 'lucide-react';
import type {
  AirlineView,
  AirportView,
  CountryView,
  DocumentView,
  JourneyView,
  ProfileView,
} from '@/lib/knowledge/view';
import { cn } from '@/lib/utils';

/**
 * Entity cards — reusable, typed-props summaries of the real-world entities the
 * knowledge graph is built on. Each is a compact link surface for hubs, search,
 * and related sections.
 */
function EntityCardShell({
  icon: Icon,
  code,
  title,
  subtitle,
  meta,
  href,
  className,
}: {
  icon: LucideIcon;
  code?: string;
  title: string;
  subtitle?: string;
  meta?: string;
  href?: string;
  className?: string;
}) {
  const inner = (
    <>
      <div className="flex items-start gap-3">
        <span className="bg-accent text-accent-foreground grid size-10 shrink-0 place-items-center rounded-lg">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{title}</h3>
            {code ? (
              <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                {code}
              </span>
            ) : null}
          </div>
          {subtitle ? (
            <p className="text-muted-foreground mt-0.5 truncate text-sm">{subtitle}</p>
          ) : null}
        </div>
        {meta ? <span className="text-muted-foreground shrink-0 text-xs">{meta}</span> : null}
      </div>
    </>
  );
  const base = 'block rounded-xl border border-border bg-card p-4';
  return href ? (
    <a href={href} className={cn(base, 'hover:border-primary/40 transition-colors', className)}>
      {inner}
    </a>
  ) : (
    <div className={cn(base, className)}>{inner}</div>
  );
}

export function AirlineCard({ airline }: { airline: AirlineView }) {
  return (
    <EntityCardShell
      icon={Plane}
      code={airline.code}
      title={airline.name}
      subtitle={airline.countryCode ? `Based in ${airline.countryCode}` : undefined}
      href={airline.href}
    />
  );
}

export function AirportCard({ airport }: { airport: AirportView }) {
  const loc = [airport.city, airport.countryCode].filter(Boolean).join(', ');
  return (
    <EntityCardShell
      icon={Building2}
      code={airport.code}
      title={airport.name}
      subtitle={loc || undefined}
      href={airport.href}
    />
  );
}

export function CountryCard({ country }: { country: CountryView }) {
  return (
    <EntityCardShell icon={Globe} code={country.code} title={country.name} href={country.href} />
  );
}

export function DocumentCard({ document }: { document: DocumentView }) {
  return (
    <EntityCardShell
      icon={FileText}
      title={document.name}
      subtitle={document.category}
      href={document.href}
    />
  );
}

export function ProfileCard({ profile }: { profile: ProfileView }) {
  return (
    <EntityCardShell
      icon={Users}
      title={profile.name}
      subtitle={profile.description}
      href={profile.href}
    />
  );
}

export function JourneyCard({ journey }: { journey: JourneyView }) {
  return (
    <EntityCardShell
      icon={Route}
      title={journey.title}
      subtitle={journey.description}
      meta={journey.stepCount ? `${journey.stepCount} steps` : undefined}
      href={journey.href}
    />
  );
}
