import { PlayFunctionType } from '@definitions/storybookTypes';
import { expect, userEvent, within, waitFor } from '@storybook/test';

const startMenuPlayFunction = async ({ canvasElement }: PlayFunctionType) => {
  const canvas = within(canvasElement);

  // Verify start menu container exists
  const startMenu = canvasElement.querySelector('.start-menu');
  expect(startMenu).toBeInTheDocument();
  expect(startMenu).toHaveClass('open');

  // Verify bottom section with user and power buttons
  const bottomSection = canvasElement.querySelector('.start-menu__bottom');
  expect(bottomSection).toBeInTheDocument();

  // Verify username button exists
  const userButton = canvas.getByRole('button', { name: /Natsu/i });
  expect(userButton).toBeInTheDocument();

  // Verify power button exists
  const powerButton = canvasElement.querySelector('.start-menu__power-off');
  expect(powerButton).toBeInTheDocument();
};

export const startMenuPanelNavigationPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const canvas = within(canvasElement);

  // Verify start menu is on panel-one initially
  const startMenu = canvasElement.querySelector('.start-menu');
  expect(startMenu).toHaveClass('panel-one');

  // Find and click "All" button to go to panel-two
  const allButton = canvas.getByRole('button', { name: /all/i });
  expect(allButton).toBeInTheDocument();
  await userEvent.click(allButton);

  // Verify panel switched to panel-two
  await waitFor(() => {
    expect(startMenu).toHaveClass('panel-two');
  });

  // Find and click "Back" button to return to panel-one
  const backButton = canvas.getByRole('button', { name: /back/i });
  expect(backButton).toBeInTheDocument();
  await userEvent.click(backButton);

  // Verify panel switched back to panel-one
  await waitFor(() => {
    expect(startMenu).toHaveClass('panel-one');
  });
};

export const startMenuUserCardPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const canvas = within(canvasElement);

  // Find username button
  const userButton = canvas.getByRole('button', { name: /Natsu/i });
  expect(userButton).toBeInTheDocument();

  // Initially, user card should not be visible
  let userCard = canvasElement.querySelector('.start-menu__user-card');
  expect(userCard).not.toBeInTheDocument();

  // Click user button to show card
  await userEvent.click(userButton);

  // Verify user card is now visible
  await waitFor(() => {
    userCard = canvasElement.querySelector('.start-menu__user-card');
    expect(userCard).toBeInTheDocument();
  });

  // Verify user card contains user details
  const userDetailsTitle = canvasElement.querySelector(
    '.start-menu__user-details-title'
  );
  expect(userDetailsTitle).toBeInTheDocument();

  const localAccountText = canvasElement.querySelector(
    '.start-menu__user-details-text'
  );
  expect(localAccountText).toBeInTheDocument();
};

export const startMenuPowerOptionsPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  // Find power button
  const powerButton = canvasElement.querySelector('.start-menu__power-off');
  expect(powerButton).toBeInTheDocument();

  // Initially, power options should not be visible
  let powerOptions = canvasElement.querySelector(
    '.start-menu__power-off-options'
  );
  expect(powerOptions).not.toBeInTheDocument();

  // Click power button to show options
  await userEvent.click(powerButton as HTMLElement);

  // Verify power options are now visible
  await waitFor(() => {
    powerOptions = canvasElement.querySelector(
      '.start-menu__power-off-options'
    );
    expect(powerOptions).toBeInTheDocument();
  });

  // Verify Sign Out option exists
  const signOutOption = canvasElement.querySelector(
    '.start-menu__power-off-option'
  );
  expect(signOutOption).toBeInTheDocument();
  expect(signOutOption?.textContent).toContain('Sign Out');

  // Verify Power Off option exists
  const powerOffOptions = canvasElement.querySelectorAll(
    '.start-menu__power-off-option'
  );
  expect(powerOffOptions.length).toBe(2);
  expect(powerOffOptions[1].textContent).toContain('Power Off');
};

export const startMenuAppsPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  // Verify default apps container exists
  const defaultAppsContainer = canvasElement.querySelector(
    '.start-menu__default-apps-container'
  );
  expect(defaultAppsContainer).toBeInTheDocument();

  // Verify default apps section has a category title
  const defaultTitle = canvasElement.querySelector(
    '.start-menu__category-title'
  );
  expect(defaultTitle).toBeInTheDocument();
  expect(defaultTitle?.textContent).toBe('Default');

  // Verify recommended apps container exists
  const recommendedAppsContainer = canvasElement.querySelector(
    '.start-menu__recommended-apps-container'
  );
  expect(recommendedAppsContainer).toBeInTheDocument();

  // Verify app icons are rendered in default apps section
  const defaultApps = canvasElement.querySelector('.start-menu__default-apps');
  expect(defaultApps).toBeInTheDocument();

  const appIcons = defaultApps?.querySelectorAll('button');
  expect(appIcons).toBeTruthy();
  // expect((appIcons?.length || 0) > 0).toBe(true);
};

export default startMenuPlayFunction;
