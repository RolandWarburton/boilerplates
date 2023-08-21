module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      tsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['**/tests/*.tsx'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    camelcase: 'off',
    'eol-last': ['error', 'always'],
    'comma-dangle': 1,
    'max-lines': ['error', { max: 200 }],
    'no-console': ['error'],
    'no-unused-vars': ['error'],
    indent: ['error', 2],
    semi: 0,
    'space-before-function-paren': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error']
  }
};
