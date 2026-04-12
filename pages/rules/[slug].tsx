import { GetStaticProps, GetStaticPaths } from 'next';
import { rules } from '../../data/rules';
import { Rule } from '../../data/types';
import RuleDetail from '../../components/RuleDetail';
import { buildRuleUrl, isNewArchRule } from '../../lib/urls';

interface RulePageProps {
  rule: Rule;
}

export default function RulePage({ rule }: RulePageProps) {
  return <RuleDetail rule={rule} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Only pre-build pages for legacy rules.
  // New-arch rules are handled exclusively by next.config.ts (server-level 301
  // fires before routing so a static page for those slugs is never served).
  const paths = rules
    .filter((rule) => !isNewArchRule(rule))
    .map((rule) => ({
      params: { slug: rule.slug },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<RulePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const rule = rules.find((r) => r.slug === slug);

  if (!rule) {
    return { notFound: true };
  }

  // Permanently redirect migrated rules to their new canonical URL.
  // This fires once the rule's category is updated to a new-arch category.
  if (isNewArchRule(rule)) {
    return {
      redirect: {
        destination: buildRuleUrl(rule),
        permanent: true,
      },
    };
  }

  return { props: { rule } };
};

