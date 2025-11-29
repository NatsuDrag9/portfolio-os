import {
  BrightnessHighRegular,
  BrightnessLowRegular,
  Speaker0Regular,
  SpeakerMuteRegular,
} from '@fluentui/react-icons';
import './Slider.scss';
import { ChangeEvent } from 'react';

export interface SliderProps {
  sliderFor: 'volume' | 'brightness';
  sliderValue: number;
  onSliderChange: (value: number) => void;
}

function Slider({ sliderFor, sliderValue, onSliderChange }: SliderProps) {
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
    onSliderChange(Number(event.target.value));
  };

  return (
    <div className="slider">
      <label htmlFor={sliderFor} className="slider__label">
        {getIcon()}
      </label>
      <input
        type="range"
        name={sliderFor}
        id={sliderFor}
        className="slider__range"
        min={0}
        max={100}
        value={sliderValue}
        step={1}
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default Slider;
