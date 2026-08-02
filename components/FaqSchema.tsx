import Head from 'next/head';
import { RuleFAQ } from '../data/types';

interface FaqSchemaProps {
  faqs: RuleFAQ[];
}

/**
 * Injects a FAQPage JSON-LD block into <head>.
 * Mount alongside <Breadcrumb> on any rule page that has richContent.faqs.
 */
export default function FaqSchema({ faqs }: FaqSchemaProps) {
  if (!faqs.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        key={`faq-${faqs[0]?.question.slice(0, 20)}`}
      />
    </Head>
  );
}
