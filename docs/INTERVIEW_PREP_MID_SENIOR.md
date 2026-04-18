# Interview Prep — Portfolio OS (Mid-to-Senior)

Written from the POV of an interviewer who has read the codebase. Use it as a rehearsal script: each section is something I'd probe, with a hint on how to answer and the pitfalls I'd push you toward.

> Targeting **mid-to-senior** bar. For upper SDE2 / entry SDE3 prep, see [INTERVIEW_PREP_SDE2_SDE3.md](INTERVIEW_PREP_SDE2_SDE3.md) — note the study checklist at the top of that file before using it.

---

## 1. Elevator pitch (have this memorised)

> "Portfolio OS is a Windows-style desktop UI built with React 19, Zustand, and Vite. Every 'app' — resume, projects, VSCode replica, Notepad, Settings — is a window in a draggable/resizable container. Five Zustand stores, one per concern (workspace, system UI, auth, boot, settings), coordinate everything. Design tokens come from Fluent UI, transformed at build time into CSS variables. Deployed as a single static bundle to GitHub Pages with Storybook at `/storybook`."

Key numbers to know:
- **React 19**, **Zustand 5**, **Vite 6**, **TypeScript 5.9**, **react-rnd** for drag/resize
- **5 Zustand stores**, **3 custom hooks**, **~10 apps**, **5 boot-state screens**
- Build-time token script: ~1,500 Fluent tokens → ~100 curated CSS variables

---

## 2. Tech stack — know the "why" for each

| Choice              | Reason you picked it                                                   | Alternative you'd name       |
| ------------------- | ---------------------------------------------------------------------- | ---------------------------- |
| **Zustand**         | Store-per-concern, no providers, selector-based subscriptions          | Redux Toolkit, Jotai         |
| **react-rnd**       | Drag + resize + bounds in one, `dragHandleClassName` for titlebar only | `react-draggable` + custom resize |
| **Fluent UI tokens**| Microsoft design language fits the Windows metaphor                    | Tailwind, Radix tokens       |
| **Vite**            | ESM-native dev, fast HMR, first-class TS/SCSS                          | webpack, Next.js             |
| **SCSS modules**    | BEM + design-token variables, stylelint enforces the pattern           | CSS-in-JS, Tailwind          |
| **Storybook 8**     | Component isolation, play functions double as tests                    | Ladle                        |
| **Vitest + jsdom** | Same runner as Vite, no Jest config duplication                         | Jest                         |

---

## 3. Architecture — draw this on a whiteboard

```
  BootScreen → LoginScreen → Workspace ─┬─ Desktop  (AppIcon grid)
                                        ├─ Taskbar  (AppIcon row + search + tray)
                                        ├─ StartMenu (panels, user card, power)
                                        └─ WindowManager
                                              └─ WindowContainer × N  (Rnd-wrapped apps)

                  │
                  ▼
       useBootStatus    ── which screen is active
       useAuth          ── logged-in user, avatar
       useSystemUIState ── taskbar alignment, search, quick actions, time format
       useWorkspaceState── active windows, z-indexes, pinned apps, instance counters
       useSettings      ── persisted app-level preferences
```

**Things I'd make you defend:**

- **Why five stores instead of one?** → Each has its own lifecycle and reset semantics (sign-out resets auth + workspace + systemUI but not bootStatus). Splitting by concern also keeps selector subscriptions narrow.
- **Why not Redux?** → No actions/reducers boilerplate, no provider. Stores are imported directly. Trade-off: less dev-tool integration, but you have one.
- **Who owns z-index?** → `useWorkspaceState` assigns it on window focus. StartMenu and context menus compute `maxZIndex + 1` at render time to sit above the window stack without joining it.

---

## 4. Questions I'd ask by topic

### 4.1 State management

**Q: "Walk me through what happens when I click a taskbar icon."**

Hit these beats:
1. `AppIcon` fires `onSingleClick(appId)` — a prop, not a direct store call.
2. Parent (`Taskbar`) passes `restoreOrFocusApp` from the `useWindowManager` hook.
3. Hook reads `activeWindows`, decides between: launch new, restore minimized, focus existing.
4. Appropriate store action fires → `activeWindows` updates → every subscribed component re-renders.

