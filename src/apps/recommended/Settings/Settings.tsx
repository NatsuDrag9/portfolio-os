import { PersonCircleRegular } from '@fluentui/react-icons';
import './Settings.scss';
import SettingsSidebar from './SettingsSidebar';
import { useAuth, useSettingsState, useWorkspaceState } from '@store/store';
import Home from './Panels/Home/Home';
import System from './Panels/System/System';
import Accounts from './Panels/Accounts/Accounts';
import Personalization from './Panels/Personalization/Personalization';
import { useWindowManager } from '@hooks/useWindowManager';
import { useMemo } from 'react';

function Settings() {
  const { username, isAdmin, uploadedUserAvatar } = useAuth();
  const { activeSettingButton } = useSettingsState();
  const { closeWindow } = useWindowManager();
  const { activeWindows } = useWorkspaceState();

  // Get current Settings window
  const currentSettingsWindow = useMemo(
    () => activeWindows.find((w) => w.id?.startsWith('settings')),
    [activeWindows]
  );

  // Handler to close the Settings window
  const handleCloseSettings = () => {
    if (currentSettingsWindow?.id) {
      closeWindow(currentSettingsWindow.id);
    }
  };

  const renderSettingsPanel = () => {
    switch (activeSettingButton) {
      case 'home':
        return <Home />;
      case 'system':
        return <System onClose={handleCloseSettings} />;
      case 'accounts':
        return <Accounts onClose={handleCloseSettings} />;
      case 'personalization':
        return <Personalization onClose={handleCloseSettings} />;
      default:
        return <p className="settings__message">Invalid choice</p>;
    }
  };

  return (
    <div className="settings">
      <div className="settings__left">
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
