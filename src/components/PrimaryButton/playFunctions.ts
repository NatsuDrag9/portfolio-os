import { PlayFunctionProps } from '@definitions/storybookTypes';
import { userEvent, within, expect } from '@storybook/test';
import { PrimaryButtonProps } from './PrimaryButton';

export const playClickButton = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PrimaryButtonProps>) => {
  const canvas = within(canvasElement);

  // Find the button by its text content
  const button = canvas.getByRole('button', { name: args?.name });
  expect(button).toBeInTheDocument();

  // Verify button type attribute
  expect(button).toHaveAttribute('type', args?.buttonType || 'button');

  // Verify button text
  expect(button).toHaveTextContent(args?.name as string);

  // Click the button
  await userEvent.click(button);

  await new Promise((resolve) => setTimeout(resolve, 200));
};

/**
 * Tests keyboard interaction with Enter and Space keys
 * Verifies keyboard accessibility
 */
export const playKeyboardInteraction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PrimaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: args?.name });

  // Tab to focus the button
  await userEvent.tab();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Verify button is focused
  expect(document.activeElement).toBe(button);

  // Activate with Enter key
  await userEvent.keyboard('{Enter}');
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Tab away and back
  await userEvent.tab();
  await userEvent.tab({ shift: true });
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Activate with Space key
  await userEvent.keyboard(' ');
  await new Promise((resolve) => setTimeout(resolve, 300));
};

export const playFormSubmit = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PrimaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: args?.name });

  // Verify button type is submit
  expect(button).toHaveAttribute('type', 'submit');

  // Verify form attribute if formId is provided
  if (args?.formId) {
    expect(button).toHaveAttribute('form', args?.formId);
  }

  // Click the submit button
  await userEvent.click(button);

  await new Promise((resolve) => setTimeout(resolve, 300));
};

export const playMultipleClicks = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PrimaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: args?.name });

  // Click the button multiple times
  for (let i = 0; i < 3; i++) {
    await userEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
};

export const playHoverInteraction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PrimaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: args?.name });

  // Hover over the button
  await userEvent.hover(button);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Unhover
  await userEvent.unhover(button);
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Hover again and click
  await userEvent.hover(button);
  await new Promise((resolve) => setTimeout(resolve, 200));
  await userEvent.click(button);
  await new Promise((resolve) => setTimeout(resolve, 200));
};

export const playVerifyAttributes = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PrimaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button', { name: args?.name });

  // Verify button class
  expect(button).toHaveClass('primary-button');

  // Verify button type
  expect(button).toHaveAttribute('type', args?.buttonType || 'button');

  // Verify form attribute if provided
  if (args?.formId) {
    expect(button).toHaveAttribute('form', args?.formId);
  } else {
    expect(button).not.toHaveAttribute('form');
  }

  // Verify button content
  expect(button.textContent).toBe(args?.name);
};
