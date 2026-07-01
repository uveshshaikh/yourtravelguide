import { ArrowRight, Building2, Plane, Users } from 'lucide-react';
import type { AppliesToView } from '@/lib/knowledge/view';
import { cn } from '@/lib/utils';

/**
 * AppliesToPanel — "Does this apply to me?" made explicit. Shows the resolved
 * scope of the answer (origin → destination, travel type, airlines, airports,
 * traveller profiles) so a user instantly knows whether it's about *their* trip.
 * Absent dimensions mean "all" and are shown as such.
 */
function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Plane;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="min-w-0">
        <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm">{value}</dd>
      </div>
    </div>
  );
}

const chip = 'inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium';

export function AppliesToPanel({
  appliesTo,
  className,
}: {
  appliesTo: AppliesToView;
  className?: string;
}) {
  const { origin, destination, travelType, airlines, airports, profiles } = appliesTo;
  const route =
    origin || destination ? (
      <span className="inline-flex items-center gap-1.5">
        <span className="font-medium">{origin ?? 'Any origin'}</span>
        <ArrowRight className="text-muted-foreground size-3.5" aria-hidden />
        <span className="font-medium">{destination ?? 'Any destination'}</span>
      </span>
    ) : (
      'Any route'
    );

  return (
    <section
      aria-labelledby="applies-to-heading"
      className={cn('border-border bg-card rounded-xl border p-5', className)}
    >
      <h2 id="applies-to-heading" className="text-sm font-semibold">
        Applies to
      </h2>
      <dl className="divide-border mt-1 divide-y">
        <Row icon={Plane} label="Route" value={route} />
        <Row
          icon={Plane}
          label="Travel type"
          value={
            travelType === 'both' || !travelType
              ? 'Domestic & international'
              : travelType === 'domestic'
                ? 'Domestic'
                : 'International'
          }
        />
        <Row
          icon={Plane}
          label="Airlines"
          value={
            airlines?.length ? (
              <span className="flex flex-wrap gap-1.5">
                {airlines.map((a) => (
                  <span key={a} className={chip}>
                    {a}
                  </span>
                ))}
              </span>
            ) : (
              'All airlines'
            )
          }
        />
        {airports?.length ? (
          <Row
            icon={Building2}
            label="Airports"
            value={
              <span className="flex flex-wrap gap-1.5">
                {airports.map((a) => (
                  <span key={a} className={chip}>
                    {a}
                  </span>
                ))}
              </span>
            }
          />
        ) : null}
        <Row
          icon={Users}
          label="Travellers"
          value={
            profiles?.length ? (
              <span className="flex flex-wrap gap-1.5">
                {profiles.map((p) => (
                  <span key={p} className={chip}>
                    {p}
                  </span>
                ))}
              </span>
            ) : (
              'All travellers'
            )
          }
        />
      </dl>
    </section>
  );
}
