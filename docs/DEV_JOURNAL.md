## Portfolio OS- Dev notes

### 30-12-2025:

#### Fixed AppIcon showing multiple-windows ui despite only 1 window being active

**Problem**: `hasMultipleWindows` stayed true even after closing windows
**Root cause**: `windowInstanceCounters` is an ID generator. It doesn't store the active window count
**Solution**: Changed `AppIcon` and its `RightClickMenu` to count from `activeWindows` instead. Add a comment in `store.ts` explaining the purpose of `windowInstanceCounters`.
**Files changed**: AppIcon.tsx, RightClickMenu.tsx, store.ts
**Key learning**: Always check if variable name matches actual purpose

#### Notepad App

**Architecture**:
Create Notepad app containing

- Header menu for various options
- A text area for input
- A status-bar with various indicators

**Difficult to implement**:

- Clipboard API instead of execCommand
- Defining the interface of NotepadMenuItem and subsequently the constants file
- All edit menu operations

#### Taskbar

**Feature**: Add context-menu functionality of pinned apps

- Used `Desktop.tsx` as reference to implement the `handleContextMenuItemClick` function.
- Use `launchWindow` instead of `addWindow` whenever user clicks on New Window
- Implement all context-menu-item functionalities

### 1-1-2026

#### Window Container

**Feature**: Add fade-in fade-out animation when opening and closing the window

- Add an `isClosing` flag in WindowData to trigger closing operation from various components like Taskbar, AppIcon's ActiveWindow and RightClick, etc
- Create requestCloseWindow action to set isClosing flag and delay calling removeWindow action
- Create a global timeout constant which stores the delay time
- Update `workspaceStore.test.ts` and `useWindowManaget.test.ts`
- Add styles for fade-in and fade-out animations

#### Constant files

Make all major local and global constants immutable by suffixing variable definition with `as const`.

Files Changed - `desktopConstants.ts`, `settingsConstants.ts`, `Notepad/constants.ts`

#### Command Prompt

Implement the core functionality of command prompt:

- Applied styles
- Commands are prcocessed
- It is buggy though as multi-word commands are not being identified and there's a layout overflow issue

### 2-1-2026 and 3-1-2026

#### CSS Stacking Context & React Portals

**Problem**: AppIcon's RightClickMenu appeared behind other desktop icons even with `z-index: 300`

**Root cause**: Misunderstanding of CSS stacking contexts

- `position: absolute` only removes an element from normal document flow (for layout)
- It does **NOT** remove the element from its parent's stacking context
- Each `react-rnd` wrapper creates its own stacking context
- Child z-index values are confined within their parent's stacking context
- Sibling stacking contexts are ordered by DOM order, not by descendant z-index values

**Key Learning**:

```
<Rnd> (Icon 1 - creates stacking context)
  └─ <AppIcon> (position: relative)
     └─ <RightClickMenu> (z-index: 300) ← Trapped in Icon 1's context!

<Rnd> (Icon 2 - later in DOM, renders on top)
  └─ <AppIcon>
```

Even with `z-index: 300`, RightClickMenu is only compared within Icon 1's stacking context. Icon 2's entire stacking context renders on top due to DOM order.

**Solution**: Use React Portal to render RightClickMenu at `document.body` level

- Portals escape the parent component's stacking context completely
- Menu renders at the root level, outside all Rnd wrappers
- Use `position: fixed` with viewport coordinates from `getBoundingClientRect()`
- Pass anchor element reference using callback ref pattern (state-based ref to avoid accessing `ref.current` during render)

**Implementation**:

1. Added `createPortal` from `react-dom`
2. Calculate position based on anchor element's bounding rect
3. Use callback ref (`useState` instead of `useRef`) to store anchor element
4. Portal renders menu content to `document.body`

**Files changed**: RightClickMenu.tsx, RightClickMenu.scss, AppIcon.tsx

**References**:

- [React Portals](https://react.dev/reference/react-dom/createPortal)
- [Understanding CSS Stacking Contexts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)

#### WindowContainer Maximize Height Issue

**Problem**: When maximizing a window, it didn't occupy the full height of its parent (Workspace). The window would expand to full width but height remained constrained, creating an awkward UI.

**Root cause**: CSS specificity issue with `react-rnd` inline styles

- `react-rnd` applies inline styles directly to the element with high specificity
- The `window-container--maximized` SCSS class had the correct height calculation: `height: calc(100% - 5.5rem)`
- However, the `!important` flags were **missing** from the CSS properties
- Without `!important`, inline styles from `react-rnd` overrode the SCSS rules

**Solution**: Added `!important` flags to all maximized state properties

- `width: 100% !important`
- `height: calc(100% - 4rem) !important` (adjusted for taskbar)
- `border-radius: 0 !important`
- `transform: translate(0, 0) !important`

**Key Learning**: When working with third-party libraries that apply inline styles (like `react-rnd`), you need `!important` in CSS to override them. The comments indicated this was the intent, but the actual `!important` flags were missing from the declarations.

**Files changed**: WindowContainer.scss

**Additional fix**: Used `useMemo` instead of `useEffect` + `setState` pattern in RightClickMenu to avoid cascading renders (React best practice for derived values)

#### Context Menu Option Functionality Integration

- Integrate settings and personalize in DesktopRightClickMenu
- Integrate context menu option functionalities in start-menu panels

**Files Changed** - `DesktopRightClickMenu.tsx`, `PanelOne.tsx` and `PanelTwo.tsx`

#### Taskbar

**Feature**: Add functionality for right-click-menu with options

**Options**: Settings, Snap to: right, left, top, bottom

**Note**: Commented out TaskbarRightClickMenu as snap functionality has bad animation

**Files Changed**: `StartMenu.tsx`, `StartMenu.scss`, `Taskbar.tsx`, `Taskbar.scss`, `TaskbarRightClickMenu.tsx`, `TaskbarRightClickMenu.scss`, `desktopConstants.ts`, `desktopTypes.ts`

#### Command Prompt

**Problem**: cp element was pushing window-container\_\_top outside due to its excess height during overflow

**Solution**: Reduced cp element's height from 100% to 95%

### 5-1-2026

#### Loader

**Feature**: Create loader component with storybook

#### LoginScreen Loader Integration

**Feature**: Added `<Loader />` to `<LoginScreen />`

- Display `<Loader />` before rendering login-screen\_\_panels
- Use local `isLoading` state for timeout as LoginScreen is not connected to the SystemUI state in the store

#### Settings Loader Integration on Clicking Apply button

**Feature**: Loader integration

- Create a new object called `displayLoader` within SystemUIState

```
{
  triggeredFrom: LoaderTriggerType; // Stores the app triggering <Loader /> component
  isLoading: boolean; // Display <Loader /> when true
}
```

- Create `setDisplayLoader: (value: DisplayLoader) => void` action to update displayLoader property

- Set display loader state in settings panel when clicking Apply button

#### Callback to Close Settings Window on Clicking Apply Button

**Feature**: Added a callback in `Settings.tsx` which is called when user clicks Apply Button

- Finds the `settings` window from `activeWindows` array
- Add `onClose: ()=> void` prop to all settings panel which is called when user clicks Apply button
