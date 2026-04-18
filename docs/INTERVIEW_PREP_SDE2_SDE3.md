# Interview Prep — Portfolio OS (Upper SDE2 / Entry SDE3)

> ⚠️ **Use only after completing the prep below.** This version includes claims and hypothetical answers that require technical depth you haven't yet built up. Using it in an interview without this prep risks follow-up questions you can't credibly answer. Until the checklist is complete, rehearse from [INTERVIEW_PREP_MID_SENIOR.md](INTERVIEW_PREP_MID_SENIOR.md) instead.

## Prep checklist — complete before using this doc

### Study (read and take notes, no code needed)

- [ ] **CRDTs for collaborative state.** Read Yjs + Automerge overviews. Know: (1) what convergence means, (2) LWW vs CRDT trade-off, (3) when you'd reach for each. Used in §6.1 "Make it multi-user".
- [ ] **React concurrent features.** `useTransition`, `useDeferredValue`, `useSyncExternalStore`. Know when each fits. Used in §5.1 and §5.3.
- [ ] **Zustand selector internals.** `shallow` equality, slice middleware, `subscribeWithSelector`. Know how re-render granularity actually works. Used in §5.1 and §8 item 2.
- [ ] **Coordinator / service-layer patterns.** Service layer, saga (redux-saga style), observer. Name-a-pattern-and-defend-it. Used in §5.2 and §8 item 1.
- [ ] **Automatic batching in React 18+.** When it applies, when it doesn't (`flushSync`, external event handlers). Used in §5.1.
- [ ] **React keys and fiber reconciliation.** Why index-as-key breaks with reorders. Used in §5.1 last Q.

### Investigate in this codebase

- [ ] **Actually run `vite-bundle-analyzer`.** Know your bundle size and the top 5 contributors before claiming "I haven't audited it." §5.3.
- [ ] **Profile re-renders in Taskbar.** Confirm the "pulls ~10 values" claim with React DevTools. Ranked chart during a window drag. §5.2, §8 item 2.
- [ ] **Measure fade-in timing.** Open DevTools performance panel, trigger window open, confirm RAF actually produces a visible transition vs no-RAF. This backs the §5.1 "Why RAF for fade-in" answer.
- [ ] **Read your own Zustand stores end-to-end.** Know every field in `useWorkspaceState`, not just the ones you use often. §5.2.

### Implement (optional but high-value)

- [ ] **Add one error boundary around `WindowContainer` content.** This is cheap and lets you answer §5.8 with "I did this" instead of "I would".
- [ ] **Strip the timestamp from generated `_theme.scss` header.** Makes §7 regeneration-noise item genuinely fixed.
- [ ] **Fix the `!setStartMenuOpen` bug** in `Taskbar.tsx`. One-character change. Turns the §7 bug from "known issue" into "known-and-fixed".

---

Target bar: **upper SDE2, entry SDE3.**
Written from an interviewer's POV — each section is a probe, not a summary. At this level, the bar isn't "can you describe what you built." It's:

- Can you reason about **trade-offs at magnitude** (not just list them)?
- Can you **design the next version** given a new constraint?
- Can you **self-critique without defensiveness**?
- Do you see the codebase as **a system that will outlive you**, not a finished artifact?

If an answer could come out of a mid-level candidate, it's not good enough. The three words that separate levels are **principle**, **magnitude**, and **migration**.

---

## 1. Elevator pitch (30 seconds, then shut up)

> "Portfolio OS is a desktop-metaphor SPA — React 19, Zustand, Vite, react-rnd. The architecture is four layers: components are views, Zustand stores own state, custom hooks own coordination logic, and design tokens are build-time artifacts. Each layer is swappable in isolation. The interesting parts aren't the desktop illusion — they're the invariants that keep it tractable as the surface area grows."

Do not list features. Features are mid-level. Invariants and swappability are senior.

---

## 2. The mid-vs-senior answer ladder

Memorise this shape. Every answer gets one rung higher at the senior bar.

