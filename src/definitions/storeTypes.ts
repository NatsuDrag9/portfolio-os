import {
  CustomTheme,
  SnapPositionType,
  StartMenuLayoutType,
  TaskbarAlignmentType,
  ThemeType,
} from './desktopTypes';

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
  updateAuthState: (newUsername: string) => void;
}

export interface WindowState {
  id: string | null; // Unique identifier for the Window Instance (e.g., browser)
  title: string | null; // Title displayed on window's title bar
  windowName: string | null; // Identifies specific React component to render inside the window frame (e.g., 'BrowserApp', 'Notepad')
  isMaximized: boolean;
  position: { x: number; y: number } | undefined; // x,y co-ordinates
  zIndex: number; // For stacking
  size: { width: number; height: number }; // Width of the window and height of the window
  customTheme?: CustomTheme; // For personalization
  snapPosition?: SnapPositionType; // Mobile-only

  setTitle: (title: string) => void;
  setIsMaximized: (isMaximized: boolean) => void;
  updatePosition: (x: number, y: number) => void;
  updateZIndex: (zIndex: number) => void;
  updateSize: (width: number, height: number) => void;
  setCustomTheme: (customTheme: CustomTheme | undefined) => void;
  updateSnapPosition: (snapPosition: SnapPositionType | undefined) => void;
}

export interface SystemUIState {
  taskbarAlignment: TaskbarAlignmentType; // Position of taskbar: "top", "right", "bottom", "left"
  isSearchVisible: boolean; // Whether the search bar is visible in the taskbar
  startMenuOpen: boolean; // Whether the Start Menu is currently open
  startMenuLayout: StartMenuLayoutType; // Layout style of Start Menu: "grid" or "list"
  showRecommendedApps: boolean; // Whether to display recommended apps in the Start Menu
  showMoreIcons: boolean; // Whether to show system icons (wifi, sound, etc) on taskbar
  volumeLevel: number; // Global system volume level (0-100)
  currentTheme: ThemeType;

  updateTaskbarAlignment: (alignment: TaskbarAlignmentType) => void;
  setIsSearchVisible: (isVisible: boolean) => void;
  setStartMenuOpen: (isOpen: boolean) => void;
  updateStartMenuLayout: (layout: StartMenuLayoutType) => void;
  setShowRecommendedApps: (show: boolean) => void;
  setShowMoreIcons: (show: boolean) => void;
  setVolumeLevel: (value: number) => void;
  setTheme: (theme: ThemeType) => void;
}

export interface WorkspaceState {
  activeWindows: WindowState[]; // Array of all currently open window instances
  taskbarPinnedAppIds: string[]; // IDs of apps pinned to the taskbar for quick access
  activeBackground: string; // URL/path of the current desktop wallpaper image

  setActiveBackground: (image: string) => void;
  setTaskbarPinnedAppIds: (idArray: string[]) => void;
  togglePin: (appId: string) => void; // Add or remove an app from taskbar pins
  addWindow: (window: WindowState) => void; // Open a new window/application
  removeWindow: (windowId: string) => void; // Close a window by its ID
  updateWindow: (windowId: string, updates: Partial<WindowState>) => void; // Update window properties (position, size, zIndex, etc)
}
