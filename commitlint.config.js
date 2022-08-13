module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    //   TODO Add Scope Enum Here
    'scope-enum': [2, 'always', ['all', 'shop', 'cart', 'pages']],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'chore',
        'style',
        'refactor',
        'ci',
        'test',
        'perf',
        'revert',
        'vercel',
      ],
    ],
  },
};
