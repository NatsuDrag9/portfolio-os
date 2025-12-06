import { QuickActionButtonProps } from '@components/QuickActionButton/QuickActionButton';
import { AppIconVariant, AppMetadata } from '@definitions/applicationTypes';
import {
  QuickActionsType,
  AppIconRightClickOption,
  DesktopMenuItem,
} from '@definitions/desktopTypes';
import {
  PinRegular,
  PinOffRegular,
  DismissRegular,
  WrenchRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
  AirplaneRegular,
  AirplaneFilled,
  SettingsRegular,
  SettingsFilled,
  HomePersonRegular,
  ContactCardRegular,
  LaptopPersonRegular,
  HatGraduationSparkleRegular,
  SlideLayoutRegular,
  ArrowClockwiseRegular,
  WindowConsoleFilled,
  WindowBrushRegular,
} from '@fluentui/react-icons';

export const APP_REGISTRY: AppMetadata[] = [
  // To Do: Recommended apps - github, vscode, browser, command prompt, notepad
  {
    id: 'google-chrome',
    appName: 'Google Chrome',
    mobileIcon: '/apps/chrome-48.png',
    desktopIcon: '/apps/chrome-96.png',
    defaultPinned: true,
    windowName: 'GoogleChrome',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'vscode',
    appName: 'VSCode',
    mobileIcon: '/apps/vscode-48.png',
    desktopIcon: '/apps/vscode-96.png',
    defaultPinned: true,
    windowName: 'VSCode',
  },
  {
    id: 'firefox',
    appName: 'Firefox',
    desktopIcon: '/apps/firefox.png',
    defaultPinned: true,
    windowName: 'Firefox',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'github',
    appName: 'Github',
    desktopIcon: '/apps/github-60.png',
    defaultPinned: true,
    windowName: 'Github',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'notepad',
    appName: 'Notepad',
    mobileIcon: '/apps/notepad-48.png',
    desktopIcon: '/apps/notepad-96.png',
    defaultPinned: true,
    windowName: 'Notepad',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'command-prompt',
    appName: 'Command Prompt',
    desktopIcon: WindowConsoleFilled,
    defaultPinned: false,
    windowName: 'Notepad',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'settings',
    appName: 'Settings',
    desktopIcon: SettingsRegular,
    defaultPinned: false,
    windowName: 'Settings',
    startMenuAppCategory: 'recommended',
  },
  // Default apps appearing on taskbar (portfolio pages)
  {
    id: 'about-me',
    appName: 'About Me',
    desktopIcon: HomePersonRegular,
    defaultPinned: false,
    windowName: 'AboutMe',
    startMenuAppCategory: 'default',
  },
  {
    id: 'contact-me',
    appName: 'Contact Me',
    desktopIcon: ContactCardRegular,
    defaultPinned: false,
    windowName: 'ContactMe',
    startMenuAppCategory: 'default',
  },
  {
    id: 'projects',
    appName: 'Projects',
    desktopIcon: LaptopPersonRegular,
    defaultPinned: false,
    windowName: 'Projects',
    startMenuAppCategory: 'default',
  },
  {
    id: 'skills',
    appName: 'Skills',
    desktopIcon: HatGraduationSparkleRegular,
    defaultPinned: false,
    windowName: 'Skills',
    startMenuAppCategory: 'default',
  },
  {
    id: 'portfolio',
    appName: 'Portfolio',
    desktopIcon: SlideLayoutRegular,
    defaultPinned: false,
    windowName: 'Portfolio',
    startMenuAppCategory: 'default',
  },
  {
    id: 'file-explorer',
    appName: 'File Explorer',
    mobileIcon: '/apps/file-explorer-48.png',
    desktopIcon: '/apps/file-explorer-96.png',
    defaultPinned: true,
    windowName: 'FileExplorer',
    startMenuAppCategory: 'default',
  },

  // To Do: More apps - calculator, music player, calendar, settings
];

export const START_MENU_WINDOWS = {
  id: 'windows',
  name: 'Start Menu',
  mobileIcon: '/apps/windows-11-48.png',
  desktopIcon: '/apps/windows-11-96.png',
};

export const RIGHT_CLICK_OPTIONS: Record<
  AppIconVariant,
  AppIconRightClickOption[]
> = {
  taskbar: [
    {
      id: 'new-window',
      label: 'New window',
      iconSource: { type: 'app-registry' },
      showWhen: 'always',
    },
    {
      id: 'unpin-from-taskbar',
      label: 'Unpin from taskbar',
      iconSource: { type: 'fluent', icon: PinOffRegular },
      showWhen: 'always',
    },
    {
      id: 'close-window',
      label: 'Close window',
      iconSource: { type: 'fluent', icon: DismissRegular },
      showWhen: 'has-windows',
      destructive: true,
    },
    {
      id: 'close-all-windows',
      label: 'Close all windows',
      iconSource: { type: 'fluent', icon: DismissRegular },
      showWhen: 'has-multiple-windows',
      destructive: true,
    },
  ],
  desktop: [
    {
      id: 'new-window',
      label: 'Open',
      iconSource: { type: 'app-registry' },
      showWhen: 'always',
    },
    {
      id: 'pin-to-taskbar',
      label: 'Pin to taskbar',
      iconSource: { type: 'fluent', icon: PinRegular },
      showWhen: 'unpinned',
    },
    {
      id: 'unpin-from-taskbar',
      label: 'Unpin from taskbar',
      iconSource: { type: 'fluent', icon: PinOffRegular },
      showWhen: 'pinned',
    },
    {
      id: 'properties',
      label: 'Properties',
      iconSource: { type: 'fluent', icon: WrenchRegular },
      showWhen: 'always',
    },
  ],
  'start-menu': [
    {
      id: 'new-window',
      label: 'Open',
      iconSource: { type: 'app-registry' },
      showWhen: 'always',
    },
    {
      id: 'pin-to-taskbar',
      label: 'Pin to taskbar',
      iconSource: { type: 'fluent', icon: PinRegular },
      showWhen: 'unpinned',
    },
    {
      id: 'unpin-from-taskbar',
      label: 'Unpin from taskbar',
      iconSource: { type: 'fluent', icon: PinOffRegular },
      showWhen: 'pinned',
    },
  ],
};

export const DESKTOP_MENU_OPTIONS: DesktopMenuItem[] = [
  {
    id: 'refresh',
    label: 'Refresh',
    icon: ArrowClockwiseRegular,
  },
  {
    id: 'terminal',
    label: 'Open in Terminal',
    icon: WindowConsoleFilled,
  },
  {
    id: 'personalize',
    label: 'Personalize',
    icon: WindowBrushRegular,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsRegular,
  },
];

export const QUICK_ACTION_BUTTONS: Record<
  QuickActionsType,
  QuickActionButtonProps
> = {
  'night-light': {
    actionType: 'night-light',
    components: {
      default: WeatherMoonRegular,
      clicked: WeatherSunnyRegular,
    },
    name: 'Night Light',
  },
  airplane: {
    actionType: 'airplane',
    name: 'Airplane mode',
    components: {
      default: AirplaneRegular,
      clicked: AirplaneFilled,
    },
  },
  settings: {
    actionType: 'settings',
    name: 'Settings',
    components: {
      default: SettingsRegular,
      clicked: SettingsFilled,
    },
  },
};

// Grid configuration - Windows 11 uses a 5-row grid by default
export const GRID_ROWS = 6;
export const GRID_CELL_WIDTH = 90; // pixels
export const GRID_CELL_HEIGHT = 100; // pixels
