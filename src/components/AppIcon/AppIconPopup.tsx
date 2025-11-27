import type { MouseEvent } from 'react';
import './AppIcon';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { AppMetadata, WindowData } from '@definitions/applicationTypes';
import { DismissRegular } from '@fluentui/react-icons';
import { useWorkspaceState } from '@store/store';

export interface AppIconPopupProps {
  windowData: WindowData;
  appId: string;
}

function AppIconPopup({ windowData, appId }: AppIconPopupProps) {
  const {
    removeWindow,
    activeWindows,
    updateWindowZIndex,
    setWindowIsMaximized,
  } = useWorkspaceState();

  const appMetaData = APP_REGISTRY.find(
    (app) => app.id === appId
  ) as AppMetadata;

  // Build srcSet: use mobileIcon if available, otherwise use desktopIcon
  const srcSet = appMetaData?.mobileIcon
    ? `${appMetaData.mobileIcon} 1x, ${appMetaData.desktopIcon} 2x`
    : appMetaData?.desktopIcon;

  // Use window title from windowData, fallback to app name
  const displayTitle = windowData.title || appMetaData?.appName || 'Window';

  const handleCloseClick = (e: MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    if (windowData.id) {
      removeWindow(windowData.id);
    }
  };

  // Bring window to focus: set zIndex to max + 1 and maximize it
  const handlePopupClick = () => {
    if (windowData.id) {
      const maxZIndex = Math.max(...activeWindows.map((w) => w.zIndex), 0);
      updateWindowZIndex(windowData.id, maxZIndex + 1);
      setWindowIsMaximized(windowData.id, true);
    }
  };

  return (
    <div
      className="app-icon-popup"
      onClick={handlePopupClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handlePopupClick();
      }}
      role="button"
      tabIndex={0}
    >
      <img
        srcSet={srcSet}
        src={appMetaData?.desktopIcon}
        className="app-icon-popup__applogo"
        alt={displayTitle}
      />
      <p className="app-icon-popup__appname">{displayTitle}</p>
      <button
        type="button"
        title="Close"
        className="app-icon-popup__close-button"
        onClick={handleCloseClick}
      >
        <DismissRegular className="close-image" />
      </button>
    </div>
  );
}

export default AppIconPopup;
