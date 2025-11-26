import { AppIconVariant, AppMetadata } from '@definitions/applicationTypes';
import './AppIcon.scss';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { useSystemUIState, useWorkspaceState } from '@store/store';
import { IconShapeType } from '@definitions/desktopTypes';

export interface AppIconProps {
  appId: string;
  iconVariant: AppIconVariant;
  shape?: IconShapeType;
  onSingleClick?: (appId: string) => void;
  onDoubleClick?: (appId: string) => void;
  onRightClick?: (appId: string) => void;
}

function AppIcon({
  appId,
  iconVariant,
  shape,
  onSingleClick,
  onDoubleClick,
  onRightClick,
}: AppIconProps) {
  const { addWindow, activeWindows, windowInstanceCounters } =
    useWorkspaceState();
  const { currentTheme } = useSystemUIState();

  const appMetaData = APP_REGISTRY.find(
    (app) => app.id === appId
  ) as AppMetadata;

  // Get window instance count for this app from the store
  const instanceCount = windowInstanceCounters[appId] || 0;
  const hasOpenWindows = instanceCount > 0;
  const hasMultipleWindows = instanceCount > 1;

  // Find the focused window (highest zIndex) and check if it belongs to this app
  const focusedWindow =
    activeWindows.length > 0
      ? activeWindows.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current
        )
      : null;
  const isThisAppFocused =
    (focusedWindow?.id?.startsWith(`${appId}-`) && focusedWindow.isMaximized) ??
    false;

  const handleSingleClick = () => {
    // Taskbar, start menu and mobile touch
    if (iconVariant !== 'desktop') {
      addWindow(appId, appMetaData);

      if (onSingleClick) {
        onSingleClick(appId);
      }
    }
  };

  const handleDoubleClick = () => {
    // Desktop view in pc
    if (iconVariant === 'desktop') {
      addWindow(appId, appMetaData);

      if (onDoubleClick) {
        onDoubleClick(appId);
      }
    }
  };

  const handleRightClick = () => {
    if (onRightClick) {
      onRightClick(appId);
    }
  };

  // Build srcSet: use mobileIcon if available, otherwise use desktopIcon
  const srcSet = appMetaData.mobileIcon
    ? `${appMetaData.mobileIcon} 1x, ${appMetaData.desktopIcon} 2x`
    : appMetaData.desktopIcon;

  // Build dot class for taskbar indicator
  const getDotModifier = () => {
    if (!hasOpenWindows) return 'app-icon__dot--hidden';
    return isThisAppFocused
      ? 'app-icon__dot--focused'
      : 'app-icon__dot--unfocused';
  };

  // Build button class - add modifiers for taskbar states
  const getTaskbarModifiers = () => {
    if (iconVariant !== 'taskbar') return '';
    const classes = [];
    if (hasMultipleWindows) classes.push('app-icon--multiple-windows');
    if (isThisAppFocused) classes.push('app-icon--taskbar-focused');
    return classes.join(' ');
  };

  return (
    <button
      className={`app-icon ${shape} ${currentTheme} ${getTaskbarModifiers()}`}
      type="button"
      onDoubleClick={handleDoubleClick}
      onClick={handleSingleClick}
      onContextMenu={handleRightClick}
      title={appMetaData.appName}
    >
      <img
        srcSet={srcSet}
        src={appMetaData.desktopIcon} // Fallback when srcSet isn't supported like in old browsers
        className="app-icon__image"
        alt={appMetaData.appName}
      />
      {iconVariant !== 'taskbar' && (
        <span className="app-icon__name">{appMetaData.appName}</span>
      )}

      {iconVariant === 'taskbar' && (
        <span className={`app-icon__dot ${getDotModifier()}`}></span>
      )}
    </button>
  );
}

export default AppIcon;
