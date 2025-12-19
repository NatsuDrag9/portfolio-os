import {
  DefaultWallpaper,
  DefaultWallpaperMobile,
  EclipseWallpaper,
  EclipseWallpaperMobile,
  LoginScreenWallpaper,
  Natsu,
  ScenaryWallpaper,
  ScenaryWallpaperMobile,
  SnowScenaryWallpaper,
  SnowScenaryWallpaperMobile,
} from '@assets/images/specifics';
import { BackgroundImageMap } from '@definitions/settingsTypes';

export const BACKGROUND_IMAGE_MAP: Record<string, BackgroundImageMap> = {
  WALLPAPER_NATSU: {
    name: 'Natsu',
    image: Natsu,
  },
  WALLPAPER_LOGIN_SCREEN: {
    name: 'Login-Screen',
    image: LoginScreenWallpaper,
  },
  WALLPAPER_DEFAULT: {
    name: 'Default',
    image: DefaultWallpaper,
  },
  WALLPAPER_DEFAULT_MOBILE: {
    name: 'Default (Mobile)',
    image: DefaultWallpaperMobile,
  },
  WALLPAPER_ECLIPSE: {
    name: 'Eclipse',
    image: EclipseWallpaper,
  },
  WALLPAPER_ECLIPSE_MOBILE: {
    name: 'Eclipse (Mobile)',
    image: EclipseWallpaperMobile,
  },
  WALLPAPER_SCENARY: {
    name: 'Scenary',
    image: ScenaryWallpaper,
  },
  WALLPAPER_SCENARY_MOBILE: {
    name: 'Scenary (Mobile)',
    image: ScenaryWallpaperMobile,
  },
  WALLPAPER_SCENARY_SNOW: {
    name: 'Scenary Snow',
    image: SnowScenaryWallpaper,
  },
  WALLPAPER_SCENARY_SNOW_MOBILE: {
    name: 'Scenary Snow (Mobile)',
    image: SnowScenaryWallpaperMobile,
  },
};
