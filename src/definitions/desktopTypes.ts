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
