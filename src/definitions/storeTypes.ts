export type BootStatusType =
  | 'ON'
  | 'DISPLAY_SHUTDOWN_SCREEN'
  | 'DISPLAY_BOOT_SCREEN'
  | 'DISPLAY_LOGIN_SCREEN'
  | 'DISPLAY_POST_LOGIN_SCREEN'
  | 'OFF';

export interface BootStatusState {
  bootStatus: BootStatusType;
  updateBootStatus: (nextStatus: BootStatusType, username?: string) => void;
  allOperations: string[];
}

export interface AuthState {
  username: string;
  isAdmin: boolean;
  updateAuthState: (newUsername: string) => void;
}
