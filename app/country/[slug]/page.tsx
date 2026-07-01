import { notFound } from 'next/navigation';
import { resolveEntityPage } from '@/services/resolver';
import { EntityPage } from '@/components/entities/entity-page';

/** /country/[slug] — a country and its published, verified questions. */
export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await resolveEntityPage('country', slug);
  if (result.state === 'not_found') notFound();
  return <EntityPage view={result.view} kindLabel="Country" />;
}
