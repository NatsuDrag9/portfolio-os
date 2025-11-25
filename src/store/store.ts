import { ADMIN, BOOT_SHUTDOWN_OPERATIONS } from '@constants/storeConstants';
import {
  AuthState,
  BootStatusState,
  BootStatusType,
  SystemUIState,
  WindowState,
  WorkspaceState,
} from '@definitions/storeTypes';
import { create } from 'zustand';
import { getOperationsArray } from './helperFunctions';
import {
  CustomTheme,
  SnapPositionType,
  StartMenuLayoutType,
  TaskbarAlignmentType,
  ThemeType,
} from '@definitions/desktopTypes';
import { DefaultWallpaper } from '@assets/images/specifics';

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
  updateAuthState: (newUsername: string) => {
    set({
      username: newUsername,
      isAdmin: newUsername === ADMIN,
    });
  },
}));

export const useWindowState = create<WindowState>((set) => ({
  id: null,
  title: null,
  windowName: null,
  isMaximized: false,
  position: undefined,
  zIndex: 1, // Default
  size: { width: 45, height: 35 }, // in rem
  customTheme: undefined,
  snapPosition: 'fullscreen', // Default in desktop mode

  setTitle: (title: string) => {
    set((state) => ({
      ...state,
      title,
    }));
  },
  setIsMaximized: (isMaximized: boolean) => {
    set((state) => ({
      ...state,
      isMaximized,
    }));
  },
  updatePosition: (x: number, y: number) => {
    set((state) => ({
      ...state,
      position: { x, y },
    }));
  },
  updateZIndex: (zIndex: number) => {
    set((state) => ({
      ...state,
      zIndex,
    }));
  },
  updateSize: (width: number, height: number) => {
    set((state) => ({
      ...state,
      size: { width, height },
    }));
  },
  setCustomTheme: (customTheme: CustomTheme | undefined) => {
    set((state) => ({
      ...state,
      customTheme,
    }));
  },
  updateSnapPosition: (snapPosition: SnapPositionType | undefined) => {
    set((state) => ({
      ...state,
      snapPosition,
    }));
  },
}));

export const useSystemUIState = create<SystemUIState>((set) => ({
  taskbarAlignment: 'bottom',
  isSearchVisible: true,
  startMenuOpen: false,
  startMenuLayout: 'grid',
  showRecommendedApps: true,
  showMoreIcons: true,
  volumeLevel: 50,
  currentTheme: 'light',

  updateTaskbarAlignment: (alignment: TaskbarAlignmentType) => {
    set({ taskbarAlignment: alignment });
  },
  setIsSearchVisible: (isVisible: boolean) => {
    set({ isSearchVisible: isVisible });
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
}));

export const useWorkspaceState = create<WorkspaceState>((set) => ({
  activeWindows: [],
  taskbarPinnedAppIds: [],
  activeBackground: DefaultWallpaper,

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
  addWindow: (window: WindowState) => {
    set((state) => ({
      activeWindows: [...state.activeWindows, window],
    }));
  },
  removeWindow: (windowId: string) => {
    set((state) => ({
      activeWindows: state.activeWindows.filter((w) => w.id !== windowId),
    }));
  },
  updateWindow: (windowId: string, updates: Partial<WindowState>) => {
    set((state) => ({
      activeWindows: state.activeWindows.map((w) =>
        w.id === windowId ? { ...w, ...updates } : w
      ),
    }));
  },
}));
