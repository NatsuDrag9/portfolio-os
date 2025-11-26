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
    expect(buttonChildren.length).toBe(1); // Only image, no span
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

export default appIconPlayFunction;
