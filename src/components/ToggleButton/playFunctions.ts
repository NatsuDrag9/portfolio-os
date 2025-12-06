import { PlayFunctionProps } from '@definitions/storybookTypes';
import { userEvent, within } from '@storybook/test';
import { ToggleButtonProps } from './ToggleButton';

export const playToggleToActive = async ({
  canvasElement,
}: PlayFunctionProps<ToggleButtonProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  await userEvent.click(button);
};

export const playRapidToggle = async ({
  canvasElement,
}: PlayFunctionProps<ToggleButtonProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  for (let i = 0; i < 5; i++) {
    await userEvent.click(button);
  }
};

export const playToggleWithDelay = async ({
  canvasElement,
}: PlayFunctionProps<ToggleButtonProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // First toggle
  await userEvent.click(button);
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Second toggle back
  await userEvent.click(button);
};

export const playKeyboardToggle = async ({
  canvasElement,
}: PlayFunctionProps<ToggleButtonProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // Focus the button by tabbing
  await userEvent.tab();

  // Check if button is focused
  if (document.activeElement === button) {
    // Trigger with Enter key
    await userEvent.keyboard('{Enter}');
  }
};
