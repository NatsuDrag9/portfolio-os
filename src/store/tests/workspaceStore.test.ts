import { describe, it, expect, beforeEach } from 'vitest';
import { useWorkspaceState } from '../store';
import { WindowState } from '@definitions/storeTypes';
import { DefaultWallpaper } from '@assets/images/specifics';

// Mock window state for testing
const createMockWindow = (
  overrides: Partial<WindowState> = {}
): WindowState => ({
  id: 'window-1',
  title: 'Test Window',
  windowName: 'TestApp',
  isMaximized: false,
  position: { x: 100, y: 100 },
  zIndex: 1,
  size: { width: 45, height: 35 },
  customTheme: undefined,
  snapPosition: 'fullscreen',
  setTitle: () => {},
  setIsMaximized: () => {},
  updatePosition: () => {},
  updateZIndex: () => {},
  updateSize: () => {},
  setCustomTheme: () => {},
  updateSnapPosition: () => {},
  ...overrides,
});

// Reset store between tests
beforeEach(() => {
  useWorkspaceState.setState({
    activeWindows: [],
    taskbarPinnedAppIds: [],
    activeBackground: DefaultWallpaper,
  });
});

describe('useWorkspaceState', () => {
  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toStrictEqual([]);
      expect(state.taskbarPinnedAppIds).toStrictEqual([]);
      expect(state.activeBackground).toBe(DefaultWallpaper);
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

  describe('Update Window', () => {
    it('should update window position', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindow('window-1', { position: { x: 200, y: 200 } });

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].position).toStrictEqual({ x: 200, y: 200 });
    });

    it('should update window size', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindow('window-1', { size: { width: 60, height: 50 } });

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].size).toStrictEqual({
        width: 60,
        height: 50,
      });
    });

    it('should update window zIndex', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindow('window-1', { zIndex: 100 });

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(100);
    });

    it('should update multiple window properties at once', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindow('window-1', {
        position: { x: 300, y: 300 },
        size: { width: 70, height: 60 },
        zIndex: 50,
        isMaximized: true,
      });

      const state = useWorkspaceState.getState();
      const updatedWindow = state.activeWindows[0];
      expect(updatedWindow.position).toStrictEqual({ x: 300, y: 300 });
      expect(updatedWindow.size).toStrictEqual({ width: 70, height: 60 });
      expect(updatedWindow.zIndex).toBe(50);
      expect(updatedWindow.isMaximized).toBe(true);
    });

    it('should update specific window among multiple windows', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const window1 = createMockWindow({ id: 'window-1', title: 'Window 1' });
      const window2 = createMockWindow({ id: 'window-2', title: 'Window 2' });
      const window3 = createMockWindow({ id: 'window-3', title: 'Window 3' });

      addWindow(window1);
      addWindow(window2);
      addWindow(window3);

      updateWindow('window-2', { zIndex: 100 });

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].zIndex).toBe(1);
      expect(state.activeWindows[1].zIndex).toBe(100);
      expect(state.activeWindows[2].zIndex).toBe(1);
    });

    it('should preserve other window properties when updating', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({
        id: 'window-1',
        title: 'Original Title',
      });

      addWindow(mockWindow);
      updateWindow('window-1', { zIndex: 50 });

      const state = useWorkspaceState.getState();
      expect(state.activeWindows[0].title).toBe('Original Title');
      expect(state.activeWindows[0].zIndex).toBe(50);
    });

    it('should handle updating non-existent window', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'window-1' });

      addWindow(mockWindow);
      updateWindow('non-existent-id', { zIndex: 100 });

      const state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);
      expect(state.activeWindows[0].zIndex).toBe(1);
    });
  });

  describe('Integrated Workflows', () => {
    it('should handle open, update, and close window workflow', () => {
      const { addWindow, updateWindow, removeWindow } =
        useWorkspaceState.getState();
      const mockWindow = createMockWindow({ id: 'browser-1' });

      // Open window
      addWindow(mockWindow);
      let state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(1);

      // Update window position
      updateWindow('browser-1', { position: { x: 250, y: 250 } });
      state = useWorkspaceState.getState();
      expect(state.activeWindows[0].position).toStrictEqual({ x: 250, y: 250 });

      // Close window
      removeWindow('browser-1');
      state = useWorkspaceState.getState();
      expect(state.activeWindows).toHaveLength(0);
    });

    it('should handle multiple windows with independent updates', () => {
      const { addWindow, updateWindow } = useWorkspaceState.getState();
      const window1 = createMockWindow({ id: 'window-1' });
      const window2 = createMockWindow({ id: 'window-2' });

      addWindow(window1);
      addWindow(window2);

      updateWindow('window-1', { zIndex: 50 });
      updateWindow('window-2', { zIndex: 100 });
      updateWindow('window-1', { position: { x: 500, y: 500 } });

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
  });
});
