import React, { RefObject, useMemo, useRef, useEffect } from 'react';
import { PersonCircleRegular } from '@fluentui/react-icons';
import './Settings.scss';
import SettingsSidebar from './SettingsSidebar';
import { useAuth, useSettingsState, useWorkspaceState } from '@store/store';
import Home from './Panels/Home/Home';
import System from './Panels/System/System';
import Accounts from './Panels/Accounts/Accounts';
import Personalization from './Panels/Personalization/Personalization';
import { useWindowManager } from '@hooks/useWindowManager';
import { useMediaQuery } from '@hooks/useMediaQuery';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

function Settings() {
  const { username, isAdmin, isReadOnlyMode, uploadedUserAvatar } = useAuth();
  const { activeSettingButton, setActiveSettingButton } = useSettingsState();
  const { closeWindow } = useWindowManager();
  const { activeWindows } = useWorkspaceState();
  const isMobileView = useMediaQuery('(max-width: 819px)');
  const settingsLeftRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLInputElement>(null);
  const hamburgerRef = useRef<HTMLLabelElement>(null);

  // Get current Settings window
  const currentSettingsWindow = useMemo(
    () => activeWindows.find((w) => w.id?.startsWith('settings')),
    [activeWindows]
  );

  // When in read-only mode, open to Accounts panel
  useEffect(() => {
    if (isReadOnlyMode) {
      setActiveSettingButton('accounts');
    }
  }, [isReadOnlyMode, setActiveSettingButton]);

  // Handler to close the Settings window
  const handleCloseSettings = () => {
    if (currentSettingsWindow?.id) {
      closeWindow(currentSettingsWindow.id);
    }
  };

  // Close mobile menu when clicking outside
  const handleCloseMenu = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.checked = false;
    }
  };

  // Use click outside hook to close menu on mobile
  useClickOutsideModal(
    isMobileView,
    handleCloseMenu,
    settingsLeftRef as unknown as React.RefObject<HTMLElement>,
    [
      menuToggleRef as unknown as RefObject<HTMLElement>,
      hamburgerRef as unknown as RefObject<HTMLElement>,
    ]
  );

  const renderSettingsPanel = () => {
    const panelContent = (() => {
      switch (activeSettingButton) {
        case 'home':
          return <Home />;
        case 'system':
          return <System onClose={handleCloseSettings} />;
        case 'accounts':
          return <Accounts key={username} onClose={handleCloseSettings} />;
        case 'personalization':
          return <Personalization onClose={handleCloseSettings} />;
        default:
          return <p className="settings__message">Invalid choice</p>;
      }
    })();

    // Add read-only overlay for non-Accounts panels when in read-only mode
    const isReadOnlyPanel =
      isReadOnlyMode &&
      (activeSettingButton === 'system' ||
        activeSettingButton === 'personalization' ||
        activeSettingButton === 'home');

    if (isReadOnlyPanel) {
      return (
        <>
          {panelContent}
          <div className="settings__read-only-overlay"></div>
        </>
      );
    }

    return panelContent;
  };

  return (
    <div className="settings">
      <input
        type="checkbox"
        id="settings-menu-toggle"
        className="settings__menu-toggle"
        aria-label="Toggle settings menu"
        ref={menuToggleRef}
      />
      <label
        htmlFor="settings-menu-toggle"
        className="settings__hamburger"
        ref={hamburgerRef}
      >
        <span className="settings__hamburger-line"></span>
        <span className="settings__hamburger-line"></span>
        <span className="settings__hamburger-line"></span>
      </label>
      <label
        htmlFor="settings-menu-toggle"
        className="settings__menu-overlay"
      ></label>
      <div className="settings__left" ref={settingsLeftRef}>
        <div className="user-card">
          {uploadedUserAvatar ? (
            <img
              src={uploadedUserAvatar}
              alt="user avatar"
              className="user-card__avatar"
            />
          ) : (
            <PersonCircleRegular className="user-card__fluent-icon" />
          )}
          <div className="user-card__content-container">
            <h6 className="user-card__title">{username}</h6>
            <p className="user-card__description">
              {isAdmin ? 'Admin Account' : 'Temporary Account'}
            </p>
          </div>
        </div>
        <SettingsSidebar />
      </div>
      <div className="settings__right">{renderSettingsPanel()}</div>
    </div>
  );
}

export default Settings;
