import { AppIconVariant } from '@definitions/applicationTypes';
import './AppIcon.scss';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { useWorkspaceState } from '@store/store';
import { IconShapeType } from '@definitions/desktopTypes';
import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import ActiveWindowsPopup from './ActiveWindowsPopup/ActiveWindowsPopup';

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
}: AppIconProps) {
  const { activeWindows, windowInstanceCounters } = useWorkspaceState();
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const unmountTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appMetaData = APP_REGISTRY.find((app) => app.id === appId);

  // Get window instance count for this app from the store
  const instanceCount = windowInstanceCounters[appId] || 0;
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
    if (onRightClick) {
      onRightClick(appId);
    }
  };

  // Build srcSet: use mobileIcon if available, otherwise use desktopIcon
  const srcSet = appMetaData?.mobileIcon
    ? `${appMetaData.mobileIcon} 1x, ${appMetaData.desktopIcon} 2x`
    : appMetaData?.desktopIcon;

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
      className={`app-icon ${shape} ${getTaskbarModifiers()}`}
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
        <>
          <span className={`app-icon__dot ${getDotModifier()}`}></span>

          {showPopup && hasOpenWindows && (
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
    </div>
  );
}

export default AppIcon;
