# Taskbar

**Location:** [src/components/Taskbar/](../../src/components/Taskbar/)

## Overview

`Taskbar` is the persistent system chrome at the edge of the workspace. It's the densest component in the app — multiple concerns are assembled in one place:

- **Start menu trigger** — Windows logo button
- **Search input** — typing here opens the StartMenu in search mode
- **App icons** — union of pinned apps + apps with open windows
- **Quick-actions popup** — brightness, volume, airplane mode, etc.
- **System status icons** — WiFi, speaker, battery (optional)
- **Date/time display** — formatted, timezone-aware, updates on the minute
- **Alignment awareness** — re-flows for top/bottom/left/right taskbar positions
- **Meta-key shortcut** — Windows key toggles the start menu

## API

No props. Every input comes from the Zustand stores.

## State

### Local — [Taskbar.tsx](../../src/components/Taskbar/Taskbar.tsx)

| State                  | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `isQuickActionsOpen`   | Visibility of the `QuickActionsPopup`                |
| `currentTime`          | Formatted time string, updated each minute           |
| `currentDate`          | Formatted date string, updated with time             |

### `useSystemUIState`

Reads: `taskbarAlignment`, `isSearchVisible`, `searchValue`, `startMenuOpen`, `showMoreIcons`, `activeQuickActions`, `brightnessLevel`, `volumeLevel`, `timeFormat`, `dateFormat`, `autoSyncDateTime`, `timezone`.

Writes: `setStartMenuOpen`, `setSearchValue`, plus any quick-actions setters passed into `QuickActionsPopup`.

### `useWorkspaceState`

Reads: `taskbarPinnedAppIds`, `windowInstanceCounters`, `activeWindows`.
Writes: `togglePin(appId)` (via right-click menu handler).

### Hooks

- `useWindowManager()` → `{ launchWindow, focusWindow, closeWindow, restoreOrFocusApp }`
  - `launchWindow(appId)` — used for new-window / launch-from-search
  - `restoreOrFocusApp(appId)` — used as `AppIcon onSingleClick`; opens if closed, restores if minimized, focuses if already open
  - `closeWindow(windowId)` — used for "close window" / "close all" context menu actions
- `useMediaQuery('(max-width: 819px)')` → `isMobile`

## Time update algorithm — [Taskbar.tsx](../../src/components/Taskbar/Taskbar.tsx) (effect)

The naïve approach — `setInterval(fn, 1000)` — burns a tick per second for a display that only changes every minute. Instead:

```
msUntilNextMinute = 60_000 - (Date.now() % 60_000)
setTimeout(tick, msUntilNextMinute)
inside tick: updateTime(); setInterval(tick, 60_000)
```

This gives a single "catch-up" timeout to align with the `:00` second boundary, then a steady-state 60-second interval. Effect deps include `timeFormat`, `dateFormat`, `timezone`, `autoSyncDateTime`, so changing any of those re-runs the alignment and immediately updates the display.

Cleanup clears both `timeout` and `interval` references.

## App-icons row — pinned + running, deduped

```ts
const appIds = Array.from(new Set([...taskbarPinnedAppIds, ...runningAppIds]));
```

`Set` preserves insertion order, so pinned apps come first, running-only apps come after. This also handles the "pinned AND running" case without duplication.

Each `AppIcon` receives:
- `appId`, `iconVariant="taskbar"`, `isPinned`
- `onSingleClick = restoreOrFocusApp`
- `onContextMenuItemClick` → dispatches based on action:
  - `new-window` → `launchWindow(appId)`
  - `pin-to-taskbar` / `unpin-from-taskbar` → `togglePin(appId)`
  - `close-window` → closes the highest-zIndex window for the app
  - `close-all-windows` → closes every window for the app
  - `properties` → not implemented

## Search input

The input lives in the taskbar, but its value is read by `StartMenu`. Flow:

1. User focuses input → if it already has text, `setStartMenuOpen(true)` to show results
2. User types → `setSearchValue(v)` → StartMenu re-renders, `activePanel` flips to `'search-results'`
3. User clears → StartMenu returns to its previous panel (see [StartMenu.md](StartMenu.md))

Search input is **hidden** when `taskbarAlignment` is `'left'` or `'right'` (vertical orientations) — space is too constrained.

## Quick actions

`QuickActionsPopup` is a child of Taskbar, but its trigger differs by viewport:

| Viewport | Trigger                        | Orientation |
| -------- | ------------------------------ | ----------- |
| Desktop  | Click system-icons cluster     | Horizontal  |
| Mobile   | Click date/time area           | Vertical    |

