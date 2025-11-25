import { describe, it, expect, beforeEach } from 'vitest';
import { useSystemUIState } from '../store';

// Reset store between tests
beforeEach(() => {
  useSystemUIState.setState({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    startMenuOpen: false,
    startMenuLayout: 'grid',
    showRecommendedApps: true,
    showMoreIcons: true,
    volumeLevel: 50,
    currentTheme: 'light',
  });
});

describe('useSystemUIState', () => {
  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const state = useSystemUIState.getState();
      expect(state.taskbarAlignment).toBe('bottom');
      expect(state.isSearchVisible).toBe(true);
      expect(state.startMenuOpen).toBe(false);
      expect(state.startMenuLayout).toBe('grid');
      expect(state.showRecommendedApps).toBe(true);
      expect(state.showMoreIcons).toBe(true);
      expect(state.volumeLevel).toBe(50);
      expect(state.currentTheme).toBe('light');
    });
  });

  describe('Taskbar Alignment', () => {
    it('should update taskbar alignment to top', () => {
      const { updateTaskbarAlignment } = useSystemUIState.getState();
      updateTaskbarAlignment('top');

      const state = useSystemUIState.getState();
      expect(state.taskbarAlignment).toBe('top');
    });

    it('should update taskbar alignment to left', () => {
      const { updateTaskbarAlignment } = useSystemUIState.getState();
      updateTaskbarAlignment('left');

      const state = useSystemUIState.getState();
      expect(state.taskbarAlignment).toBe('left');
    });

    it('should update taskbar alignment to right', () => {
      const { updateTaskbarAlignment } = useSystemUIState.getState();
      updateTaskbarAlignment('right');

      const state = useSystemUIState.getState();
      expect(state.taskbarAlignment).toBe('right');
    });

    it('should update taskbar alignment back to bottom', () => {
      const { updateTaskbarAlignment } = useSystemUIState.getState();
      updateTaskbarAlignment('top');
      updateTaskbarAlignment('bottom');

      const state = useSystemUIState.getState();
      expect(state.taskbarAlignment).toBe('bottom');
    });
  });

  describe('Search Visibility', () => {
    it('should hide search bar', () => {
      const { setIsSearchVisible } = useSystemUIState.getState();
      setIsSearchVisible(false);

      const state = useSystemUIState.getState();
      expect(state.isSearchVisible).toBe(false);
    });

    it('should show search bar', () => {
      const { setIsSearchVisible } = useSystemUIState.getState();
      setIsSearchVisible(false);
      setIsSearchVisible(true);

      const state = useSystemUIState.getState();
      expect(state.isSearchVisible).toBe(true);
    });
  });

  describe('Start Menu', () => {
    it('should open start menu', () => {
      const { setStartMenuOpen } = useSystemUIState.getState();
      setStartMenuOpen(true);

      const state = useSystemUIState.getState();
      expect(state.startMenuOpen).toBe(true);
    });

    it('should close start menu', () => {
      const { setStartMenuOpen } = useSystemUIState.getState();
      setStartMenuOpen(true);
      setStartMenuOpen(false);

      const state = useSystemUIState.getState();
      expect(state.startMenuOpen).toBe(false);
    });

    it('should update start menu layout to list', () => {
      const { updateStartMenuLayout } = useSystemUIState.getState();
      updateStartMenuLayout('list');

      const state = useSystemUIState.getState();
      expect(state.startMenuLayout).toBe('list');
    });

    it('should update start menu layout back to grid', () => {
      const { updateStartMenuLayout } = useSystemUIState.getState();
      updateStartMenuLayout('list');
      updateStartMenuLayout('grid');

      const state = useSystemUIState.getState();
      expect(state.startMenuLayout).toBe('grid');
    });
  });

  describe('Recommended Apps', () => {
    it('should hide recommended apps', () => {
      const { setShowRecommendedApps } = useSystemUIState.getState();
      setShowRecommendedApps(false);

      const state = useSystemUIState.getState();
      expect(state.showRecommendedApps).toBe(false);
    });

    it('should show recommended apps', () => {
      const { setShowRecommendedApps } = useSystemUIState.getState();
      setShowRecommendedApps(false);
      setShowRecommendedApps(true);

      const state = useSystemUIState.getState();
      expect(state.showRecommendedApps).toBe(true);
    });
  });

  describe('System Icons', () => {
    it('should hide system icons', () => {
      const { setShowMoreIcons } = useSystemUIState.getState();
      setShowMoreIcons(false);

      const state = useSystemUIState.getState();
      expect(state.showMoreIcons).toBe(false);
    });

    it('should show system icons', () => {
      const { setShowMoreIcons } = useSystemUIState.getState();
      setShowMoreIcons(true);

      const state = useSystemUIState.getState();
      expect(state.showMoreIcons).toBe(true);
    });
  });

  describe('Volume Level', () => {
    it('should set volume to specific value', () => {
      const { setVolumeLevel } = useSystemUIState.getState();
      setVolumeLevel(75);

      const state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(75);
    });

    it('should clamp volume to max 100', () => {
      const { setVolumeLevel } = useSystemUIState.getState();
      setVolumeLevel(150);

      const state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(100);
    });

    it('should clamp volume to min 0', () => {
      const { setVolumeLevel } = useSystemUIState.getState();
      setVolumeLevel(-50);

      const state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(0);
    });

    it('should handle volume at boundary: 0', () => {
      const { setVolumeLevel } = useSystemUIState.getState();
      setVolumeLevel(0);

      const state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(0);
    });

    it('should handle volume at boundary: 100', () => {
      const { setVolumeLevel } = useSystemUIState.getState();
      setVolumeLevel(100);

      const state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(100);
    });

    it('should support incremental volume changes', () => {
      const { setVolumeLevel } = useSystemUIState.getState();
      setVolumeLevel(50);
      let state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(50);

      setVolumeLevel(state.volumeLevel + 10);
      state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(60);

      setVolumeLevel(state.volumeLevel - 20);
      state = useSystemUIState.getState();
      expect(state.volumeLevel).toBe(40);
    });
  });

  describe('Theme', () => {
    it('should set theme to dark', () => {
      const { setTheme } = useSystemUIState.getState();
      setTheme('dark');

      const state = useSystemUIState.getState();
      expect(state.currentTheme).toBe('dark');
    });

    it('should set theme to light', () => {
      const { setTheme } = useSystemUIState.getState();
      setTheme('dark');
      setTheme('light');

      const state = useSystemUIState.getState();
      expect(state.currentTheme).toBe('light');
    });

    it('should toggle between themes', () => {
      const { setTheme } = useSystemUIState.getState();

      setTheme('dark');
      let state = useSystemUIState.getState();
      expect(state.currentTheme).toBe('dark');

      setTheme('light');
      state = useSystemUIState.getState();
      expect(state.currentTheme).toBe('light');

      setTheme('dark');
      state = useSystemUIState.getState();
      expect(state.currentTheme).toBe('dark');
    });
  });

  describe('Multiple State Changes', () => {
    it('should handle multiple independent state updates', () => {
      const { updateTaskbarAlignment, setVolumeLevel, setTheme } =
        useSystemUIState.getState();

      updateTaskbarAlignment('left');
      setVolumeLevel(80);
      setTheme('dark');

      const state = useSystemUIState.getState();
      expect(state.taskbarAlignment).toBe('left');
      expect(state.volumeLevel).toBe(80);
      expect(state.currentTheme).toBe('dark');
    });

    it('should maintain unmodified state properties', () => {
      const { setTheme } = useSystemUIState.getState();

      const stateBefore = useSystemUIState.getState();
      const originalSearchVisibility = stateBefore.isSearchVisible;
      const originalStartMenuLayout = stateBefore.startMenuLayout;

      setTheme('dark');

      const stateAfter = useSystemUIState.getState();
      expect(stateAfter.isSearchVisible).toBe(originalSearchVisibility);
      expect(stateAfter.startMenuLayout).toBe(originalStartMenuLayout);
    });
  });
});
