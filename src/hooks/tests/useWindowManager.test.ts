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
      { id: 'window1', zIndex: 1 },
      { id: 'window2', zIndex: 2 },
      { id: 'window3', zIndex: 3 },
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
          windowName: 'FileExplorerApp',
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
    it('should update z-index to max + 1', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith('window1', 4);
    });

    it('should set window as maximized', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
      });

      expect(mockSetWindowIsMaximized).toHaveBeenCalledWith('window1', true);
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

      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith('newWindow', 1);
    });

    it('should calculate correct z-index with single window', () => {
      vi.mocked(useWorkspaceState).mockReturnValue({
        ...mockWorkspaceState,
        activeWindows: [{ id: 'window1', zIndex: 5 }],
      });

      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window2');
      });

      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith('window2', 6);
    });

    it('should focus the same window multiple times', () => {
      const { result } = renderHook(() => useWindowManager());

      act(() => {
        result.current.focusWindow('window1');
        result.current.focusWindow('window1');
      });

      expect(mockUpdateWindowZIndex).toHaveBeenCalledTimes(2);
      expect(mockSetWindowIsMaximized).toHaveBeenCalledTimes(2);
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

  describe('hook integration', () => {
    it('should return all three functions', () => {
      const { result } = renderHook(() => useWindowManager());

      expect(result.current).toHaveProperty('launchWindow');
      expect(result.current).toHaveProperty('focusWindow');
      expect(result.current).toHaveProperty('closeWindow');
    });

    it('should return functions that are memoized (same reference across renders)', () => {
      const { result, rerender } = renderHook(() => useWindowManager());

      const {
        launchWindow: launch1,
        focusWindow: focus1,
        closeWindow: close1,
      } = result.current;

      rerender();

      const {
        launchWindow: launch2,
        focusWindow: focus2,
        closeWindow: close2,
      } = result.current;

      expect(launch1).toBe(launch2);
      expect(focus1).toBe(focus2);
      expect(close1).toBe(close2);
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

      expect(mockUpdateWindowZIndex).toHaveBeenCalledWith(
        'nonexistent-window',
        4
      );
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
