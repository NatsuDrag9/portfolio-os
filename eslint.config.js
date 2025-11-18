import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import html from 'eslint-plugin-html';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default [
  // Global ignores
  {
    ignores: ['dist/**', '.eslintrc.cjs', 'node_modules/**'],
  },

  // Base config for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.app.json',
      },
      // globals: {
      //   browser: true,
      //   es2021: true,
      //   node: true,
      //   // ...vitestGlobals.environments.env.globals,
      // },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      prettier,
      // vitest,
      html,
      import: importPlugin,
      // storybook,
      // 'vitest-globals': vitestGlobals,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      // ...vitestGlobals.configs.recommended.rules,
      // ...storybook.configs.recommended.rules,

      // Prettier rule
      'prettier/prettier': [
        'error',
        { endOfLine: 'auto' },
        { usePrettierrc: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        },
      ],
      // Import rules
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      // 'import/extensions': [
      //   'error',
      //   'ignorePackages',
      //   {
      //     ts: 'never',
      //     tsx: 'never',
      //     js: 'never',
      //     jsx: 'never',
      //   },
      // ],

      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
    },
  },

  // Override for test and story files
  {
    files: [
      '**/*.stories.{ts,tsx}',
      '**/playFunctions.{ts,tsx}',
      '**/src/tests/**/*',
      '**/*.test.{ts,tsx}',
      'src/mocks/**/*',
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
