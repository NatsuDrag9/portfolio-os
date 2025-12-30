import { ADMIN, BOOT_SHUTDOWN_OPERATIONS } from '@constants/storeConstants';
import {
  AuthState,
  BootStatusState,
  BootStatusType,
  SettingsState,
  SystemUIState,
  WorkspaceState,
} from '@definitions/storeTypes';
import { create } from 'zustand';
import { getOperationsArray } from './helperFunctions';
import {
  CustomTheme,
  QuickActionsType,
  SnapPositionType,
  StartMenuLayoutType,
  TaskbarAlignmentType,
  ThemeType,
} from '@definitions/desktopTypes';
import { DefaultWallpaper } from '@assets/images/specifics';
import {
  AppMetadata,
  WindowData,
  WindowDisplayType,
} from '@definitions/applicationTypes';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { DateFormat, TimeFormat } from '@definitions/settingsTypes';

export const useBootStatus = create<BootStatusState>((set) => ({
  bootStatus: 'OFF',
  allOperations: BOOT_SHUTDOWN_OPERATIONS['OFF'](), // Empty string when off
  operationIndex: 0,

  updateBootStatus: (nextStatus: BootStatusType, username?: string) => {
    set({
      bootStatus: nextStatus,
      allOperations: getOperationsArray(nextStatus, username),
    });
  },
}));

export const useAuth = create<AuthState>((set) => ({
  username: null, // Powered OFF
  isAdmin: false,
  uploadedUserAvatar: undefined,
  updateAuthState: (newUsername: string | null) => {
    set({
      username: newUsername,
      isAdmin: newUsername === ADMIN,
    });
  },
  updateUserAvatar: (imgUrl: string) => {
    set({
      uploadedUserAvatar: imgUrl,
    });
  },
}));

export const useSystemUIState = create<SystemUIState>((set) => ({
  taskbarAlignment: 'bottom',
  isSearchVisible: true,
  searchValue: '',
  startMenuOpen: false,
  startMenuLayout: 'grid',
  showRecommendedApps: true,
  showMoreIcons: true,
  volumeLevel: 50,
  currentTheme: 'light',
  activeQuickActions: [],
  brightnessLevel: 30,
  isNightLightActive: false,
  timeFormat: '12h',
  dateFormat: 'DD/MM/YYYY',
  autoSyncDateTime: true,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  updateTaskbarAlignment: (alignment: TaskbarAlignmentType) => {
    set({ taskbarAlignment: alignment });
  },
  setIsSearchVisible: (isVisible: boolean) => {
    set({ isSearchVisible: isVisible });
  },
  setSearchValue: (value: string) => {
    set({ searchValue: value });
  },
  setStartMenuOpen: (isOpen: boolean) => {
    set({ startMenuOpen: isOpen });
  },
  updateStartMenuLayout: (layout: StartMenuLayoutType) => {
    set({ startMenuLayout: layout });
  },
  setShowRecommendedApps: (show: boolean) => {
    set({ showRecommendedApps: show });
  },
  setShowMoreIcons: (show: boolean) => {
    set({ showMoreIcons: show });
  },
  setVolumeLevel: (value: number) => {
    set({ volumeLevel: Math.max(0, Math.min(100, value)) });
  },
  setTheme: (theme: ThemeType) => {
    set({ currentTheme: theme });
  },
  toggleQuickAction: (action: QuickActionsType) => {
    set((state: SystemUIState) => {
      const isActive = state.activeQuickActions.includes(action);
      const newActiveQuickActions = isActive
        ? state.activeQuickActions.filter((a: QuickActionsType) => a !== action)
        : [...state.activeQuickActions, action];

      // Sync night-light state when toggling from Quick Actions
      if (action === 'night-light') {
        return {
          activeQuickActions: newActiveQuickActions,
          isNightLightActive: !isActive,
        };
      }

      return {
        activeQuickActions: newActiveQuickActions,
      };
    });
  },
  setBrightnessLevel: (value: number) => {
    set({ brightnessLevel: value });
  },
  setNightLight: (active: boolean) => {
    set((state: SystemUIState) => {
      // Sync quick action state when setting night light
      const activeQuickActions: QuickActionsType[] = active
        ? state.activeQuickActions.includes('night-light')
          ? state.activeQuickActions
          : [...state.activeQuickActions, 'night-light']
        : state.activeQuickActions.filter(
            (a: QuickActionsType) => a !== 'night-light'
          );

      return {
        isNightLightActive: active,
        activeQuickActions,
      };
    });
  },
  setTimeFormat: (format: TimeFormat) => {
    set({ timeFormat: format });
  },
  setDateFormat: (format: DateFormat) => {
    set({ dateFormat: format });
  },
  setAutoSyncDateTime: (autoSync: boolean) => {
    set({ autoSyncDateTime: autoSync });
  },
  setTimezone: (timezone: string) => {
    set({ timezone });
  },
}));

