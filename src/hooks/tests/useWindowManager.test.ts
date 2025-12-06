import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWindowManager } from '../useWindowManager';
import { useWorkspaceState } from '@store/store';

// Mock the store
vi.mock('@store/store', () => ({
  useWorkspaceState: vi.fn(),
}));

describe('useWindowManager', () => {
  const mockAddWindow = vi.fn();
  const mockRemoveWindow = vi.fn();
  const mockUpdateWindowZIndex = vi.fn();
  const mockSetWindowIsMaximized = vi.fn();

  const mockWorkspaceState = {
    addWindow: mockAddWindow,
    removeWindow: mockRemoveWindow,
    updateWindowZIndex: mockUpdateWindowZIndex,
    setWindowIsMaximized: mockSetWindowIsMaximized,
    activeWindows: [
      {
        id: 'window1',
        zIndex: 1,
        isMaximized: 'normal',
        previousDisplayState: 'normal',
      },
      {
        id: 'window2',
        zIndex: 2,
        isMaximized: 'normal',
        previousDisplayState: 'normal',
      },
      {
        id: 'window3',
        zIndex: 3,
        isMaximized: 'normal',
        previousDisplayState: 'normal',
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useWorkspaceState).mockReturnValue(mockWorkspaceState);
  });

  describe('launchWindow', () => {
    it('should call addWindow with appId and app metadata', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.launchWindow('file-explorer');
      });

      expect(mockAddWindow).toHaveBeenCalledOnce();
      expect(mockAddWindow).toHaveBeenCalledWith(
        'file-explorer',
        expect.objectContaining({
          id: 'file-explorer',
          appName: 'File Explorer',
          windowName: 'FileExplorer',
        })
      );
    });

    it('should not call addWindow if app is not found in registry', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.launchWindow('nonexistent-app');
      });

      expect(mockAddWindow).not.toHaveBeenCalled();
    });

    it('should handle launching multiple apps sequentially', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.launchWindow('file-explorer');
        result.current.launchWindow('vscode');
      });

      expect(mockAddWindow).toHaveBeenCalledTimes(2);
      expect(mockAddWindow).toHaveBeenNthCalledWith(
        1,
        'file-explorer',
        expect.objectContaining({ id: 'file-explorer' })
      );
      expect(mockAddWindow).toHaveBeenNthCalledWith(
        2,
        'vscode',
        expect.objectContaining({ id: 'vscode' })
      );
    });
  });

  describe('focusWindow', () => {
    it('should update z-index to max + 1 for existing window', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith('window1', 4);
    });

    it('should not call setWindowIsMaximized for non-minimized window', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(mockSetWindowIsMaximized).not.toHaveBeenCalled();
    });

    it('should restore minimized window to previous state', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [
          {
            id: 'window1',
            zIndex: 1,
            isMaximized: 'minimized',
            previousDisplayState: 'maximized',
          },
        ],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(mockSetWindowIsMaximized).toHaveBeenCalledWith(
        'window1',
        'maximized'
      );
    });

    it('should restore minimized window to normal state', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [
          {
            id: 'window1',
            zIndex: 1,
            isMaximized: 'minimized',
            previousDisplayState: 'normal',
          },
        ],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(mockSetWindowIsMaximized).toHaveBeenCalledWith(
        'window1',
        'normal'
      );
    });

    it('should do nothing for non-existent window', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('nonexistent-window');
      });

      expect(mockUpdateWindowZIndex).not.toHaveBeenCalled();
      expect(mockSetWindowIsMaximized).not.toHaveBeenCalled();
    });

    it('should handle focus when activeWindows is empty', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('newWindow');
      });

      // Window doesn't exist, so nothing should happen
      expect(mockUpdateWindowZIndex).not.toHaveBeenCalled();
    });

    it('should calculate correct z-index with single window', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [
          {
            id: 'window1',
            zIndex: 5,
            isMaximized: 'normal',
            previousDisplayState: 'normal',
          },
        ],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith('window1', 6);
    });

    it('should focus the same window multiple times', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
        result.current.focusWindow('window1');
      });

      expect(mockUpdateWindowZIndex).toHaveBeenCalledTimes(2);
    });
  });

  describe('closeWindow', () => {
    it('should call removeWindow with windowId', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.closeWindow('window1');
      });

      expect(mockRemoveWindow).toHaveBeenCalledOnce();
      expect(mockRemoveWindow).toHaveBeenCalledWith('window1');
    });

    it('should handle closing multiple windows', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.closeWindow('window1');
        result.current.closeWindow('window2');
        result.current.closeWindow('window3');
      });

      expect(mockRemoveWindow).toHaveBeenCalledTimes(3);
      expect(mockRemoveWindow).toHaveBeenNthCalledWith(1, 'window1');
      expect(mockRemoveWindow).toHaveBeenNthCalledWith(2, 'window2');
      expect(mockRemoveWindow).toHaveBeenNthCalledWith(3, 'window3');
    });
  });

  describe('restoreOrFocusApp', () => {
    it('should launch new window when no windows exist for app', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.restoreOrFocusApp('file-explorer');
      });

      expect(mockAddWindow).toHaveBeenCalledOnce();
    });

    it('should focus single window when one window exists for app', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [
          {
            id: 'file-explorer-1',
            zIndex: 1,
            isMaximized: 'normal',
            previousDisplayState: 'normal',
          },
        ],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.restoreOrFocusApp('file-explorer');
      });

      expect(mockAddWindow).not.toHaveBeenCalled();
      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith('file-explorer-1', 2);
    });

    it('should restore minimized single window', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [
          {
            id: 'file-explorer-1',
            zIndex: 1,
            isMaximized: 'minimized',
            previousDisplayState: 'maximized',
          },
        ],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.restoreOrFocusApp('file-explorer');
      });

      expect(mockSetWindowIsMaximized).toHaveBeenCalledWith(
        'file-explorer-1',
        'maximized'
      );
    });

    it('should do nothing when multiple windows exist (popup handles it)', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [
          {
            id: 'file-explorer-1',
            zIndex: 1,
            isMaximized: 'normal',
            previousDisplayState: 'normal',
          },
          {
            id: 'file-explorer-2',
            zIndex: 2,
            isMaximized: 'normal',
            previousDisplayState: 'normal',
          },
        ],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.restoreOrFocusApp('file-explorer');
      });

      expect(mockAddWindow).not.toHaveBeenCalled();
      expect(mockUpdateWindowZIndex).not.toHaveBeenCalled();
    });

    it('should only focus windows belonging to the specified app', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [
          {
            id: 'vscode-1',
            zIndex: 1,
            isMaximized: 'normal',
            previousDisplayState: 'normal',
          },
          {
            id: 'file-explorer-1',
            zIndex: 2,
            isMaximized: 'normal',
            previousDisplayState: 'normal',
          },
        ],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.restoreOrFocusApp('file-explorer');
      });

      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith('file-explorer-1', 3);
    });
  });

  describe('hook integration', () => {
    it('should return all four functions', () => {
      const { result } = renderHook(() => useWindowManager());

      expect(result.current).toHaveProperty('launchWindow');
      expect(result.current).toHaveProperty('focusWindow');
      expect(result.current).toHaveProperty('closeWindow');
      expect(result.current).toHaveProperty('restoreOrFocusApp');
    });

    it('should return functions that are memoized (same reference across renders)', () => {
      const { result, rerender } = renderHook(() => useWindowManager());

      const {
        launchWindow: launch1,
        focusWindow: focus1,
        closeWindow: close1,
        restoreOrFocusApp: restore1,
      } = result.current;

      rerender();

      const {
        launchWindow: launch2,
        focusWindow: focus2,
        closeWindow: close2,
        restoreOrFocusApp: restore2,
      } = result.current;

      expect(launch1).toBe(launch2);
      expect(focus1).toBe(focus2);
      expect(close1).toBe(close2);
      expect(restore1).toBe(restore2);
    });

    it('should handle mixed operations in sequence', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.launchWindow('file-explorer');
        result.current.focusWindow('window1');
        result.current.launchWindow('vscode');
        result.current.closeWindow('window1');
      });

      expect(mockAddWindow).toHaveBeenCalledTimes(2);
      expect(mockUpdateWindowZIndex).toHaveBeenCalledTimes(1);
      expect(mockRemoveWindow).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should not crash when focusing a non-existent window', () => {
      const { result } = renderHook(() => useWindowManager());

      expect(() => {
        act(() => {
          result.current.focusWindow('nonexistent-window');
        });
      }).not.toThrow();

      // focusWindow returns early for non-existent windows
      expect(mockUpdateWindowZIndex).not.toHaveBeenCalled();
    });

    it('should not crash when closing a non-existent window', () => {
      const { result } = renderHook(() => useWindowManager());

      expect(() => {
        act(() => {
          result.current.closeWindow('nonexistent-window');
        });
      }).not.toThrow();

      expect(mockRemoveWindow).toHaveBeenCalledWith('nonexistent-window');
    });

    it('should handle empty appId string', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.launchWindow('');
      });

      expect(mockAddWindow).not.toHaveBeenCalled();
    });
  });
});
