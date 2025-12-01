import { QUICK_ACTION_BUTTONS } from '@constants/desktopConstants';
import QuickActionButton from '@components/QuickActionButton/QuickActionButton';
import './QuickActionsPopup.scss';
import { RefObject, useCallback, useRef } from 'react';
import { QuickActionsType, SliderForType } from '@definitions/desktopTypes';
import { useSystemUIState } from '@store/store';
import Slider from '@components/Slider/Slider';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

export interface QuickActionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function QuickActionsPopup({ isOpen, onClose }: QuickActionsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const { taskbarAlignment } = useSystemUIState();

  useClickOutsideModal(isOpen, onClose, popupRef as RefObject<HTMLElement>);
  const {
    setSelectedQuickAction,
    brightnessLevel,
    setBrightnessLevel,
    setVolumeLevel,
    volumeLevel,
  } = useSystemUIState();

  const handleQAButtonClick = useCallback(
    (action: QuickActionsType) => {
      setSelectedQuickAction(action);
    },
    [setSelectedQuickAction]
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
