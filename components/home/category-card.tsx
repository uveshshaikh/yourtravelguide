import {
  ArrowRight,
  Compass,
  FileText,
  HeartPulse,
  Landmark,
  Luggage,
  Plane,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

/** Icon per category (calm, literal wayfinding — falls back to a compass). */
const categoryIcon: Record<string, LucideIcon> = {
  'Documents & visas': FileText,
  'Baggage & items': Luggage,
  'Security & screening': ShieldCheck,
  'Customs & duty-free': Landmark,
  'At the airport': Plane,
  'Money & currency': Wallet,
  'Health & vaccines': HeartPulse,
};

/**
 * CategoryCard — a wayfinding tile. Icon + name + one honest line + a live count,
 * so a traveller can self-select their area in one glance. Links to /search
 * filtered visually by category (browse view groups by category).
 */
export function CategoryCard({
  category,
  description,
  count,
}: {
  category: string;
  description: string;
  count: number;
}) {
  const Icon = categoryIcon[category] ?? Compass;
  return (
    <a
      href="/search"
      className="group border-border bg-card hover:border-primary/40 hover:shadow-primary/5 flex items-start gap-4 rounded-2xl border p-5 transition-all hover:shadow-lg"
    >
      <span className="bg-accent text-accent-foreground grid size-11 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-105">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{category}</h3>
          <span className="text-muted-foreground text-xs">{count}</span>
          <ArrowRight
            className="text-muted-foreground/50 group-hover:text-primary ml-auto size-4 transition-all group-hover:translate-x-0.5"
            aria-hidden
          />
        </div>
        <p className="text-muted-foreground mt-1 text-sm text-pretty">{description}</p>
      </div>
    </a>
  );
}
