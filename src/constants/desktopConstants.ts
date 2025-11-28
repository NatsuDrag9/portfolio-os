import { AppIconVariant, AppMetadata } from '@definitions/applicationTypes';
import { RightClickOption } from '@definitions/desktopTypes';
import {
  PinRegular,
  PinOffRegular,
  DismissRegular,
  WrenchRegular,
} from '@fluentui/react-icons';

export const APP_REGISTRY: AppMetadata[] = [
  {
    id: 'file-explorer',
    appName: 'File Explorer',
    mobileIcon: '/apps/file-explorer-48.png',
    desktopIcon: '/apps/file-explorer-96.png',
    defaultPinned: true,
    windowName: 'FileExplorerApp',
  },
  {
    id: 'google-chrome',
    appName: 'Google Chrome',
    mobileIcon: '/apps/chrome-48.png',
    desktopIcon: '/apps/chrome-96.png',
    defaultPinned: true,
    windowName: 'GoogleChromApp',
  },
  {
    id: 'vscode',
    appName: 'VSCode',
    mobileIcon: '/apps/vscode-48.png',
    desktopIcon: '/apps/vscode-96.png',
    defaultPinned: true,
    windowName: 'VSCodeApp',
  },
  {
    id: 'firefox',
    appName: 'Firefox',
    desktopIcon: '/apps/firefox.png',
    defaultPinned: true,
    windowName: 'FirefoxApp',
  },
  {
    id: 'notepad',
    appName: 'Notepad',
    mobileIcon: '/apps/notepad-48.png',
    desktopIcon: '/apps/notepad-96.png',
    defaultPinned: true,
    windowName: 'NotepadApp',
  },
  {
    id: 'github',
    appName: 'Github',
    mobileIcon: '/apps/github-48.png',
    desktopIcon: '/apps/github-60.png',
    defaultPinned: true,
    windowName: 'GithubApp',
  },
];

export const START_MENU_WINDOWS = {
  id: 'windows',
  name: 'Start Menu',
  mobileIcon: '/apps/windows-11-48.png',
  desktopIcon: '/apps/windows-11-96.png',
};

export const RIGHT_CLICK_OPTIONS: Record<AppIconVariant, RightClickOption[]> = {
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
