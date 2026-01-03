import { AppIconVariant } from '@definitions/applicationTypes';
import './AppIcon.scss';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { useWorkspaceState } from '@store/store';
import {
  IconShapeType,
  AppIconRightClickActionType,
} from '@definitions/desktopTypes';
import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import ActiveWindowsPopup from './ActiveWindowsPopup/ActiveWindowsPopup';
import RightClickMenu from './RightClickMenu/RightClickMenu';
import {
  getDotModifier,
  getVariantModifiers,
  truncateAppName,
} from './helperFunctions';

const POPUP_UNMOUNT_DELAY = 600; // 0.6s total before unmount

// To Do: Handle touch events for tablet and mobile devices

export interface AppIconProps {
  appId: string;
  iconVariant: AppIconVariant;
  shape?: IconShapeType;
  onSingleClick?: (appId: string) => void;
  onDoubleClick?: (appId: string) => void;
  onRightClick?: (appId: string) => void;
  onWindowFocus?: (windowId: string) => void;
  onWindowClose?: (windowId: string) => void;
  isPinned?: boolean;
  onContextMenuItemClick?: (
    appId: string,
    action: AppIconRightClickActionType,
    variant: AppIconVariant
  ) => void;
}

function AppIcon({
  appId,
  iconVariant,
  shape,
  onSingleClick,
  onDoubleClick,
  onRightClick,
  onWindowFocus,
  onWindowClose,
  isPinned = false,
  onContextMenuItemClick,
}: AppIconProps) {
  const { activeWindows } = useWorkspaceState();
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const unmountTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [iconElement, setIconElement] = useState<HTMLDivElement | null>(null);

  const appMetaData = APP_REGISTRY.find((app) => app.id === appId);

  // Count actual open windows for this app from activeWindows
  // Note: windowInstanceCounters is an ID generator, not a window count
  const openWindowsForApp = activeWindows.filter((w) =>
    w.id?.startsWith(`${appId}-`)
  );
  const instanceCount = openWindowsForApp.length;
  const hasOpenWindows = instanceCount > 0;
  const hasMultipleWindows = instanceCount > 1;

  const handleMouseEnter = () => {
    // Clear any pending unmount when re-entering
    if (unmountTimeoutRef.current) {
      clearTimeout(unmountTimeoutRef.current);
      unmountTimeoutRef.current = null;
    }
    setIsExiting(false);
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    // Start exit animation
    setIsExiting(true);
    // Unmount after delay
    unmountTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
      setIsExiting(false);
    }, POPUP_UNMOUNT_DELAY);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (unmountTimeoutRef.current) {
        clearTimeout(unmountTimeoutRef.current);
      }
    };
  }, []);

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
      if (onSingleClick) {
        onSingleClick(appId);
      }
    }
  };

  const handleDoubleClick = () => {
    // Desktop view in pc
    if (iconVariant === 'desktop') {
      if (onDoubleClick) {
        onDoubleClick(appId);
      }
    }
  };

  const handleRightClick = () => {
    setShowContextMenu(true);
    if (onRightClick) {
      onRightClick(appId);
    }
  };

  const handleRightClickMenuClose = () => {
    setShowContextMenu(false);
  };

  // Check if icon is a component (Fluent UI) or string (image path)
  // Fluent UI icons are React.memo wrapped, so typeof is 'object', not 'function'
  const isFluentIcon =
    appMetaData && typeof appMetaData.desktopIcon !== 'string';
  const FluentIconComponent = isFluentIcon ? appMetaData.desktopIcon : null;

  // Build srcSet: use mobileIcon if available, otherwise use desktopIcon (only for string icons)
  const srcSet =
    !isFluentIcon && appMetaData?.mobileIcon
      ? `${appMetaData.mobileIcon} 1x, ${appMetaData.desktopIcon} 2x`
      : !isFluentIcon
        ? (appMetaData?.desktopIcon as string)
        : undefined;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (iconVariant === 'desktop') {
        handleDoubleClick();
        return;
      }
      handleSingleClick();
    }
  };

  if (!appMetaData) {
    return null;
  }

  return (
    <div
      ref={setIconElement}
      className={`app-icon ${shape} ${getVariantModifiers(iconVariant, hasMultipleWindows, Boolean(isThisAppFocused))}`}
      role="button"
      tabIndex={0}
      onDoubleClick={handleDoubleClick}
      onClick={handleSingleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={handleRightClick}
      title={appMetaData.appName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {FluentIconComponent ? (
        <FluentIconComponent className="app-icon__image app-icon__image--fluent" />
      ) : (
        <img
          srcSet={srcSet}
          src={appMetaData.desktopIcon as string}
          className="app-icon__image"
          alt={appMetaData.appName}
        />
      )}
      {iconVariant !== 'taskbar' && (
        <span className="app-icon__name">
          {truncateAppName(appMetaData.appName, iconVariant)}
        </span>
      )}

      {iconVariant === 'taskbar' && (
        <>
          <span
            className={`app-icon__dot ${getDotModifier(hasOpenWindows, Boolean(isThisAppFocused))}`}
          ></span>

          {showPopup && hasOpenWindows && !showContextMenu && (
            <div
              className={`app-icon__popup-container ${isExiting ? 'app-icon__popup-container--exiting' : ''}`}
            >
              {activeWindows
                .filter((w) => w.id?.startsWith(`${appId}-`))
                .map((windowData) => (
                  <ActiveWindowsPopup
                    key={windowData.id}
                    windowData={windowData}
                    appId={appId}
                    onFocus={onWindowFocus}
                    onClose={onWindowClose}
                  />
                ))}
            </div>
          )}
        </>
      )}

      {showContextMenu && (
        <RightClickMenu
          appId={appId}
          iconVariant={iconVariant}
          isPinned={isPinned}
          onClick={(
            appId: string,
            action: AppIconRightClickActionType,
            variant: AppIconVariant
          ) => {
            if (onContextMenuItemClick) {
              onContextMenuItemClick(appId, action, variant);
            }
            handleRightClickMenuClose();
          }}
          isOpen={showContextMenu}
          onClose={handleRightClickMenuClose}
          anchorElement={iconElement}
        />
      )}
    </div>
  );
}

export default AppIcon;
