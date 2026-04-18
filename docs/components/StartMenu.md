# StartMenu

**Location:** [src/components/StartMenu/](../../src/components/StartMenu/)

## Overview

`StartMenu` is the Windows-style launcher surface that appears above the taskbar. It's built as a single panel container with three mutually exclusive content views (panels) and two fixed chrome slots (user card, power button).

Panels:

| Panel ID             | Purpose                                     | Trigger                                   |
| -------------------- | ------------------------------------------- | ----------------------------------------- |
| `panel-one`          | Pinned "Default" apps + "Recommended" apps  | Default view                              |
| `panel-two`          | All apps, alphabetically grouped            | "All" button on `panel-one`               |
| `search-results`     | Filtered apps matching taskbar search       | Automatic when `searchValue !== ''`       |

Two sub-chromes sit outside the panel content:

- `StartMenuUser` — avatar + username, expandable "user card"
- `StartMenuPowerButton` — sign out / power off

## API

`StartMenu` takes **no props**. All state is pulled from Zustand stores. Its parent ([Workspace](../../src/screens/Workspace/Workspace.tsx)) renders it unconditionally — its own `startMenuOpen` state controls visibility via CSS.

## State

### Local — [StartMenu.tsx](../../src/components/StartMenu/StartMenu.tsx)

| State         | Type                                              | Purpose                                 |
| ------------- | ------------------------------------------------- | --------------------------------------- |
| `changePanel` | `'panel-one' \| 'panel-two' \| 'search-results'`  | Panel chosen by user (overridden by search) |

### Zustand — `useSystemUIState`

Reads: `startMenuOpen`, `searchValue`, `taskbarAlignment`
Writes: `setStartMenuOpen(open)`, `setSearchValue(value)`

### Zustand — `useWorkspaceState`

Reads: `activeWindows` — only to compute `maxZIndex + 1` so the menu renders above all windows.

### Other stores

- `useAuth` — used inside `StartMenuUser` for username, avatar, role
- `useBootStatus` — used inside `StartMenuPowerButton` to transition to shutdown / login

### Refs

- `startMenuRef` — passed to `useClickOutsideModal` for dismissal
- `windowsButtonRef` — resolved at mount by `document.querySelector('[data-start-menu-trigger]')` so it can be added to the click-outside exception list (otherwise clicking the Windows button to open the menu would immediately close it)

## Derived state: which panel is active?

The active panel is computed, not stored:

```ts
const activePanel = searchValue ? 'search-results' : changePanel;
```

Implication: a user can click "All" to switch to `panel-two`, then type in the search box — the view jumps to `search-results`. Clearing the search returns to whatever `changePanel` is (so they land back on `panel-two`, not `panel-one`). This is a subtle UX choice worth remembering.

## Z-index strategy

```ts
const zIndex = Math.max(...activeWindows.map(w => w.zIndex), 0) + 1;
```

Recomputed on every `activeWindows` change. This keeps the start menu above windows without ever writing a window record for itself — the menu is always "above the stack" rather than "in the stack."

## Sub-components

### `PanelOne` — [Panels/PanelOne.tsx](../../src/components/StartMenu/Panels/PanelOne.tsx)

- Filters `APP_REGISTRY` by `startMenuAppCategory === 'default'` and `'recommended'`.
- "All" button advances `changePanel` to `panel-two`.
- Each `AppIcon` uses the `start-menu` variant.

### `PanelTwo` — [Panels/PanelTwo.tsx](../../src/components/StartMenu/Panels/PanelTwo.tsx)

- Runs `groupAppsByFirstLetter()` — a memoized `reduce` that buckets apps under `A-Z`, then sorts each bucket alphabetically.
- The sort is done as a side effect inside `useMemo` (unusual — ESLint is suppressed). Acceptable because the memoized result isn't shared, but worth noting.

### `PanelSearchResults` — [Panels/PanelSearchResults.tsx](../../src/components/StartMenu/Panels/PanelSearchResults.tsx)

- Case-insensitive match against `appName`.
- Empty-state renders a search icon + "Try a different term" hint.
- Back button clears `searchValue` (not `changePanel`), so the user returns to their previous panel.

### `StartMenuUser` — [StartMenuUser.tsx](../../src/components/StartMenu/StartMenuUser.tsx)

- Shows avatar (from `useAuth.uploadedUserAvatar`) or a default icon.
- Click toggles a "user card" with username, role (Admin/Explorer), status label.

