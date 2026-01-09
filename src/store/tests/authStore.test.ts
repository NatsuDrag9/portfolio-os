import { describe, it, expect, beforeEach } from 'vitest';
import { useAuth } from '../store';
import { ADMIN } from '@constants/storeConstants';

describe('useAuth', () => {
  // Reset store state before each test
  beforeEach(() => {
    useAuth.setState({
      username: null,
      isAdmin: false,
      isReadOnlyMode: false,
      uploadedUserAvatar: undefined,
    });
  });

  describe('Initial State', () => {
    it('should initialize with empty username and isAdmin false', () => {
      const state = useAuth.getState();
      expect(state.username).toBe(null);
      expect(state.isAdmin).toBe(false);
      expect(state.isReadOnlyMode).toBe(false);
    });

    it('should initialize with undefined uploadedUserAvatar', () => {
      const state = useAuth.getState();
      expect(state.uploadedUserAvatar).toBeUndefined();
    });
  });

  describe('updateAuthState', () => {
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
      // Checks for GUEST user
      expect(state.isReadOnlyMode).toBe(true);
    });

    it('should handle switching between admin and non-admin users', () => {
      const { updateAuthState } = useAuth.getState();

      updateAuthState(ADMIN);
      let state = useAuth.getState();
      expect(state.isAdmin).toBe(true);
      expect(state.isReadOnlyMode).toBe(false);

      updateAuthState('Guest');
      state = useAuth.getState();
      expect(state.isAdmin).toBe(false);
      expect(state.isReadOnlyMode).toBe(true);

      updateAuthState(ADMIN);
      state = useAuth.getState();
      expect(state.isAdmin).toBe(true);
      expect(state.isReadOnlyMode).toBe(false);
    });

    it('should handle null username', () => {
      const { updateAuthState } = useAuth.getState();
      updateAuthState('John');
      updateAuthState(null);

      const state = useAuth.getState();
      expect(state.username).toBe(null);
      expect(state.isAdmin).toBe(false);
      expect(state.isReadOnlyMode).toBe(false);
    });
  });

  describe('updateUserAvatar', () => {
    it('should update uploadedUserAvatar when updateUserAvatar is called', () => {
      const { updateUserAvatar } = useAuth.getState();
      const testImageUrl = 'https://example.com/avatar.jpg';

      updateUserAvatar(testImageUrl);

      const state = useAuth.getState();
      expect(state.uploadedUserAvatar).toBe(testImageUrl);
    });

    it('should update uploadedUserAvatar with base64 image data', () => {
      const { updateUserAvatar } = useAuth.getState();
      const base64Image =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

      updateUserAvatar(base64Image);

      const state = useAuth.getState();
      expect(state.uploadedUserAvatar).toBe(base64Image);
    });

    it('should allow updating avatar multiple times', () => {
      const { updateUserAvatar } = useAuth.getState();
      const firstImage = 'https://example.com/avatar1.jpg';
      const secondImage = 'https://example.com/avatar2.jpg';

      updateUserAvatar(firstImage);
      let state = useAuth.getState();
      expect(state.uploadedUserAvatar).toBe(firstImage);

      updateUserAvatar(secondImage);
      state = useAuth.getState();
      expect(state.uploadedUserAvatar).toBe(secondImage);
    });

    it('should not affect username or isAdmin when updating avatar', () => {
      const { updateAuthState, updateUserAvatar } = useAuth.getState();

      updateAuthState('John');
      const beforeAvatarState = useAuth.getState();

      updateUserAvatar('https://example.com/avatar.jpg');
      const afterAvatarState = useAuth.getState();

      expect(afterAvatarState.username).toBe(beforeAvatarState.username);
      expect(afterAvatarState.isAdmin).toBe(beforeAvatarState.isAdmin);
      expect(afterAvatarState.uploadedUserAvatar).toBe(
        'https://example.com/avatar.jpg'
      );
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete user setup with username and avatar', () => {
      const { updateAuthState, updateUserAvatar } = useAuth.getState();

      updateAuthState('John');
      updateUserAvatar('https://example.com/john-avatar.jpg');

      const state = useAuth.getState();
      expect(state.username).toBe('John');
      expect(state.isAdmin).toBe(false);
      expect(state.uploadedUserAvatar).toBe(
        'https://example.com/john-avatar.jpg'
      );
    });

    it('should handle admin user with custom avatar', () => {
      const { updateAuthState, updateUserAvatar } = useAuth.getState();

      updateAuthState(ADMIN);
      updateUserAvatar('https://example.com/admin-avatar.jpg');

      const state = useAuth.getState();
      expect(state.username).toBe(ADMIN);
      expect(state.isAdmin).toBe(true);
      expect(state.uploadedUserAvatar).toBe(
        'https://example.com/admin-avatar.jpg'
      );
    });

    it('should maintain avatar when switching users', () => {
      const { updateAuthState, updateUserAvatar } = useAuth.getState();

      updateAuthState('John');
      updateUserAvatar('https://example.com/avatar.jpg');

      // Avatar should persist even when switching users
      updateAuthState('Jane');
      const state = useAuth.getState();

      expect(state.username).toBe('Jane');
      expect(state.uploadedUserAvatar).toBe('https://example.com/avatar.jpg');
    });
  });
});
