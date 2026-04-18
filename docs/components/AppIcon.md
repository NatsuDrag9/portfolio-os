# AppIcon

**Location:** [src/components/AppIcon/](../../src/components/AppIcon/)

## Overview

`AppIcon` is a polymorphic icon component — one component renders three visually and behaviorally distinct UIs depending on where it's placed:

| Variant       | Where it appears              | Primary interaction                |
| ------------- | ----------------------------- | ---------------------------------- |
| `desktop`     | Desktop grid                  | Double-click launches              |
| `taskbar`     | Taskbar pinned/running apps   | Single-click focuses/launches      |
| `start-menu`  | Start menu panels             | Single-click launches              |

It also owns two peripheral behaviors that deserve their own mention:
- **Hover popup** (taskbar only) — lists every open window for the app
- **Right-click context menu** — actions differ by variant and by whether the app is running/pinned

## API

Defined in [AppIcon.tsx:22-37](../../src/components/AppIcon/AppIcon.tsx#L22-L37).

```ts
interface AppIconProps {
  appId: string;                                   // Key into APP_REGISTRY
  iconVariant: 'desktop' | 'taskbar' | 'start-menu';
  shape?: 'water-droplet' | 'circle' | 'square';   // CSS shape modifier
  onSingleClick?: (appId: string) => void;         // Fired on taskbar/start-menu click
  onDoubleClick?: (appId: string) => void;         // Fired on desktop dblclick / Enter
  onRightClick?: (appId: string) => void;
  onWindowFocus?: (windowId: string) => void;      // Popup entry click (taskbar)
  onWindowClose?: (windowId: string) => void;      // Popup entry close button
  isPinned?: boolean;                              // Alters right-click options
  onContextMenuItemClick?: (
    appId: string,
    action: AppIconRightClickActionType,
    variant: AppIconVariant
  ) => void;
}
```

All interaction callbacks are optional — the component is a pure "reporter" and parents decide what happens.

## State

### Local state — [AppIcon.tsx:52-56](../../src/components/AppIcon/AppIcon.tsx#L52-L56)

| State                   | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| `showPopup`             | Mount/unmount of the hover popup                   |
| `isExiting`             | Drives the fade-out CSS class on the popup         |
| `showContextMenu`       | Mount/unmount of the right-click menu              |
| `iconElement`           | DOM ref (stored in state so `RightClickMenu` re-renders when it arrives) |
| `unmountTimeoutRef`     | Ref to the timeout that finishes popup exit anim   |

Storing the root element as state (`setIconElement` used as `ref` callback on line 169) is deliberate — it forces a re-render so the portaled `RightClickMenu` can compute its position against a known anchor.

### Global state (Zustand) — `useWorkspaceState`

Only `activeWindows` is read. Two derived values matter:

```ts
const openWindowsForApp = activeWindows.filter(w => w.id?.startsWith(`${appId}-`));
const focusedWindow = activeWindows.reduce((p, c) => p.zIndex > c.zIndex ? p : c, ...);
const isThisAppFocused = focusedWindow?.id?.startsWith(`${appId}-`) && focusedWindow.isMaximized;
```

**Important distinction:** `windowInstanceCounters[appId]` in the store is an **ID generator**, not a live count. Closing window `notepad-2` leaves the counter at 2, so the next spawn is `notepad-3`. If you need "how many are open," always filter `activeWindows` — see [AppIcon.tsx:62-65](../../src/components/AppIcon/AppIcon.tsx#L62-L65).

## Behavior matrix

| Event            | desktop              | taskbar                                | start-menu          |
| ---------------- | -------------------- | -------------------------------------- | ------------------- |
| click            | ignored              | `onSingleClick`                        | `onSingleClick`     |
| dblclick         | `onDoubleClick`      | ignored                                | ignored             |
| Enter / Space    | `onDoubleClick`      | `onSingleClick`                        | `onSingleClick`     |
| contextmenu      | RightClickMenu       | RightClickMenu                         | RightClickMenu      |
| mouseenter/leave | no popup             | popup if windows open                  | no popup            |
| focus dot        | not shown            | hidden / unfocused / focused           | not shown           |

## Sub-components

### `ActiveWindowsPopup` — [ActiveWindowsPopup/](../../src/components/AppIcon/ActiveWindowsPopup/)

Rendered once per open window when hovering a taskbar icon. One entry = one window. Clicking the entry calls `onFocus(windowId)`; the close button calls `onClose(windowId)` and `stopPropagation`s so the parent click doesn't also fire.

### `RightClickMenu` — [RightClickMenu/](../../src/components/AppIcon/RightClickMenu/)

Portaled to `document.body` to escape the stacking context of the Rnd-wrapped windows. Menu items are filtered by:
- `isPinned`
- `hasOpenWindows`
- `hasMultipleWindows`
- `iconVariant` (e.g. start-menu can't "close window")

Outside-click dismissal is handled by a shared `useClickOutsideModal` hook.

## Helpers — [helperFunctions.ts](../../src/components/AppIcon/helperFunctions.ts)

- `truncateAppName(name, variant)` — truncation limits: desktop 30, start-menu 20, taskbar returns unchanged (no label rendered).
- `getDotModifier(hasOpenWindows, isThisAppFocused)` — returns one of `--hidden`, `--unfocused`, `--focused`.
- `getVariantModifiers(variant, hasMultipleWindows, isThisAppFocused)` — builds the BEM modifier string.

## The "is it a Fluent icon?" check

```ts
const isFluentIcon = appMetaData && typeof appMetaData.desktopIcon !== 'string';
```

Fluent icons are React components, images are strings. But Fluent icons are wrapped in `React.memo`, so `typeof` is `'object'`, **not** `'function'`. Checking for "not a string" is the safest form — see [AppIcon.tsx:139-142](../../src/components/AppIcon/AppIcon.tsx#L139-L142).

## Animation / timeout coordination

`POPUP_UNMOUNT_DELAY = 600ms` must match the CSS exit animation. Re-entering the icon within the delay cancels the pending unmount (`clearTimeout` in `handleMouseEnter`). The `useEffect` cleanup on unmount clears the ref-held timeout to avoid late state updates on unmounted components.

## Gotchas

1. **Desktop icons don't respond to single click** — users coming from web apps expect click-to-open, but we mirror OS conventions.
2. **Popup vs. context menu are mutually exclusive** — `showPopup && hasOpenWindows && !showContextMenu` on [AppIcon.tsx:203](../../src/components/AppIcon/AppIcon.tsx#L203).
3. **Focused state requires `isMaximized`** — the focus dot only shows when the focused window is in a visible display state (not minimized).
4. **No touch handling yet** — file-level TODO at [AppIcon.tsx:20](../../src/components/AppIcon/AppIcon.tsx#L20). Mobile hover/long-press is not implemented.

## Performance

- `activeWindows.filter` runs on every render but the array is small (≤ open-windows count).
- The reduce for `focusedWindow` is O(n) on active windows — acceptable.
- Consider `React.memo` on the component itself if the parent re-renders frequently; the component does not wrap itself today.

## Accessibility

- `role="button"`, `tabIndex={0}`, keyboard-activatable (Enter/Space).
- `title` attribute exposes the full untruncated app name.
- Right-click menu is not a native `<menu>` — if screen-reader support is required, add `role="menu"` and roving `tabindex` inside `RightClickMenu`.

## Interview talking points

- **Polymorphism via a single component.** One implementation, three distinct UIs. Trade-off vs. three separate components: shared state-reading logic vs. prop surface bloat.
- **Ref-as-state pattern.** Why store the DOM node in `useState` instead of `useRef` — so portal children can position against a known anchor after mount.
- **Event timing with refs.** Popup exit animation uses `setTimeout` + a ref to enable cancelation on re-entry — a classic "state lives in React, timers live in refs" split.
- **Filter-from-source-of-truth.** Why not trust a counter? Because counters represent IDs assigned, not windows currently alive. Interviewers love this kind of "be careful what your primary key means" nuance.
- **Portal escape hatches.** Why the right-click menu is portaled but the hover popup isn't: stacking contexts under `react-rnd`.
