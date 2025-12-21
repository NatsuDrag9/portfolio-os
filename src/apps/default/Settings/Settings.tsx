import { PersonCircleRegular } from '@fluentui/react-icons';
import './Settings.scss';
import SettingsSidebar from './SettingsSidebar';
import { useAuth } from '@store/store';

function Settings() {
  const { username, isAdmin } = useAuth();
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
      <div className="settings__right">
        {/* To Do: Create panels for various settings */}
        This is right panel
      </div>
    </div>
  );
}

export default Settings;
