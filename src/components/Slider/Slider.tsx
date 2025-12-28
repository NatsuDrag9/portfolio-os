import {
  BrightnessHighRegular,
  BrightnessLowRegular,
  Speaker0Regular,
  SpeakerMuteRegular,
} from '@fluentui/react-icons';
import './Slider.scss';
import { ChangeEvent, useRef, useState } from 'react';
import { SliderForType } from '@definitions/desktopTypes';

export interface SliderProps {
  sliderFor: SliderForType;
  sliderValue: number;
  onSliderChange: (value: number, sliderFor: SliderForType) => void;
  alignment?: 'horizontal' | 'vertical';
}

function Slider({
  sliderFor,
  sliderValue,
  onSliderChange,
  alignment = 'horizontal',
}: SliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  const getIcon = () => {
    if (sliderFor === 'volume') {
      return sliderValue === 0 ? (
        <SpeakerMuteRegular className="slider__fluent-icon" />
      ) : (
        <Speaker0Regular className="slider__fluent-icon" />
      );
    }

    return sliderValue === 0 ? (
      <BrightnessLowRegular className="slider__fluent-icon" />
    ) : (
      <BrightnessHighRegular className="slider__fluent-icon" />
    );
  };

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSliderChange(Number(event.target.value), sliderFor);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleMouseDown = () => {
    setShowTooltip(true);
  };

  const handleMouseUp = () => {
    // Keep tooltip visible for a brief moment after mouse up if still hovering
    if (sliderRef.current) {
      const isHovering = sliderRef.current.matches(':hover');
      if (!isHovering) {
        setShowTooltip(false);
      }
    }
  };

  // Calculate tooltip position based on slider value
  const getTooltipPosition = () => {
    if (alignment === 'vertical') {
      // For vertical sliders, position horizontally to the side
      return {
        bottom: `${sliderValue}%`,
      };
    }
    // For horizontal sliders, position above the thumb
    return {
      left: `${sliderValue}%`,
    };
  };

  return (
    <div className={`slider ${alignment}`}>
      <label htmlFor={sliderFor} className={`slider__label ${alignment}`}>
        {getIcon()}
      </label>
      <div className={`slider__input-container ${alignment}`}>
        <input
          ref={sliderRef}
          type="range"
          name={sliderFor}
          id={sliderFor}
          className={`slider__range ${alignment}`}
          min={0}
          max={100}
          value={sliderValue}
          step={1}
          onChange={handleSliderChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        {showTooltip && (
          <div
            className={`slider__tooltip ${alignment}`}
            style={getTooltipPosition()}
          >
            {sliderValue}
          </div>
        )}
      </div>
    </div>
  );
}

export default Slider;
