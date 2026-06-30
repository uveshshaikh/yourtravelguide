/**
 * Conventional Commits — enforced by Husky `commit-msg` hook.
 * Format: type(scope): subject   e.g. `feat(knowledge): add claim resolver`
 */
const configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // a new capability
        'fix', // a bug fix
        'docs', // documentation only
        'style', // formatting, no code change
        'refactor', // neither fixes a bug nor adds a feature
        'perf', // performance improvement
        'test', // adding or fixing tests
        'build', // build system or dependencies
        'ci', // CI configuration
        'chore', // maintenance
        'revert', // revert a previous commit
      ],
    ],
    'subject-case': [0],
    'body-max-line-length': [0],
  },
};

export default configuration;
