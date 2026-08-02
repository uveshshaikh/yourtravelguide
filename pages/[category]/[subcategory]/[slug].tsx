import { GetStaticPaths, GetStaticProps } from 'next';
import { rules } from '../../../data/rules';
import { Rule } from '../../../data/types';
import RuleDetail from '../../../components/RuleDetail';
import { isNewArchRule } from '../../../lib/urls';

interface PageProps {
  rule: Rule;
}

export default function CategoryRulePage({ rule }: PageProps) {
  return <RuleDetail rule={rule} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = rules
    .filter(isNewArchRule)
    .map((rule) => ({
      params: {
        category: rule.category,
        subcategory: rule.subcategory,
        slug: rule.slug,
      },
    }));

  // fallback: false — any path not pre-generated returns 404.
  // Switch to 'blocking' when the rule dataset grows large enough to
  // warrant on-demand ISR rather than full static pre-generation.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { category, subcategory, slug } = params as {
    category: string;
    subcategory: string;
    slug: string;
  };

  const rule = rules.find(
    (r) =>
      r.slug === slug &&
      r.category === category &&
      isNewArchRule(r) &&
      r.subcategory === subcategory,
  );

  if (!rule) {
    return { notFound: true };
  }

  return { props: { rule } };
};
