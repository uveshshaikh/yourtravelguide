import { notFound } from 'next/navigation';
import { resolveEntityPage } from '@/services/resolver';
import { EntityPage } from '@/components/entities/entity-page';

/** /airline/[slug] — an airline and its published, verified questions. */
export default async function AirlinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await resolveEntityPage('airline', slug);
  if (result.state === 'not_found') notFound();
  return <EntityPage view={result.view} kindLabel="Airline" />;
}