**Pitfall I'd probe:** "Why not have `AppIcon` call the store directly?" Answer: **presentational separation**. Same component is used on desktop, taskbar, and start menu — the click means different things in each. The parent maps intent to action.

**Q: "You have a `windowInstanceCounters` field. What is it?"**

Trap: saying "it counts open windows." It's an **ID generator**. Closing `notepad-2` doesn't decrement it; the next spawn is `notepad-3`. If you need a live count, `activeWindows.filter(w => w.id.startsWith(appId))`. This is in [AppIcon.md](components/AppIcon.md).

### 4.2 Components

**Q: "`AppIcon` takes an `iconVariant` prop with three values. Why not three components?"**

Answer: most logic (window counting, focus detection, context menu) is shared. Three components would duplicate it. The variant prop drives small rendering differences (dot vs label, click vs dblclick). Trade-off: prop surface is wider; I'd accept that for code-dedup.

**Q: "How does `WindowContainer` know its size and position?"**

From the store record (`windowData.position`, `windowData.size`). The component is a **view** over the store. Drag/resize stop → dispatches `updateWindowPosition` / `updateWindowSize`. Never holds its own coords.

**Q: "Why `requestAnimationFrame` for fade-in?"**

The "mount then same-frame class toggle" pitfall — the browser collapses initial and final states into a no-op. RAF defers the toggle to the next paint so the CSS transition actually runs. See [WindowContainer.md](components/WindowContainer.md).

### 4.3 Performance

**Q: "How does your clock not wake up once a second?"**

Minute-boundary alignment: calculate ms until the next `:00`, `setTimeout` once to align, then `setInterval(60_000)`. One 60× reduction in wake-ups versus `setInterval(1000)`. Cleanup clears both timers on effect teardown.

**Q: "How big is your bundle and what's in it?"**

Be ready with a rough answer. Key point: `@fluentui/tokens` is a **build dependency**, not a runtime dependency — the ~1,500-token object never ships. Only the curated ~100 CSS variables reach the browser. See [HELPER_SCRIPTS.md](HELPER_SCRIPTS.md).

### 4.4 Build-time vs runtime

**Q: "Why generate CSS from tokens instead of using a Fluent theme provider?"**

