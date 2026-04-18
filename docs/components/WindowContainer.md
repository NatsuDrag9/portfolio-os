# WindowContainer

**Location:** [src/components/WindowContainer/](../../src/components/WindowContainer/)

## Overview

`WindowContainer` is the draggable, resizable window frame that every app is rendered inside. It is the visual shell — title bar, control buttons, chrome — plus all the drag/resize glue, wired to a window record in the global workspace store.

It is wrapped around app content by `WindowManager` (the only consumer). One `WindowContainer` exists per active window.

Key responsibilities:

- Move via `react-rnd` (title-bar drag handle only)
- Resize via `react-rnd` (edge/corner handles; min 600×400 on desktop)
- Minimize / maximize / close buttons
- Fade-in on mount, fade-out on close
- Forces fullscreen on mobile regardless of stored size/position

## API

Defined in [WindowContainer.tsx:13-16](../../src/components/WindowContainer/WindowContainer.tsx#L13-L16).

```ts
interface WindowContainerProps {
  children: ReactNode;  // Rendered inside .window-container__paint
  windowId: string;     // Key into activeWindows — everything else is store-driven
}
```

The entire prop surface is two fields. This is deliberate: the component is a **view** over the store. To change how a window behaves, update the store, not the props.

## State

### Local — [WindowContainer.tsx:19-20](../../src/components/WindowContainer/WindowContainer.tsx#L19-L20)

| State          | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| `isMounted`    | Gates the fade-in class; set via `requestAnimationFrame`|
| `isMobileView` | Media query hook result at `max-width: 819px`           |

### Store — `useWorkspaceState`

Reads: `activeWindows` (then derives its own record via `find`).
Writes:

| Action                  | Fired when                                  |
| ----------------------- | ------------------------------------------- |
| `setWindowIsMaximized`  | Minimize / maximize / restore button click  |
| `requestCloseWindow`    | Close button click (triggers exit animation)|
| `updateWindowPosition`  | `onDragStop`, `onResizeStop`                |
| `updateWindowSize`      | `onResizeStop`                              |

### The window record

Shape of `windowData` retrieved from `activeWindows.find(w => w.id === windowId)`:

```ts
{
  id: string;
  title: string;
  windowName: string;                    // Component registry key
  isMaximized: 'normal' | 'maximized' | 'minimized';
  previousDisplayState: 'normal' | 'maximized';   // Restored when un-minimizing
  position: { x: number; y: number };
  size:     { width: number; height: number };
  zIndex: number;
  isClosing?: boolean;                   // Set by requestCloseWindow, drives fade-out
}
```

## Rendering pipeline

```
                  ┌─────────────────────────────────┐
                  │  activeWindows (Zustand)         │
                  └───────────────┬─────────────────┘
                                  │ find(id)
                                  ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Rnd (react-rnd)                                            │
  │   position = isMobileFullscreen ? {0,0} : windowData.position│
  │   size     = isMobileFullscreen ? 100% : windowData.size     │
  │   disableDragging = isMobileFullscreen                       │
  │   enableResizing  = !isMobileFullscreen                      │
  │   dragHandleClassName = "window-container__top"              │
  │   bounds = "parent"                                          │
  │   style.zIndex = windowData.zIndex                           │
  │   style.visibility = isMinimized ? "hidden" : "visible"      │
  │   ┌──────────────────────────────────────────────────────┐  │
  │   │  <div.window-container__top>                         │  │
  │   │    <h5>{title}</h5>                                  │  │
  │   │    minimize / maximize / close buttons               │  │
  │   │  </div>                                              │  │
  │   │  <div.window-container__paint>{children}</div>       │  │
  │   └──────────────────────────────────────────────────────┘  │
  └─────────────────────────────────────────────────────────────┘
```

## Fade-in / fade-out

### Fade-in — [WindowContainer.tsx:51-60](../../src/components/WindowContainer/WindowContainer.tsx#L51-L60)

```ts
useEffect(() => {
  const rafId = requestAnimationFrame(() => setIsMounted(true));
  return () => cancelAnimationFrame(rafId);
}, []);
```

Why `requestAnimationFrame`? Setting `isMounted = true` synchronously in `useEffect` toggles the class in the **same frame** the element is inserted — the browser can collapse the initial and final states into a no-op, skipping the transition entirely. RAF defers the class-swap to the next paint, guaranteeing the transition runs.

### Fade-out

Triggered by `requestCloseWindow(windowId)` which sets `windowData.isClosing = true` in the store. The store removes the record after `WINDOW_CLOSE_TIMEOUT` (200 ms) to match the CSS transition.

`isVisible = isMounted && !windowData?.isClosing` drives the `--visible` / `--hidden` CSS classes.

## Mobile / fullscreen handling

`isMobileFullscreen = isMobileView || isMaximized` collapses two very different "fullscreen" states into one render path. This is convenient but worth noting:

- On mobile, drag and resize are disabled and min size is 0 (the component must fit the viewport).
- On desktop-maximized, the same clamping kicks in — the window appears locked at `{0,0}` with 100% size.
- On desktop-normal, position and size come from the store (defaults 50/50 px and 450×300 if missing).

Minimize uses `visibility: hidden` instead of `display: none` so `react-rnd` keeps its measurements; this avoids layout thrash when restoring.

## Maximize toggle — [WindowContainer.tsx:35-44](../../src/components/WindowContainer/WindowContainer.tsx#L35-L44)

```ts
if (displayType === 'maximized') {
  const newState = windowData?.isMaximized === 'maximized' ? 'normal' : 'maximized';
  setWindowIsMaximized(windowId, newState);
}
```

Clicking the maximize button when already maximized restores to `'normal'` — not to `previousDisplayState`. The `previousDisplayState` field is consumed only when restoring from minimized, which happens in the store via `setWindowIsMaximized`, not here.

## Dependencies

- **`react-rnd`** — provides `<Rnd>`: position, size, drag, resize, bounds. Drag handle is opt-in via `dragHandleClassName`; without it the whole window becomes draggable (bad — buttons would move the window).
- **Fluent UI icons** — `SubtractRegular`, `SquareMultipleRegular`, `DismissRegular`.
- **`useMediaQuery`** — internal hook, returns boolean for a media query string.

## Gotchas

1. **`enableUserSelectHack={false}`** — react-rnd by default injects `user-select: none` onto `<body>` during drag. Disabling this lets users select text inside window content while a neighbouring window is being dragged; it also stops body-level style flicker.
2. **`bounds="parent"` silently constrains**. If the parent container shrinks (e.g. viewport change), windows snap into bounds on next interaction. Stored coordinates may then no longer match reality.
3. **Maximize does not persist `previousDisplayState`** here — it's written when minimizing. Restoring from maximize always lands in `'normal'`.
4. **Initial size/position defaults** (450×300 at 50,50) are applied per-render if the store is missing those fields. If you find windows mysteriously spawning tiny, the store wasn't initialized with a size.
5. **`borderRadius: 0` on mobile** is applied inline — overrides the CSS default rounded corners.

## Performance

- `useMemo` on `windowData` avoids rebuilding the object reference each render when `activeWindows` is unchanged.
- Everything else is cheap — no expensive children rendered here; the heavy work is in `{children}`.
- The store keeps `activeWindows` stable across unrelated updates (Zustand selector pattern); adding a selector that returns only this window record would reduce renders further.

## Accessibility

- `<button type="button">` on all three control buttons — correct.
- Title rendered in `<h5>` inside the title bar. No `aria-label` on buttons — screen readers announce icons as "button" with no further context.
- No focus trap — keyboard focus can escape the window. Consider `inert` on non-focused windows for a11y and for preventing background windows from stealing Tab.

## Interview talking points

- **Why `requestAnimationFrame` for fade-in.** The "mount, then next-frame toggle class" pattern is a classic CSS-transition gotcha. Be ready to explain why `useLayoutEffect` alone isn't enough.
- **Controlled component vs. controlled store.** The component holds no window state; the store does. Walk the interviewer through why this matters when 10 windows exist: each component is a pure view, updates route through store actions, no cross-component coordination needed.
- **`visibility: hidden` vs `display: none`** for minimized windows — preserves layout measurements for react-rnd and avoids re-instantiating descendants.
- **Stacking context under react-rnd.** `Rnd` wraps children in a positioned div; child portals (like context menus) must escape to `document.body` to appear above sibling windows. This is why `AppIcon`'s right-click menu is portaled.
- **Drag-handle class-name.** Demonstrates fine-grained control over draggable surfaces without introducing a new wrapper.