The popup contains:
- Quick-action buttons (night-light, airplane, settings)
- Two `<Slider>` instances — brightness and volume

Clicking the "settings" quick-action launches the Settings app window via `useWindowManager`. Closing the window flips the quick-action's visual state off — i.e. the button state mirrors whether the window is open, not an independent toggle.

## Date/time formatting — [helperFunctions.ts](../../src/components/Taskbar/helperFunctions.ts)

```ts
formatTime(date, timeFormat, timezone) // Uses Intl.DateTimeFormat with hour12 flag
formatDate(date, dateFormat, timezone) // Uses Intl.DateTimeFormat('en-GB'), reshuffles for US format
```

`formatDate` always sources a known format first (`en-GB` → `DD/MM/YYYY`), then rearranges. This is safer than constructing the string manually from `getDate()`/`getMonth()` because `Intl` handles timezone conversion correctly.

## Meta-key shortcut

```ts
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Meta') setStartMenuOpen(!startMenuOpen);
  };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}, [startMenuOpen, setStartMenuOpen]);
```

> ⚠️ **Known issue:** Source currently reads `!setStartMenuOpen` (negating the setter function, always truthy). This should be `!startMenuOpen`. The key press will therefore always open the menu and never toggle closed. Worth flagging in a PR.

## Sub-components

- **`AppIcon`** (many instances) — see [AppIcon.md](AppIcon.md)
- **`QuickActionsPopup`** — [QuickActionsPopup/](../../src/components/Taskbar/QuickActionsPopup/)
  - Houses quick-action buttons and sliders
  - Accepts `alignment` prop derived from taskbar orientation
- **`TaskbarRightClickMenu`** — currently commented out in parent; re-enable for alignment shortcut menu once snap animation is polished

## Gotchas

1. **Meta-key bug** (above) — `!setStartMenuOpen` should be `!startMenuOpen`.
2. **Search input auto-opens menu on focus** — only if it already has text. Be careful when wiring programmatic focus events; they'd re-trigger this.
3. **App-icon ordering is pinned-first, insertion-order-second.** If you need most-recently-used ordering, rebuild the Set differently.
4. **Quick-action "settings" state is derived from window existence** — if a user opens Settings via desktop icon, the taskbar quick-action highlights. If they close via window X, it unhighlights. Don't add a separate toggle source.
5. **`taskbarAlignment` cascades deep** — `Slider`'s orientation inside `QuickActionsPopup` comes from here. Changing alignment without plumbing can leave sub-components in the wrong orientation.
6. **Time update is minute-aligned** — on resume from sleep / tab suspension, the next update could be skewed. A lifecycle-aware correction (re-align on `visibilitychange`) is a future improvement.

## Performance

- Time update uses minute-boundary alignment: one `setTimeout` + `setInterval(60_000)`. Far cheaper than a 1Hz interval.
- `Set`-based deduplication is O(n).
- `AppIcon` instances handle their own hover/popup state — no parent coordination.
- The component does **not** select individual store slices; it pulls many values per store. If the store becomes a re-render hotspot, split reads into selector-based subscriptions.

## Accessibility

- `data-start-menu-trigger` on the Windows button is used for outside-click exception logic (see [StartMenu.md](StartMenu.md)), not for a11y — a `role="button"` already exists.
- System icons are icon-only; `aria-label` is absent.
- Search input uses `role="searchbox"` with a proper placeholder. Live filtering isn't announced — screen readers won't say "12 results"; add `aria-live` on the results panel if needed.
- Meta-key shortcut isn't discoverable; add a visual hint or tooltip for keyboard users.

## Interview talking points

- **Minute-aligned timers.** Explain why `setInterval(fn, 1000)` is wrong for minute-granularity clocks. Walk through drift, waste, and the two-stage alignment pattern.
- **Bug-spotting.** The `!setStartMenuOpen` bug is a great "what's wrong with this code?" exercise. Why it looks correct (boolean-looking identifier), why it's wrong (it's a reference to a function), how the type system didn't catch it (`boolean` coerces from truthy).
- **Cross-component state.** Taskbar ↔ StartMenu communicate entirely through Zustand. Discuss how this enables independent testing (no parent to mock) vs. the cost of hidden coupling.
- **Responsive orientation.** `taskbarAlignment` is a string prop that cascades through child components and flips CSS classes. Contrast with using CSS container queries.
- **Derived button state.** The settings quick-action isn't a toggle — it's a projection of "is the Settings window open?" Eliminating a source of truth eliminates desync bugs.
- **Composition over parent API.** Despite being complex, Taskbar exposes no props — everything is pulled from stores. Trade-off: impossible to reuse in a different layout; easy to refactor internals.
