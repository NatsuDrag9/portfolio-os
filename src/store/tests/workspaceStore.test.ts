import { describe, it, expect, beforeEach } from 'vitest';
import { useWorkspaceState } from '../store';
import { WindowData } from '@definitions/applicationTypes';

// Mock window data for testing (data only, no methods)
const createMockWindow = (overrides: Partial<WindowData> = {}): WindowData => ({
  id: 'window-1',
  title: 'Test Window',
  windowName: 'TestApp',
  isMaximized: false,
  position: { x: 100, y: 100 },
  zIndex: 1,
  size: { width: 45, height: 35 },
  customTheme: undefined,
  snapPosition: 'fullscreen',
  ...overrides,
});

// Reset store between tests
beforeEach(() => {
  useWorkspaceState.setState({
    activeWindows: [],
    taskbarPinnedAppIds: [],
    activeBackground: '/default-wallpaper.jpg',
  });
});

describe('useWorkspaceState', () => {
  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toStrictEqual([]);
      expect(state.taskbarPinnedAppIds).toStrictEqual([]);
      expect(state.activeBackground).toBe('/default-wallpaper.jpg');
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
      expect(state.taskbarPinnedAppIds).toHaveLength(1);
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
        'browser-1',
        'vscode-1',
      ]);
    });
  });

  describe('Add Window', () => {
    it('should add a window to active windows', () => {
      const { addWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow();

      addWindow(mockWindow);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeWindows[0]).toStrictEqual(mockWindow);
    });

    it('should add multiple windows', () => {
      const { addWindow } = useWorkspaceState.getState();
      const window1 = createMockWindow({ id: 'window-1' });
      const window2 = createMockWindow({ id: 'window-2' });
      const window3 = createMockWindow({ id: 'window-3' });

      addWindow(window1);
      addWindow(window2);
      addWindow(window3);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(3);
      expect(state.activeWindows.map((w) => w.id)).toStrictEqual([
        'window-1',
        'window-2',
        'window-3',
      ]);
    });

    it('should preserve existing windows when adding new one', () => {
      const { addWindow } = useWorkspaceState.getState();
      const window1 = createMockWindow({ id: 'window-1' });
      const window2 = createMockWindow({ id: 'window-2' });

      addWindow(window1);
      const firstState = useWorkspaceState.getState();
      const firstWindow = firstState.activeWindows[0];

      addWindow(window2);
      const secondState = useWorkspaceState.getState();

      expect(secondState.activeWindows[0]).toStrictEqual(firstWindow);
      expect(secondState.activeWindows[1]).toStrictEqual(window2);
    });
  });

  describe('Remove Window', () => {
    it('should remove a window by ID', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      removeWindow('window-1');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(0);
    });

    it('should remove specific window from multiple windows', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const window1 = createMockWindow({ id: 'window-1' });
      const window2 = createMockWindow({ id: 'window-2' });
      const window3 = createMockWindow({ id: 'window-3' });

      addWindow(window1);
      addWindow(window2);
      addWindow(window3);

      removeWindow('window-2');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(2);
      expect(state.activeWindows.map((w) => w.id)).toStrictEqual([
        'window-1',
        'window-3',
      ]);
    });

    it('should handle removing non-existent window', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      removeWindow('non-existent-id');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
    });

    it('should remove first window', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const window1 = createMockWindow({ id: 'window-1' });
      const window2 = createMockWindow({ id: 'window-2' });

      addWindow(window1);
      addWindow(window2);
      removeWindow('window-1');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeWindows[0].id).toBe('window-2');
    });

    it('should remove last window', () => {
      const { addWindow, removeWindow } = useWorkspaceState.getState();
      const window1 = createMockWindow({ id: 'window-1' });
      const window2 = createMockWindow({ id: 'window-2' });

      addWindow(window1);
      addWindow(window2);
      removeWindow('window-2');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeWindows[0].id).toBe('window-1');
    });
  });

  describe('Update Window Properties', () => {
    it('should set window title', () => {
      const { addWindow, setWindowTitle } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      setWindowTitle('window-1', 'New Title');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].title).toBe('New Title');
    });

    it('should set window maximized state', () => {
      const { addWindow, setWindowIsMaximized } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      setWindowIsMaximized('window-1', true);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].isMaximized).toBe(true);
    });

    it('should update window position', () => {
      const { addWindow, updateWindowPosition } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindowPosition('window-1', 200, 200);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].position).toStrictEqual({ x: 200, y: 200 });
    });

    it('should update window z-index', () => {
      const { addWindow, updateWindowZIndex } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindowZIndex('window-1', 100);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(100);
    });

    it('should update window size', () => {
      const { addWindow, updateWindowSize } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindowSize('window-1', 60, 50);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].size).toStrictEqual({
        width: 60,
        height: 50,
      });
    });

    it('should set window custom theme', () => {
      const { addWindow, setWindowCustomTheme } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });
      const customTheme = {
        fontColor: 'rgba(255, 0, 0, 1)',
        bgColor: 'rgba(0, 0, 0, 1)',
        iconShape: 'circle' as const,
      };

      addWindow(mockWindow);
      setWindowCustomTheme('window-1', customTheme);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].customTheme).toStrictEqual(customTheme);
    });

    it('should update window snap position', () => {
      const { addWindow, updateWindowSnapPosition } =
        useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindowSnapPosition('window-1', 'left-half');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].snapPosition).toBe('left-half');
    });

    it('should handle updating non-existent window', () => {
      const { addWindow, setWindowTitle } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      setWindowTitle('non-existent-id', 'New Title');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].title).toBe('Test Window'); // Unchanged
    });

    it('should preserve other window properties when updating one', () => {
      const { addWindow, setWindowTitle } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({
        id: 'window-1',
        title: 'Original Title',
        zIndex: 5,
      });

      addWindow(mockWindow);
      setWindowTitle('window-1', 'New Title');

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(5); // Unchanged
      expect(state.activeWindows[0].title).toBe('New Title');
    });
  });

  describe('Integrated Workflows', () => {
    it('should handle open, update, and close window workflow', () => {
      const { addWindow, updateWindowPosition, removeWindow } =
        useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'browser-1' });

      // Open window
      addWindow(mockWindow);
      let state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);

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
      const window1 = createMockWindow({ id: 'window-1' });
      const window2 = createMockWindow({ id: 'window-2' });

      addWindow(window1);
      addWindow(window2);

      updateWindowZIndex('window-1', 50);
      updateWindowZIndex('window-2', 100);
      updateWindowPosition('window-1', 500, 500);

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(50);
      expect(state.activeWindows[0].position).toStrictEqual({ x: 500, y: 500 });
      expect(state.activeWindows[1].zIndex).toBe(100);
    });

    it('should maintain workspace state across background changes', () => {
      const { addWindow, setActiveBackground } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
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

      const mockWindow = createMockWindow({ id: 'app-1' });
      addWindow(mockWindow);

      setWindowTitle('app-1', 'My App');
      setWindowIsMaximized('app-1', true);
      updateWindowPosition('app-1', 100, 100);
      updateWindowSize('app-1', 80, 70);
      updateWindowZIndex('app-1', 10);

      let state = useWorkspaceState.getState();
      const window = state.activeWindows[0];
      expect(window.title).toBe('My App');
      expect(window.isMaximized).toBe(true);
      expect(window.position).toStrictEqual({ x: 100, y: 100 });
      expect(window.size).toStrictEqual({ width: 80, height: 70 });
      expect(window.zIndex).toBe(10);

      removeWindow('app-1');
      state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(0);
    });
  });
});
