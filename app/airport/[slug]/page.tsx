import { notFound } from 'next/navigation';
import { resolveEntityPage } from '@/services/resolver';
import { EntityPage } from '@/components/entities/entity-page';

/** /airport/[slug] — an airport and its published, verified questions. */
export default async function AirportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await resolveEntityPage('airport', slug);
  if (result.state === 'not_found') notFound();
  return <EntityPage view={result.view} kindLabel="Airport" />;
}
