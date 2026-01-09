import { describe, it, expect, beforeEach } from 'vitest';
import { useWorkspaceState } from '../store';
import { AppMetadata } from '@definitions/applicationTypes';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { DefaultWallpaper } from '@assets/images/specifics';

// Mock app metadata
const createMockAppMetadata = (
  overrides: Partial<AppMetadata> = {}
): AppMetadata => ({
  id: 'test-app',
  appName: 'Test App',
  desktopIcon: '/test-icon.png',
  windowName: 'TestApp',
  defaultPinned: false,
  ...overrides,
});

const pinnedAppIds = APP_REGISTRY.filter(
  (app) => app.defaultPinned === true
).map((item) => item.id);

// Reset store between tests
beforeEach(() => {
  useWorkspaceState.setState({
    activeWindows: [],
    taskbarPinnedAppIds: pinnedAppIds,
    activeBackground: '/default-wallpaper.jpg',
    windowInstanceCounters: {},
  });
});

describe('useWorkspaceState', () => {
  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toStrictEqual([]);
      expect(state.taskbarPinnedAppIds).toStrictEqual(pinnedAppIds);
      expect(state.activeBackground).toBe('/default-wallpaper.jpg');
      expect(state.windowInstanceCounters).toStrictEqual({});
    });
  });

  describe('Active Background', () => {
    it('should set active background to new image', () => {
      const { setActiveBackground } = useWorkspaceState.getState();
      setActiveBackground('/new-wallpaper.jpg');

      const state = useWorkspaceState.getState();
      expect(state.activeBackground).toBe('/new-wallpaper.jpg');
    });

    it('should update active background multiple times', () => {
      const { setActiveBackground } = useWorkspaceState.getState();

      setActiveBackground('/wallpaper-1.jpg');
      let state = useWorkspaceState.getState();
      expect(state.activeBackground).toBe('/wallpaper-1.jpg');

      setActiveBackground('/wallpaper-2.jpg');
      state = useWorkspaceState.getState();
      expect(state.activeBackground).toBe('/wallpaper-2.jpg');
    });

    it('should handle empty string as background', () => {
      const { setActiveBackground } = useWorkspaceState.getState();
      setActiveBackground('');

      const state = useWorkspaceState.getState();
      expect(state.activeBackground).toBe('');
    });
  });

  describe('Taskbar Pinned Apps', () => {
    it('should set taskbar pinned app IDs', () => {
      const { setTaskbarPinnedAppIds } = useWorkspaceState.getState();
      const appIds = ['browser-1', 'notepad-1', 'vscode-1'];
      setTaskbarPinnedAppIds(appIds);

      const state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toStrictEqual(appIds);
    });

    it('should replace previous pinned apps', () => {
      const { setTaskbarPinnedAppIds } = useWorkspaceState.getState();

      setTaskbarPinnedAppIds(['app-1', 'app-2']);
      let state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toStrictEqual(['app-1', 'app-2']);

      setTaskbarPinnedAppIds(['app-3', 'app-4', 'app-5']);
      state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toStrictEqual([
        'app-3',
        'app-4',
        'app-5',
      ]);
    });

    it('should handle empty pinned apps array', () => {
      const { setTaskbarPinnedAppIds } = useWorkspaceState.getState();
      setTaskbarPinnedAppIds(['app-1', 'app-2']);
      setTaskbarPinnedAppIds([]);

      const state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toStrictEqual([]);
    });
  });

  describe('Toggle Pin', () => {
    it('should pin an app that is not pinned', () => {
      const { togglePin } = useWorkspaceState.getState();
      togglePin('browser-1');

      const state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toContain('browser-1');
      expect(state.taskbarPinnedAppIds).toHaveLength(pinnedAppIds.length + 1);
    });

    it('should unpin an app that is already pinned', () => {
      const { togglePin, setTaskbarPinnedAppIds } =
        useWorkspaceState.getState();
      setTaskbarPinnedAppIds(['browser-1']);

      togglePin('browser-1');

      const state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).not.toContain('browser-1');
      expect(state.taskbarPinnedAppIds).toHaveLength(0);
    });

    it('should pin multiple apps independently', () => {
      const { togglePin } = useWorkspaceState.getState();

      togglePin('browser-1');
      togglePin('notepad-1');
      togglePin('vscode-1');

      const state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toStrictEqual([
        ...pinnedAppIds,
        'browser-1',
        'notepad-1',
        'vscode-1',
      ]);
    });

    it('should toggle pin on and off', () => {
      const { togglePin } = useWorkspaceState.getState();

      togglePin('browser-1');
      let state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toContain('browser-1');

      togglePin('browser-1');
      state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).not.toContain('browser-1');

      togglePin('browser-1');
      state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toContain('browser-1');
    });

    it('should maintain other pinned apps when toggling one', () => {
      const { togglePin } = useWorkspaceState.getState();

      togglePin('browser-1');
      togglePin('notepad-1');
      togglePin('vscode-1');

      togglePin('notepad-1'); // Unpin middle app

      const state = useWorkspaceState.getState();
      expect(state.taskbarPinnedAppIds).toStrictEqual([
        ...pinnedAppIds,
        'browser-1',
        'vscode-1',
      ]);
    });
  });

  describe('Add Window', () => {
    it('should add a single window instance', () => {
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata({ id: 'vscode' });

      addWindow('vscode', appMetadata);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeWindows[0].id).toBe('vscode-1');
      expect(state.activeWindows[0].title).toBe('Test App');
      expect(state.windowInstanceCounters['vscode']).toBe(1);
    });

    it('should increment instance counter for same app', () => {
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata({
        id: 'vscode',
        appName: 'VSCode',
      });

      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(3);
      expect(state.activeWindows.map((w) => w.id)).toStrictEqual([
        'vscode-1',
        'vscode-2',
        'vscode-3',
      ]);
      expect(state.windowInstanceCounters['vscode']).toBe(3);
    });

    it('should maintain separate counters for different apps', () => {
      const { addWindow } = useWorkspaceState.getState();
      const vscodeMetadata = createMockAppMetadata({
        id: 'vscode',
        appName: 'VSCode',
      });
      const notepadMetadata = createMockAppMetadata({
        id: 'notepad',
        appName: 'Notepad',
      });

      addWindow('vscode', vscodeMetadata);
      addWindow('notepad', notepadMetadata);
      addWindow('vscode', vscodeMetadata);
      addWindow('notepad', notepadMetadata);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows.map((w) => w.id)).toStrictEqual([
        'vscode-1',
        'notepad-1',
        'vscode-2',
        'notepad-2',
      ]);
      expect(state.windowInstanceCounters['vscode']).toBe(2);
      expect(state.windowInstanceCounters['notepad']).toBe(2);
    });

    it('should set correct window properties on creation', () => {
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata({
        id: 'browser',
        appName: 'Chrome',
        windowName: 'ChromeApp',
      });

      addWindow('browser', appMetadata);

      const state = useWorkspaceState.getState();
      const window = state.activeWindows[0];
      expect(window.id).toBe('browser-1');
      expect(window.title).toBe('Chrome');
      expect(window.windowName).toBe('ChromeApp');
      expect(window.isMaximized).toBe('normal');
      expect(window.previousDisplayState).toBe('normal');
      expect(window.position).toStrictEqual({ x: 100, y: 80 });
      expect(window.size).toStrictEqual({ width: 700, height: 400 });
      expect(window.customTheme).toBeUndefined();
      expect(window.snapPosition).toBe('fullscreen');
      expect(window.isClosing).toBeUndefined();
    });

    it('should set incremental z-index for windows', () => {
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('app1', appMetadata);
      addWindow('app2', appMetadata);
      addWindow('app3', appMetadata);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(1);
      expect(state.activeWindows[1].zIndex).toBe(2);
      expect(state.activeWindows[2].zIndex).toBe(3);
    });
  });

  describe('Remove Window', () => {
    it('should remove a window by ID', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      removeWindow('vscode-1');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(0);
    });

    it('should remove specific window from multiple windows', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      addWindow('notepad', appMetadata);
      addWindow('vscode', appMetadata);

      removeWindow('vscode-1');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(2);
      expect(state.activeWindows.map((w) => w.id)).toStrictEqual([
        'notepad-1',
        'vscode-2',
      ]);
    });

    it('should handle removing non-existent window', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      removeWindow('non-existent-id');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
    });

    it('should keep instance counter when windows remain for that app', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);
      removeWindow('vscode-1');

      let state = useWorkspaceState.getState();
      expect(state.windowInstanceCounters['vscode']).toBe(2);
      expect(state.activeWindows).toHaveLength(1);

      // Next instance should be vscode-3 (counter continues)
      addWindow('vscode', appMetadata);
      state = useWorkspaceState.getState();
      expect(state.activeWindows[1].id).toBe('vscode-3');
      expect(state.windowInstanceCounters['vscode']).toBe(3);
    });

    it('should reset instance counter when last window is removed', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);

      let state = useWorkspaceState.getState();
      expect(state.windowInstanceCounters['vscode']).toBe(3);

      // Remove all windows
      removeWindow('vscode-1');
      removeWindow('vscode-2');
      removeWindow('vscode-3');

      state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(0);
      expect(state.windowInstanceCounters['vscode']).toBeUndefined();

      // Next window should restart at vscode-1
      addWindow('vscode', appMetadata);
      state = useWorkspaceState.getState();
      expect(state.activeWindows[0].id).toBe('vscode-1');
      expect(state.windowInstanceCounters['vscode']).toBe(1);
    });

    it("should preserve other app counters when removing one app's windows", () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);
      addWindow('notepad', appMetadata);
      addWindow('notepad', appMetadata);

      let state = useWorkspaceState.getState();
      expect(state.windowInstanceCounters).toStrictEqual({
        vscode: 2,
        notepad: 2,
      });

      // Remove all vscode windows
      removeWindow('vscode-1');
      removeWindow('vscode-2');

      state = useWorkspaceState.getState();
      expect(state.windowInstanceCounters).toStrictEqual({
        notepad: 2,
      });
      expect(state.windowInstanceCounters['vscode']).toBeUndefined();
    });
  });

  describe('Update Window Properties', () => {
    it('should set window title', () => {
      const { addWindow, setWindowTitle } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      setWindowTitle('vscode-1', 'New Title');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].title).toBe('New Title');
    });

    it('should set window maximized state', () => {
      const { addWindow, setWindowIsMaximized } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      setWindowIsMaximized('vscode-1', 'normal');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].isMaximized).toBe('normal');
    });

    it('should preserve previousDisplayState when changing to non-minimized state', () => {
      const { addWindow, setWindowIsMaximized } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);

      // Change to maximized (should not update previousDisplayState)
      setWindowIsMaximized('vscode-1', 'maximized');
      let state = useWorkspaceState.getState();
      expect(state.activeWindows[0].isMaximized).toBe('maximized');
      expect(state.activeWindows[0].previousDisplayState).toBe('normal');
    });

    it('should save previousDisplayState when minimizing', () => {
      const { addWindow, setWindowIsMaximized } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);

      // First maximize the window
      setWindowIsMaximized('vscode-1', 'maximized');

      // Then minimize it - should save 'maximized' as previousDisplayState
      setWindowIsMaximized('vscode-1', 'minimized');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].isMaximized).toBe('minimized');
      expect(state.activeWindows[0].previousDisplayState).toBe('maximized');
    });

    it('should not update previousDisplayState when already minimized', () => {
      const { addWindow, setWindowIsMaximized } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);

      // Minimize first time (saves 'normal')
      setWindowIsMaximized('vscode-1', 'minimized');
      let state = useWorkspaceState.getState();
      expect(state.activeWindows[0].previousDisplayState).toBe('normal');

      // Minimize again (should not change previousDisplayState)
      setWindowIsMaximized('vscode-1', 'minimized');
      state = useWorkspaceState.getState();
      expect(state.activeWindows[0].previousDisplayState).toBe('normal');
    });

    it('should update window position', () => {
      const { addWindow, updateWindowPosition } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      updateWindowPosition('vscode-1', 200, 200);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].position).toStrictEqual({ x: 200, y: 200 });
    });

    it('should update window z-index', () => {
      const { addWindow, updateWindowZIndex } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      updateWindowZIndex('vscode-1', 100);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(100);
    });

    it('should update window size', () => {
      const { addWindow, updateWindowSize } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      updateWindowSize('vscode-1', 60, 50);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].size).toStrictEqual({
        width: 60,
        height: 50,
      });
    });

    it('should set window custom theme', () => {
      const { addWindow, setWindowCustomTheme } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();
      const customTheme = {
        fontColor: 'rgba(255, 0, 0, 1)',
        bgColor: 'rgba(0, 0, 0, 1)',
        iconShape: 'circle' as const,
      };

      addWindow('vscode', appMetadata);
      setWindowCustomTheme('vscode-1', customTheme);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].customTheme).toStrictEqual(customTheme);
    });

    it('should update window snap position', () => {
      const { addWindow, updateWindowSnapPosition } =
        useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      updateWindowSnapPosition('vscode-1', 'left-half');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].snapPosition).toBe('left-half');
    });

    it('should handle updating non-existent window', () => {
      const { addWindow, setWindowTitle } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      setWindowTitle('non-existent-id', 'New Title');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].title).toBe('Test App'); // Unchanged
    });

    it('should preserve other window properties when updating one', () => {
      const { addWindow, setWindowTitle } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      const originalZIndex =
        useWorkspaceState.getState().activeWindows[0].zIndex;

      setWindowTitle('vscode-1', 'New Title');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(originalZIndex); // Unchanged
      expect(state.activeWindows[0].title).toBe('New Title');
    });
  });

  describe('Integrated Workflows', () => {
    it('should handle open, update, and close window workflow', () => {
      const { addWindow, updateWindowPosition, removeWindow } =
        useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      // Open window
      addWindow('browser', appMetadata);
      let state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeWindows[0].id).toBe('browser-1');

      // Update window position
      updateWindowPosition('browser-1', 250, 250);
      state = useWorkspaceState.getState();
      expect(state.activeWindows[0].position).toStrictEqual({ x: 250, y: 250 });

      // Close window
      removeWindow('browser-1');
      state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(0);
    });

    it('should handle multiple windows with independent updates', () => {
      const { addWindow, updateWindowZIndex, updateWindowPosition } =
        useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      addWindow('notepad', appMetadata);

      updateWindowZIndex('vscode-1', 50);
      updateWindowZIndex('notepad-1', 100);
      updateWindowPosition('vscode-1', 500, 500);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(50);
      expect(state.activeWindows[0].position).toStrictEqual({ x: 500, y: 500 });
      expect(state.activeWindows[1].zIndex).toBe(100);
    });

    it('should maintain workspace state across background changes', () => {
      const { addWindow, setActiveBackground } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);
      setActiveBackground('/new-wallpaper.jpg');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeBackground).toBe('/new-wallpaper.jpg');
    });

    it('should handle complete window lifecycle with all operations', () => {
      const {
        addWindow,
        setWindowTitle,
        setWindowIsMaximized,
        updateWindowPosition,
        updateWindowSize,
        updateWindowZIndex,
        removeWindow,
      } = useWorkspaceState.getState();

      const appMetadata = createMockAppMetadata({ appName: 'My App' });
      addWindow('app', appMetadata);

      setWindowTitle('app-1', 'My App');
      setWindowIsMaximized('app-1', 'normal');
      updateWindowPosition('app-1', 100, 100);
      updateWindowSize('app-1', 80, 70);
      updateWindowZIndex('app-1', 10);

      let state = useWorkspaceState.getState();
      const window = state.activeWindows[0];
      expect(window.id).toBe('app-1');
      expect(window.title).toBe('My App');
      expect(window.isMaximized).toBe('normal');
      expect(window.position).toStrictEqual({ x: 100, y: 100 });
      expect(window.size).toStrictEqual({ width: 80, height: 70 });
      expect(window.zIndex).toBe(10);

      removeWindow('app-1');
      state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(0);
    });

    it('should handle instance counter across multiple app types', () => {
      const { addWindow } = useWorkspaceState.getState();
      const vscodeMetadata = createMockAppMetadata({ id: 'vscode' });
      const notepadMetadata = createMockAppMetadata({ id: 'notepad' });
      const browserMetadata = createMockAppMetadata({ id: 'browser' });

      // Open multiple instances of each app
      addWindow('vscode', vscodeMetadata);
      addWindow('notepad', notepadMetadata);
      addWindow('vscode', vscodeMetadata);
      addWindow('browser', browserMetadata);
      addWindow('notepad', notepadMetadata);
      addWindow('vscode', vscodeMetadata);

      const state = useWorkspaceState.getState();
      expect(state.windowInstanceCounters).toStrictEqual({
        vscode: 3,
        notepad: 2,
        browser: 1,
      });
      expect(state.activeWindows.map((w) => w.id)).toStrictEqual([
        'vscode-1',
        'notepad-1',
        'vscode-2',
        'browser-1',
        'notepad-2',
        'vscode-3',
      ]);
    });

    it('should handle minimize and restore workflow with previousDisplayState', () => {
      const { addWindow, setWindowIsMaximized } = useWorkspaceState.getState();
      const appMetadata = createMockAppMetadata();

      addWindow('vscode', appMetadata);

      // Maximize window
      setWindowIsMaximized('vscode-1', 'maximized');
      let state = useWorkspaceState.getState();
      expect(state.activeWindows[0].isMaximized).toBe('maximized');
      expect(state.activeWindows[0].previousDisplayState).toBe('normal');

      // Minimize window (should save 'maximized' state)
      setWindowIsMaximized('vscode-1', 'minimized');
      state = useWorkspaceState.getState();
      expect(state.activeWindows[0].isMaximized).toBe('minimized');
      expect(state.activeWindows[0].previousDisplayState).toBe('maximized');

      // Restore window (could use previousDisplayState to restore to 'maximized')
      setWindowIsMaximized(
        'vscode-1',
        state.activeWindows[0].previousDisplayState
      );
      state = useWorkspaceState.getState();
      expect(state.activeWindows[0].isMaximized).toBe('maximized');
    });
  });

  describe('Reset', () => {
    it('should reset all state properties to their default values', () => {
      const { addWindow, setActiveBackground, togglePin, reset } =
        useWorkspaceState.getState();

      // 1. Modify the state away from defaults
      addWindow('test-app', createMockAppMetadata());
      setActiveBackground('/temporary-wallpaper.jpg');
      togglePin('new-app-id');

      // Verify state is dirty
      let state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeBackground).toBe('/temporary-wallpaper.jpg');
      expect(state.taskbarPinnedAppIds).toContain('new-app-id');

      // 2. Execute Reset
      reset();

      // 3. Verify state is back to initial
      state = useWorkspaceState.getState();
      expect(state.activeWindows).toStrictEqual([]);
      expect(state.activeBackground).toBe(DefaultWallpaper);
      expect(state.taskbarPinnedAppIds).toStrictEqual(pinnedAppIds);
      expect(state.windowInstanceCounters).toStrictEqual({});
    });

    it('should clear window instance counters upon reset', () => {
      const { addWindow, reset } = useWorkspaceState.getState();

      addWindow('vscode', createMockAppMetadata());
      addWindow('vscode', createMockAppMetadata());

      expect(
        useWorkspaceState.getState().windowInstanceCounters['vscode']
      ).toBe(2);

      reset();

      const state = useWorkspaceState.getState();
      expect(state.windowInstanceCounters).toStrictEqual({});

      // Verify that adding a window after reset starts the ID back at 1
      addWindow('vscode', createMockAppMetadata());
      expect(useWorkspaceState.getState().activeWindows[0].id).toBe('vscode-1');
    });
  });
});