| Prompt                                | Mid answer                                   | Senior answer                                                                                  |
| ------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| "Why Zustand?"                        | "It's simpler than Redux."                   | "Selector-based subscriptions minimise re-render fan-out; split stores give independent reset lifecycles. I'd revisit at 100+ concurrent subscribers — that's where Redux's DevTools story earns back its complexity." |
| "How do windows stack?"               | "Z-index in the store."                      | "Z-index is assigned on focus. StartMenu and portaled menus sit *above* the stack by computing `max+1` at render time — they don't join it. Scale limit: the O(n) scan on every focus. I'd switch to a monotonic counter once windows outnumber hundreds." |
| "How did you test it?"                | "Storybook and Vitest."                      | "High-leverage tests only: stores and hooks (pure logic, fast), component contracts via Storybook play functions. I skipped presentational unit tests on purpose — they test the framework. If I had one day to add tests, I'd add a Playwright E2E for launch → focus → minimize → restore." |

The shape: **assert → justify with magnitude → name the scale limit → propose the migration.**

---

## 3. Tech stack — "why" + "what I considered" + "when I'd leave it"

| Choice              | Why chosen                                           | Alternatives weighed                           | Migration signal                              |
| ------------------- | ---------------------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| **React 19**        | Concurrent rendering + transitions useful for window switching | Solid, Svelte (smaller, but smaller ecosystem) | Never, at least not for the next 3 years      |
| **Zustand 5**       | Zero provider, selector-based subs, store-per-concern | Redux Toolkit, Jotai, Valtio                   | When time-travel debugging becomes non-optional |
| **react-rnd**       | Drag + resize + bounds + drag-handle-class in one    | `@dnd-kit` + custom resize, `interact.js`      | When I need multi-touch drag or RTL-aware bounds |
| **Fluent tokens**   | Fits the Windows metaphor; extract at build time     | Tailwind, Radix primitives, Panda CSS          | If theming becomes user-defined (need runtime)|
| **Vite 6**          | ESM-native, Rollup-based prod build, fast HMR        | Next.js (overkill, SSR-first), Remix           | If SEO or server rendering becomes a real goal|
| **SCSS + BEM**      | Design-token variables, stylelint enforces conventions | CSS Modules, vanilla-extract, Tailwind        | If cross-component composition grows — CSS-in-JS or vanilla-extract give type safety |
| **Storybook 8**     | Component isolation, play functions as interaction tests | Ladle (faster, less mature), Histoire       | Only if Storybook's build cost outpaces its payoff |
| **Vitest**          | Shared toolchain with Vite, no Jest config           | Jest (bigger ecosystem, slower)                | Never for this size                           |

The senior framing: **"I didn't pick X because it was cool. I picked it because Y was worse along these two axes, and here's when I'd reconsider."**

---

## 4. Architecture — explain the invariants, not the layout

```
  BootScreen → LoginScreen → Workspace ─┬─ Desktop  (AppIcon grid)
                                        ├─ Taskbar  (AppIcon row + search + tray)
                                        ├─ StartMenu
                                        └─ WindowManager ── WindowContainer × N

  Stores (Zustand):
    useBootStatus     — screen the user sees
    useAuth           — identity
    useSystemUIState  — chrome config (taskbar alignment, time format, quick actions)
    useWorkspaceState — windows, z-indexes, pinned apps, instance counters
    useSettings       — persisted app preferences

  Hooks (logic):
    useWindowManager     — launch / focus / close / restore
    useClickOutsideModal — dismissal with exception refs
    useMediaQuery        — responsive branching
```

**Invariants to state explicitly when asked "what's the architecture":**

1. **Components are views over stores.** No component holds state that a store could own. Trivially prove: `WindowContainer` takes `windowId` only; everything else comes from `useWorkspaceState`.
2. **Stores are the single source of truth per concern.** Five stores exist precisely because they have *different reset semantics* — sign-out clears auth + workspace + systemUI but not boot.
3. **Hooks own multi-store coordination.** `useWindowManager` is where "focus if exists, launch otherwise" lives. Components don't know that logic. This is the seam that lets state structure change without rewriting components.
4. **Design tokens are build-time artifacts.** The runtime bundle has no Fluent dependency. This is the seam that lets the design system change without rewriting styles.

The senior move: when asked "explain your architecture," name the **invariants and their seams**, not the file tree.

---

## 5. High-bar questions by topic

### 5.1 React internals (SDE3 territory)

**Q: "What does Zustand do that `useState + Context` can't?"**
The core answer: **subscription granularity**. `useState + Context` invalidates every consumer on any change. Zustand's `useStore(selector)` subscribes only to the slice the selector returns; unchanged consumers don't re-render. At 20 open windows, this is the difference between "smooth" and "noticeably janky."

