import pluginCspellConfigs from '@cspell/eslint-plugin/configs';
import { fixupPluginRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSonarjs from 'eslint-plugin-sonarjs';
import pluginStorybook from 'eslint-plugin-storybook';
import globals from 'globals';
import pluginTs from 'typescript-eslint';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
  {
    plugins: {
      'react-hooks': fixupPluginRules(pluginReactHooks),
    },
  },
  {
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      '@cspell/spellchecker': [
        'warn',
        {
          cspell: {
            import: ['./cspell.config.yml', '@cspell/dict-typescript'],
          },
          cspellOptionsRoot: import.meta.url,
        },
      ],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc', // for reduce accumulators
            'e', // for e.returnvalue
            'row', // for modify excel row
          ],
        },
      ],
      'no-console': 'warn',
      'no-unescaped-entities': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: ['dist', 'node_modules', 'storybook-static', '!.storybook', '.yarn'],
  },
  pluginJsxA11y.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginSonarjs.configs.recommended,
  pluginCspellConfigs.recommended,
  pluginJs.configs.recommended,
  ...pluginStorybook.configs['flat/recommended'],
  ...pluginTs.configs.recommended,
  pluginPrettierRecommended,
];
