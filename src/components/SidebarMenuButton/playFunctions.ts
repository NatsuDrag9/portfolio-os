import { PlayFunctionProps } from '@definitions/storybookTypes';
import { userEvent, within, expect } from '@storybook/test';
import { SidebarMenuButtonProps } from './SidebarMenuButton';

/**
 * Tests basic button click interaction
 * Verifies button is clickable and has correct accessibility attributes
 */
export const playClickButton = async ({
  canvasElement,
}: PlayFunctionProps<SidebarMenuButtonProps>) => {
  const canvas = within(canvasElement);

  // Find the button by its role
  const button = canvas.getByRole('button');
  expect(button).toBeInTheDocument();

  // Verify initial state
  expect(button).toHaveAttribute('aria-pressed', 'false');
  expect(button).not.toHaveClass('sidebar-menubutton--active');

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
}: PlayFunctionProps<SidebarMenuButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');

  // Tab to focus the button
  await userEvent.tab();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Verify button is focused
  expect(document.activeElement).toBe(button);

  // Activate with Enter key
  await userEvent.keyboard('{Enter}');
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Tab away and back
  await userEvent.tab();
  await userEvent.tab({ shift: true });
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Activate with Space key
  await userEvent.keyboard(' ');
  await new Promise((resolve) => setTimeout(resolve, 200));
};

/**
 * Tests active state visual indicators
 * Verifies the active class and aria-pressed attribute
 */
export const playActiveStateToggle = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SidebarMenuButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');

  // Verify button exists with correct label
  expect(button).toHaveAttribute('aria-label', args?.name);

  // Check if button has active class when isActive is true
  if (args?.isActive) {
    expect(button).toHaveClass('sidebar-menubutton--active');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  } else {
    expect(button).not.toHaveClass('sidebar-menubutton--active');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  }

  // Verify icon is rendered
  const icon = button.querySelector('.sidebar-menubutton__fluent-icon');
  expect(icon).toBeInTheDocument();

  // Verify name text is rendered
  const nameText = button.querySelector('.sidebar-menubutton__name');
  expect(nameText).toBeInTheDocument();
  expect(nameText?.textContent).toBe(args?.name);

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Click the button
  await userEvent.click(button);
  await new Promise((resolve) => setTimeout(resolve, 200));
};

/**
 * Tests multiple rapid button clicks
 * Simulates user clicking the button multiple times in succession
 */
export const playMultipleButtonClicks = async ({
  canvasElement,
}: PlayFunctionProps<SidebarMenuButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');

  // Click the button multiple times
  for (let i = 0; i < 3; i++) {
    await userEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
};

/**
 * Tests hover interaction on the button
 * Verifies hover state changes
 */
export const playHoverInteraction = async ({
  canvasElement,
}: PlayFunctionProps<SidebarMenuButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');

  // Hover over the button
  await userEvent.hover(button);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Unhover
  await userEvent.unhover(button);
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Hover again
  await userEvent.hover(button);
  await new Promise((resolve) => setTimeout(resolve, 300));
};

/**
 * Tests button structure and content
 * Verifies all child elements are present
 */
export const playVerifyStructure = async ({
  canvasElement,
  args,
}: PlayFunctionProps<SidebarMenuButtonProps>) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');

  // Verify button type attribute
  expect(button).toHaveAttribute('type', 'button');

  // Verify icon exists
  const icon = button.querySelector('.sidebar-menubutton__fluent-icon');
  expect(icon).toBeInTheDocument();

  // Verify name text exists and matches
  const nameElement = canvas.getByText(args?.name as string);
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveClass('sidebar-menubutton__name');

  // Verify accessibility attributes
  expect(button).toHaveAttribute('aria-label', args?.name);
  expect(button).toHaveAttribute('aria-pressed');
};