Four reasons: bundle size, free theme switching via `.dark-theme` class (no React re-render), native browser tooling support, and decoupling (components don't know Fluent exists). Trade-off: can't compute tokens from runtime input without a hybrid approach.

**The generalisable principle:** work with static inputs belongs at build time. Same lens applies to tree-shaking, code splitting, pre-rendered HTML.

### 4.5 Testing

**Q: "What do you test and what do you skip?"**

Structure:
- **Stores** (`src/store/tests/`) — pure functions, high value, fast.
- **Custom hooks** (`useWindowManager`, `useClickOutsideModal`) — the logic that components delegate to.
- **Storybook play functions** — component interactions as tests via `@storybook/test-runner`.

Explicitly not unit-tested: pure presentational components. Visual regressions would go through Storybook + Chromatic.

### 4.6 Accessibility

**Q: "What would a screen-reader user experience?"**

Own it honestly:
- Good: native `<input type="range">` for sliders, `role="button"` + `tabIndex={0}` on icons, keyboard activation (Enter/Space).
- Gaps: icon-only buttons lack `aria-label`, no focus trap on open windows/menus, no `aria-live` on the search results, no tablist semantics on StartMenu panels.
- Next step: introduce `inert` on unfocused windows and `aria-label` on icon-only controls.

### 4.7 Deployment

**Q: "Walk me through deploy."**

- `yarn build:deploy` runs `scripts/deploy.js`: cleans, builds portfolio (`vite build`), builds Storybook, grafts storybook-static into `dist/storybook/`.
- `yarn deploy:gh-pages` pushes `dist/` to the `gh-pages` branch via the `gh-pages` npm package.
- Custom domain `rohitimandi-dev.xyz` (in `package.json#homepage`).

**Pitfall I'd probe:** "Why two builds instead of one?" Different toolchains, different base paths — the graft approach is the lowest-friction path. Covered in [HELPER_SCRIPTS.md](HELPER_SCRIPTS.md).

---

## 5. Bugs and rough edges — own them proactively

If I ask "what's broken or incomplete?" — this earns trust more than any positive spin:

1. **Taskbar Meta-key handler bug.** `!setStartMenuOpen` should be `!startMenuOpen` — negating the setter is always truthy, so the Windows key only ever opens, never closes. Flagged in [Taskbar.md](components/Taskbar.md).
2. **No touch handling in `AppIcon`.** File has a TODO. Mobile hover popups and long-press context menus don't work.
3. **`TaskbarRightClickMenu` is commented out** — snap animation needs more work.
4. **Generated `_theme.scss` has a timestamp header** → every regeneration produces a noisy diff even when tokens are unchanged.
5. **StartMenu search overrides panel selection** without a visual cue — user can get confused.
6. **No focus trap** on windows or start menu; Tab escapes the logical region.

Saying "here's what I'd fix in the next pass" is 10× more impressive than pretending it's perfect.

---

## 6. Things to bring up proactively (non-obvious wins)

These aren't in the diff summary — surface them yourself:

- **Husky + lint-staged + commitlint**: commits are lint-gated and conformant. Shows you think about team workflows, not just solo hacking.
- **Stylelint with BEM-pattern plugin**: the BEM naming convention is enforced by tooling, not convention.
- **Storybook a11y addon**: accessibility linting in the component sandbox.
- **Fluent icons as React components, images as strings** — `AppIcon` handles both via a `typeof !== 'string'` check. Shows awareness of what `React.memo` does to `typeof`.
- **The portfolio is itself an app inside the OS** — the meta-ness is deliberate. Recruiters see a Windows desktop; technical interviewers see the architecture behind it.
- **Recruiter navigation guide modal** — recent feature (see git log) — shows you think about non-technical users.

---

## 7. Weaknesses to acknowledge honestly

An interviewer who hears "everything's great" stops trusting you. Be ready with:

- **No SSR / no SEO story**: it's a client-rendered SPA. Fine for a portfolio, not for content-heavy sites.
- **Bundle size hasn't been audited**: `vite-bundle-analyzer` is installed but I haven't sat with the output to trim.
- **Z-index strategy is a `max + 1` scan** on every activeWindow change — fine at current scale, wouldn't hold at 100 windows.
- **Stores couple freely** — `restoreOrFocusApp` touches workspace, menu, and window manager logic. At more scale I'd introduce a coordinator layer or event bus.
- **No E2E tests** — Playwright is installed for Storybook-runner, not for full user flows.
- **Mobile is "it fits and works" not "it's a great mobile experience"** — the desktop metaphor breaks on touch.

---

## 8. The two-minute closer

If I end with "anything you want to tell me about this project?" — pitch the **principle**, not the features:

> "The thing I'd emphasise is the separation of concerns: UI components are views, Zustand stores are state, custom hooks are logic, and design tokens are build-time artifacts. Any one of those layers can be rewritten without touching the others — if I swap Zustand for Redux, components are unaffected; if I swap Fluent for another design system, I rewrite one script. The Windows metaphor is fun, but the architecture is what I actually care about."

That's what I'd remember after the call.

---

## Quick-reference reading list

- [AppIcon.md](components/AppIcon.md) — polymorphic component, ref-as-state, timeout cleanup
- [WindowContainer.md](components/WindowContainer.md) — controlled store-backed component, RAF fade-in
- [StartMenu.md](components/StartMenu.md) — derived state, click-outside exceptions
- [Taskbar.md](components/Taskbar.md) — minute-aligned clock, the Meta-key bug
- [Slider.md](components/Slider.md) — native a11y, controlled input, tooltip-to-value
- [HELPER_SCRIPTS.md](HELPER_SCRIPTS.md) — build-time vs runtime reasoning
- [DATA_FLOW.md](DATA_FLOW.md), [STORE_DOCUMENTATION.md](STORE_DOCUMENTATION.md) — state topology
