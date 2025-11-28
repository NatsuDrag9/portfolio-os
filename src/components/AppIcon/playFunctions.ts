import { PlayFunctionProps } from '@definitions/storybookTypes';
import { expect, userEvent, within } from '@storybook/test';
import { AppIconProps } from './AppIcon';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { AppMetadata } from '@definitions/applicationTypes';

const appIconPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<AppIconProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // Verify button exists and has correct icon
  expect(button).toBeInTheDocument();
  const appMetaData = APP_REGISTRY.find(
    (app) => app.id === args?.appId
  ) as AppMetadata;
  const image = canvas.getByAltText(new RegExp(appMetaData.appName || '', 'i'));
  expect(image).toBeInTheDocument();

  if (args?.iconVariant === 'desktop') {
    // Test desktop variant: double-click behavior
    await userEvent.dblClick(button);
    expect(args?.onDoubleClick).toHaveBeenCalledWith(args?.appId);
    expect(args?.onSingleClick).not.toHaveBeenCalled();

    // Desktop and start-menu variants show both icon and name
    expect(button.children.length).toBe(2); // Image + span
    const appName = canvas.getByText(
      new RegExp(args?.appId?.replace(/-/g, ' ') as string, 'i')
    );
    expect(appName).toBeInTheDocument();
  } else if (
    args?.iconVariant === 'taskbar' ||
    args?.iconVariant === 'start-menu'
  ) {
    // Test taskbar/start-menu variant: single-click behavior
    await userEvent.click(button);
    expect(args?.onSingleClick).toHaveBeenCalledWith(args?.appId);
    expect(args?.onDoubleClick).not.toHaveBeenCalled();

    // Taskbar variant only shows icon, not name
    const buttonChildren = button.children;
    expect(buttonChildren[0]).toHaveClass('app-icon__image');
  }

  // Test right-click behavior
  if (args?.onRightClick) {
    await userEvent.pointer({ keys: '[MouseRight]', target: button });
    expect(args?.onRightClick).toHaveBeenCalledWith(args?.appId);
  }

  // Verify shape class is applied if provided
  if (args?.shape) {
    expect(button).toHaveClass(args.shape);
  }
};

export const appIconDotPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<AppIconProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // Verify button exists
  expect(button).toBeInTheDocument();

  // Only test dot indicator for taskbar variant
  if (args?.iconVariant !== 'taskbar') {
    // Non-taskbar variants should not have dot indicator
    const dotIndicator = button.querySelector('.app-icon__dot');
    expect(dotIndicator).not.toBeInTheDocument();
    return;
  }

  // For taskbar variant, verify dot indicator exists
  const dotIndicator = button.querySelector('.app-icon__dot');
  expect(dotIndicator).toBeInTheDocument();

  // Verify dot has one of the valid modifier classes
  const dotClassName = dotIndicator?.className || '';
  const validModifiers = [
    'app-icon__dot--hidden',
    'app-icon__dot--unfocused',
    'app-icon__dot--focused',
  ];

  const hasValidModifier = validModifiers.some((modifier) =>
    dotClassName.includes(modifier)
  );
  expect(hasValidModifier).toBe(true);

  // Test specific dot states based on story setup
  if (dotClassName.includes('app-icon__dot--hidden')) {
    // No open windows scenario
    expect(dotIndicator).toHaveClass('app-icon__dot--hidden');
    expect(dotIndicator).not.toHaveClass('app-icon__dot--focused');
    expect(dotIndicator).not.toHaveClass('app-icon__dot--unfocused');
  } else if (dotClassName.includes('app-icon__dot--focused')) {
    // Focused window scenario (highest zIndex)
    expect(dotIndicator).toHaveClass('app-icon__dot--focused');
    expect(dotIndicator).not.toHaveClass('app-icon__dot--hidden');
    expect(dotIndicator).not.toHaveClass('app-icon__dot--unfocused');
  } else if (dotClassName.includes('app-icon__dot--unfocused')) {
    // Unfocused window scenario (window exists but not highest zIndex)
    expect(dotIndicator).toHaveClass('app-icon__dot--unfocused');
    expect(dotIndicator).not.toHaveClass('app-icon__dot--hidden');
    expect(dotIndicator).not.toHaveClass('app-icon__dot--focused');
  }

  // Verify dot is a span element (semantic correctness)
  expect(dotIndicator?.tagName).toBe('SPAN');

  // Verify dot is a child of the button
  expect(button.contains(dotIndicator)).toBe(true);
};

/**
 * Play function for testing AppIcon popup interactions with callback handlers
 * Tests popup visibility, focus callback, and close callback
 */
