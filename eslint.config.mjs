import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// A hardcoded "/rules/..." URL is the exact bug already fixed once (see
// pages/index.tsx, pages/first-flight.tsx, components/FloatingCtas.tsx,
// components/RuleDetail.tsx history) -- every real link should go through
// buildRuleUrl() / buildCategoryUrl() / buildSubcategoryUrl() (lib/urls.ts)
// instead. Catches both plain string literals and template literals.
// NOTE: esquery's attribute-regex parser doesn't handle backslash-escaped
// "/" inside the pattern (it mis-splits on the escaped slash and throws) --
// \x2F (hex-escaped slash) sidesteps that parser quirk while still matching
// a literal "/" at runtime.
const noHardcodedLegacyRuleUrls = {
  "no-restricted-syntax": [
    "error",
    {
      selector: "Literal[value=/^\\x2Frules\\x2F/]",
      message:
        'Hardcoded "/rules/..." URL literal. Use buildRuleUrl() from lib/urls.ts instead.',
    },
    {
      selector: "TemplateElement[value.raw=/\\x2Frules\\x2F/]",
      message:
        'Hardcoded "/rules/..." URL in a template literal. Use buildRuleUrl() from lib/urls.ts instead.',
    },
  ],
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    rules: noHardcodedLegacyRuleUrls,
  },
  {
    // Approved locations where a literal "/rules/" string is the point of
    // the code, not a bug: the redirect-source architecture itself, the
    // legacy-URL builder, the legacy dynamic route, and the diagnostic
    // script that deliberately hits the old path to verify it redirects.
    files: [
      "next.config.ts",
      "lib/urls.ts",
      "pages/rules/**/*.{ts,tsx}",
      "scripts/check-redirects.ts",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);

export default eslintConfig;
