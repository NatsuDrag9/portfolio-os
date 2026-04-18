# Helper Scripts

This project ships two Node scripts in [scripts/](../scripts/) that back package.json tasks. Both are ES modules and assume Node 18+ (`fs.cpSync`, `fs.rmSync`, top-level ESM).

| File                      | Invoked by              | Writes to                     |
| ------------------------- | ----------------------- | ----------------------------- |
| `generate-tokens.js`      | `yarn generate:tokens`  | `src/styles/_theme.scss`      |
| `deploy.js`               | `yarn build:deploy`     | `dist/` (+ `dist/storybook/`) |

---

## `scripts/generate-tokens.js`

**Purpose.** Transforms the Fluent UI token package (`@fluentui/tokens`) into a single SCSS file of CSS custom properties consumed by the stylesheet layer. The app never imports Fluent's JS token objects at runtime — all styling reads from CSS variables.

**Trigger.** Manually, when Fluent is upgraded or when the curated token list changes. Not part of the build pipeline — the emitted `_theme.scss` is checked into source. This is deliberate: regenerating is an intentional act with a review-able diff.

### Why build-time instead of a runtime theme provider

Fluent is a **build dependency**, not a **runtime dependency**. The token package is read by this script on CI / developer machines; no part of `@fluentui/tokens` reaches the browser. The reasoning, in four points:

1. **Bundle size.** ~1,500 tokens shipped as a JS object would bloat the bundle even with tree-shaking. Emitting only the ~100 curated tokens as CSS vars cuts the payload by an order of magnitude.
2. **Theme switching is free.** Toggling `.dark-theme` on `<html>` flips every variable in the browser's style engine — no React re-render, no context fan-out. A JS theme provider would re-render every styled descendant on change, which matters once 10+ windows are open.
3. **Native browser primitive.** CSS custom properties are cascading, inheritable, DevTools-inspectable, and lint-able (stylelint). JS token objects are invisible to those tools and require AST tooling to audit.
4. **Decoupling.** Components read `var(--color-…)` and don't know Fluent exists. Swapping design systems means rewriting the script, not the components.

The trade-off: tokens are frozen at build time. Runtime-computed tokens (e.g. user-picked theme colors) would need a hybrid — a base CSS layer plus a small runtime override. Acceptable here; not always.

This is an instance of the broader principle that work with static inputs belongs at build time, not runtime — see also `deploy.js` below (merging two static build artifacts) and the project's use of tree-shaking, code splitting, and SSR-free static deployment.

### Architecture

```
@fluentui/tokens (webLightTheme, webDarkTheme)
            │
            ▼
    CURATED_TOKENS allow-list  ──────►  filter
            │
            ▼
   per-category transformers
            │
            ▼
   generateThemeFile() string builder
            │
            ▼
     src/styles/_theme.scss
        ├─ :root { …light }
        └─ .dark-theme { …dark }
```

### Curation model

Fluent ships ~1,500 tokens. The script deliberately extracts a subset (~100) via `CURATED_TOKENS`, grouped into `colors`, `shadows`, `spacing`, `typography`, `borderRadius`. To add a token:

1. Append its camelCase key to the relevant array.
2. Re-run `yarn generate:tokens`.
3. Commit the diff to `_theme.scss`.

