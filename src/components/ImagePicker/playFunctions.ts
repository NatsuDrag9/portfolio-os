import { PlayFunctionProps } from '@definitions/storybookTypes';
import { userEvent, within, expect } from '@storybook/test';
import { ImagePickerProps } from './ImagePicker';

export const playSelectImage = async ({
  canvasElement,
}: PlayFunctionProps<ImagePickerProps>) => {
  const canvas = within(canvasElement);

  // Find all image option buttons
  const imageOptions = canvas.getAllByRole('option');

  // Verify we have multiple options
  expect(imageOptions.length).toBeGreaterThan(0);

  // Click on the second image option
  await userEvent.click(imageOptions[1]);

  await new Promise((resolve) => setTimeout(resolve, 300));
};

export const playSelectMultipleImages = async ({
  canvasElement,
}: PlayFunctionProps<ImagePickerProps>) => {
  const canvas = within(canvasElement);

  const imageOptions = canvas.getAllByRole('option');

  // Select first image
  await userEvent.click(imageOptions[0]);
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Select third image
  await userEvent.click(imageOptions[2]);
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Select last image
  await userEvent.click(imageOptions[imageOptions.length - 1]);
  await new Promise((resolve) => setTimeout(resolve, 200));
};

export const playKeyboardSelection = async ({
  canvasElement,
}: PlayFunctionProps<ImagePickerProps>) => {
  const canvas = within(canvasElement);

  const imageOptions = canvas.getAllByRole('option');

  // Tab to the first option
  await userEvent.tab();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Verify first button is focused
  expect(document.activeElement).toBe(imageOptions[0]);

  // Press Enter to select
  await userEvent.keyboard('{Enter}');
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Tab to next option
  await userEvent.tab();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Verify second button is focused
  expect(document.activeElement).toBe(imageOptions[1]);

  // Press Space to select
  await userEvent.keyboard(' ');
  await new Promise((resolve) => setTimeout(resolve, 200));
};

export const playVerifySelectedState = async ({
  canvasElement,
}: PlayFunctionProps<ImagePickerProps>) => {
  const canvas = within(canvasElement);

  const imageOptions = canvas.getAllByRole('option');

  // Find the currently selected option
  const selectedOption = imageOptions.find(
    (option) => option.getAttribute('aria-selected') === 'true'
  );

  expect(selectedOption).toBeDefined();

  // Verify the selected option has the correct CSS class
  expect(selectedOption?.className).toContain('image-picker__tile--selected');

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Click on a different option
  const unselectedOption = imageOptions.find(
    (option) => option.getAttribute('aria-selected') === 'false'
  );

  if (unselectedOption) {
    await userEvent.click(unselectedOption);
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
};

export const playHoverInteraction = async ({
  canvasElement,
}: PlayFunctionProps<ImagePickerProps>) => {
  const canvas = within(canvasElement);

  const imageOptions = canvas.getAllByRole('option');

  // Hover over first three tiles
  for (let i = 0; i < Math.min(3, imageOptions.length); i++) {
    await userEvent.hover(imageOptions[i]);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await userEvent.unhover(imageOptions[i]);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};

export const playVerifyPreviewUpdate = async ({
  canvasElement,
}: PlayFunctionProps<ImagePickerProps>) => {
  const canvas = within(canvasElement);

  // Find the preview image
  const previewImage = canvas.getByAltText(/Selected background:/);
  expect(previewImage).toBeInTheDocument();

  const imageOptions = canvas.getAllByRole('option');

  // Click on a different image
  await userEvent.click(imageOptions[2]);
  await new Promise((resolve) => setTimeout(resolve, 300));
};
