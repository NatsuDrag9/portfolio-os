import { PlayFunctionProps } from '@definitions/storybookTypes';
import { expect, userEvent, within } from '@storybook/test';
import { SliderProps } from './Slider';
import { fireEvent, waitFor } from '@testing-library/dom';

const sliderPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SliderProps>) => {
  const canvas = within(canvasElement);

  // Verify slider input exists
  const sliderInput = canvas.getByRole('slider');
  expect(sliderInput).toBeInTheDocument();

  // Verify label exists with correct htmlFor attribute
  const label = canvasElement.querySelector(`label[for="${args?.sliderFor}"]`);
  expect(label).toBeInTheDocument();
  expect(label).toHaveClass('slider__label');

  // Verify slider has correct initial value
  expect(sliderInput).toHaveValue(String(args?.sliderValue));

  // Verify slider has correct min/max attributes
  expect(sliderInput).toHaveAttribute('min', '0');
  expect(sliderInput).toHaveAttribute('max', '100');
  expect(sliderInput).toHaveAttribute('step', '1');

  // Verify slider has the correct class
  expect(sliderInput).toHaveClass('slider__range');

  // Verify icon has correct class
  const icon = label?.querySelector('.slider__fluent-icon');
  expect(icon).toBeInTheDocument();
};

export const sliderVolumeIconPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SliderProps>) => {
  const canvas = within(canvasElement);

  // Verify slider exists
  const sliderInput = canvas.getByRole('slider');
  expect(sliderInput).toBeInTheDocument();

  // Verify it's a volume slider
  expect(args?.sliderFor).toBe('volume');

  // Check icon based on value
  const label = canvasElement.querySelector(`label[for="volume"]`);
  expect(label).toBeInTheDocument();
  expect(label).toHaveClass('slider__label');

  // Label should contain an SVG icon with correct class
  const icon = label?.querySelector('.slider__fluent-icon');
  expect(icon).toBeInTheDocument();
};

export const sliderBrightnessIconPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SliderProps>) => {
  const canvas = within(canvasElement);

  // Verify slider exists
  const sliderInput = canvas.getByRole('slider');
  expect(sliderInput).toBeInTheDocument();

  // Verify it's a brightness slider
  expect(args?.sliderFor).toBe('brightness');

  // Check icon based on value
  const label = canvasElement.querySelector(`label[for="brightness"]`);
  expect(label).toBeInTheDocument();
  expect(label).toHaveClass('slider__label');

  // Label should contain an SVG icon with correct class
  const icon = label?.querySelector('.slider__fluent-icon');
  expect(icon).toBeInTheDocument();
};

export const sliderInteractionPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SliderProps>) => {
  const canvas = within(canvasElement);

  // Verify slider exists
  const sliderInput = canvas.getByRole('slider') as HTMLInputElement;
  expect(sliderInput).toBeInTheDocument();

  // Get initial value
  const initialValue = Number(sliderInput.value);

  // Focus the slider
  await userEvent.click(sliderInput);
  expect(sliderInput).toHaveFocus();

  // Simulate value change via fireEvent (more reliable than keyboard events for range inputs)
  const newValue = initialValue + 1;
  fireEvent.change(sliderInput, { target: { value: String(newValue) } });

  // Verify value changed (slider is now controlled with state via render function)
  await waitFor(() => {
    expect(Number(sliderInput.value)).toBe(newValue);
  });

  // Verify the spy was called with value and sliderFor
  expect(args?.onSliderChange).toHaveBeenCalledWith(newValue, args?.sliderFor);
};

export const sliderZeroValuePlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SliderProps>) => {
  const canvas = within(canvasElement);

  // Verify slider exists
  const sliderInput = canvas.getByRole('slider');
  expect(sliderInput).toBeInTheDocument();

  // Verify value is 0
  expect(sliderInput).toHaveValue('0');

  // Verify label contains icon with correct class
  const label = canvasElement.querySelector(`label[for="${args?.sliderFor}"]`);
  expect(label).toBeInTheDocument();

  const icon = label?.querySelector('.slider__fluent-icon');
  expect(icon).toBeInTheDocument();
};

export const sliderMaxValuePlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SliderProps>) => {
  const canvas = within(canvasElement);

  // Verify slider exists
  const sliderInput = canvas.getByRole('slider');
  expect(sliderInput).toBeInTheDocument();

  // Verify value is 100
  expect(sliderInput).toHaveValue('100');

  // Verify label contains icon with correct class
  const label = canvasElement.querySelector(`label[for="${args?.sliderFor}"]`);
  expect(label).toBeInTheDocument();

  const icon = label?.querySelector('.slider__fluent-icon');
  expect(icon).toBeInTheDocument();
};

export default sliderPlayFunction;
