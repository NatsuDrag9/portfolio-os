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
    brightnessLevel: 30,
    activeQuickActions: [],
    displayLoader: {
      triggeredFrom: 'undefined',
      isLoading: false,
    },
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
      expect(state.brightnessLevel).toBe(30);
      expect(state.activeQuickActions).toEqual([]);
      expect(state.displayLoader.isLoading).toBe(false);
      expect(state.displayLoader.triggeredFrom).toBe('undefined');
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

  describe('Brightness Level', () => {
    it('should set brightness to specific value', () => {
      const { setBrightnessLevel } = useSystemUIState.getState();
      setBrightnessLevel(75);

      const state = useSystemUIState.getState();
      expect(state.brightnessLevel).toBe(75);
    });

    it('should handle brightness at boundary: 0', () => {
      const { setBrightnessLevel } = useSystemUIState.getState();
      setBrightnessLevel(0);

      const state = useSystemUIState.getState();
      expect(state.brightnessLevel).toBe(0);
    });

    it('should handle brightness at boundary: 100', () => {
      const { setBrightnessLevel } = useSystemUIState.getState();
      setBrightnessLevel(100);

      const state = useSystemUIState.getState();
      expect(state.brightnessLevel).toBe(100);
    });

    it('should support incremental brightness changes', () => {
      const { setBrightnessLevel } = useSystemUIState.getState();
      setBrightnessLevel(30);
      let state = useSystemUIState.getState();
      expect(state.brightnessLevel).toBe(30);

      setBrightnessLevel(state.brightnessLevel + 20);
      state = useSystemUIState.getState();
      expect(state.brightnessLevel).toBe(50);

      setBrightnessLevel(state.brightnessLevel - 10);
      state = useSystemUIState.getState();
      expect(state.brightnessLevel).toBe(40);
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

  describe('Quick Actions', () => {
    it('should toggle night-light action on', () => {
      const { toggleQuickAction } = useSystemUIState.getState();
      toggleQuickAction('night-light');

      const state = useSystemUIState.getState();
      expect(state.activeQuickActions).toContain('night-light');
    });

    it('should toggle night-light action off', () => {
      const { toggleQuickAction } = useSystemUIState.getState();
      toggleQuickAction('night-light');
      toggleQuickAction('night-light');

      const state = useSystemUIState.getState();
      expect(state.activeQuickActions).not.toContain('night-light');
    });

    it('should allow multiple quick actions to be active', () => {
      const { toggleQuickAction } = useSystemUIState.getState();
      toggleQuickAction('night-light');
      toggleQuickAction('airplane');

      const state = useSystemUIState.getState();
      expect(state.activeQuickActions).toContain('night-light');
      expect(state.activeQuickActions).toContain('airplane');
      expect(state.activeQuickActions).toHaveLength(2);
    });

    it('should toggle individual actions independently', () => {
      const { toggleQuickAction } = useSystemUIState.getState();
      toggleQuickAction('night-light');
      toggleQuickAction('airplane');
      toggleQuickAction('settings');

      let state = useSystemUIState.getState();
      expect(state.activeQuickActions).toHaveLength(3);

      // Toggle off night-light, others should remain
      toggleQuickAction('night-light');
      state = useSystemUIState.getState();
      expect(state.activeQuickActions).not.toContain('night-light');
      expect(state.activeQuickActions).toContain('airplane');
      expect(state.activeQuickActions).toContain('settings');
    });
  });

  describe('Display Loader', () => {
    it('should initialize with default loader state', () => {
      const state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(false);
      expect(state.displayLoader.triggeredFrom).toBe('undefined');
    });

    it('should set loader to loading from settings', () => {
      const { setDisplayLoader } = useSystemUIState.getState();
      setDisplayLoader({
        triggeredFrom: 'settings',
        isLoading: true,
      });

      const state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(true);
      expect(state.displayLoader.triggeredFrom).toBe('settings');
    });

    it('should stop loader from settings', () => {
      const { setDisplayLoader } = useSystemUIState.getState();

      // Start loading
      setDisplayLoader({
        triggeredFrom: 'settings',
        isLoading: true,
      });

      // Stop loading
      setDisplayLoader({
        triggeredFrom: 'settings',
        isLoading: false,
      });

      const state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(false);
      expect(state.displayLoader.triggeredFrom).toBe('settings');
    });

    it('should reset loader to undefined state', () => {
      const { setDisplayLoader } = useSystemUIState.getState();

      // Set to settings loader
      setDisplayLoader({
        triggeredFrom: 'settings',
        isLoading: true,
      });

      // Reset to undefined
      setDisplayLoader({
        triggeredFrom: 'undefined',
        isLoading: false,
      });

      const state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(false);
      expect(state.displayLoader.triggeredFrom).toBe('undefined');
    });

    it('should handle multiple loader trigger sources sequentially', () => {
      const { setDisplayLoader } = useSystemUIState.getState();

      // Settings loader starts
      setDisplayLoader({
        triggeredFrom: 'settings',
        isLoading: true,
      });

      let state = useSystemUIState.getState();
      expect(state.displayLoader.triggeredFrom).toBe('settings');
      expect(state.displayLoader.isLoading).toBe(true);

      // Settings loader stops
      setDisplayLoader({
        triggeredFrom: 'settings',
        isLoading: false,
      });

      state = useSystemUIState.getState();
      expect(state.displayLoader.triggeredFrom).toBe('settings');
      expect(state.displayLoader.isLoading).toBe(false);
    });

    it('should update loader state independently of other system UI state', () => {
      const { setDisplayLoader, setTheme, setVolumeLevel } =
        useSystemUIState.getState();

      // Set some other state
      setTheme('dark');
      setVolumeLevel(80);

      // Update loader
      setDisplayLoader({
        triggeredFrom: 'settings',
        isLoading: true,
      });

      const state = useSystemUIState.getState();

      // Loader state should be updated
      expect(state.displayLoader.isLoading).toBe(true);
      expect(state.displayLoader.triggeredFrom).toBe('settings');

      // Other state should remain unchanged
      expect(state.currentTheme).toBe('dark');
      expect(state.volumeLevel).toBe(80);
    });

    it('should handle rapid loader state changes', () => {
      const { setDisplayLoader } = useSystemUIState.getState();

      // Rapid on/off
      setDisplayLoader({ triggeredFrom: 'settings', isLoading: true });
      setDisplayLoader({ triggeredFrom: 'settings', isLoading: false });
      setDisplayLoader({ triggeredFrom: 'settings', isLoading: true });

      const state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(true);
      expect(state.displayLoader.triggeredFrom).toBe('settings');
    });

    it('should maintain loader trigger source while toggling loading state', () => {
      const { setDisplayLoader } = useSystemUIState.getState();

      setDisplayLoader({ triggeredFrom: 'settings', isLoading: true });
      let state = useSystemUIState.getState();
      expect(state.displayLoader.triggeredFrom).toBe('settings');

      setDisplayLoader({ triggeredFrom: 'settings', isLoading: false });
      state = useSystemUIState.getState();
      expect(state.displayLoader.triggeredFrom).toBe('settings');

      setDisplayLoader({ triggeredFrom: 'settings', isLoading: true });
      state = useSystemUIState.getState();
      expect(state.displayLoader.triggeredFrom).toBe('settings');
    });

    it('should handle complete loader lifecycle', () => {
      const { setDisplayLoader } = useSystemUIState.getState();

      // Initial state
      let state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(false);
      expect(state.displayLoader.triggeredFrom).toBe('undefined');

      // Start loading from settings
      setDisplayLoader({ triggeredFrom: 'settings', isLoading: true });
      state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(true);
      expect(state.displayLoader.triggeredFrom).toBe('settings');

      // Stop loading from settings
      setDisplayLoader({ triggeredFrom: 'settings', isLoading: false });
      state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(false);
      expect(state.displayLoader.triggeredFrom).toBe('settings');

      // Reset to undefined
      setDisplayLoader({ triggeredFrom: 'undefined', isLoading: false });
      state = useSystemUIState.getState();
      expect(state.displayLoader.isLoading).toBe(false);
      expect(state.displayLoader.triggeredFrom).toBe('undefined');
    });
  });

  describe('Multiple State Changes', () => {
    it('should handle multiple independent state updates', () => {
      const {
        updateTaskbarAlignment,
        setVolumeLevel,
        setTheme,
        setBrightnessLevel,
        toggleQuickAction,
      } = useSystemUIState.getState();

      updateTaskbarAlignment('left');
      setVolumeLevel(80);
      setTheme('dark');
      setBrightnessLevel(60);
      toggleQuickAction('night-light');

      const state = useSystemUIState.getState();
      expect(state.taskbarAlignment).toBe('left');
      expect(state.volumeLevel).toBe(80);
      expect(state.currentTheme).toBe('dark');
      expect(state.brightnessLevel).toBe(60);
      expect(state.activeQuickActions).toContain('night-light');
    });

    it('should maintain unmodified state properties', () => {
      const { setTheme } = useSystemUIState.getState();

      const stateBefore = useSystemUIState.getState();
      const originalSearchVisibility = stateBefore.isSearchVisible;
      const originalStartMenuLayout = stateBefore.startMenuLayout;
      const originalBrightnessLevel = stateBefore.brightnessLevel;
      const originalActiveQuickActions = [...stateBefore.activeQuickActions];

      setTheme('dark');

      const stateAfter = useSystemUIState.getState();
      expect(stateAfter.isSearchVisible).toBe(originalSearchVisibility);
      expect(stateAfter.startMenuLayout).toBe(originalStartMenuLayout);
      expect(stateAfter.brightnessLevel).toBe(originalBrightnessLevel);
      expect(stateAfter.activeQuickActions).toEqual(originalActiveQuickActions);
    });
  });
});
