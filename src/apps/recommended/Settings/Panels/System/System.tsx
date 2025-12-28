import { SliderForType } from '@definitions/desktopTypes';
import './System.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSystemUIState } from '@store/store';
import Slider from '@components/Slider/Slider';
import {
  GenericDropdown,
  PrimaryButton,
  ToggleButton,
} from '@components/index';

import { COMMON_TIMEZONES } from '@constants/settingsConstants';
import { DropdownType } from '@definitions/utlityTypes';

function System() {
  const {
    volumeLevel: storeVolumeLevel,
    brightnessLevel: storeBrightnessLevel,
    isNightLightActive: storeIsNightLightActive,
    timeFormat: storeTimeFormat,
    dateFormat: storeDateFormat,
    autoSyncDateTime: storeAutoSyncDateTime,
    timezone: storeTimezone,
    setBrightnessLevel,
    setVolumeLevel,
    setNightLight,
    setTimeFormat,
    setDateFormat,
    setAutoSyncDateTime,
    setTimezone,
  } = useSystemUIState();

  // Local state initialized with store values
  const [volumeLevel, setLocalVolumeLevel] = useState(() => storeVolumeLevel);
  const [brightnessLevel, setLocalBrightnessLevel] = useState(
    () => storeBrightnessLevel
  );
  const [isNightLightActive, setLocalNightLightActive] = useState(
    storeIsNightLightActive
  );
  const [timeFormat, setLocalTimeFormat] = useState(() => storeTimeFormat);
  const [dateFormat, setLocalDateFormat] = useState(() => storeDateFormat);
  const [autoSyncDateTime, setLocalAutoSyncDateTime] = useState(
    () => storeAutoSyncDateTime
  );
  const [timezone, setLocalTimezone] = useState(() => storeTimezone);

  // Sync night light when store changes (external toggle from Action Center in Taskbar)
  useEffect(() => {
    setLocalNightLightActive(storeIsNightLightActive);
  }, [storeIsNightLightActive]);

  const handleSliderChange = useCallback(
    (value: number, sliderFor: SliderForType) => {
      if (sliderFor === 'brightness') {
        setLocalBrightnessLevel(value);
        return;
      }
      setLocalVolumeLevel(value);
    },
    []
  );

  const handleNightLightToggle = (value: boolean) => {
    setLocalNightLightActive(value);
  };

  const handleTimeFormatToggle = (value: boolean) => {
    setLocalTimeFormat(value ? '24h' : '12h');
  };

  const handleDateFormatToggle = (value: boolean) => {
    setLocalDateFormat(value ? 'DD/MM/YYYY' : 'MM/DD/YYYY');
  };

  const handleAutoSyncToggle = (value: boolean) => {
    setLocalAutoSyncDateTime(value);
  };

  const handleTimezoneSelect = (selectedOption: DropdownType) => {
    setLocalTimezone(selectedOption.value as string);
  };

  const handleApply = () => {
    setBrightnessLevel(brightnessLevel);
    setVolumeLevel(volumeLevel);
    setNightLight(isNightLightActive);
    setTimeFormat(timeFormat);
    setDateFormat(dateFormat);
    setAutoSyncDateTime(autoSyncDateTime);
    setTimezone(timezone);
  };

  const hasChanges = useMemo(() => {
    return (
      volumeLevel !== storeVolumeLevel ||
      brightnessLevel !== storeBrightnessLevel ||
      isNightLightActive !== storeIsNightLightActive ||
      timeFormat !== storeTimeFormat ||
      dateFormat !== storeDateFormat ||
      autoSyncDateTime !== storeAutoSyncDateTime ||
      timezone !== storeTimezone
    );
  }, [
    volumeLevel,
    brightnessLevel,
    isNightLightActive,
    timeFormat,
    dateFormat,
    autoSyncDateTime,
    timezone,
    storeVolumeLevel,
    storeBrightnessLevel,
    storeIsNightLightActive,
    storeTimeFormat,
    storeDateFormat,
    storeAutoSyncDateTime,
    storeTimezone,
  ]);

  const selectedTimezone = useMemo(
    () =>
      COMMON_TIMEZONES.find((tz: DropdownType) => tz.value === timezone) ||
      COMMON_TIMEZONES[0],
    [timezone]
  );

  return (
    <div className="system">
      <section className="system__section">
        <div className="system__section-header">
          <h6 className="system__section-title">Display</h6>
        </div>

        <div className="system__toggle-container">
          <p className="system__label">Night Light</p>
          <ToggleButton
            name="night-light"
            onToggleClick={handleNightLightToggle}
            isActive={isNightLightActive}
          />
        </div>

        <Slider
          onSliderChange={handleSliderChange}
          sliderFor="brightness"
          sliderValue={brightnessLevel}
        />
      </section>

      <section className="system__section">
        <div className="system__section-header">
          <h6 className="system__section-title">Sound</h6>
        </div>

        <Slider
          onSliderChange={handleSliderChange}
          sliderFor="volume"
          sliderValue={volumeLevel}
        />
      </section>

      <section className="system__section">
        <div className="system__section-header">
          <h6 className="system__section-title">Date & Time</h6>
          <p className="system__section-description">
            Manage time and date format preferences
          </p>
        </div>

        <div className="system__toggle-container">
          <p className="system__label">Auto-sync with system</p>
          <ToggleButton
            name="auto-sync"
            onToggleClick={handleAutoSyncToggle}
            isActive={autoSyncDateTime}
          />
        </div>

        <GenericDropdown
          options={COMMON_TIMEZONES}
          selectedOption={selectedTimezone}
          label="Timezone"
          onOptionSelect={handleTimezoneSelect}
          isDisabled={autoSyncDateTime}
        />

        <div className="system__toggle-container">
          <div className="system__toggle-content">
            <p className="system__toggle-title">Use 24-hour time format</p>
            <p className="system__toggle-description">
              Currently:{' '}
              {timeFormat === '24h' ? '14:30 (24-hour)' : '2:30 PM (12-hour)'}
            </p>
          </div>
          <ToggleButton
            name=""
            onToggleClick={handleTimeFormatToggle}
            isActive={timeFormat === '24h'}
          />
        </div>

        <div className="system__toggle-container">
          <div className="system__toggle-content">
            <p className="system__toggle-title">Use DD/MM/YYYY date format</p>
            <p className="system__toggle-description">
              Currently:{' '}
              {dateFormat === 'DD/MM/YYYY'
                ? '28/12/2025 (DD/MM/YYYY)'
                : '12/28/2025 (MM/DD/YYYY)'}
            </p>
          </div>
          <ToggleButton
            name=""
            onToggleClick={handleDateFormatToggle}
            isActive={dateFormat === 'DD/MM/YYYY'}
          />
        </div>
      </section>

      <div className="system__actions">
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

export default System;
