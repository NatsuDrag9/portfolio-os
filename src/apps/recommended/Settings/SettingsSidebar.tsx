/* 
Icons - 
Home - <HomeRegular />
System - <SystemRegular />
Personalization - <WindowBrushRegular />
Display - <LaptopRegular />
Volume - <SpeakerEditRegular />
Date&Time - <GlobeClockRegular />
Accounts - <PersonAccountsRegular />
*/

import { SETTINGS_ICON_MAP } from '@constants/settingsConstants';
import SidebarMenuButton from '@components/SidebarMenuButton/SidebarMenuButton';
import './Settings.scss';
import { useSettingsState } from '@store/store';

// Define the keys we want to exclude
const EXCLUDED_SETTINGS = ['display', 'volume', 'dateAndTime'];

// Define display names for each setting
const SETTINGS_DISPLAY_NAMES: Record<string, string> = {
  home: 'Home',
  system: 'System',
  personalization: 'Personalization',
  display: 'Display',
  volume: 'Volume',
  dateAndTime: 'Date & Time',
  accounts: 'Accounts',
};

function SettingsSidebar() {
  const { activeSettingButton, setActiveSettingButton } = useSettingsState();

  // Filter out excluded settings
  const filteredSettings = Object.entries(SETTINGS_ICON_MAP).filter(
    ([key]) => !EXCLUDED_SETTINGS.includes(key)
  );

  const handleButtonClick = (settingKey: string) => {
    setActiveSettingButton(settingKey);
  };

  return (
    <aside className="settings-sidebar">
      {filteredSettings.map(([key, Icon]) => (
        <SidebarMenuButton
          key={key}
          name={SETTINGS_DISPLAY_NAMES[key] || key}
          icon={Icon}
          isActive={activeSettingButton === key}
          onButtonClick={() => handleButtonClick(key)}
        />
      ))}
    </aside>
  );
}

export default SettingsSidebar;
