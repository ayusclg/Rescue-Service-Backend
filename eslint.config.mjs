// @ts-check
/**
 * ESLint Configuration for NestJS + TypeScript Monorepo
 * - Uses recommended TypeScript rules
 * - Integrates Prettier for formatting
 * - Developer-friendly with clear comments
 */

import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tsEslint.config(
  {
    // Ignore the ESLint config file itself
    ignores: ['eslint.config.mjs']
  },

  // Base JS/TS recommended rules
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,

  // Prettier integration
  prettierRecommended,

  {
    // Language options and global variables
    languageOptions: {
      globals: {
        ...globals.node, // Node.js globals
        ...globals.jest // Jest testing globals
      },
      sourceType: 'module', // Use ES modules
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname // Correct root for TS project
      }
    }
  },

  {
    // Custom rules overrides
    rules: {
      // Prettier handles quotes, so turn off ESLint quote rules
      quotes: 'off',
      '@typescript-eslint/quotes': 'off',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off', // allow 'any' for dev flexibility
      '@typescript-eslint/no-floating-promises': 'warn', // warns if you forget await
      '@typescript-eslint/no-unsafe-argument': 'warn' // warn for potentially unsafe arguments
    }
  }
);
