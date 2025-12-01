import { useSystemUIState, useWorkspaceState } from '@store/store';
import './Taskbar.scss';
import { APP_REGISTRY, START_MENU_WINDOWS } from '@constants/desktopConstants';
import {
  Battery0Filled,
  Search12Filled,
  Speaker0Regular,
  Wifi1Regular,
} from '@fluentui/react-icons';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import AppIcon from '@components/AppIcon/AppIcon';
import { AppMetadata } from '@definitions/applicationTypes';
import QuickActionsPopup from './QuickActionsPopup/QuickActionsPopup';
import { logInDev } from '@utils/logUtils';

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function Taskbar() {
  const [searchValue, setSearchValue] = useState('');
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));
  const [currentDate, setCurrentDate] = useState(() => formatDate(new Date()));
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const { taskbarAlignment, isSearchVisible, showMoreIcons } =
    useSystemUIState();
  const {
    taskbarPinnedAppIds,
    addWindow,
    removeWindow,
    activeWindows,
    updateWindowZIndex,
    setWindowIsMaximized,
  } = useWorkspaceState();

  // Update time every minute
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(formatTime(now));
      setCurrentDate(formatDate(now));
    };

    // Calculate ms until next minute
    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Initial sync to minute boundary
    const initialTimeout = setTimeout(() => {
      updateDateTime();
      // Then update every minute
      const interval = setInterval(updateDateTime, 60000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(initialTimeout);
  }, []);

  const srcSet = START_MENU_WINDOWS.mobileIcon
    ? `${START_MENU_WINDOWS.mobileIcon} 1x, ${START_MENU_WINDOWS.desktopIcon} 2x`
    : START_MENU_WINDOWS.desktopIcon;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Launch/add window handler
  const handleWindowLaunch = useCallback(
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

  // Focus window handler - bring to front
  const handleWindowFocus = useCallback(
    (windowId: string) => {
      const maxZIndex = Math.max(...activeWindows.map((w) => w.zIndex), 0);
      updateWindowZIndex(windowId, maxZIndex + 1);
      setWindowIsMaximized(windowId, true);
    },
    [activeWindows, updateWindowZIndex, setWindowIsMaximized]
  );

  // Close window handler
  const handleWindowClose = useCallback(
    (windowId: string) => {
      removeWindow(windowId);
    },
    [removeWindow]
  );

  // Right click handler (placeholder for future context menu)
  const handleRightClick = useCallback(() => {
    // To Do: Add right click functionality for taskbar (settings, task-manager (if possible))
  }, []);

  const handleQuickActionsClick = () => {
    setIsQuickActionsOpen((prev) => !prev);
  };

  const handleQuickActionsClose = () => {
    setIsQuickActionsOpen(false);
  };

  logInDev('Taskbar pinned apps: ', taskbarPinnedAppIds);

  return (
    <div
      className={`taskbar ${taskbarAlignment}`}
      onContextMenu={handleRightClick}
    >
      {/* Windows icon for Start menu */}
      <img
        src={START_MENU_WINDOWS.desktopIcon} // Fallback when srcSet isn't supported
        alt={START_MENU_WINDOWS.name}
        srcSet={srcSet}
        className="taskbar__windows"
      />
      {/* Search bar - hidden for vertical taskbar */}
      {isSearchVisible &&
        (taskbarAlignment === 'top' || taskbarAlignment === 'bottom') && (
          <div className={`taskbar__search-container ${taskbarAlignment}`}>
            <Search12Filled className="taskbar__fluent-icon search-icon" />
            <input
              type="search"
              name="taskbar-search"
              id="taskbar-search"
              onChange={handleSearchChange}
              placeholder="Search"
              value={searchValue}
              className="taskbar__search"
            />
          </div>
        )}
      {/* Taskbar apps container with pinned apps */}
      <div className={`taskbar__apps-container ${taskbarAlignment}`}>
        {taskbarPinnedAppIds.map((id) => {
          logInDev('App id: ', id);

          return (
            <AppIcon
              appId={id}
              iconVariant="taskbar"
              key={id}
              onSingleClick={handleWindowLaunch}
              onWindowFocus={handleWindowFocus}
              onWindowClose={handleWindowClose}
            />
          );
        })}
      </div>
      {/* Right section - static apps and date-time */}
      <div className={`taskbar__right-section ${taskbarAlignment}`}>
        {showMoreIcons && (
          <div
            className={`taskbar__static-apps ${taskbarAlignment}`}
            onClick={handleQuickActionsClick}
          >
            {(taskbarAlignment === 'top' || taskbarAlignment === 'bottom') && (
              <p className="taskbar__text">ENG IN</p>
            )}
            <Wifi1Regular className="taskbar__fluent-icon" />
            <Speaker0Regular className="taskbar__fluent-icon" />
            <Battery0Filled className="taskbar__fluent-icon" />
            {isQuickActionsOpen && (
              <QuickActionsPopup
                isOpen={isQuickActionsOpen}
                onClose={handleQuickActionsClose}
              />
            )}
          </div>
        )}
        <div className={`taskbar__date-time ${taskbarAlignment}`}>
          <p className="taskbar__time">{currentTime}</p>
          <p className="taskbar__date">{currentDate}</p>
        </div>
      </div>
    </div>
  );
}

export default Taskbar;
