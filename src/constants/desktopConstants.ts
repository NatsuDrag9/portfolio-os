import { QuickActionButtonProps } from '@components/QuickActionButton/QuickActionButton';
import { AppIconVariant, AppMetadata } from '@definitions/applicationTypes';
import {
  QuickActionsType,
  AppIconRightClickOption,
  DesktopMenuItem,
  TaskbarMenuItem,
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
  LaptopPersonRegular,
  HatGraduationSparkleRegular,
  SlideLayoutRegular,
  ArrowClockwiseRegular,
  WindowConsoleFilled,
  WindowBrushRegular,
  ArrowRightRegular,
  ArrowDownRegular,
  BriefcaseRegular,
  DocumentArrowDownRegular,
} from '@fluentui/react-icons';

// To Do: Uncomment File Explorer when Portfolio container query styles have been fixed

export const BASE_URL = '/portfolio-os';

export const APP_REGISTRY: AppMetadata[] = [
  // Recommended apps
  {
    id: 'google-chrome',
    appName: 'Google Chrome',
    mobileIcon: `${BASE_URL}/apps/chrome-48.png`,
    desktopIcon: `${BASE_URL}/apps/chrome-96.png`,
    defaultPinned: true,
    windowName: 'GoogleChrome',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'vscode',
    appName: 'VSCode',
    mobileIcon: `${BASE_URL}/apps/vscode-48.png`,
    desktopIcon: `${BASE_URL}/apps/vscode-96.png`,
    defaultPinned: true,
    windowName: 'VSCode',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'firefox',
    appName: 'Firefox',
    desktopIcon: `${BASE_URL}/apps/firefox.png`,
    defaultPinned: true,
    windowName: 'Firefox',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'notepad',
    appName: 'Notepad',
    mobileIcon: `${BASE_URL}/apps/notepad-48.png`,
    desktopIcon: `${BASE_URL}/apps/notepad-96.png`,
    defaultPinned: true,
    windowName: 'Notepad',
    startMenuAppCategory: 'recommended',
  },
  {
    id: 'command-prompt',
    appName: 'Command Prompt',
    desktopIcon: WindowConsoleFilled,
    defaultPinned: false,
    windowName: 'Terminal',
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
  // Default apps appearing on taskbar (portfolio pages) - github, about me, contact me, skills, portfolio, file-explorer, projects
  {
    id: 'portfolio-about',
    appName: 'About',
    desktopIcon: HomePersonRegular,
    defaultPinned: false,
    windowName: 'PortfolioSection',
    startMenuAppCategory: 'default',
  },
  {
    id: 'portfolio-resume',
    appName: 'Resume',
    desktopIcon: DocumentArrowDownRegular,
    defaultPinned: false,
    windowName: 'PortfolioSection',
    startMenuAppCategory: 'default',
  },
  {
    id: 'portfolio-projects',
    appName: 'Projects',
    desktopIcon: LaptopPersonRegular,
    defaultPinned: false,
    windowName: 'PortfolioSection',
    startMenuAppCategory: 'default',
  },
  {
    id: 'portfolio-skills',
    appName: 'Skills',
    desktopIcon: HatGraduationSparkleRegular,
    defaultPinned: false,
    windowName: 'PortfolioSection',
    startMenuAppCategory: 'default',
  },
  {
    id: 'portfolio-workexp',
    appName: 'Work Experience',
    desktopIcon: BriefcaseRegular,
    defaultPinned: false,
    windowName: 'PortfolioSection',
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
  // {
  //   id: 'file-explorer',
  //   appName: 'File Explorer',
  //   mobileIcon: `${BASE_URL}/apps/file-explorer-48.png`,
  //   desktopIcon: `${BASE_URL}/apps/file-explorer-96.png`,
  //   defaultPinned: true,
  //   windowName: 'FileExplorer',
  //   startMenuAppCategory: 'default',
  // },
  {
    id: 'github',
    appName: 'Github',
    desktopIcon: `${BASE_URL}/apps/github-60.png`,
    defaultPinned: true,
    windowName: 'Github',
    startMenuAppCategory: 'default',
  },

  // To Do: More apps - calculator, music player, calendar
] as const;

export const START_MENU_WINDOWS = {
  id: 'windows',
  name: 'Start Menu',
  mobileIcon: `${BASE_URL}/apps/windows-11-48.png`,
  desktopIcon: `${BASE_URL}/apps/windows-11-96.png`,
} as const;

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
} as const;

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

export const TASKBAR_MENU_OPTIONS: TaskbarMenuItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsRegular,
  },
  // NOTE: By default, Taskbar is snapped at bottom so it's not displayed in the menu options. Display only those snap-positions to which Taskbar is not snapped
  {
    id: 'right',
    label: 'Snap Right',
    icon: ArrowRightRegular,
  },
  {
    id: 'bottom',
    label: 'Snap Bottom',
    icon: ArrowDownRegular,
  },
  // NOTE: Removing these as they require shifting the positions of desktop icons. Will implement later
  // {
  //   id: 'top',
  //   label: 'Snap Top',
  //   icon: ArrowUpRegular,
  // },
  // {
  //   id: 'left',
  //   label: 'Snap Left',
  //   icon: ArrowLeftRegular,
  // },
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
} as const;

// Grid configuration - Windows 11 uses a 5-row grid by default
export const GRID_ROWS = 6;
export const GRID_CELL_WIDTH = 90; // pixels
export const GRID_CELL_HEIGHT = 100; // pixels

// Window animation timings
export const WINDOW_CLOSE_TIMEOUT = 200; // milliseconds - must match CSS transition duration in WindowContainer.scss

export const FADE_OUT_DELAY = 500; // Match animation duration in ms
