import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          // Context files intentionally co-export their Provider component
          // alongside the matching hook (or, for ThemeContext, the raw
          // context object) — a common, accepted React pattern. This only
          // affects Fast Refresh in dev, never production behavior.
          allowExportNames: ['useActivePage', 'useToast', 'useVocabulary', 'ThemeContext'],
        },
      ],
    },
  },
  {
    // src/router.tsx defines one React.lazy() component per route, used
    // directly in the route config it exports. eslint-plugin-react-refresh
    // flags this shape by design (see its README's own "Fail" example,
    // `const Tab = ...; export const tabs = [<Tab />]`) — there is no
    // allowExportNames-style escape hatch for it, since the components
    // aren't exported themselves, just referenced from an exported object.
    // Splitting each route into its own one-line wrapper file isn't worth
    // it for a rule that only affects dev-mode Fast Refresh, never
    // production behavior, so it's disabled for this file specifically.
    files: ['src/router.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
)
