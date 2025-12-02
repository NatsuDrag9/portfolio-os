import { expect, userEvent, within } from '@storybook/test';
import { waitFor } from '@testing-library/dom';

import { APP_REGISTRY } from '@constants/desktopConstants';
import { useSystemUIState } from '@store/store';
import { PlayFunctionType } from '@definitions/storybookTypes';

const taskbarPlayFunction = async ({ canvasElement }: PlayFunctionType) => {
  const canvas = within(canvasElement);

  // Verify taskbar container exists
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();

  // Verify Windows start button exists
  const windowsButton = canvas.getAllByRole('button')[0];
  expect(windowsButton).toBeInTheDocument();
  expect(windowsButton).toHaveClass('taskbar__windows-button');

  // Verify Windows icon inside button
  const windowsIcon = windowsButton.querySelector('.taskbar__windows-icon');
  expect(windowsIcon).toBeInTheDocument();

  // Verify search container exists (default has search visible)
  const searchContainer = canvasElement.querySelector(
    '.taskbar__search-container'
  );
  expect(searchContainer).toBeInTheDocument();

  // Verify search input exists
  const searchInput = canvas.getByRole('searchbox');
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveClass('taskbar__search');
  expect(searchInput).toHaveAttribute('placeholder', 'Search');

  // Verify search icon exists
  const searchIcon = canvasElement.querySelector('.search-icon');
  expect(searchIcon).toBeInTheDocument();

  // Verify apps container exists
  const appsContainer = canvasElement.querySelector('.taskbar__apps-container');
  expect(appsContainer).toBeInTheDocument();

  // Verify right section exists
  const rightSection = canvasElement.querySelector('.taskbar__right-section');
  expect(rightSection).toBeInTheDocument();

  // Verify date-time section exists
  const dateTime = canvasElement.querySelector('.taskbar__date-time');
  expect(dateTime).toBeInTheDocument();

  // Verify time and date elements exist
  const timeElement = canvasElement.querySelector('.taskbar__time');
  const dateElement = canvasElement.querySelector('.taskbar__date');
  expect(timeElement).toBeInTheDocument();
  expect(dateElement).toBeInTheDocument();
};

export const taskbarBottomAlignedPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();
  expect(taskbar).toHaveClass('bottom');

  // Verify horizontal layout elements
  const searchContainer = canvasElement.querySelector(
    '.taskbar__search-container'
  );
  expect(searchContainer).toBeInTheDocument();
  expect(searchContainer).toHaveClass('bottom');

  const appsContainer = canvasElement.querySelector('.taskbar__apps-container');
  expect(appsContainer).toHaveClass('bottom');

  const rightSection = canvasElement.querySelector('.taskbar__right-section');
  expect(rightSection).toHaveClass('bottom');
};

export const taskbarTopAlignedPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();
  expect(taskbar).toHaveClass('top');

  // Verify horizontal layout elements have top class
  const searchContainer = canvasElement.querySelector(
    '.taskbar__search-container'
  );
  expect(searchContainer).toBeInTheDocument();
  expect(searchContainer).toHaveClass('top');

  const appsContainer = canvasElement.querySelector('.taskbar__apps-container');
  expect(appsContainer).toHaveClass('top');

  const rightSection = canvasElement.querySelector('.taskbar__right-section');
  expect(rightSection).toHaveClass('top');
};

export const taskbarLeftAlignedPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();
  expect(taskbar).toHaveClass('left');

  // Search should be hidden for vertical taskbar
  const searchContainer = canvasElement.querySelector(
    '.taskbar__search-container'
  );
  expect(searchContainer).not.toBeInTheDocument();

  // Verify vertical layout elements have left class
  const appsContainer = canvasElement.querySelector('.taskbar__apps-container');
  expect(appsContainer).toHaveClass('left');

  const rightSection = canvasElement.querySelector('.taskbar__right-section');
  expect(rightSection).toHaveClass('left');

  // ENG IN text should be hidden in vertical mode
  const engText = canvasElement.querySelector('.taskbar__text');
  expect(engText).not.toBeInTheDocument();
};

