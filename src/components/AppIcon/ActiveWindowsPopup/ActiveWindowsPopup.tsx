import { useCallback, type MouseEvent } from 'react';
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
  const getSrcSet = useCallback(() => {
    if (typeof appMetaData?.desktopIcon === 'string') {
      return appMetaData?.mobileIcon &&
        typeof appMetaData.mobileIcon === 'string'
        ? `${appMetaData.mobileIcon} 1x, ${appMetaData.desktopIcon} 2x`
        : appMetaData.desktopIcon;
    }
    return undefined;
  }, [appMetaData.desktopIcon, appMetaData.mobileIcon]);

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

  const renderFluentIconOrImage = () => {
    const isFluentIcon = typeof appMetaData.desktopIcon !== 'string';
    if (isFluentIcon) {
      const AppFluentIcon = appMetaData.desktopIcon;
      return <AppFluentIcon className="active-windows-popup__fluent-icon" />;
    }

    return (
      <img
        src={appMetaData?.desktopIcon as string | undefined}
        className="active-windows-popup__applogo"
        alt={displayTitle}
        srcSet={getSrcSet()}
      />
    );
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
      title={displayTitle}
    >
      {renderFluentIconOrImage()}

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
