import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  // main project config
  {
    files: ['src/*.tsx'],
    rules: {
      semi: 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'no-unused-vars': 'warn',
      'comma-dangle': ['error', { functions: 'never' }]
    },
    plugins: {
      react: pluginReactConfig
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    }
  },
  // build file config
  {
    files: ['build.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
