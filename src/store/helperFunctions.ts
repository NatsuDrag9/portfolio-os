import { BOOT_SHUTDOWN_OPERATIONS } from '@constants/storeConstants';
import { BootStatusType } from '@definitions/storeTypes';

export function getOperationsArray(
  status: BootStatusType,
  username?: string
): string[] {
  return BOOT_SHUTDOWN_OPERATIONS[status](username);
}

export function getOperationForStatus(
  status: BootStatusType,
  index: number,
  username?: string
): string {
  const operations = getOperationsArray(status, username);
  return operations[index] || '';
}