export const taskbarRightAlignedPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();
  expect(taskbar).toHaveClass('right');

  // Search should be hidden for vertical taskbar
  const searchContainer = canvasElement.querySelector(
    '.taskbar__search-container'
  );
  expect(searchContainer).not.toBeInTheDocument();

  // Verify vertical layout elements have right class
  const appsContainer = canvasElement.querySelector('.taskbar__apps-container');
  expect(appsContainer).toHaveClass('right');

  const rightSection = canvasElement.querySelector('.taskbar__right-section');
  expect(rightSection).toHaveClass('right');
};

export const taskbarSearchHiddenPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();

  // Search container should not exist
  const searchContainer = canvasElement.querySelector(
    '.taskbar__search-container'
  );
  expect(searchContainer).not.toBeInTheDocument();

  // Search input should not exist
  const searchInput = canvasElement.querySelector('.taskbar__search');
  expect(searchInput).not.toBeInTheDocument();

  // Other elements should still exist
  const windowsButton = canvasElement.querySelector('.taskbar__windows-button');
  expect(windowsButton).toBeInTheDocument();

  const appsContainer = canvasElement.querySelector('.taskbar__apps-container');
  expect(appsContainer).toBeInTheDocument();
};

export const taskbarSearchInteractionPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const canvas = within(canvasElement);

  // Verify search input exists
  const searchInput = canvas.getByRole('searchbox') as HTMLInputElement;
  expect(searchInput).toBeInTheDocument();

  // Verify initial value is empty
  expect(searchInput.value).toBe('');

  // Focus the search input
  await userEvent.click(searchInput);
  expect(searchInput).toHaveFocus();

  // Type in the search input
  await userEvent.type(searchInput, 'test search');

  // Verify value changed
  await waitFor(() => {
    expect(searchInput.value).toBe('test search');
  });

  // Clear the search input
  await userEvent.clear(searchInput);
  expect(searchInput.value).toBe('');
};

export const taskbarStartButtonPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const canvas = within(canvasElement);

  // Verify Windows button exists
  const windowsButton = canvas.getAllByRole('button')[0];
  expect(windowsButton).toBeInTheDocument();
  expect(windowsButton).toHaveClass('taskbar__windows-button');

  // Verify initial state - start menu should be closed
  const initialState = useSystemUIState.getState().startMenuOpen;
  expect(initialState).toBe(false);

  // Click the Windows button to open start menu
  await userEvent.click(windowsButton);

  // Verify start menu state toggled to open
  await waitFor(() => {
    expect(useSystemUIState.getState().startMenuOpen).toBe(true);
  });

  // Click again to close
  await userEvent.click(windowsButton);

  // Verify start menu state toggled back to closed
  await waitFor(() => {
    expect(useSystemUIState.getState().startMenuOpen).toBe(false);
  });
};

export const taskbarWithPinnedAppsPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();

  // Verify apps container exists
  const appsContainer = canvasElement.querySelector('.taskbar__apps-container');
  expect(appsContainer).toBeInTheDocument();

  // Verify pinned apps count matches the default pinned apps from APP_REGISTRY
  const pinnedAppsCount = APP_REGISTRY.filter(
    (app) => app.defaultPinned === true
  ).length;
  expect(appsContainer?.children.length).toEqual(pinnedAppsCount);
};

export const taskbarQuickActionsPlayFunction = async ({
  canvasElement,
}: PlayFunctionType) => {
  const taskbar = canvasElement.querySelector('.taskbar');
  expect(taskbar).toBeInTheDocument();

  // Verify static apps section exists (triggers quick actions)
  const staticApps = canvasElement.querySelector('.taskbar__static-apps');
  expect(staticApps).toBeInTheDocument();

  // Verify system icons exist
  const fluentIcons = staticApps?.querySelectorAll('.taskbar__fluent-icon');
  expect(fluentIcons?.length).toBeGreaterThanOrEqual(3); // WiFi, Speaker, Battery

  // Click to open quick actions popup
  await userEvent.click(staticApps as Element);

  // Verify popup appears
  await waitFor(() => {
    const popup = canvasElement.querySelector('.taskbar__qa-popup');
    expect(popup).toBeInTheDocument();
  });

  // Verify popup contains quick action buttons
  const popup = canvasElement.querySelector('.taskbar__qa-popup');
  const qaButtons = popup?.querySelector('.taskbar__qa-buttons');
  expect(qaButtons).toBeInTheDocument();

  // Verify popup contains sliders
  const qaSliders = popup?.querySelector('.taskbar__qa-sliders');
  expect(qaSliders).toBeInTheDocument();
};

export default taskbarPlayFunction;
