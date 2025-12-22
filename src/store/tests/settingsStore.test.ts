import { describe, it, expect, beforeEach } from 'vitest';
import { useSettingsState } from '@store/store';

describe('useSettingsState', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useSettingsState.setState({ activeSettingButton: 'home' });
  });

  describe('initial state', () => {
    it('should have "home" as the default activeSettingButton', () => {
      const { activeSettingButton } = useSettingsState.getState();
      expect(activeSettingButton).toBe('home');
    });
  });

  describe('setActiveSettingButton', () => {
    it('should update activeSettingButton to a new value', () => {
      const { setActiveSettingButton } = useSettingsState.getState();

      setActiveSettingButton('system');

      const { activeSettingButton } = useSettingsState.getState();
      expect(activeSettingButton).toBe('system');
    });

    it('should update activeSettingButton to "accounts"', () => {
      const { setActiveSettingButton } = useSettingsState.getState();

      setActiveSettingButton('accounts');

      const { activeSettingButton } = useSettingsState.getState();
      expect(activeSettingButton).toBe('accounts');
    });

    it('should update activeSettingButton to "personalization"', () => {
      const { setActiveSettingButton } = useSettingsState.getState();

      setActiveSettingButton('personalization');

      const { activeSettingButton } = useSettingsState.getState();
      expect(activeSettingButton).toBe('personalization');
    });

    it('should handle multiple consecutive updates', () => {
      const { setActiveSettingButton } = useSettingsState.getState();

      setActiveSettingButton('system');
      expect(useSettingsState.getState().activeSettingButton).toBe('system');

      setActiveSettingButton('accounts');
      expect(useSettingsState.getState().activeSettingButton).toBe('accounts');

      setActiveSettingButton('home');
      expect(useSettingsState.getState().activeSettingButton).toBe('home');
    });

    it('should allow setting the same value multiple times', () => {
      const { setActiveSettingButton } = useSettingsState.getState();

      setActiveSettingButton('system');
      expect(useSettingsState.getState().activeSettingButton).toBe('system');

      setActiveSettingButton('system');
      expect(useSettingsState.getState().activeSettingButton).toBe('system');
    });

    it('should accept any string value', () => {
      const { setActiveSettingButton } = useSettingsState.getState();

      setActiveSettingButton('customPanel');

      const { activeSettingButton } = useSettingsState.getState();
      expect(activeSettingButton).toBe('customPanel');
    });

    it('should handle empty string', () => {
      const { setActiveSettingButton } = useSettingsState.getState();

      setActiveSettingButton('');

      const { activeSettingButton } = useSettingsState.getState();
      expect(activeSettingButton).toBe('');
    });
  });

  describe('store subscription', () => {
    it('should notify subscribers when activeSettingButton changes', () => {
      let callCount = 0;

      const unsubscribe = useSettingsState.subscribe(() => {
        callCount++;
      });

      const { setActiveSettingButton } = useSettingsState.getState();
      setActiveSettingButton('system');

      expect(callCount).toBe(1);

      unsubscribe();
    });

    it('should notify subscribers on multiple changes', () => {
      let callCount = 0;

      const unsubscribe = useSettingsState.subscribe(() => {
        callCount++;
      });

      const { setActiveSettingButton } = useSettingsState.getState();
      setActiveSettingButton('system');
      setActiveSettingButton('accounts');
      setActiveSettingButton('home');

      expect(callCount).toBe(3);

      unsubscribe();
    });

    it('should not notify after unsubscribe', () => {
      let callCount = 0;

      const unsubscribe = useSettingsState.subscribe(() => {
        callCount++;
      });

      const { setActiveSettingButton } = useSettingsState.getState();
      setActiveSettingButton('system');
      expect(callCount).toBe(1);

      unsubscribe();

      setActiveSettingButton('accounts');
      expect(callCount).toBe(1); // Should still be 1
    });
  });

  //   NOTE: This test is not required
  //   describe('type safety', () => {
  //     it('should have correct types for state properties', () => {
  //       const state = useSettingsState.getState();

  //       expect(typeof state.activeSettingButton).toBe('string');
  //       expect(typeof state.setActiveSettingButton).toBe('function');
  //     });
  //   });
});
