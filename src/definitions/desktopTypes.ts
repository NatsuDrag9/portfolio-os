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

export type RightClickActionType =
  | 'new-window'
  | 'pin-to-taskbar'
  | 'unpin-from-taskbar'
  | 'close-window'
  | 'close-all-windows'
  | 'properties';

export type RightClickCondition =
  | 'always'
  | 'pinned'
  | 'unpinned'
  | 'has-windows'
  | 'has-multiple-windows';

export type RightClickIconSource =
  | { type: 'fluent'; icon: ComponentType<{ className?: string }> }
  | { type: 'app-registry' }; // Uses app's icon from APP_REGISTRY

export interface RightClickOption {
  id: RightClickActionType;
  label: string;
  // Icon source - Fluent UI icon or app's icon from registry
  iconSource?: RightClickIconSource;
  // Condition to show/hide based on app state
  showWhen?: RightClickCondition;
  // Whether this option is destructive (styled differently)
  destructive?: boolean;
}
export type QuickActionsType = 'night-light' | 'airplane' | 'settings';
export type SliderForType = 'volume' | 'brightness';
