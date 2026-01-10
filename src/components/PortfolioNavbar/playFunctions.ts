import { expect } from '@storybook/test';
import { within, userEvent, waitFor } from '@storybook/test';
import type { PortfolioNavbarProps } from './PortfolioNavbar';
import { PlayFunctionProps } from '@definitions/storybookTypes';

export const basicNavbarPlay = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PortfolioNavbarProps>) => {
  const canvas = within(canvasElement);

  // Verify navbar is rendered
  const navbar = canvas.getByRole('navigation');
  expect(navbar).toBeInTheDocument();
  expect(navbar).toHaveClass('portfolio-navbar');

  // Verify all buttons are rendered
  const buttons = canvas.getAllByRole('button');
  expect(buttons).toHaveLength(args?.buttons?.length || 0);

  // Verify button text content
  args?.buttons?.forEach(
    (button: { name: string | RegExp }, index: string | number) => {
      expect(buttons[index as number]).toHaveTextContent(button.name);
    }
  );

  // Verify first button is in the document
  const firstButton = canvas.getByText(args?.buttons?.[0]?.name || '');
  expect(firstButton).toBeInTheDocument();
};

export const activeStatePlay = async ({
  canvasElement,
  args,
}: PlayFunctionProps<PortfolioNavbarProps>) => {
  const canvas = within(canvasElement);

  // Find the active button
  const activeButton = args?.buttons?.find((btn) => btn.isActive);

  if (activeButton) {
    const activeButtonElement = canvas.getByText(activeButton.name);
    expect(activeButtonElement).toBeInTheDocument();

    // Verify the button exists and has correct text
    expect(activeButtonElement).toHaveTextContent(activeButton.name);
  }

  // Verify all buttons are rendered
  const buttons = canvas.getAllByRole('button');
  expect(buttons).toHaveLength(args?.buttons?.length || 0);

  // Check that only one button is active
  const activeButtons = args?.buttons?.filter((btn) => btn.isActive);
  expect(activeButtons).toHaveLength(1);
};

export const clickInteractionPlay = async ({
  canvasElement,
}: PlayFunctionProps<PortfolioNavbarProps>) => {
  const canvas = within(canvasElement);

  // Get all buttons
  const buttons = canvas.getAllByRole('button');

  // Click the first button
  const firstButton = buttons[0];
  await userEvent.click(firstButton);

  // Verify button is still in document after click
  expect(firstButton).toBeInTheDocument();

  // Click the second button if it exists
  if (buttons.length > 1) {
    const secondButton = buttons[1];
    await userEvent.click(secondButton);

    await waitFor(() => {
      expect(secondButton).toBeInTheDocument();
    });
  }

  // Click the last button
  const lastButton = buttons[buttons.length - 1];
  await userEvent.click(lastButton);

  await waitFor(() => {
    expect(lastButton).toBeInTheDocument();
  });
};

export const keyboardNavigationPlay = async ({
  canvasElement,
}: PlayFunctionProps<PortfolioNavbarProps>) => {
  const canvas = within(canvasElement);

  const buttons = canvas.getAllByRole('button');

  // Focus first button
  buttons[0].focus();
  expect(buttons[0]).toHaveFocus();

  // Tab to next button
  await userEvent.tab();

  await waitFor(() => {
    expect(buttons[1]).toHaveFocus();
  });

  // Tab to third button
  await userEvent.tab();

  await waitFor(() => {
    expect(buttons[2]).toHaveFocus();
  });

  // Press Enter on focused button
  await userEvent.keyboard('{Enter}');

  // Button should still be in document
  expect(buttons[2]).toBeInTheDocument();

  // Press Space on a button
  buttons[0].focus();
  expect(buttons[0]).toHaveFocus();

  await userEvent.keyboard(' ');

  // Button should still be in document
  expect(buttons[0]).toBeInTheDocument();
};