export const appIconPopupPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<AppIconProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // Verify button exists
  expect(button).toBeInTheDocument();

  // Only test popup for taskbar variant
  if (args?.iconVariant !== 'taskbar') {
    return;
  }

  // Initially, popup should not be visible
  let popupContainer = button.querySelector('.app-icon__popup-container');
  expect(popupContainer).not.toBeInTheDocument();

  // Hover over button to show popup
  await userEvent.hover(button);

  // Wait for popup to appear
  const maxAttempts = 10;
  let attempt = 0;
  while (!popupContainer && attempt < maxAttempts) {
    popupContainer = button.querySelector('.app-icon__popup-container');
    if (!popupContainer) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    attempt++;
  }

  expect(popupContainer).toBeInTheDocument();
  expect(popupContainer).not.toHaveClass('app-icon__popup-container--exiting');

  // Verify popup contains popup items (one per window)
  const popupItems = popupContainer?.querySelectorAll('.active-windows-popup');
  expect(popupItems).toBeTruthy();
  expect((popupItems?.length || 0) > 0).toBe(true);

  // Test first popup item click - should trigger onWindowFocus callback
  const firstPopupItem = popupItems?.[0] as HTMLElement;
  if (firstPopupItem && args?.onWindowFocus) {
    await userEvent.click(firstPopupItem);

    // Verify the callback was called with a window ID
    expect(args.onWindowFocus).toHaveBeenCalled();
    expect(args.onWindowFocus).toHaveBeenCalledWith('vscode-1');
  }

  // Verify unhover behavior
  await userEvent.unhover(button);

  // Popup should start exiting animation
  popupContainer = button.querySelector('.app-icon__popup-container');
  if (popupContainer) {
    expect(popupContainer).toHaveClass('app-icon__popup-container--exiting');
  }

  // Hover again to cancel exit animation
  await userEvent.hover(button);
  popupContainer = button.querySelector('.app-icon__popup-container');
  if (popupContainer) {
    expect(popupContainer).not.toHaveClass(
      'app-icon__popup-container--exiting'
    );
  }

  // Test close button - should trigger onWindowClose callback
  const closeButtons = popupContainer?.querySelectorAll(
    '.active-windows-popup__close-button'
  );
  if (closeButtons && closeButtons.length > 0 && args?.onWindowClose) {
    const firstCloseButton = closeButtons[0] as HTMLElement;
    await userEvent.click(firstCloseButton);

    // Verify the callback was called with a window ID
    expect(args.onWindowClose).toHaveBeenCalled();
    expect(args.onWindowClose).toHaveBeenCalledWith('vscode-1');
  }
};

export default appIconPlayFunction;

export const appIconContextMenuPlayFunction = async ({
  canvasElement,
  args,
}: PlayFunctionProps<AppIconProps>) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // Verify button exists
  expect(button).toBeInTheDocument();

  // Initially, context menu should not be visible
  let contextMenu = canvasElement.querySelector('.rc-menu');
  expect(contextMenu).not.toBeInTheDocument();

  // Right-click the icon to show context menu
  await userEvent.pointer({ keys: '[MouseRight]', target: button });

  // Wait for context menu to appear
  const maxAttempts = 10;
  let attempt = 0;
  while (!contextMenu && attempt < maxAttempts) {
    contextMenu = canvasElement.querySelector('.rc-menu');
    if (!contextMenu) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    attempt++;
  }

  expect(contextMenu).toBeInTheDocument();
  expect(args?.onRightClick).toHaveBeenCalledWith(args?.appId);

  // Verify context menu items exist
  const menuItems = contextMenu?.querySelectorAll('[role="menuitem"]');
  expect(menuItems).toBeTruthy();
  expect((menuItems?.length || 0) > 0).toBe(true);

  // Test clicking a menu item - should trigger onContextMenuItemClick callback
  const firstMenuItem = menuItems?.[0] as HTMLElement;
  if (firstMenuItem && args?.onContextMenuItemClick) {
    await userEvent.click(firstMenuItem);

    // Verify the callback was called with appId, action, and variant
    expect(args.onContextMenuItemClick).toHaveBeenCalled();
    expect(args.onContextMenuItemClick).toHaveBeenCalledWith(
      args.appId,
      'new-window',
      args.iconVariant
    );

    // Verify context menu is closed after selection
    contextMenu = canvasElement.querySelector('.rc-menu');
    expect(contextMenu).not.toBeInTheDocument();
  }

  // Test reopening and closing via Escape key
  await userEvent.pointer({ keys: '[MouseRight]', target: button });

  // Wait for menu to reappear
  attempt = 0;
  contextMenu = null;
  while (!contextMenu && attempt < maxAttempts) {
    contextMenu = canvasElement.querySelector('.rc-menu');
    if (!contextMenu) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    attempt++;
  }

  expect(contextMenu).toBeInTheDocument();

  // Press Escape to close
  await userEvent.keyboard('{Escape}');

  // Verify context menu is closed
  contextMenu = canvasElement.querySelector('.rc-menu');
  expect(contextMenu).not.toBeInTheDocument();

  // Test closing by clicking outside
  await userEvent.pointer({ keys: '[MouseRight]', target: button });

  // Wait for menu to appear
  attempt = 0;
  contextMenu = null;
  while (!contextMenu && attempt < maxAttempts) {
    contextMenu = canvasElement.querySelector('.rc-menu');
    if (!contextMenu) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    attempt++;
  }

  expect(contextMenu).toBeInTheDocument();

  // Click outside the menu (on the document)
  await userEvent.click(document.body);

  // Verify context menu is closed
  contextMenu = canvasElement.querySelector('.rc-menu');
  expect(contextMenu).not.toBeInTheDocument();
};

/* 
 To Do: Test edge cases for ActiveWindowsPopup - 
 1. It shouldn't be open when RightClickMenu is opened
 
 
 */
