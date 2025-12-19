import { PlayFunctionProps } from '@definitions/storybookTypes';
import { userEvent, within, expect } from '@storybook/test';
import { GenericDropdownProps } from './GenericDropdown';

export const playSelectOption = async ({
  canvasElement,
}: PlayFunctionProps<GenericDropdownProps>) => {
  const canvas = within(canvasElement);

  // Find and click the dropdown button to open it
  const dropdownButton = canvas.getByRole('button', { expanded: false });
  await userEvent.click(dropdownButton);

  // Wait for dropdown to open and find the listbox
  const listbox = await canvas.findByRole('listbox');
  expect(listbox).toBeInTheDocument();

  // Select the second option
  const options = canvas.getAllByRole('option');
  await userEvent.click(options[1]);
};

export const playKeyboardNavigation = async ({
  canvasElement,
}: PlayFunctionProps<GenericDropdownProps>) => {
  const canvas = within(canvasElement);

  // Open dropdown
  const dropdownButton = canvas.getByRole('button');
  await userEvent.click(dropdownButton);

  // Wait for options to appear
  await canvas.findByRole('listbox');

  // Navigate down with ArrowDown
  await userEvent.keyboard('{ArrowDown}');
  await new Promise((resolve) => setTimeout(resolve, 100));

  await userEvent.keyboard('{ArrowDown}');
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Navigate up with ArrowUp
  await userEvent.keyboard('{ArrowUp}');
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Jump to last option with End key
  await userEvent.keyboard('{End}');
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Jump to first option with Home key
  await userEvent.keyboard('{Home}');
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Select with Enter
  await userEvent.keyboard('{Enter}');
};

export const playEscapeClose = async ({
  canvasElement,
}: PlayFunctionProps<GenericDropdownProps>) => {
  const canvas = within(canvasElement);

  // Open dropdown
  const dropdownButton = canvas.getByRole('button', { expanded: false });
  await userEvent.click(dropdownButton);

  // Verify dropdown is open
  const listbox = await canvas.findByRole('listbox');
  expect(listbox).toBeInTheDocument();

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Close with Escape key
  await userEvent.keyboard('{Escape}');

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Verify dropdown closed (listbox should not be in document)
  const listboxAfterEscape = canvas.queryByRole('listbox');
  expect(listboxAfterEscape).not.toBeInTheDocument();
};

export const playClickOutside = async ({
  canvasElement,
}: PlayFunctionProps<GenericDropdownProps>) => {
  const canvas = within(canvasElement);

  // Open dropdown
  const dropdownButton = canvas.getByRole('button');
  await userEvent.click(dropdownButton);

  // Verify dropdown is open
  const listbox = await canvas.findByRole('listbox');
  expect(listbox).toBeInTheDocument();

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Click outside the dropdown (on the canvas element itself)
  await userEvent.click(canvasElement);

  await new Promise((resolve) => setTimeout(resolve, 200));
};

export const playSpaceKeySelect = async ({
  canvasElement,
}: PlayFunctionProps<GenericDropdownProps>) => {
  const canvas = within(canvasElement);

  // Open dropdown
  const dropdownButton = canvas.getByRole('button');
  await userEvent.click(dropdownButton);

  // Wait for options
  await canvas.findByRole('listbox');

  // Navigate to second option
  await userEvent.keyboard('{ArrowDown}');
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Select with Space key
  await userEvent.keyboard(' ');
};
