import { QUICK_ACTION_BUTTONS } from '@constants/desktopConstants';
import QuickActionButton from '@components/QuickActionButton/QuickActionButton';
import './QuickActionsPopup.scss';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { QuickActionsType, SliderForType } from '@definitions/desktopTypes';
import { useSystemUIState, useWorkspaceState } from '@store/store';
import Slider from '@components/Slider/Slider';
import useClickOutsideModal from '@hooks/useClickOutsideModal';
import { useWindowManager } from '@hooks/useWindowManager';

export interface QuickActionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function QuickActionsPopup({ isOpen, onClose }: QuickActionsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const { taskbarAlignment } = useSystemUIState();

  useClickOutsideModal(isOpen, onClose, popupRef as RefObject<HTMLElement>);
  const {
    activeQuickActions,
    toggleQuickAction,
    brightnessLevel,
    setBrightnessLevel,
    setVolumeLevel,
    volumeLevel,
  } = useSystemUIState();

  const { activeWindows } = useWorkspaceState();
  const { launchWindow, closeWindow } = useWindowManager();

  // Sync Settings quick action state with Settings window state
  useEffect(() => {
    const settingsWindow = activeWindows.find((w) =>
      w.id?.startsWith('settings-')
    );
    const isSettingsInQuickActions = activeQuickActions.includes('settings');

    // If Settings window doesn't exist but quick action is active, remove it
    if (!settingsWindow && isSettingsInQuickActions) {
      toggleQuickAction('settings');
    }
    // If Settings window exists but quick action is not active, add it
    else if (settingsWindow && !isSettingsInQuickActions) {
      toggleQuickAction('settings');
    }
  }, [activeWindows, activeQuickActions, toggleQuickAction]);

  const handleQAButtonClick = useCallback(
    (action: QuickActionsType) => {
      // Handle settings action specially - open/close Settings window
      if (action === 'settings') {
        // Find settings window
        const settingsWindow = activeWindows.find((w) =>
          w.id?.startsWith('settings-')
        );

        if (settingsWindow && settingsWindow.id) {
          // Settings window exists - close it and remove from quick actions
          closeWindow(settingsWindow.id);
          // Remove from active quick actions if it's there
          if (activeQuickActions.includes('settings')) {
            toggleQuickAction('settings');
          }
        } else {
          // No settings window - open it and add to quick actions
          launchWindow('settings');
          // Add to active quick actions if not already there
          if (!activeQuickActions.includes('settings')) {
            toggleQuickAction('settings');
          }
        }
        return;
      }

      // For other actions (night-light, airplane), just toggle
      toggleQuickAction(action);
    },
    [
      activeWindows,
      activeQuickActions,
      closeWindow,
      launchWindow,
      toggleQuickAction,
    ]
  );

  const handleSliderChange = useCallback(
    (value: number, sliderFor: SliderForType) => {
      if (sliderFor === 'brightness') {
        setBrightnessLevel(value);
        return;
      }
      setVolumeLevel(value);
    },
    [setBrightnessLevel, setVolumeLevel]
  );

  return (
    <div
      className={`taskbar__qa-popup taskbar-${taskbarAlignment}`}
      ref={popupRef}
    >
      <div className={`taskbar__qa-buttons taskbar-${taskbarAlignment}`}>
        {Object.values(QUICK_ACTION_BUTTONS).map((button) => (
          <QuickActionButton
            key={button.actionType}
            actionType={button.actionType}
            components={button.components}
            name={button.name}
            isActive={activeQuickActions.includes(button.actionType)}
            onButtonClick={handleQAButtonClick}
          />
        ))}
      </div>
      <div className={`taskbar__qa-sliders taskbar-${taskbarAlignment}`}>
        <Slider
          onSliderChange={handleSliderChange}
          sliderFor="brightness"
          sliderValue={brightnessLevel}
          alignment={
            taskbarAlignment === 'left' || taskbarAlignment === 'right'
              ? 'vertical'
              : 'horizontal'
          }
        />
        <Slider
          onSliderChange={handleSliderChange}
          sliderFor="volume"
          sliderValue={volumeLevel}
          alignment={
            taskbarAlignment === 'left' || taskbarAlignment === 'right'
              ? 'vertical'
              : 'horizontal'
          }
        />
      </div>
    </div>
  );
}

export default QuickActionsPopup;
