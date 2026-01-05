import { GenericDropdown, ImagePicker, PrimaryButton } from '@components/index';
import './Personalization.scss';
import { useSystemUIState, useWorkspaceState } from '@store/store';
import { BackgroundImageMap } from '@definitions/settingsTypes';
import { useMemo, useState } from 'react';
import { BACKGROUND_IMAGE_MAP } from '@constants/settingsConstants';
import { DropdownType } from '@definitions/utlityTypes';

const COLOR_MODE_OPTIONS: DropdownType[] = [
  { displayName: 'Light', value: 'light' },
  { displayName: 'Dark', value: 'dark' },
];

interface PersonalizationProps {
  onClose: () => void;
}

function Personalization({ onClose }: PersonalizationProps) {
  const { activeBackground, setActiveBackground } = useWorkspaceState();
  const {
    currentTheme: storeCurrentTheme,
    setTheme,
    setDisplayLoader,
  } = useSystemUIState();

  // Find the background image map entry that matches activeBackground
  const initialBgMap = useMemo(() => {
    const entry = Object.values(BACKGROUND_IMAGE_MAP).find(
      (bg) => bg.image === activeBackground
    );
    return entry || { name: 'Default', image: activeBackground };
  }, [activeBackground]);

  const [localActiveBg, setLocalActiveBg] =
    useState<BackgroundImageMap>(initialBgMap);
  const [localTheme, setLocalTheme] = useState(() => storeCurrentTheme);

  const handleSelectedImage = (selectedImage: BackgroundImageMap) => {
    setLocalActiveBg(selectedImage);
  };

  const handleThemeSelect = (selectedOption: DropdownType) => {
    setLocalTheme(selectedOption.value as 'light' | 'dark');
  };

  const handleApply = () => {
    setDisplayLoader({
      isLoading: true,
      triggeredFrom: 'settings',
    });
    setActiveBackground(localActiveBg.image);
    setTheme(localTheme);
    // Close the settings window
    onClose();
  };

  const hasChanges = useMemo(() => {
    return (
      localActiveBg.image !== activeBackground ||
      localTheme !== storeCurrentTheme
    );
  }, [localActiveBg, activeBackground, localTheme, storeCurrentTheme]);

  const selectedTheme = useMemo(
    () =>
      COLOR_MODE_OPTIONS.find((option) => option.value === localTheme) ||
      COLOR_MODE_OPTIONS[0],
    [localTheme]
  );

  return (
    <div className="personalization">
      <section className="personalization__section">
        <div className="personalization__section-header">
          <h6 className="personalization__section-title">Background</h6>
          <p className="personalization__section-description">
            Choose your desktop background
          </p>
        </div>

        <ImagePicker
          onImageClick={handleSelectedImage}
          selectedImage={localActiveBg}
          title="Choose Background"
        />
      </section>

      <section className="personalization__section">
        <div className="personalization__section-header">
          <h6 className="personalization__section-title">Color Mode</h6>
          <p className="personalization__section-description">
            Select your preferred theme
          </p>
        </div>

        <GenericDropdown
          options={COLOR_MODE_OPTIONS}
          selectedOption={selectedTheme}
          label="Theme"
          onOptionSelect={handleThemeSelect}
        />
      </section>

      <div className="personalization__actions">
        <PrimaryButton
          buttonType="button"
          name="Apply"
          onButtonClick={handleApply}
          isDisabled={!hasChanges}
        />
      </div>
    </div>
  );
}

export default Personalization;
