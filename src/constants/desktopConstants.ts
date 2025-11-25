import { AppMetadata } from '@definitions/applicationTypes';

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