Tokens that aren't color-valued (spacing, typography, border radius) are emitted **only under `:root`** — they're theme-agnostic. Light and dark blocks only duplicate color/shadow tokens. See [generate-tokens.js:322-369](../scripts/generate-tokens.js#L322-L369).

### Transformations

| Input                     | Output                         | Reason                                           |
| ------------------------- | ------------------------------ | ------------------------------------------------ |
| `colorBrandBackground`    | `--color-brand-background`     | `camelToKebab` — CSS convention                  |
| `#0f6cbd`                 | `rgb(15 108 189)`              | Modern space-separated syntax                    |
| `rgba(0,0,0,0.5)`         | `rgb(0 0 0 / 50%)`             | Alpha decimal → percentage; drop legacy commas   |
| `16px` (spacing)          | `1.6rem`                       | **10px root base**, not 16 — confirm `html { font-size: 62.5% }` |
| `fontWeight*`, `fontFamily*` | passed through                | Already unit-less / string                       |

The px→rem conversion (`pxToRem`) assumes a 10px root. If you ever change the root font-size, regenerate or the spacing scale silently shifts.

### Shadow handling

Shadow tokens are composite strings (`0 2px 4px rgba(...)`). The script doesn't try to parse them — it runs a regex over the string and rewrites any embedded `rgba(...)` to `rgb(r g b / a%)`, leaving offsets/blur intact. See [generate-tokens.js:307-318](../scripts/generate-tokens.js#L307-L318). If Fluent ever emits a shadow with a non-rgba color function, the replacement becomes a no-op and the original is preserved as-is.

### Output contract

- File location: `src/styles/_theme.scss` (hard-coded via `SCSS_DIR`).
- Header carries `/* Generated on: <ISO timestamp> */` — **this means every regeneration produces a diff even if tokens are unchanged**. Be mindful when reviewing.
- Two selector blocks: `:root` (light, default) and `.dark-theme` (dark, opt-in). Toggle by adding/removing the class on `documentElement`.

### Gotchas

1. **`stylelint-disable value-keyword-case`** is emitted around `fontFamily*` because Fluent's font stacks include mixed-case families (e.g. `Segoe UI`) that would otherwise fail the lint rule. Don't strip it.
2. **Timestamp noise.** Consider stripping the header timestamp if you want regeneration to be idempotent — the token ordering is already deterministic (allow-list iteration order).
3. **Dark theme only overrides color + shadow tokens.** Adding a `spacingDark*` token would silently fall through to the light value.
4. **No validation.** A typo in `CURATED_TOKENS` produces `undefined` values which flow straight into the CSS as literal `undefined`. Regenerate and diff — don't commit blind.

---

## `scripts/deploy.js`

**Purpose.** Produces a single artifact directory (`dist/`) containing both the portfolio SPA and the Storybook static site, suitable for a single GitHub Pages deployment where:

- Portfolio is served at `/`
- Storybook is served at `/storybook/`

**Trigger.** `yarn build:deploy` locally, or the CI step that precedes `yarn deploy:gh-pages`.

### Pipeline

```
┌────────────────────────────────────────────────┐
│ 1. Clean: rm -rf dist/ storybook-static/       │
│ 2. execSync('yarn build')         → dist/      │
│ 3. execSync('yarn build-storybook') → storybook-static/ │
│ 4. cpSync storybook-static → dist/storybook/   │
│ 5. Log success and exit 0                      │
└────────────────────────────────────────────────┘
```

All shell calls inherit stdio (`stdio: 'inherit'`), so Vite/Storybook output streams directly to the parent terminal. If either build fails, `execSync` throws → outer `try/catch` logs `Build failed: <message>` and exits with code 1.

### Why not a single `vite build`?

Portfolio and Storybook have different toolchains (`vite build` vs `storybook build`) and different base paths. Running them separately and grafting the outputs is the lowest-friction way to produce a monolithic deploy artifact without reconfiguring either toolchain. The only coupling is the destination folder name (`storybook`) and the `base` path in Storybook's config.

### Error surface

- **Missing `storybook-static/` after build step 3** — explicitly thrown with a message pointing at the missing path (line 47). This catches the common "Storybook build produced output elsewhere" misconfiguration, which otherwise results in a silent empty `dist/storybook/`.
- **`yarn build` / `yarn build-storybook` failures** — propagate naturally via `execSync`.
- Nothing else is wrapped; a `cpSync` failure will throw and surface as a generic build failure.

### Gotchas

1. **`fs.rmSync` with `recursive: true`** — no confirmation, no dry-run. If someone symlinks `dist/` elsewhere for debugging, it's gone on next run.
2. **The script does not push to GitHub.** It only prepares `dist/`. Pushing is delegated to the `gh-pages` package via a separate `deploy:gh-pages` script.
3. **Hard-coded `yourusername` in the success log.** Purely cosmetic — nothing in the pipeline actually substitutes the repo owner.
4. **No Node version check.** `fs.cpSync` requires Node 16.7+ and `fs.rmSync` requires 14.14+. CI runners will generally satisfy this, but a mismatched local Node can fail obscurely.
5. **Runs serially.** Portfolio build completes before Storybook starts. On cold runs this is ~2× the wall time of running them in parallel. Given Storybook imports from `src/`, parallel builds would compete for the same `node_modules` cache — the serial ordering is intentional but not strictly required.

---

## Relationship to package.json scripts

Both files are wrappers invoked by npm scripts:

```jsonc
"generate:tokens":  "node scripts/generate-tokens.js",
"build:deploy":     "node scripts/deploy.js",
"deploy:gh-pages":  "yarn build:deploy && gh-pages -d dist"  // Upload step
```

If you're adding a new build-side helper, follow the same pattern: a Node ESM file in `scripts/`, invoked from package.json, writing to a well-known output path. Keep side-effect boundaries explicit (filesystem paths at the top, transformation logic in the middle, write at the bottom).
