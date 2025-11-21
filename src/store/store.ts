import { ADMIN, BOOT_SHUTDOWN_OPERATIONS } from '@constants/storeConstants';
import {
  AuthState,
  BootStatusState,
  BootStatusType,
} from '@definitions/storeTypes';
import { create } from 'zustand';
import { getOperationForStatus, getOperationsArray } from './helperFunctions';

export const useBootStatus = create<BootStatusState>((set) => ({
  bootStatus: 'OFF',
  currentOperation: BOOT_SHUTDOWN_OPERATIONS['OFF']()[0], // Empty string when off
  operationIndex: 0,

  updateBootStatus: (nextStatus: BootStatusType, username?: string) => {
    set({
      bootStatus: nextStatus,
      operationIndex: 0, // Reset to first operation
      currentOperation: getOperationForStatus(nextStatus, 0, username),
    });
  },
  nextOperation: (username?: string) => {
    set((state) => {
      const nextIndex = state.operationIndex + 1;
      const operations = getOperationsArray(state.bootStatus, username);
      if (nextIndex < operations.length) {
        return {
          operationIndex: nextIndex,
          currentOperation: operations[nextIndex],
        };
      }

      // All operations are done, ready to transition to next boot-status
      return state;
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
