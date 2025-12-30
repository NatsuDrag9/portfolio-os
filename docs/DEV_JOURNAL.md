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
