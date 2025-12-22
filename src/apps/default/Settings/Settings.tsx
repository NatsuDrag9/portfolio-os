import { PersonCircleRegular } from '@fluentui/react-icons';
import './Settings.scss';
import SettingsSidebar from './SettingsSidebar';
import { useAuth, useSettingsState } from '@store/store';
import Home from './Panels/Home/Home';
import System from './Panels/System/System';
import Accounts from './Panels/Accounts/Accounts';
import Personalization from './Panels/Personalization/Personalization';

function Settings() {
  const { username, isAdmin } = useAuth();
  const { activeSettingButton } = useSettingsState();

  const renderSettingsPanel = () => {
    switch (activeSettingButton) {
      case 'home':
        return <Home />;
      case 'system':
        return <System />;
      case 'accounts':
        return <Accounts />;
      case 'personalization':
        return <Personalization />;
      default:
        return <p className="settings__message">Invalid choice</p>;
    }
  };

  return (
    <div className="settings">
      <div className="settings__left">
        <div className="user-card">
          <PersonCircleRegular className="user-card__fluent-icon" />
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
