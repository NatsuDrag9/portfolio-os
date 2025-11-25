import { IAppMetadata } from '@definitions/applicationTypes';

export const APP_REGISTRY: IAppMetadata[] = [
  {
    id: 'file-explorer',
    appName: 'File Explorer',
    icon: '/apps/file-explorer-48.png',
    defaultPinned: true,
    windowName: 'FileExplorerApp',
  },
  {
    id: 'google-chrome',
    appName: 'Google Chrome',
    icon: '/apps/chrome-48.png',
    defaultPinned: true,
    windowName: 'GoogleChromApp',
  },
  {
    id: 'vscode',
    appName: 'VSCode',
    icon: '/apps/vscode-48.png',
    defaultPinned: true,
    windowName: 'VSCodeApp',
  },
  {
    id: 'firefox',
    appName: 'Firefox',
    icon: '/apps/firefox.png',
    defaultPinned: true,
    windowName: 'FirefoxApp',
  },
  {
    id: 'notepad',
    appName: 'Notepad',
    icon: '/apps/notepad-48.png',
    defaultPinned: true,
    windowName: 'NotepadApp',
  },
  {
    id: 'github',
    appName: 'Github',
    icon: '/apps/github-48.png',
    defaultPinned: true,
    windowName: 'GithubApp',
  },
];
