export const COMMANDS = {
  help: 'help', // Display info about all commands; with `<args>`: name of the command and without <args>, list all the commands
  open: 'open', // Open a window; args: an easily readable window name
  close: 'close', // Close a window; args: an easily readable window name
  hide: 'hide', // Minimize a window; args: an easily readable app name
  show: 'show', // Maximize a window; args: an easily readable window name
  activate: 'activate', // Set a window's zIndex to the highest; args: an easily readable window name

  // NOTE: Skipped resize in this version
  // resize: 'resize', // Resize a window; args: an easily readable window name, x coordinate, y coordinate
  shutdown: 'shutdown', // Close all active windows and shut down the OS ; args: none
  logout: 'logout', // Close all active windows, perform logout operations and display login screen.
  apps: 'apps', // List of all apps. User will pass an app from this list to commands: open, show, activate.
  // NOTE: If an app already exists in activeWindows state then perform the operation on the most recent window (I think it's the one with highest instanceCount in windowId). Check other edge cases
  clear: 'clear', // Clears the terminal
} as const;

export type CommandName = keyof typeof COMMANDS;
export type CommandValue = (typeof COMMANDS)[CommandName];

// Help text constants
export const HELP_TEXT = {
  GENERAL: [
    'Available commands:',
    '',
    '  help [command]     - Show help for all commands or specific command',
    '  apps               - List all available apps',
    '  open <app>         - Open an app window',
    '  close <app>        - Close an app window',
    '  hide <app>         - Minimize an app window',
    '  show <app>         - Restore/maximize an app window',
    '  activate <app>     - Bring an app window to front',
    '  shutdown           - Shut down the system',
    '  logout             - Log out current user',
    '  clear              - Clear the command history',
    '',
    'Type "help <command>" for detailed info about a specific command',
  ] as string[],
  COMMANDS: {
    help: 'Display info about commands. Usage: help [command]',
    apps: 'List all available apps that can be opened',
    open: 'Open an app window. Usage: open <app-name>',
    close: 'Close an app window. Usage: close <app-name>',
    hide: 'Minimize an app window. Usage: hide <app-name>',
    show: 'Restore/maximize an app window. Usage: show <app-name>',
    activate: 'Bring an app window to front. Usage: activate <app-name>',
    shutdown: 'Shut down the system and close all windows',
    logout: 'Log out current user and return to login screen',
    clear: 'Clear the command history and terminal output',
  },
};

// Error messages
export const ERROR_MESSAGES = {
  NO_COMMAND: 'No command entered',
  UNKNOWN_COMMAND: (cmd: string) =>
    `'${cmd}' is not recognized as a command. Type "help" for available commands`,
  UNKNOWN_HELP_TOPIC: (topic: string) => `Unknown command: ${topic}`,
  NO_APP_SPECIFIED: (cmd: string) =>
    `Error: Please specify an app name. Usage: ${cmd} <app-name>`,
  APP_NOT_FOUND: (appName: string) =>
    `Error: App "${appName}" not found. Type "apps" to see available apps`,
  NO_WINDOW_FOUND: (appName: string) =>
    `Error: No open window found for ${appName}`,
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  OPENING: (appName: string) => `Opening ${appName}...`,
  CLOSING: (appName: string) => `Closing ${appName}...`,
  MINIMIZING: (appName: string) => `Minimizing ${appName}...`,
  MAXIMIZING: (appName: string) => `Maximizing ${appName}...`,
  ACTIVATING: (appName: string) => `Activating ${appName}...`,
  SHUTDOWN: 'Shutting down system...',
  LOGOUT: 'Logging out...',
  CLEAR: 'Command prompt cleared...',
} as const;
