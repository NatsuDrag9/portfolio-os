import { APP_REGISTRY } from '@constants/desktopConstants';
import { AppMetadata } from '@definitions/applicationTypes';
import { useWorkspaceState } from '@store/store';
import { useCallback } from 'react';

export const useWindowManager = () => {
  const {
    addWindow,
    removeWindow,
    updateWindowZIndex,
    activeWindows,
    setWindowIsMaximized,
  } = useWorkspaceState();

  const launchWindow = useCallback(
    (appId: string) => {
      const appMetaData = APP_REGISTRY.find(
        (app) => app.id === appId
      ) as AppMetadata;
      if (appMetaData) {
        addWindow(appId, appMetaData);
      }
    },
    [addWindow]
  );

  const focusWindow = useCallback(
    (windowId: string) => {
      const maxZIndex = Math.max(...activeWindows.map((w) => w.zIndex), 0);
      updateWindowZIndex(windowId, maxZIndex + 1);
      setWindowIsMaximized(windowId, true);
    },
    [activeWindows, setWindowIsMaximized, updateWindowZIndex]
  );

  const closeWindow = useCallback(
    (windowId: string) => {
      removeWindow(windowId);
    },
    [removeWindow]
  );

  return {
    launchWindow,
    focusWindow,
    closeWindow,
  };
};