**Q: "What happens if two actions fire synchronously in the same handler?"**
React 18+ batches state updates inside event handlers, timeouts, and promises. Zustand set calls inside a handler coalesce into one re-render — not three. Be ready to articulate *automatic batching* as a React 18 behaviour, not a Zustand feature.

**Q: "Would you use `useTransition` anywhere here?"**
Yes — search-input-in-taskbar → StartMenu filter would benefit from a transition. Typing stays responsive; the filter work is non-urgent. Currently synchronous. This is a real opportunity, not a theoretical one.

**Q: "How would you audit re-renders?"**
React DevTools Profiler + highlight-on-render. Then: identify components that re-render on unrelated store changes. Typical fix: narrower selectors or `shallow` equality on object selectors. In this codebase, `Taskbar` pulls ~10 values from `useSystemUIState` in one call — it re-renders on any of them. Senior candidate would flag this.

**Q: "Keys?"**
`activeWindows.map(w => <WindowContainer key={w.id} ... />)`. Be ready to explain why index-as-key would break: a close of window-2 in a list of 3 would reuse index 1's fiber for window-3, preserving its DOM/state. Focus traps, text inputs, animations all break.

### 5.2 State management at scale

**Q: "Your stores couple freely — `restoreOrFocusApp` touches workspace, system UI, and window manager logic. How does this hold at scale?"**

Honest answer: not great. At scale I'd introduce **coordinator modules** between hooks and stores — roughly, application-service-layer style. Hooks become thin wrappers. Cross-cutting operations (like session restore) live in one place. The current design is appropriate for one person / ~10 apps; it would not hold at a team of 10.

**Q: "Can you persist and restore workspace across sessions?"**

Zustand `persist` middleware → localStorage. Gotchas I'd name before being asked:
- Storing DOM dimensions is fragile across viewport changes — persist **relative** position (0-1 range), reconstitute on load.
- `windowInstanceCounters` must persist or you re-use IDs.
- Some window content is not serialisable (iframes, timers). Apps must declare what's restorable.

**Q: "Migrate to server-owned state?"**

Answer with axes: **identity** (auth → stays client + server), **configuration** (taskbar alignment, time format → server if multi-device sync is required, else client), **workspace** (likely local — restoring 10 windows across machines is weird UX), **settings** (server-synced).

### 5.3 Performance engineering (not just "it feels fast")

Quantify everything.

**Q: "How big is your bundle?"**
If you don't know: "I haven't profiled it; `vite-bundle-analyzer` is wired up, and my priority audit would be (1) Fluent icons tree-shaking, (2) Storybook accidentally reaching prod, (3) unused react-rnd features." That's a better answer than a number made up on the spot.

**Q: "What's your render hotspot?"**
Candidates: `Taskbar` (many store reads), `WindowManager` (re-renders on any window change and passes down). Measurement: React Profiler's "Ranked" chart after triggering a drag.

**Q: "How did you choose minute-boundary alignment over `setInterval(1000)`?"**
Math: 1s interval = 60 needless wake-ups per minute = ~86,400/day. At the laptop level that's irrelevant; in an aggregated fleet of users it matters. This is also a **browser throttling** concern — background tabs clamp `setInterval` to 1/s anyway, which would desync. Minute alignment + `visibilitychange` handling (future work) is the robust shape.

**Q: "Your z-index strategy scans all windows on focus. When does that break?"**
`O(n)` per focus event, `n` = open windows. Breaks at thousands — not a concern here. But if you want to look senior: "I'd replace it with a monotonic counter issued by the store. Focus becomes O(1). Trade-off: on store reset you rebase counters, and persisted values need normalisation on load."

### 5.4 Build-time vs runtime

See [HELPER_SCRIPTS.md](HELPER_SCRIPTS.md) for the full reasoning. The one-liner:

> "Any computation whose inputs are static belongs at build time. The user pays nothing for work you did on CI. Tree-shaking, SSG, type-checking, and token generation are all instances. The art is spotting which inputs are actually static."

Be ready to generalise: the principle applies to **data fetching** (prefetch at build time if content is static), **routing** (static route manifests vs client resolution), **config** (env baked into bundle vs fetched at runtime — each has observability trade-offs).

### 5.5 Testing strategy

**Q: "What's your testing pyramid?"**

