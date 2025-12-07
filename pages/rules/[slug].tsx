import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import TagChip from '../../components/TagChip';
import { rules } from '../../data/rules';
import { Rule } from '../../data/types';

interface RulePageProps {
  rule: Rule;
}

export default function RulePage({ rule }: RulePageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const richContent = rule.richContent;
  const hasRichContent = Boolean(richContent);
  const richExamples = richContent?.examples ?? [];
  const hasExamples = richExamples.length > 0;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const getStatusColor = (status: Rule['verdict']['status']) => {
    switch (status) {
      case 'allowed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'not_allowed':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'limited':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  const getStatusIcon = (status: Rule['verdict']['status']) => {
    switch (status) {
      case 'allowed':
        return (
          <svg className="w-8 h-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'not_allowed':
        return (
          <svg className="w-8 h-8 mr-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'limited':
        return (
          <svg className="w-8 h-8 mr-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = (status: Rule['verdict']['status']) => {
    switch (status) {
      case 'allowed': return 'Allowed';
      case 'not_allowed': return 'Not Allowed';
      case 'limited': return 'Limited';
      default: return status;
    }
  };

  return (
    <Layout title={`${rule.title} | YourTravelGuide`} description={rule.verdict.summary}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton label="Back to all rules" className="mb-6" />

        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              {rule.title}
            </h1>

            {/* Verdict Box */}
            <div className={`rounded-lg border p-5 mb-8 flex items-start ${getStatusColor(rule.verdict.status)}`}>
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(rule.verdict.status)}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1 uppercase tracking-wide">
                  {getStatusLabel(rule.verdict.status)}
                </h2>
                <p className="text-base font-medium">
                  {rule.verdict.summary}
                </p>
              </div>
            </div>

            {hasRichContent ? (
              <>
                {/* Quick Answer */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Quick answer</h2>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-slate-800">
                    {richContent?.quickAnswer}
                  </div>
                </section>

                {/* Overview */}
                <section className="mb-8 space-y-4">
                  {richContent?.overview.map((paragraph, idx) => (
                    <p key={idx} className="text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </section>

                {/* Checklists */}
                {richContent && richContent.checklists.length ? (
                  <section className="mb-8 grid gap-5 md:grid-cols-2">
                    {richContent.checklists.map((list, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">{list.title}</h3>
                        <ul className="space-y-2 text-slate-700 text-sm">
                          {list.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start">
                              <span className="text-green-500 mr-2">✔</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                ) : null}

                {/* Optional Table */}
                {richContent?.table && (
                  <section className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">{richContent.table.caption}</h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50">
                          <tr>
                            {richContent.table.headers.map((header, idx) => (
                              <th key={idx} className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide text-xs">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {richContent.table.rows.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className="px-4 py-3 text-slate-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* Do & Don't */}
                {(richContent?.dos.length || richContent?.donts.length) && (
                  <section className="mb-8 grid gap-5 md:grid-cols-2">
                    <div className="border border-green-200 rounded-xl p-4 bg-green-50">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-3">Do this</h3>
                      <ul className="space-y-2 text-slate-700">
                        {richContent?.dos.map((item, idx) => (
                          <li key={idx}>✅ {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-amber-200 rounded-xl p-4 bg-amber-50">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-700 mb-3">Avoid this</h3>
                      <ul className="space-y-2 text-slate-700">
                        {richContent?.donts.map((item, idx) => (
                          <li key={idx}>⚠️ {item}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}

                {/* Examples */}
                {hasExamples ? (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Real-world examples</h2>
                    <ul className="space-y-3">
                      {richExamples.map((example, idx) => (
                        <li key={idx} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm text-slate-700">
                          💡 {example}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {/* FAQs */}
                {richContent && richContent.faqs.length ? (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
                    <div className="space-y-4">
                      {richContent.faqs.map((faq, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                          <h3 className="font-semibold text-slate-900 mb-1">Q. {faq.question}</h3>
                          <p className="text-slate-700">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}

                {/* Tips */}
                {richContent && richContent.tips.length ? (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Tips before you fly</h2>
                    <ul className="space-y-2 text-slate-700">
                      {richContent.tips.map((tip, idx) => (
                        <li key={idx}>✈️ {tip}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {/* Internal Links */}
                {richContent && richContent.internalLinks.length ? (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">Related YourTravelGuide guides</h2>
                    <div className="flex flex-wrap gap-2">
                      {richContent.internalLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          href={`/rules/${link.slug}`}
                          className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-blue-600 hover:border-blue-400"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}
              </>
            ) : (
              <>
                {/* How to Comply */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">How to pack and comply</h2>
                  <ul className="space-y-3">
                    {rule.howToComply.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Why Rule Exists */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Why this rule exists</h2>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                    {rule.whyRuleExists}
                  </p>
                </section>

                {/* Extra Notes */}
                {rule.extraNotes.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Things to keep in mind</h2>
                    <ul className="space-y-3">
                      {rule.extraNotes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-500 mr-3 mt-0.5 text-lg">•</span>
                          <span className="text-slate-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}

            <hr className="border-slate-200 my-8" />

            {/* Sources & Meta */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Official references</h3>
                <ul className="space-y-1">
                  {rule.sources.map((source, index) => (
                    <li key={index}>
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm inline-flex items-center"
                      >
                        {source.label}
                        <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-xs text-slate-400">
                Last updated on {formatDate(rule.lastUpdated)}
              </div>
            </div>

            {hasRichContent && (
              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">India DGCA guidelines — simplified</p>
                <p className="mt-1">Verified on: {richContent ? formatDate(richContent.verifiedOn) : formatDate(rule.lastUpdated)}</p>
                <p className="mt-2 text-slate-600 text-xs">Disclaimer: Aviation and security rules change frequently. Always confirm with your airline, airport help desk, or CISF officers before you travel.</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-100">
               <div className="flex flex-wrap">
                {rule.tags.map(tag => (
                  <TagChip key={tag} label={tag} />
                ))}
               </div>
            </div>

          </div>
        </article>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = rules.map((rule) => ({
    params: { slug: rule.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const rule = rules.find((r) => r.slug === slug);

  if (!rule) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      rule,
    },
  };
};
