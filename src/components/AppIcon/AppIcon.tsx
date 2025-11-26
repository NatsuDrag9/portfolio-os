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
  const { addWindow } = useWorkspaceState();
  const { currentTheme } = useSystemUIState();

  const appMetaData = APP_REGISTRY.find(
    (app) => app.id === appId
  ) as AppMetadata;

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

  return (
    <button
      className={`app-icon ${shape} ${currentTheme}`}
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
    </button>
  );
}

export default AppIcon;
