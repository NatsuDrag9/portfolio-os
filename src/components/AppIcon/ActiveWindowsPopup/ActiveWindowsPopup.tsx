import type { MouseEvent } from 'react';
import './ActiveWindowsPopup.scss';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { AppMetadata, WindowData } from '@definitions/applicationTypes';
import { DismissRegular } from '@fluentui/react-icons';

export interface ActiveWindowsPopupProps {
  windowData: WindowData;
  appId: string;
  onFocus?: (windowId: string) => void;
  onClose?: (windowId: string) => void;
}

function ActiveWindowsPopup({
  windowData,
  appId,
  onFocus,
  onClose,
}: ActiveWindowsPopupProps) {
  const appMetaData = APP_REGISTRY.find(
    (app) => app.id === appId
  ) as AppMetadata;

  // Build srcSet: use mobileIcon if available, otherwise use desktopIcon
  const srcSet = appMetaData?.mobileIcon
    ? `${appMetaData.mobileIcon} 1x, ${appMetaData.desktopIcon} 2x`
    : appMetaData?.desktopIcon;

  // Use window title from windowData, fallback to app name
  const displayTitle = windowData.title || appMetaData?.appName || 'Window';

  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    e.preventDefault(); // Prevent default button behavior
    if (windowData.id && onClose) {
      onClose(windowData.id);
    }
  };

  // Bring window to focus: delegate to parent handler
  const handlePopupClick = () => {
    if (windowData.id && onFocus) {
      onFocus(windowData.id);
    }
  };

  return (
    <div
      className="active-windows-popup"
      onClick={handlePopupClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePopupClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <img
        srcSet={srcSet}
        src={appMetaData?.desktopIcon}
        className="active-windows-popup__applogo"
        alt={displayTitle}
      />
      <p className="active-windows-popup__appname">{displayTitle}</p>
      <button
        type="button"
        title="Close"
        className="active-windows-popup__close-button"
        onClick={handleCloseClick}
        onMouseDown={(e) => e.stopPropagation()} // Prevent parent :active state
        onTouchStart={(e) => e.stopPropagation()} // Prevent parent :active state on touch
      >
        <DismissRegular className="close-image" />
      </button>
    </div>
  );
}

export default ActiveWindowsPopup;
