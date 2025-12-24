import { AppMetadata, WindowData, WindowDisplayType } from './applicationTypes';
import {
  CustomTheme,
  QuickActionsType,
  SnapPositionType,
  StartMenuLayoutType,
  TaskbarAlignmentType,
  ThemeType,
} from './desktopTypes';
import { DateFormat, TimeFormat } from './settingsTypes';

export type BootStatusType =
  | 'ON'
  | 'DISPLAY_SHUTDOWN_SCREEN'
  | 'DISPLAY_BOOT_SCREEN'
  | 'DISPLAY_LOGIN_SCREEN'
  | 'DISPLAY_POST_LOGIN_SCREEN'
  | 'OFF';

export interface BootStatusState {
  bootStatus: BootStatusType;
  updateBootStatus: (nextStatus: BootStatusType, username?: string) => void;
  allOperations: string[];
}

export interface AuthState {
  username: string | null;
  isAdmin: boolean;
  uploadedUserAvatar?: string;
  updateAuthState: (newUsername: string | null) => void;
  updateUserAvatar: (imgUrl: string) => void;
}

export interface WorkspaceState {
  activeWindows: WindowData[]; // Only data, no methods
  taskbarPinnedAppIds: string[];
  activeBackground: string;
  windowInstanceCounters: Record<string, number>; // Tracks instance count per app ID (e.g., { 'vscode': 2, 'notepad': 1 })

  // Window management
  addWindow: (appId: string, appMetaData: AppMetadata) => void;
  removeWindow: (windowId: string) => void;

  // Window property updates (all at WorkspaceState level)
  setWindowTitle: (windowId: string, title: string) => void;
  setWindowIsMaximized: (
    windowId: string,
    isMaximized: WindowDisplayType
  ) => void;
  updateWindowPosition: (windowId: string, x: number, y: number) => void;
  updateWindowZIndex: (windowId: string, zIndex: number) => void;
  updateWindowSize: (windowId: string, width: number, height: number) => void;
  setWindowCustomTheme: (
    windowId: string,
    customTheme: CustomTheme | undefined
  ) => void;
  updateWindowSnapPosition: (
    windowId: string,
    snapPosition: SnapPositionType | undefined
  ) => void;

  // Taskbar & background
  setActiveBackground: (image: string) => void;
  setTaskbarPinnedAppIds: (idArray: string[]) => void;
  togglePin: (appId: string) => void;
}

export interface SystemUIState {
  taskbarAlignment: TaskbarAlignmentType; // Position of taskbar: "top", "right", "bottom", "left"
  isSearchVisible: boolean; // Whether the search bar is visible in the taskbar
  searchValue: string; // Current search query from taskbar search input
  startMenuOpen: boolean; // Whether the Start Menu is currently open
  startMenuLayout: StartMenuLayoutType; // Layout style of Start Menu: "grid" or "list"
  showRecommendedApps: boolean; // Whether to display recommended apps in the Start Menu
  showMoreIcons: boolean; // Whether to show system icons (wifi, sound, etc) on taskbar
  volumeLevel: number; // Global system volume level (0-100)
  currentTheme: ThemeType;
  activeQuickActions: QuickActionsType[]; // List of currently active quick actions
  brightnessLevel: number; // Global brightness level
  isNightLightActive: boolean; // Night light mode toggle
  timeFormat: TimeFormat; // Time format preference
  dateFormat: DateFormat; // Date format preference
  autoSyncDateTime: boolean; // Auto-sync date/time with system
  timezone: string; // User's timezone

  updateTaskbarAlignment: (alignment: TaskbarAlignmentType) => void;
  setIsSearchVisible: (isVisible: boolean) => void;
  setSearchValue: (value: string) => void;
  setStartMenuOpen: (isOpen: boolean) => void;
  updateStartMenuLayout: (layout: StartMenuLayoutType) => void;
  setShowRecommendedApps: (show: boolean) => void;
  setShowMoreIcons: (show: boolean) => void;
  setVolumeLevel: (value: number) => void;
  setTheme: (theme: ThemeType) => void;
  toggleQuickAction: (action: QuickActionsType) => void;
  setBrightnessLevel: (value: number) => void;
  setNightLight: (active: boolean) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setDateFormat: (format: DateFormat) => void;
  setAutoSyncDateTime: (autoSync: boolean) => void;
  setTimezone: (timezone: string) => void;
}

export interface SettingsState {
  activeSettingButton: string;
  setActiveSettingButton: (value: string) => void;
}
