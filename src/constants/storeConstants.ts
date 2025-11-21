import { BootStatusType } from '@definitions/storeTypes';

export const BOOT_SHUTDOWN_OPERATIONS: Record<
  BootStatusType,
  (username?: string) => string[]
> = {
  DISPLAY_BOOT_SCREEN: () => [
    'Initializing Virtual Hardware...',
    'Loading System UI Kernel..',
    'Applying Default Configuration...',
    'Preparing Application Registry...',
    'System Ready. Launching Login Screen...',
  ],
  DISPLAY_POST_LOGIN_SCREEN: (username = 'User') => [
    `Authentication User: ${username}`,
    'Loading Profile and Permissions...',
    'Applying Default User Theme...',
    `Welcome, ${username}. Launching Desktop Environment...`,
  ],
  DISPLAY_SHUTDOWN_SCREEN: () => [
    'Closing all active windows...',
    'Disconnecting User Profile...',
    'Shutdown complete',
  ],
  DISPLAY_LOGIN_SCREEN: () => [''], // Empty string as no operation when on login screen
  ON: () => [''], // Empty string as no operation when ON
  OFF: () => [''], // Empty string as no operation when OFF
};

export const ADMIN = 'Natsu';
