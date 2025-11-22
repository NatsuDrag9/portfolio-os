import { ADMIN, BOOT_SHUTDOWN_OPERATIONS } from '@constants/storeConstants';
import {
  AuthState,
  BootStatusState,
  BootStatusType,
} from '@definitions/storeTypes';
import { create } from 'zustand';
import { getOperationsArray } from './helperFunctions';

export const useBootStatus = create<BootStatusState>((set) => ({
  bootStatus: 'OFF',
  allOperations: BOOT_SHUTDOWN_OPERATIONS['OFF'](), // Empty string when off
  operationIndex: 0,

  updateBootStatus: (nextStatus: BootStatusType, username?: string) => {
    set({
      bootStatus: nextStatus,
      allOperations: getOperationsArray(nextStatus, username),
    });
  },
}));

export const useAuth = create<AuthState>((set) => ({
  username: '', // Powered OFF
  isAdmin: false,
  updateAuthState: (newUsername: string) => {
    set({
      username: newUsername,
      isAdmin: newUsername === ADMIN,
    });
  },
}));
