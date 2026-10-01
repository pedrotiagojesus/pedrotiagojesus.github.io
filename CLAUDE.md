# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server (--host, so it's reachable on the LAN too)
npm run build         # tsc -b (typecheck, no emit) && vite build
npm run lint          # eslint .
npm test              # vitest --run (single run, used in CI)
npm run test:watch    # vitest (watch mode)
npm run test:ui       # vitest --ui
npm run preview       # serve the production build locally
```

Run a single test file: `npm test -- src/config/env.test.ts`. For watch mode on just that file: `npm run test:watch -- src/config/env.test.ts`.

The dev server has `server.strictPort: true` (vite.config.ts) — if port 5173 is already taken by a stale process, it fails loudly instead of silently starting on another port. The backend API's CORS allowlist only recognizes `localhost:5173`, so a silent port bump would otherwise surface as a confusing CORS error.

## Environment

Copy `.env.example` to `.env`. All variables are validated through a Zod schema (`src/config/env.ts`) at import time — a missing or malformed value fails fast rather than surfacing as a runtime `undefined`. `VITE_PRODUCTION` must be the literal string `"true"` to enable Google Analytics; anything else (including `"false"` or unset) disables it.

CI (`.github/workflows/deploy.yml`) runs lint → test → build on every push to `main`, then deploys `dist/` to GitHub Pages. Build-time env vars come from repository secrets.

## Architecture

Vite + React 18 + TypeScript, React Router v6 (`createBrowserRouter`), TanStack Query, i18next, Zod. Deployed as a static site to GitHub Pages (no SSR).

## Backend
The projet use the API witch is in ../studio-base-api. Use him to know the structure and the data.

### Path aliases

Aliases are defined **twice** and must be kept in sync: `tsconfig.json`'s `compilerOptions.paths` (for the type checker/editor) and `vite.config.ts`'s `resolve.alias` (for the actual bundler). `vitest.config.ts` merges `vite.config.ts` rather than redeclaring aliases, so tests automatically get them too.

One alias is intentionally misnamed: `@typesLocal` → `src/types`. `@types` was tried and rejected — TypeScript treats any import path shaped like `@types/*` as a reserved DefinitelyTyped declaration file and refuses to import it directly (`TS6137`).

### Data layer: one content endpoint, not one per resource

Nearly all page content comes through a single hook, `useContents(sections, projectsSlug?)` (`src/hooks/useContents.ts`), which calls `GET /content?lang=&sections=&projectsSlug=` and returns a `ContentsResponse` (`src/types/content.ts`) shaped by whichever `sections` were requested. `sections` is typed as `ContentSection` (`"profile" | "projects" | "experiences" | "seo"`); note the request asks for `"experiences"` but the response field is `experience`. Pages request only the sections they need and read the matching optional field off the response (e.g. `data?.profile`, `data?.experience`). Don't add a per-resource service/hook (a `getProjects`/`useProjects` pair, say) for a new content type — extend `ContentsResponse` and request the section through `useContents` instead; per-resource equivalents existed before and were removed as dead code once everything moved onto the shared endpoint.

### Types and runtime validation

`src/types/` holds **only the backend's API contract**, split by domain: `content.ts`, `email.ts`, re-exported from `index.ts` (import from `@typesLocal/index`). Each type is inferred from a Zod schema (`export type Project = z.infer<typeof projectSchema>`), and every service in `src/services/` runs its response through the matching schema (`contentsResponseSchema.parse(response.data)`), so a backend shape change surfaces as a query error instead of a silent `undefined` deep in a component. To add or change a field, edit the schema — never hand-write a parallel type. Schemas are `z.object`, which drops unknown keys, so the backend can add fields (or SEO pages) ahead of the frontend without breaking anything; removing or retyping a field the frontend expects is what fails.

Everything else stays next to its code, not in `src/types/`: component props are declared in the component file as `XxxProps` (e.g. `Card.tsx`, `Button.tsx`), `ApiError` lives with its normalizer in `src/api/errors.ts`, `EnvConfig` with its schema in `src/config/env.ts`, and global augmentations in `src/types/global.d.ts` (`Window.grecaptcha`) and `src/types/i18next.d.ts` (typed `t()` keys).

`src/api/client.ts` is a single axios instance with the API key and timeout baked in from `env`; `src/api/errors.ts` normalizes both axios errors and unknown throws into one `ApiError` shape.

### i18n: UI copy lives in the frontend, content comes from the API

The split is by ownership: **UI copy** (labels, buttons, section titles) is part of the code and lives in `src/locales/{pt,en}.json`; **content** (projects, experience, profile, SEO) is data and comes from the backend through `useContents`. Don't move copy back into the API, and don't put content in the locale files.

- **i18next** (`src/config/i18n.ts`) owns `i18n.language` (`"pt"` or `"en"` only — `supportedLngs` + `load: "languageOnly"` collapse regional variants like `en-US`). Detection order is querystring (`?lng=`) → cache → browser, so a URL can force the language deterministically.
- Both locale files are bundled statically as i18next `resources`, so i18n initializes synchronously and no render waits on a request. Read copy with `const { t } = useTranslation(); t("pages.about.title")`.
- **Keys are type-checked.** `src/types/i18next.d.ts` types `t()` against `pt.json`, so a misspelled or missing key is a compile error. `en` is checked with `satisfies typeof pt` in `i18n.ts` (missing key → build error), and `src/locales/locales.test.ts` catches the reverse (a key only in `en`) and empty strings. To add a string: add the key to **both** JSON files.

### Routing and navigation

Routes live in `src/router.tsx` (all page components `React.lazy`-loaded) with `App.tsx` as the layout shell (`Navigation` + `HeaderMobile` + `Footer` around an `<Outlet/>`). Adding a page means touching three places: `router.tsx`, `src/config/navigation.ts`'s `NAV_ITEMS` (the single source shared by the desktop `Navigation` sidebar and mobile `HeaderMobile`, so the two menus can't drift apart), and, if it needs page-level SEO, the `contentSeoSchema` object in `src/types/content.ts` (`ContentSeoPage` is derived from its keys) plus `vite-plugin-sitemap`'s `dynamicRoutes` in `vite.config.ts` (routes aren't physical HTML files, so the sitemap plugin can't discover them on its own).

`src/router.tsx` has a dedicated ESLint override (bottom of `eslint.config.js`) disabling `react-refresh/only-export-components` for that one file — it's a known, accepted false-positive shape for a file of `React.lazy()` route components, not a real problem.

### Theming

Dark is the default theme (`:root` in `src/styles/tokens/colors.css`); light is the override (`body[data-theme="light"]`). `ThemeContext` persists the choice to `localStorage` and applies it via `document.body.dataset.theme`. New color usage should reference the `--color-*` tokens so it follows the toggle automatically — except in `src/pages/Cv/`, which deliberately opts out (see below).

### The CV page (`src/pages/Cv/`) is the most involved piece of this codebase

It renders the CV as normal HTML/React, lets the visitor download it as a PDF (via `html2pdf.js`, dynamically imported so it never ships in the main bundle), and simulates on-screen where the PDF's page breaks will fall. All three of these are non-obvious and extensively commented in `Cv.tsx`/`Cv.css` — read those comments before changing the layout or the export logic. Highlights:

- Content is split into measurable "blocks"; an always-mounted, off-screen `.cv-measure` copy is used to read real rendered heights, which are then greedily packed into simulated A4 pages using the *exact* width-to-height ratio `html2pdf.js` itself uses internally (derived from its source, not guessed) — otherwise the on-screen preview and the real PDF disagree about where a page ends.
- The CV intentionally uses its own fixed, non-theme-reactive color tokens (`--cv-*` custom properties, defined once on `.cv-container`/`.cv-measure`) so it always looks the same regardless of the site's light/dark toggle — a resume shouldn't flip to unreadable light-on-white text just because the visitor prefers dark mode.
- `handleDownload` works around several `html2pdf.js`/`html2canvas` quirks that each independently produced visible bugs during development: waiting on `document.fonts.ready` before capturing (otherwise it can capture with a fallback font and wrap text differently than the live page), disabling the library's own built-in `pagebreak` DOM pre-processing (it conflicts with this component's own pagination), and capturing the *live* DOM node with a full-screen loading overlay masking the brief style change, rather than an off-screen clone (an earlier off-screen-clone approach produced silently blank PDFs).
- The bundled `html2pdf.js` type declarations are incomplete (`pagebreak` isn't declared even though the library supports it); the option is passed via a type derived from the worker's own `.set` signature rather than casting to `any`.

### Provider nesting

`src/providers/AppProviders.tsx` fixed order: `HelmetProvider` → `QueryClientProvider` → `ThemeContextProvider` → `ToastProvider` → `ActivePageProvider`.

### Fonts and icons

Roboto/Lato are self-hosted (`src/assets/fonts/`) as WOFF2, trimmed to only the weights actually used in CSS (regular/medium/bold, no light, no italics) — check `font-weight` usage across the codebase before re-adding a weight file. Roboto is additionally subset to Google Fonts' "latin" range with a matching `unicode-range` (~22KB per weight); Lato is only converted, never subset, because its OFL licence reserves the name "Lato" for unmodified versions. Neither uses `local()`, so every visitor (and the CV's PDF) renders the same files. To add a weight, convert from the upstream TTF the same way (e.g. `subset-font`/`fonttools`, outside the repo) rather than committing a TTF. Icons come from `@fortawesome/react-fontawesome` with per-icon imports (`free-solid-svg-icons`, `free-regular-svg-icons`, `free-brands-svg-icons`), not the bundled Font Awesome CSS/webfont package — `<FontAwesomeIcon icon={faXxx} />`, with icon definitions for nav/social links centralized in `src/config/navigation.ts`.

### GitHub Pages SPA routing

`index.html` and `public/404.html` carry the standard [spa-github-pages](https://github.com/rafgraph/spa-github-pages) redirect trick (query-string encoding of the real path), since GitHub Pages has no server-side rewrite for client-side routes.

## Code style preferences

Favor small functions that each do exactly one thing over a single function that branches to handle several cases — split rather than add a parameter/flag that changes behavior.

Prefer whatever React/Vite/the rest of the stack already provides over adding a new dependency or hand-rolling something the framework covers (e.g. `React.lazy` for code-splitting, the platform `fetch`/hooks primitives, Vite's own env/asset handling) — reach for a third-party library only once the framework-native option genuinely doesn't cover the need.
