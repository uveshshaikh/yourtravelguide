import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

/**
 * ESLint flat config.
 * Next 16 ships native flat-config modules, so we compose them directly (no
 * FlatCompat shim). `prettier` comes last to disable all formatting rules —
 * Prettier is the single source of style truth.
 *
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'legacy/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'drizzle/**',
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,

  {
    rules: {
      // Enforce the import alias over deep relative paths across layers.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message: 'Use the "@/..." path alias instead of deep relative imports.',
            },
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
];

export default eslintConfig;