export const useWorkspaceState = create<WorkspaceState>((set) => ({
  activeWindows: [],
  taskbarPinnedAppIds: APP_REGISTRY.filter(
    (app) => app.defaultPinned === true
  ).map((item) => item.id), // Initialize with all the apps containing defaultPinned = true in APP_REGISTRY
  activeBackground: DefaultWallpaper,
  /**
   * Window instance counter for generating unique window IDs.
   * Maps appId to the highest instance number created for that app.
   * This is NOT a count of open windows - it's an auto-incrementing ID generator.
   *
   * Example: Opening notepad 3 times creates notepad-1, notepad-2, notepad-3.
   * Closing notepad-1 keeps the counter at 3, so the next window is notepad-4.
   * The counter only resets to undefined when all windows for an app are closed.
   *
   * To get the actual count of open windows, filter activeWindows by appId.
   */
  windowInstanceCounters: {},

  addWindow: (appId: string, appMetadata: AppMetadata) => {
    set((state) => {
      // Increment instance counter for this app
      const instanceCount = (state.windowInstanceCounters[appId] || 0) + 1;
      const windowId = `${appId}-${instanceCount}`;

      // Create new window data
      const newWindow: WindowData = {
        id: windowId,
        title: appMetadata.appName,
        windowName: appMetadata.windowName,
        isMaximized: 'normal',
        previousDisplayState: 'normal',
        position: { x: 100, y: 100 },
        zIndex: state.activeWindows.length + 1,
        size: { width: 800, height: 600 },
        customTheme: undefined,
        snapPosition: 'fullscreen',
      };

      return {
        activeWindows: [...state.activeWindows, newWindow],
        windowInstanceCounters: {
          ...state.windowInstanceCounters,
          [appId]: instanceCount,
        },
      };
    });
  },

  removeWindow: (windowId: string) => {
    set((state) => {
      // Extract appId from windowId (format: "appId-instanceNumber")
      const appId = windowId.substring(0, windowId.lastIndexOf('-'));

      // Get remaining windows for this app
      const remainingWindowsForApp = state.activeWindows
        .filter((w) => w.id !== windowId)
        .filter((w) => w.id?.startsWith(`${appId}-`));

      // If no more windows for this app, reset counter. Otherwise keep it.
      const updatedCounters = { ...state.windowInstanceCounters };
      if (remainingWindowsForApp.length === 0) {
        delete updatedCounters[appId];
      }

      return {
        activeWindows: state.activeWindows.filter((w) => w.id !== windowId),
        windowInstanceCounters: updatedCounters,
      };
    });
  },

  setWindowTitle: (windowId: string, title: string) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) =>
        w.id === windowId ? { ...w, title } : w
      ),
    }));
  },

  setWindowIsMaximized: (windowId: string, isMaximized: WindowDisplayType) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) => {
        if (w.id !== windowId) return w;

        // When minimizing, save current state (if not already minimized)
        if (isMaximized === 'minimized' && w.isMaximized !== 'minimized') {
          return {
            ...w,
            isMaximized,
            previousDisplayState: w.isMaximized,
          };
        }

        return { ...w, isMaximized };
      }),
    }));
  },

  updateWindowPosition: (windowId: string, x: number, y: number) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) =>
        w.id === windowId ? { ...w, position: { x, y } } : w
      ),
    }));
  },

  updateWindowZIndex: (windowId: string, zIndex: number) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) =>
        w.id === windowId ? { ...w, zIndex } : w
      ),
    }));
  },

  updateWindowSize: (windowId: string, width: number, height: number) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) =>
        w.id === windowId ? { ...w, size: { width, height } } : w
      ),
    }));
  },

  setWindowCustomTheme: (
    windowId: string,
    customTheme: CustomTheme | undefined
  ) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) =>
        w.id === windowId ? { ...w, customTheme } : w
      ),
    }));
  },

  updateWindowSnapPosition: (
    windowId: string,
    snapPosition: SnapPositionType | undefined
  ) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) =>
        w.id === windowId ? { ...w, snapPosition } : w
      ),
    }));
  },

  setActiveBackground: (image: string) => {
    set({ activeBackground: image });
  },

  setTaskbarPinnedAppIds: (idArray: string[]) => {
    set({ taskbarPinnedAppIds: idArray });
  },

  togglePin: (appId: string) => {
    set((state) => {
      const isPinned = state.taskbarPinnedAppIds.includes(appId);
      return {
        taskbarPinnedAppIds: isPinned
          ? state.taskbarPinnedAppIds.filter((id) => id !== appId)
          : [...state.taskbarPinnedAppIds, appId],
      };
    });
  },
}));

export const useSettingsState = create<SettingsState>((set) => ({
  activeSettingButton: 'home',
  setActiveSettingButton: (settingsButton: string) => {
    set({
      activeSettingButton: settingsButton,
    });
  },
}));
