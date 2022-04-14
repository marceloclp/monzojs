module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicity-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error', 
    'unused-imports/no-unused-vars': [
      'warn', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      }],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
  },
};
