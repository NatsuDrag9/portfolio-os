import { describe, it, expect, beforeEach } from 'vitest';
import { useWindowState } from '../store';
import { CustomTheme } from '@definitions/desktopTypes';

// Reset store between tests
beforeEach(() => {
  useWindowState.setState({
    id: null,
    title: null,
    windowName: null,
    isMaximized: false,
    position: undefined,
    zIndex: 1,
    size: { width: 45, height: 35 },
    customTheme: undefined,
    snapPosition: 'fullscreen',
  });
});

describe('useWindowState', () => {
  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const state = useWindowState.getState();
      expect(state.id).toBeNull();
      expect(state.title).toBeNull();
      expect(state.windowName).toBeNull();
      expect(state.isMaximized).toBe(false);
      expect(state.position).toBeUndefined();
      expect(state.zIndex).toBe(1);
      expect(state.size).toStrictEqual({ width: 45, height: 35 });
      expect(state.customTheme).toBeUndefined();
      expect(state.snapPosition).toBe('fullscreen');
    });
  });

  describe('Window ID and Title', () => {
    it('should set window title', () => {
      const { setTitle } = useWindowState.getState();
      setTitle('My Application');

      const state = useWindowState.getState();
      expect(state.title).toBe('My Application');
    });

    it('should update window title multiple times', () => {
      const { setTitle } = useWindowState.getState();

      setTitle('First Title');
      let state = useWindowState.getState();
      expect(state.title).toBe('First Title');

      setTitle('Second Title');
      state = useWindowState.getState();
      expect(state.title).toBe('Second Title');
    });

    it('should handle empty string as title', () => {
      const { setTitle } = useWindowState.getState();
      setTitle('');

      const state = useWindowState.getState();
      expect(state.title).toBe('');
    });

    it('should handle special characters in title', () => {
      const { setTitle } = useWindowState.getState();
      setTitle('My App (v1.0) - [Beta]');

      const state = useWindowState.getState();
      expect(state.title).toBe('My App (v1.0) - [Beta]');
    });
  });

  describe('Maximize State', () => {
    it('should set window as maximized', () => {
      const { setIsMaximized } = useWindowState.getState();
      setIsMaximized(true);

      const state = useWindowState.getState();
      expect(state.isMaximized).toBe(true);
    });

    it('should restore window from maximized', () => {
      const { setIsMaximized } = useWindowState.getState();
      setIsMaximized(true);
      setIsMaximized(false);

      const state = useWindowState.getState();
      expect(state.isMaximized).toBe(false);
    });

    it('should toggle maximize state', () => {
      const { setIsMaximized } = useWindowState.getState();

      setIsMaximized(true);
      let state = useWindowState.getState();
      expect(state.isMaximized).toBe(true);

      setIsMaximized(false);
      state = useWindowState.getState();
      expect(state.isMaximized).toBe(false);

      setIsMaximized(true);
      state = useWindowState.getState();
      expect(state.isMaximized).toBe(true);
    });
  });

  describe('Position', () => {
    it('should set window position', () => {
      const { updatePosition } = useWindowState.getState();
      updatePosition(200, 150);

      const state = useWindowState.getState();
      expect(state.position).toStrictEqual({ x: 200, y: 150 });
    });

    it('should update window position multiple times', () => {
      const { updatePosition } = useWindowState.getState();

      updatePosition(100, 100);
      let state = useWindowState.getState();
      expect(state.position).toStrictEqual({ x: 100, y: 100 });

      updatePosition(300, 400);
      state = useWindowState.getState();
      expect(state.position).toStrictEqual({ x: 300, y: 400 });
    });

    it('should handle negative coordinates', () => {
      const { updatePosition } = useWindowState.getState();
      updatePosition(-50, -100);

      const state = useWindowState.getState();
      expect(state.position).toStrictEqual({ x: -50, y: -100 });
    });

    it('should handle zero coordinates', () => {
      const { updatePosition } = useWindowState.getState();
      updatePosition(0, 0);

      const state = useWindowState.getState();
      expect(state.position).toStrictEqual({ x: 0, y: 0 });
    });

    it('should handle large coordinates', () => {
      const { updatePosition } = useWindowState.getState();
      updatePosition(9999, 9999);

      const state = useWindowState.getState();
      expect(state.position).toStrictEqual({ x: 9999, y: 9999 });
    });

    it('should handle decimal coordinates', () => {
      const { updatePosition } = useWindowState.getState();
      updatePosition(100.5, 200.75);

      const state = useWindowState.getState();
      expect(state.position).toStrictEqual({ x: 100.5, y: 200.75 });
    });
  });

  describe('Z-Index', () => {
    it('should set window z-index', () => {
      const { updateZIndex } = useWindowState.getState();
      updateZIndex(10);

      const state = useWindowState.getState();
      expect(state.zIndex).toBe(10);
    });

    it('should increment z-index', () => {
      const { updateZIndex } = useWindowState.getState();

      updateZIndex(5);
      let state = useWindowState.getState();
      expect(state.zIndex).toBe(5);

      updateZIndex(10);
      state = useWindowState.getState();
      expect(state.zIndex).toBe(10);

      updateZIndex(100);
      state = useWindowState.getState();
      expect(state.zIndex).toBe(100);
    });

    it('should handle z-index of 0', () => {
      const { updateZIndex } = useWindowState.getState();
      updateZIndex(0);

      const state = useWindowState.getState();
      expect(state.zIndex).toBe(0);
    });

    it('should handle large z-index values', () => {
      const { updateZIndex } = useWindowState.getState();
      updateZIndex(999999);

      const state = useWindowState.getState();
      expect(state.zIndex).toBe(999999);
    });

    it('should handle negative z-index (though unusual)', () => {
      const { updateZIndex } = useWindowState.getState();
      updateZIndex(-5);

      const state = useWindowState.getState();
      expect(state.zIndex).toBe(-5);
    });
  });

  describe('Size', () => {
    it('should set window size', () => {
      const { updateSize } = useWindowState.getState();
      updateSize(60, 50);

      const state = useWindowState.getState();
      expect(state.size).toStrictEqual({ width: 60, height: 50 });
    });

    it('should update window size multiple times', () => {
      const { updateSize } = useWindowState.getState();

      updateSize(50, 40);
      let state = useWindowState.getState();
      expect(state.size).toStrictEqual({ width: 50, height: 40 });

      updateSize(80, 70);
      state = useWindowState.getState();
      expect(state.size).toStrictEqual({ width: 80, height: 70 });
    });

    it('should handle small window sizes', () => {
      const { updateSize } = useWindowState.getState();
      updateSize(20, 20);

      const state = useWindowState.getState();
      expect(state.size).toStrictEqual({ width: 20, height: 20 });
    });

    it('should handle large window sizes', () => {
      const { updateSize } = useWindowState.getState();
      updateSize(100, 100);

      const state = useWindowState.getState();
      expect(state.size).toStrictEqual({ width: 100, height: 100 });
    });

    it('should handle decimal size values (rem units)', () => {
      const { updateSize } = useWindowState.getState();
      updateSize(45.5, 35.25);

      const state = useWindowState.getState();
      expect(state.size).toStrictEqual({ width: 45.5, height: 35.25 });
    });

    it('should handle asymmetric sizes', () => {
      const { updateSize } = useWindowState.getState();
      updateSize(100, 40);

      const state = useWindowState.getState();
      expect(state.size).toStrictEqual({ width: 100, height: 40 });
    });
  });

  describe('Custom Theme', () => {
    it('should set custom theme', () => {
      const { setCustomTheme } = useWindowState.getState();
      const customTheme: CustomTheme = {
        fontColor: 'rgba(255, 0, 0, 1)',
        bgColor: 'rgba(0, 0, 0, 1)',
        iconShape: 'circle',
      };

      setCustomTheme(customTheme);

      const state = useWindowState.getState();
      expect(state.customTheme).toStrictEqual(customTheme);
    });

    it('should update custom theme', () => {
      const { setCustomTheme } = useWindowState.getState();
      const theme1: CustomTheme = {
        fontColor: 'rgba(255, 0, 0, 1)',
        bgColor: 'rgba(0, 0, 0, 1)',
        iconShape: 'circle',
      };
      const theme2: CustomTheme = {
        fontColor: 'rgba(0, 255, 0, 1)',
        bgColor: 'rgba(255, 255, 255, 1)',
        iconShape: 'square',
      };

      setCustomTheme(theme1);
      let state = useWindowState.getState();
      expect(state.customTheme).toStrictEqual(theme1);

      setCustomTheme(theme2);
      state = useWindowState.getState();
      expect(state.customTheme).toStrictEqual(theme2);
    });

    it('should clear custom theme by setting to undefined', () => {
      const { setCustomTheme } = useWindowState.getState();
      const customTheme: CustomTheme = {
        fontColor: 'rgba(255, 0, 0, 1)',
        bgColor: 'rgba(0, 0, 0, 1)',
        iconShape: 'circle',
      };

      setCustomTheme(customTheme);
      setCustomTheme(undefined);

      const state = useWindowState.getState();
      expect(state.customTheme).toBeUndefined();
    });

    it('should handle all icon shape types', () => {
      const { setCustomTheme } = useWindowState.getState();
      const shapes: Array<'water-droplet' | 'circle' | 'square'> = [
        'water-droplet',
        'circle',
        'square',
      ];

      for (const shape of shapes) {
        const theme: CustomTheme = {
          fontColor: 'rgba(255, 255, 255, 1)',
          bgColor: 'rgba(0, 0, 0, 1)',
          iconShape: shape,
        };
        setCustomTheme(theme);

        const state = useWindowState.getState();
        expect(state.customTheme?.iconShape).toBe(shape);
      }
    });
  });

  describe('Snap Position', () => {
    it('should set snap position to fullscreen', () => {
      const { updateSnapPosition } = useWindowState.getState();
      updateSnapPosition('fullscreen');

      const state = useWindowState.getState();
      expect(state.snapPosition).toBe('fullscreen');
    });

    it('should set snap position to left-half', () => {
      const { updateSnapPosition } = useWindowState.getState();
      updateSnapPosition('left-half');

      const state = useWindowState.getState();
      expect(state.snapPosition).toBe('left-half');
    });

    it('should set snap position to right-half', () => {
      const { updateSnapPosition } = useWindowState.getState();
      updateSnapPosition('right-half');

      const state = useWindowState.getState();
      expect(state.snapPosition).toBe('right-half');
    });

    it('should set snap position to grid-cell', () => {
      const { updateSnapPosition } = useWindowState.getState();
      updateSnapPosition('grid-cell');

      const state = useWindowState.getState();
      expect(state.snapPosition).toBe('grid-cell');
    });

    it('should update snap position multiple times', () => {
      const { updateSnapPosition } = useWindowState.getState();

      updateSnapPosition('left-half');
      let state = useWindowState.getState();
      expect(state.snapPosition).toBe('left-half');

      updateSnapPosition('right-half');
      state = useWindowState.getState();
      expect(state.snapPosition).toBe('right-half');

      updateSnapPosition('fullscreen');
      state = useWindowState.getState();
      expect(state.snapPosition).toBe('fullscreen');
    });

    it('should clear snap position by setting to undefined', () => {
      const { updateSnapPosition } = useWindowState.getState();
      updateSnapPosition('left-half');
      updateSnapPosition(undefined);

      const state = useWindowState.getState();
      expect(state.snapPosition).toBeUndefined();
    });
  });

  describe('Multiple Property Updates', () => {
    it('should update multiple properties independently', () => {
      const { setTitle, updatePosition, updateSize, updateZIndex } =
        useWindowState.getState();

      setTitle('My Window');
      updatePosition(100, 100);
      updateSize(60, 50);
      updateZIndex(10);

      const state = useWindowState.getState();
      expect(state.title).toBe('My Window');
      expect(state.position).toStrictEqual({ x: 100, y: 100 });
      expect(state.size).toStrictEqual({ width: 60, height: 50 });
      expect(state.zIndex).toBe(10);
    });

    it('should maintain state properties during individual updates', () => {
      const { setTitle, updatePosition } = useWindowState.getState();

      setTitle('Window Title');
      const stateAfterTitle = useWindowState.getState();
      const originalSize = stateAfterTitle.size;

      updatePosition(200, 200);

      const stateAfterPosition = useWindowState.getState();
      expect(stateAfterPosition.title).toBe('Window Title');
      expect(stateAfterPosition.size).toStrictEqual(originalSize);
    });

    it('should handle complete window configuration', () => {
      const {
        setTitle,
        setIsMaximized,
        updatePosition,
        updateZIndex,
        updateSize,
        setCustomTheme,
        updateSnapPosition,
      } = useWindowState.getState();

      const customTheme: CustomTheme = {
        fontColor: 'rgba(255, 255, 255, 1)',
        bgColor: 'rgba(0, 0, 0, 1)',
        iconShape: 'circle',
      };

      setTitle('Complete Window');
      setIsMaximized(false);
      updatePosition(50, 50);
      updateZIndex(5);
      updateSize(70, 60);
      setCustomTheme(customTheme);
      updateSnapPosition('left-half');

      const state = useWindowState.getState();
      expect(state.title).toBe('Complete Window');
      expect(state.isMaximized).toBe(false);
      expect(state.position).toStrictEqual({ x: 50, y: 50 });
      expect(state.zIndex).toBe(5);
      expect(state.size).toStrictEqual({ width: 70, height: 60 });
      expect(state.customTheme).toStrictEqual(customTheme);
      expect(state.snapPosition).toBe('left-half');
    });
  });

  describe('State Preservation', () => {
    it('should preserve unchanged properties when updating one', () => {
      const { setTitle, updateSize } = useWindowState.getState();

      setTitle('Original Title');
      const originalZIndex = useWindowState.getState().zIndex;

      updateSize(80, 70);

      const state = useWindowState.getState();
      expect(state.title).toBe('Original Title');
      expect(state.zIndex).toBe(originalZIndex);
    });

    it('should handle rapid sequential updates', () => {
      const { updateZIndex } = useWindowState.getState();

      updateZIndex(1);
      updateZIndex(2);
      updateZIndex(3);
      updateZIndex(4);
      updateZIndex(5);

      const state = useWindowState.getState();
      expect(state.zIndex).toBe(5);
    });
  });
});
