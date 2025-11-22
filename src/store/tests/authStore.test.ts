import { describe, it, expect } from 'vitest';
import { useAuth } from '../store';
import { ADMIN } from '@constants/storeConstants';

describe('useAuth', () => {
  it('should initialize with empty username and isAdmin false', () => {
    const state = useAuth.getState();
    expect(state.username).toBe(null);
    expect(state.isAdmin).toBe(false);
  });

  it('should update username when updateAuthState is called', () => {
    const { updateAuthState } = useAuth.getState();
    updateAuthState('John');

    const state = useAuth.getState();
    expect(state.username).toBe('John');
  });

  it('should set isAdmin to true when username is ADMIN', () => {
    const { updateAuthState } = useAuth.getState();
    updateAuthState(ADMIN);

    const state = useAuth.getState();
    expect(state.username).toBe(ADMIN);
    expect(state.isAdmin).toBe(true);
  });

  it('should set isAdmin to false for non-admin users', () => {
    const { updateAuthState } = useAuth.getState();
    updateAuthState('Guest');

    const state = useAuth.getState();
    expect(state.username).toBe('Guest');
    expect(state.isAdmin).toBe(false);
  });

  it('should handle switching between admin and non-admin users', () => {
    const { updateAuthState } = useAuth.getState();

    updateAuthState(ADMIN);
    let state = useAuth.getState();
    expect(state.isAdmin).toBe(true);

    updateAuthState('Guest');
    state = useAuth.getState();
    expect(state.isAdmin).toBe(false);

    updateAuthState(ADMIN);
    state = useAuth.getState();
    expect(state.isAdmin).toBe(true);
  });
});
