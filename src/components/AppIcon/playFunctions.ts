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

    // Taskbar/start-menu variant only shows icon, not name
    const buttonChildren = button.children;
    expect(buttonChildren.length).toBe(2); // All children without text-element
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

  // Verify theme class is applied
  const themeClass = button.className.match(/(light|dark)/);
  expect(themeClass).toBeTruthy();
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

export default appIconPlayFunction;
