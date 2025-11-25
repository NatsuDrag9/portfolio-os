export interface IAppMetadata {
  id: string;
  appName: string; // Display name used by Taskbar, Start Menu, Desktop Icons (for labels) and Window's Title Bar
  icon: string;
  defaultPinned: boolean; // Static configuration: Should this app be pinned by default?
  windowName: string; // Component reference used to dynamically lookup and render the corresponding component (e.g., 'FileExplorerApp')
}
