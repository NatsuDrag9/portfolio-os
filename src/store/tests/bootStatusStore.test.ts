import { describe, it, expect, beforeEach } from 'vitest';
import { useBootStatus, useAuth } from '../store';
import { BOOT_SHUTDOWN_OPERATIONS } from '@constants/storeConstants';

// Reset stores between tests
beforeEach(() => {
  useBootStatus.setState({
    bootStatus: 'OFF',
    allOperations: [''],
  });
  useAuth.setState({
    username: '',
    isAdmin: false,
  });
});

describe('useBootStatus', () => {
  it('should initialize with OFF status', () => {
    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('OFF');
  });

  it('should transition from OFF to DISPLAY_BOOT_SCREEN', () => {
    const { updateBootStatus } = useBootStatus.getState();
    updateBootStatus('DISPLAY_BOOT_SCREEN');

    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('DISPLAY_BOOT_SCREEN');

    expect(state.allOperations).toStrictEqual(
      BOOT_SHUTDOWN_OPERATIONS['DISPLAY_BOOT_SCREEN']()
    );
  });

  it('should transition from DISPLAY_BOOT_SCREEN to DISPLAY_LOGIN_SCREEN', () => {
    const { updateBootStatus } = useBootStatus.getState();
    updateBootStatus('DISPLAY_BOOT_SCREEN');
    updateBootStatus('DISPLAY_LOGIN_SCREEN');

    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('DISPLAY_LOGIN_SCREEN');
  });

  it('should handle post-login setup with username interpolation', () => {
    const { updateBootStatus } = useBootStatus.getState();

    updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', 'GUEST');

    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('DISPLAY_POST_LOGIN_SCREEN');
    expect(state.allOperations).toStrictEqual(
      BOOT_SHUTDOWN_OPERATIONS['DISPLAY_POST_LOGIN_SCREEN']('GUEST')
    );
    // Verify username is interpolated in first operation
    expect(state.allOperations[0]).toBe('Authentication User: GUEST');
  });

  it('should use auth store username in post-login operations', () => {
    const { updateAuthState } = useAuth.getState();
    const { updateBootStatus } = useBootStatus.getState();

    updateAuthState('GUEST');
    const { username } = useAuth.getState();

    updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', username ? username : '');

    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('DISPLAY_POST_LOGIN_SCREEN');
    expect(state.allOperations[0]).toBe('Authentication User: GUEST');
  });

  it('should handle transition to ON status', () => {
    const { updateBootStatus } = useBootStatus.getState();
    updateBootStatus('ON');

    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('ON');
  });

  it('should handle transition to DISPLAY_SHUTDOWN_SCREEN', () => {
    const { updateBootStatus } = useBootStatus.getState();
    updateBootStatus('DISPLAY_SHUTDOWN_SCREEN');

    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('DISPLAY_SHUTDOWN_SCREEN');
    expect(state.allOperations).toStrictEqual(
      BOOT_SHUTDOWN_OPERATIONS['DISPLAY_SHUTDOWN_SCREEN']()
    );
  });

  it('should handle transition from DISPLAY_SHUTDOWN_SCREEN to OFF', () => {
    const { updateBootStatus } = useBootStatus.getState();
    updateBootStatus('DISPLAY_SHUTDOWN_SCREEN');
    updateBootStatus('OFF');

    const state = useBootStatus.getState();
    expect(state.bootStatus).toBe('OFF');
  });
});