### `StartMenuPowerButton` — [StartMenuPowerButton.tsx](../../src/components/StartMenu/StartMenuPowerButton.tsx)

- "Sign out" — resets `useSystemUIState`, `useWorkspaceState`, `useAuth` to defaults and flips `useBootStatus` to the login screen.
- "Power off" — flips `useBootStatus` to the shutdown screen.

### `StartMenuCategory` — [StartMenuCategory.tsx](../../src/components/StartMenu/StartMenuCategory.tsx)

Presentational header for sections ("Default", "Recommended", "All"). Accepts an optional button prop (used for the chevron-right "All" button on `PanelOne`).

## Click-outside behavior

`useClickOutsideModal` is given:
- `startMenuRef` — the element that, when clicked, should **not** close the menu
- Exception refs — nodes that should be treated as "inside" (the Windows button, specifically)

If the Windows button weren't excluded, clicking it would:
1. Fire click-outside → close menu
2. Fire Windows-button click → re-open menu

…which net-cancels out. The exception list flattens this to a single "close on outside click" rule while letting the toggle work normally.

When the menu closes, `searchValue` is cleared — so re-opening starts clean.

## Search value flow (end-to-end)

```
Taskbar <input> onChange
   └─> setSearchValue(v)         // useSystemUIState
         └─> StartMenu re-renders
              └─> activePanel = 'search-results'
                   └─> PanelSearchResults filters APP_REGISTRY by v
```

`Taskbar` also calls `setStartMenuOpen(true)` on input focus (if the field already has a value) so the results are immediately visible.

## Dependencies

- **Zustand stores** — `useSystemUIState`, `useWorkspaceState`, `useAuth`, `useBootStatus`
- **`useClickOutsideModal`** — shared hook
- **`useWindowManager`** — shared hook for launching apps (passed down to panels as `onAppLaunch`)
- **`APP_REGISTRY`** — source of truth for app metadata
- **Fluent UI icons** — Chevron left/right for panel navigation

## Gotchas

1. **Search overrides panel selection.** `activePanel` is derived — users typing into search can't "stay" on `panel-two`.
2. **Windows-button ref resolution is DOM-order dependent.** The `querySelector` in `useEffect` relies on the Taskbar mounting before (or same tick as) StartMenu. `Workspace` renders Taskbar after StartMenu intentionally — changing that order will break click-outside exception.
3. **Z-index recomputes on every `activeWindows` change.** Harmless today (small arrays) but if you ever throttle window-movement actions into the store, reconsider.
4. **`PanelTwo`'s memoized grouping has `[]` deps.** Assumes `APP_REGISTRY` is static at runtime (it is). If apps ever become dynamic, switch to `[APP_REGISTRY]`.
5. **Close resets search, not `changePanel`.** Re-opening the menu always returns to whatever panel you last manually selected (`panel-one` on first open).

## Performance

- Panel content is rendered lazily: only the currently-active panel's JSX is mounted.
- `PanelTwo.groupAppsByFirstLetter` is memoized once at module-render time — cheap even on re-renders.
- Search filtering is **not** memoized (new array per keystroke). For APP_REGISTRY sizes (~30) this is fine; at hundreds it would warrant `useMemo`.

## Accessibility

- Panels are not announced as tabs (`role="tablist"` is missing). Screen-reader users navigating by region won't understand the tri-panel structure.
- Chevron buttons are icon-only — no `aria-label`.
- Focus isn't trapped when the menu opens. Tab order follows DOM — first the user card, then the category, then app icons.
- Search input uses semantic `<input>` and `role="searchbox"` (set by Taskbar).

## Interview talking points

- **Derived state.** `activePanel = searchValue ? 'search-results' : changePanel` is the canonical example of "store the minimum, derive the rest." Contrast with storing `activePanel` directly and having to synchronize it with search input on every keystroke.
- **Click-outside with exceptions.** The Windows-button case is a clean way to explain why toggle buttons often need special handling in outside-click hooks.
- **Decoupled coordination via store.** Taskbar and StartMenu never import each other or pass props — they share `searchValue` and `startMenuOpen` through Zustand. Discuss trade-off vs. lifting state to `Workspace`.
- **Dynamic z-index.** Why compute it per-render instead of hard-coding a large number (e.g. 9999)? Because Taskbar's context menu and any other "always-on-top" surface does the same thing; competing hard-coded z-indexes are fragile.
- **Lazy panel rendering.** Only one panel is ever mounted at a time. What does this save, and when would you change that (e.g. if panels had expensive state you wanted to preserve)?
