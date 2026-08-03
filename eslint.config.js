import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Node-side code: the backend API, and root-level tooling config files
    // that run under Node (Vite/Playwright configs) rather than the
    // browser. These aren't React, so the react-hooks/react-refresh rules
    // (and their `use`-as-a-hook / browser globals assumptions) don't apply.
    files: ['backend/**/*.js', '*.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Express error-handling middleware is identified by its 4-argument
      // signature - `next` must stay in the parameter list even when unused.
      // `ignoreRestSiblings` covers the `const { secret, ...rest } = obj`
      // pattern used to strip a field (e.g. passwordHash) before returning
      // the rest - `secret` is intentionally unused, that's the point of it.
      'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    },
  },
  {
    // Playwright specs/fixtures: the test runner itself is Node, but
    // `page.evaluate()` callback bodies execute in the browser - both sets
    // of globals are legitimately in play in the same file. `use` here is
    // Playwright's fixture-provider parameter, not a React hook.
    files: ['tests/e2e/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      // Playwright's fixture API requires destructuring the fixtures object
      // even when a fixture doesn't depend on any other fixture - that's
      // how it introspects dependencies (see fixtures/test-fixtures.js).
      'no-empty-pattern': 'off',
    },
  },
])
