import { PlayFunctionProps } from '@definitions/storybookTypes';
import { userEvent, within } from '@storybook/test';
import { WindowContainerProps } from './WindowContainer';

export const playMinimizeWindow = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);
  const buttons = canvas.getAllByRole('button');
  const minimizeButton = buttons[0];

  await userEvent.click(minimizeButton);
};

export const playToggleMaximize = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);
  const buttons = canvas.getAllByRole('button');
  const maximizeButton = buttons[1]; // Middle button

  // Click maximize
  await userEvent.click(maximizeButton);

  // Wait and click again to restore
  await new Promise((resolve) => setTimeout(resolve, 500));
  await userEvent.click(maximizeButton);
};

export const playCloseWindow = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);
  const buttons = canvas.getAllByRole('button');
  const closeButton = buttons[2]; // Rightmost button

  await userEvent.click(closeButton);
};

export const playInteractiveSequence = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);

  // Get all buttons in the titlebar
  const buttons = canvas.getAllByRole('button');
  const minimizeButton = buttons[0];
  const maximizeButton = buttons[1];

  // Step 1: Click minimize
  await userEvent.click(minimizeButton);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Step 2: Click maximize
  await userEvent.click(maximizeButton);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Step 3: Click maximize again to restore
  await userEvent.click(maximizeButton);
};

export const playDragWindow = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);
  const titleBar = canvas.getByRole('heading');

  // Simulate drag from titlebar
  await userEvent.pointer([
    { keys: '[MouseLeft>]', target: titleBar },
    { coords: { x: 200, y: 200 } },
    { keys: '[/MouseLeft]' },
  ]);
};

export const playMultipleCycles = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);
  const buttons = canvas.getAllByRole('button');
  const minimizeButton = buttons[0];
  const maximizeButton = buttons[1];

  for (let i = 0; i < 3; i++) {
    // Minimize
    await userEvent.click(minimizeButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Maximize
    await userEvent.click(maximizeButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Restore
    await userEvent.click(maximizeButton);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

export const playRapidClicks = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);
  const buttons = canvas.getAllByRole('button');

  // Click minimize, maximize, then restore
  await userEvent.click(buttons[0]); // minimize
  await userEvent.click(buttons[1]); // maximize
  await userEvent.click(buttons[1]); // restore
};

export const playStressTest = async ({
  canvasElement,
}: PlayFunctionProps<WindowContainerProps>) => {
  const canvas = within(canvasElement);
  const buttons = canvas.getAllByRole('button');
  const minimizeButton = buttons[0];
  const maximizeButton = buttons[1];

  // Rapid state changes
  for (let i = 0; i < 5; i++) {
    await userEvent.click(maximizeButton);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await userEvent.click(minimizeButton);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};
