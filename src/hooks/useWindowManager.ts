import {
  FIREFOX_LINK,
  GITHUB_LINK,
  GOOGLE_CHROME_LINK,
  PORTFOLIO_LINK,
} from '@constants/appConstants';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { AppMetadata } from '@definitions/applicationTypes';
import { useWorkspaceState } from '@store/store';
import { useCallback } from 'react';

export const useWindowManager = () => {
  const {
    addWindow,
    requestCloseWindow,
    updateWindowZIndex,
    activeWindows,
    setWindowIsMaximized,
  } = useWorkspaceState();

  const launchWindow = useCallback(
    (appId: string) => {
      // Handle apps that should open in new tabs instead of windows
      if (appId === 'google-chrome') {
        window.open(GOOGLE_CHROME_LINK, '_blank', 'noopener,noreferrer');
        return;
      }
      if (appId === 'firefox') {
        window.open(FIREFOX_LINK, '_blank', 'noopener,noreferrer');
        return;
      }
      if (appId === 'github') {
        window.open(GITHUB_LINK, '_blank', 'noopener,noreferrer');
        return;
      }
      if (appId === 'portfolio') {
        window.open(PORTFOLIO_LINK, '_blank', 'noopener,noreferrer');
        return;
      }

      const appMetaData = APP_REGISTRY.find(
        (app) => app.id === appId
      ) as AppMetadata;
      if (appMetaData) {
        addWindow(appId, appMetaData);
      }
    },
    [addWindow]
  );

  // Focus window and restore if minimized
  const focusWindow = useCallback(
    (windowId: string) => {
      const window = activeWindows.find((w) => w.id === windowId);
      if (!window) return;

      // Bring to front
      const maxZIndex = Math.max(...activeWindows.map((w) => w.zIndex), 0);
      updateWindowZIndex(windowId, maxZIndex + 1);

      // If minimized, restore to previous state
      if (window.isMaximized === 'minimized') {
        setWindowIsMaximized(windowId, window.previousDisplayState);
      }
    },
    [activeWindows, setWindowIsMaximized, updateWindowZIndex]
  );

  const closeWindow = useCallback(
    (windowId: string) => {
      requestCloseWindow(windowId);
    },
    [requestCloseWindow]
  );

  // Restore or focus a single window for an app (used by taskbar click)
  const restoreOrFocusApp = useCallback(
    (appId: string) => {
      const appWindows = activeWindows.filter((w) =>
        w.id?.startsWith(`${appId}-`)
      );

      if (appWindows.length === 0) {
        // No windows open, launch new
        launchWindow(appId);
        return;
      }

      if (appWindows.length === 1) {
        // Single window - focus/restore it
        const window = appWindows[0];
        if (window.id) {
          focusWindow(window.id);
        }
      }
      // Multiple windows - handled by popup, do nothing here
    },
    [activeWindows, focusWindow, launchWindow]
  );

  return {
    launchWindow,
    focusWindow,
    closeWindow,
    restoreOrFocusApp,
  };
};
