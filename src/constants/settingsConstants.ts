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
import {
  GlobeClockRegular,
  HomeRegular,
  LaptopRegular,
  PersonAccountsRegular,
  SpeakerEditRegular,
  SystemRegular,
  WindowBrushRegular,
} from '@fluentui/react-icons';
import { ComponentType } from 'react';

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
} as const;

export const SETTINGS_ICON_MAP: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  home: HomeRegular,
  system: SystemRegular,
  personalization: WindowBrushRegular,
  display: LaptopRegular,
  volume: SpeakerEditRegular,
  dateAndTime: GlobeClockRegular,
  accounts: PersonAccountsRegular,
} as const;

export const COMMON_TIMEZONES = [
  { displayName: 'New York (EST/EDT)', value: 'America/New_York' },
  { displayName: 'Chicago (CST/CDT)', value: 'America/Chicago' },
  { displayName: 'Denver (MST/MDT)', value: 'America/Denver' },
  { displayName: 'Los Angeles (PST/PDT)', value: 'America/Los_Angeles' },
  { displayName: 'London (GMT/BST)', value: 'Europe/London' },
  { displayName: 'Paris (CET/CEST)', value: 'Europe/Paris' },
  { displayName: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { displayName: 'Shanghai (CST)', value: 'Asia/Shanghai' },
  { displayName: 'India (IST)', value: 'Asia/Kolkata' },
  { displayName: 'Sydney (AEDT/AEST)', value: 'Australia/Sydney' },
  { displayName: 'Auckland (NZDT/NZST)', value: 'Pacific/Auckland' },
];