Don't parrot the pyramid. Say what you actually believe:

> "High-value, low-cost first: stores and hooks — pure logic, blistering fast, catch regressions. Component behaviour via Storybook play functions. I deliberately don't unit-test presentational components — testing `<div>` is testing React. If I had one engineering day to add tests, I'd write three Playwright E2E flows: launch-and-close, minimize-and-restore, and sign-out-and-back-in. Those catch integration bugs that unit tests never will."

**Q: "How would you test concurrency bugs?"**
Hardest category. Answer: fast-path is fakeTimers + deliberate interleaving in Vitest. Slow-path is Playwright with artificial network delays. State-machine testing libraries (XState's model-based testing) are the bigger hammer when it matters.

### 5.6 Accessibility — real, not apologetic

**Q: "Is this accessible?"**

The senior answer is honest triage, not apology:

> "Native elements where they matter — `<input type=range>` for sliders, `role=button` + tabindex on icons, keyboard activation. Known gaps: icon-only buttons lack aria-labels, no focus trap on open windows, no aria-live on search results, no tablist semantics on StartMenu panels. If shipping to an enterprise customer with WCAG AA requirements, my first four tasks are: (1) `inert` on unfocused windows, (2) aria-label sweep on icon buttons, (3) focus management on modal open/close, (4) axe-core audit in CI."

The structure: **what's there, what's missing, what I'd do about it, in what order.**

### 5.7 Deployment, observability, and operations

**Q: "How do you know it's broken in production?"**

Honest answer: you don't — there's no telemetry. Senior follow-up:

> "For a portfolio that's fine. For anything real I'd add: (1) `window.onerror` + `unhandledrejection` → Sentry (or equivalent), (2) Web Vitals → a lightweight beacon, (3) a feature-flag client so I can disable a broken app without a redeploy, (4) build-provenance metadata (commit SHA) embedded in the bundle so crash reports are traceable."

**Q: "How do you roll back?"**
`gh-pages` is destructive. Senior answer: "Today, I'd revert the commit and redeploy. For real-world: CI builds tagged artifacts, deploy is atomic promotion of a tag, rollback is re-promotion of the previous tag. The current setup couples build and deploy, which is fine for one person and wrong for a team."

### 5.8 Error boundaries and failure modes

**Q: "What happens when an app component throws?"**

Current answer: the whole workspace unmounts. There's no error boundary.

**What I'd do:** wrap each `WindowContainer` content in an error boundary with a "crashed" fallback UI that preserves window chrome (user can still close it). One crashed Notepad shouldn't kill a running VSCode. This is a real, cheap fix — worth bringing up proactively.

---

## 6. System-design extensions

Good interviewers pivot: "assume this project, now design X on top of it." Practice these.

### 6.1 "Make it multi-user"

Levels of answer:
- **Naive:** websocket between clients, broadcast every store action.
- **Better:** CRDTs (Yjs, Automerge) for the workspace state — last-writer-wins for windows is unacceptable; convergent data types handle concurrent edits cleanly.
- **Senior:** identify what *must* be shared (cursor positions, active app) vs what shouldn't (personal taskbar pins). Shared state is a subset, not the whole. Build it as a synced **projection** of local state, not a replacement for it.

### 6.2 "Persist across sessions"

See §5.2. Key distinction: persist intent, not DOM state. "Notepad-1 was open with draft X at position Y" persists; "this react-rnd instance was at x=447.3" does not.

### 6.3 "Support 100+ simultaneous windows"

- Windowize the window list (virtualised render — react-window).
- Replace z-index scan with monotonic counter.
- Taskbar icon list must cap or collapse ("+14 more").
- Store selectors tighten: no component subscribes to full `activeWindows` anymore — they subscribe to `activeWindows.length` or specific IDs.
- Consider offscreen rendering / content pausing for minimized windows.

### 6.4 "Add i18n"

- Strings move to message catalogs. APP_REGISTRY names become keys, not literals.
- Time/date formatting already uses `Intl.DateTimeFormat` — good. Locale becomes a store value.
- RTL: react-rnd's bounds are LTR-native. Would need careful testing.
- Fluent tokens don't carry text direction, so the CSS variables stay valid. Layouts flip via `dir="rtl"` on root + logical properties (`margin-inline-start`).

---

## 7. Bugs and rough edges — own them proactively with severity

Senior candidates don't hide bugs. They triage them.

| Severity | Issue                                                                | Where                    |
| -------- | -------------------------------------------------------------------- | ------------------------ |
| **Bug**  | `!setStartMenuOpen` negates the setter function (always truthy)      | [Taskbar.md](components/Taskbar.md) |
| **Gap**  | No touch event handling on `AppIcon` — mobile long-press missing     | [AppIcon.md](components/AppIcon.md) |
| **Gap**  | No error boundaries; a crashing app unmounts the workspace           | §5.8                     |
| **Smell**| `Taskbar` pulls ~10 values from one store call — wide re-render surface | §5.1                  |
| **Debt** | `TaskbarRightClickMenu` commented out — snap animation unfinished    |                          |
| **Debt** | Generated `_theme.scss` has timestamp header → noisy diffs           | [HELPER_SCRIPTS.md](HELPER_SCRIPTS.md) |
| **UX**   | StartMenu search silently overrides panel selection                  | [StartMenu.md](components/StartMenu.md) |

**The move:** when asked "what's wrong," answer with a **ranked** list. Severity > volume.

---

## 8. What I'd rewrite in v2 (self-critique as signal)

Name three to five things unprompted. This is one of the strongest senior signals.

1. **Coordinator layer between hooks and stores.** `useWindowManager` is already halfway there; I'd formalise it and move cross-store orchestration out of hooks entirely.
2. **Tighter store subscriptions.** Audit every `const { a, b, c, d, e } = useX()` — convert to per-field selectors with `shallow` equality where needed.
3. **Error boundaries per window.**
4. **Replace timestamp in generated `_theme.scss` header** — regeneration should be idempotent so diffs reflect real token changes.
5. **Persist workspace** with the intent-not-DOM principle from §5.2.
6. **Telemetry + feature flags.** Currently zero observability; before shipping to anyone who isn't me, both become required.

---

## 9. Judgment calls I'd defend — where the obvious answer is wrong

Senior candidates can articulate decisions where they chose the *less popular* option. Practice these:

**"Why not Redux?"**
"Redux's biggest value is time-travel debugging and middleware ecosystem. For five stores with narrow, well-scoped actions, the action/reducer boilerplate tax is real. I'd adopt Redux the moment I need middleware I can't write in 20 lines or when the action log itself becomes a debugging artifact."

**"Why not co-locate window logic inside components?"**
"Components get reused across desktop, taskbar, and start menu. Putting window logic inside `AppIcon` couples three surfaces to one policy. A hook isolates policy from presentation."

**"Why not CSS-in-JS?"**
"Runtime style generation adds bundle weight and re-render cost. CSS variables are free at runtime. I'd switch to vanilla-extract if I needed static extraction + type-safety, but not for runtime styling — the point is to do *less* at runtime, not more."

**"Why not Next.js?"**
"SPA with no SEO requirement. Next would add server infrastructure, a deployment story, and hydration cost for zero user-facing benefit. It's a great framework for the wrong problem here."

---

## 10. Two-minute closer

End with principle, not features:

> "The thing I'd emphasise is the discipline of layers — components as views, stores as state, hooks as logic, tokens as build-time artifacts. Each layer is swappable because the seams are explicit. The desktop metaphor is the hook; the fact that I can rewrite the design system without touching a component, or swap Zustand without touching styles, is the point. The rough edges — missing error boundaries, wide store reads, no telemetry — are the next six weeks of work. The architecture is what gives me confidence I can do that work without a rewrite."

That sentence — "the architecture is what gives me confidence I can do that work without a rewrite" — is the senior line.

---

## Quick-reference reading list

- [AppIcon.md](components/AppIcon.md) — polymorphic component, ref-as-state, timeout cleanup
- [WindowContainer.md](components/WindowContainer.md) — controlled store-backed component, RAF fade-in
- [StartMenu.md](components/StartMenu.md) — derived state, click-outside exceptions
- [Taskbar.md](components/Taskbar.md) — minute-aligned clock, the Meta-key bug
- [Slider.md](components/Slider.md) — native a11y, controlled input
- [HELPER_SCRIPTS.md](HELPER_SCRIPTS.md) — build-time vs runtime reasoning
- [DATA_FLOW.md](DATA_FLOW.md), [STORE_DOCUMENTATION.md](STORE_DOCUMENTATION.md) — state topology
