import { PlayFunctionProps } from '@definitions/storybookTypes';
import { expect, userEvent, within } from '@storybook/test';
import { QuickActionButtonProps } from './QuickActionButton';

const quickActionButtonPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<QuickActionButtonProps>) => {
  const canvas = within(canvasElement);

  // Verify button exists
  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('qa-button__button');

  // Verify name is displayed
  const name = canvas.getByText(args?.name as string);
  expect(name).toBeInTheDocument();
  expect(name).toHaveClass('qa-button__name');

  // Verify icon exists
  const icon = button.querySelector('.qa-button__fluent-icon');
  expect(icon).toBeInTheDocument();

  // Verify active state matches isActive prop
  if (args?.isActive) {
    expect(button).toHaveClass('qa-button__button--active');
  } else {
    expect(button).not.toHaveClass('qa-button__button--active');
  }
};

export const quickActionButtonClickPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<QuickActionButtonProps>) => {
  const canvas = within(canvasElement);

  // Verify button exists
  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Verify initial state based on isActive prop
  if (args?.isActive) {
    expect(button).toHaveClass('qa-button__button--active');
  } else {
    expect(button).not.toHaveClass('qa-button__button--active');
  }

  // Click the button
  await userEvent.click(button);

  // Verify callback was called with actionType
  expect(args?.onButtonClick).toHaveBeenCalledTimes(1);
  expect(args?.onButtonClick).toHaveBeenCalledWith(args?.actionType);

  // Click again
  await userEvent.click(button);

  // Verify callback was called again
  expect(args?.onButtonClick).toHaveBeenCalledTimes(2);
};

export const quickActionButtonKeyboardPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<QuickActionButtonProps>) => {
  const canvas = within(canvasElement);

  // Verify button exists
  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Focus the button
  await userEvent.tab();
  expect(button).toHaveFocus();

  // Activate via Enter key
  await userEvent.keyboard('{Enter}');

  // Verify callback was called
  expect(args?.onButtonClick).toHaveBeenCalledTimes(1);
  expect(args?.onButtonClick).toHaveBeenCalledWith(args?.actionType);

  // Activate via Space key
  await userEvent.keyboard(' ');

  // Verify callback was called again
  expect(args?.onButtonClick).toHaveBeenCalledTimes(2);
};

export const quickActionButtonNoCallbackPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<QuickActionButtonProps>) => {
  const canvas = within(canvasElement);

  // Verify button exists
  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Get initial icon
  const initialIcon = button.querySelector('.qa-button__fluent-icon');
  expect(initialIcon).toBeInTheDocument();

  // Click should not throw even without callback
  await userEvent.click(button);

  // Verify button still exists and works (no error thrown)
  expect(button).toBeInTheDocument();

  // Verify name is still displayed
  const name = canvas.getByText(args?.name as string);
  expect(name).toBeInTheDocument();
};

// Play function for active state story
export const quickActionButtonActivePlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<QuickActionButtonProps>) => {
  const canvas = within(canvasElement);

  // Verify button exists and is active
  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('qa-button__button--active');

  // Verify active icon is shown (not the default one)
  const icon = button.querySelector('.qa-button__fluent-icon');
  expect(icon).toBeInTheDocument();
  expect(icon).not.toHaveClass('qa-button__fluent-icon--default');

  // Verify name is displayed
  const name = canvas.getByText(args?.name as string);
  expect(name).toBeInTheDocument();
};

export default quickActionButtonPlayFunction;
