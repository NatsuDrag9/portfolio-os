import { PlayFunctionProps } from '@definitions/storybookTypes';
import { SecondaryButtonProps } from './SecondaryButton';
import { expect, userEvent, within } from '@storybook/test';

export const secondaryButtonPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SecondaryButtonProps>) => {
  const canvas = within(canvasElement);

  // Verify button exists
  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('secondary-button');

  // Verify button name text
  const nameElement = button.querySelector('.secondary-button__name');
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent(args?.name as string);
};

export const iconLeftPlayFunction = async ({
  canvasElement,
}: PlayFunctionProps<SecondaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Verify icon exists
  const icon = button.querySelector('.secondary-button__fluent-icon');
  expect(icon).toBeInTheDocument();

  // Verify icon comes before the name (left position)
  const children = Array.from(button.children);
  const iconIndex = children.findIndex((child) =>
    child.classList.contains('secondary-button__fluent-icon')
  );
  const nameIndex = children.findIndex((child) =>
    child.classList.contains('secondary-button__name')
  );

  expect(iconIndex).toBeLessThan(nameIndex);
};

export const iconRightPlayFunction = async ({
  canvasElement,
}: PlayFunctionProps<SecondaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Verify icon exists
  const icon = button.querySelector('.secondary-button__fluent-icon');
  expect(icon).toBeInTheDocument();

  // Verify icon comes after the name (right position)
  const children = Array.from(button.children);
  const iconIndex = children.findIndex((child) =>
    child.classList.contains('secondary-button__fluent-icon')
  );
  const nameIndex = children.findIndex((child) =>
    child.classList.contains('secondary-button__name')
  );

  expect(iconIndex).toBeGreaterThan(nameIndex);
};

export const noIconPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SecondaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Verify no icon is rendered
  const icon = button.querySelector('.secondary-button__fluent-icon');
  expect(icon).not.toBeInTheDocument();

  // Verify name still exists
  const nameElement = button.querySelector('.secondary-button__name');
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent(args?.name as string);
};

export const clickInteractionPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SecondaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Click the button
  await userEvent.click(button);

  // Verify callback was called
  expect(args?.onButtonClick).toHaveBeenCalledTimes(1);

  // Click again
  await userEvent.click(button);
  expect(args?.onButtonClick).toHaveBeenCalledTimes(2);
};

export const keyboardInteractionPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SecondaryButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Focus the button
  await userEvent.tab();
  expect(button).toHaveFocus();

  // Press Enter to activate
  await userEvent.keyboard('{Enter}');
  expect(args?.onButtonClick).toHaveBeenCalledTimes(1);

  // Press Space to activate
  await userEvent.keyboard(' ');
  expect(args?.onButtonClick).toHaveBeenCalledTimes(2);
};
