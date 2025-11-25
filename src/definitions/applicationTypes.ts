import { CustomTheme, SnapPositionType } from './desktopTypes';

export interface AppMetadata {
  id: string;
  appName: string; // Display name used by Taskbar, Start Menu, Desktop Icons (for labels) and Window's Title Bar
  desktopIcon: string;
  mobileIcon?: string;
  defaultPinned: boolean; // Static configuration: Should this app be pinned by default?
  windowName: string; // Component reference used to dynamically lookup and render the corresponding component (e.g., 'FileExplorerApp')
}

export type AppIconVariant = 'desktop' | 'taskbar' | 'start-menu' | 'mobile';

export interface WindowData {
  id: string | null; // Unique identifier for the Window Instance (e.g., browser)
  title: string | null; // Title displayed on window's title bar
  windowName: string | null; // Identifies specific React component to render inside the window frame (e.g., 'BrowserApp', 'Notepad')
  isMaximized: boolean;
  position: { x: number; y: number } | undefined; // x,y co-ordinates
  zIndex: number; // For stacking
  size: { width: number; height: number }; // Width of the window and height of the window
  customTheme?: CustomTheme; // For personalization
  snapPosition?: SnapPositionType; // Mobile-only
}
