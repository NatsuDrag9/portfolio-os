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
};

export const quickActionButtonClickPlayFunction = async ({
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
  const initialIconHtml = initialIcon?.outerHTML;

  // Click the button
  await userEvent.click(button);

  // Verify callback was called with actionType
  expect(args?.onButtonClick).toHaveBeenCalledTimes(1);
  expect(args?.onButtonClick).toHaveBeenCalledWith(args?.actionType);

  // Verify icon changed (clicked state)
  const clickedIcon = button.querySelector('.qa-button__fluent-icon');
  expect(clickedIcon).toBeInTheDocument();
  expect(clickedIcon?.outerHTML).not.toBe(initialIconHtml);

  // Click again to toggle back
  await userEvent.click(button);

  // Verify callback was called again
  expect(args?.onButtonClick).toHaveBeenCalledTimes(2);

  // Verify icon reverted to default
  const revertedIcon = button.querySelector('.qa-button__fluent-icon--default');
  expect(revertedIcon?.outerHTML).toBe(initialIconHtml);
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
  const initialIconHtml = initialIcon?.outerHTML;

  // Click should not throw even without callback
  await userEvent.click(button);

  // Verify icon still toggled (internal state works)
  const clickedIcon = button.querySelector('.qa-button__fluent-icon');
  expect(clickedIcon?.outerHTML).not.toBe(initialIconHtml);

  // Verify name is still displayed
  const name = canvas.getByText(args?.name as string);
  expect(name).toBeInTheDocument();
};

export default quickActionButtonPlayFunction;
