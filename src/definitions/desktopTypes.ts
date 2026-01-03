import type { ComponentType } from 'react';

export type TaskbarAlignmentType = 'top' | 'right' | 'bottom' | 'left';
export type StartMenuLayoutType = 'grid' | 'list';

export type IconShapeType = 'water-droplet' | 'circle' | 'square';

/* 
  Snap positions for mobile device:
  1. Portrait - top-half, bottom-half, grid-cell (4X4)
  2. Landscape - left-half, right-half, grid-cell (4X4)
  3. fullscreen for both
*/
export type SnapPositionType =
  | 'fullscreen'
  | 'left-half'
  | 'right-half'
  | 'grid-cell'
  | 'top-half'
  | 'bottom-half';

export type ThemeType = 'light' | 'dark';

export interface CustomTheme {
  fontColor: string; // rgba
  iconShape: IconShapeType;
  bgColor: string; // rgba
}

// AppIcon right-click menu types
export type AppIconRightClickActionType =
  | 'new-window'
  | 'pin-to-taskbar'
  | 'unpin-from-taskbar'
  | 'close-window'
  | 'close-all-windows'
  | 'properties';

export type AppIconRightClickCondition =
  | 'always'
  | 'pinned'
  | 'unpinned'
  | 'has-windows'
  | 'has-multiple-windows';

export type AppIconRightClickIconSource =
  | { type: 'fluent'; icon: ComponentType<{ className?: string }> }
  | { type: 'app-registry' }; // Uses app's icon from APP_REGISTRY

export interface AppIconRightClickOption {
  id: AppIconRightClickActionType;
  label: string;
  // Icon source - Fluent UI icon or app's icon from registry
  iconSource?: AppIconRightClickIconSource;
  // Condition to show/hide based on app state
  showWhen?: AppIconRightClickCondition;
  // Whether this option is destructive (styled differently)
  destructive?: boolean;
}

// Desktop right-click menu types
export type DesktopMenuAction =
  | 'settings'
  | 'personalize'
  | 'terminal'
  | 'refresh';

export interface DesktopMenuItem {
  id: DesktopMenuAction;
  label: string;
  icon: ComponentType<{ className?: string }>;
}
export type QuickActionsType = 'night-light' | 'airplane' | 'settings';
export type SliderForType = 'volume' | 'brightness';

export type TaskbarMenuAction = 'settings' | TaskbarAlignmentType;

export interface TaskbarMenuItem {
  id: TaskbarMenuAction;
  label: string;
  icon: ComponentType<{ className?: string }>;
}
