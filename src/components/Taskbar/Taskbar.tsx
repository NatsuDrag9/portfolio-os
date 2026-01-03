import { useSystemUIState, useWorkspaceState } from '@store/store';
import './Taskbar.scss';
import { START_MENU_WINDOWS } from '@constants/desktopConstants';
import {
  Battery0Filled,
  Search12Filled,
  Speaker0Regular,
  Wifi1Regular,
  WifiOffRegular,
} from '@fluentui/react-icons';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import AppIcon from '@components/AppIcon/AppIcon';
import QuickActionsPopup from './QuickActionsPopup/QuickActionsPopup';
import { useWindowManager } from '@hooks/useWindowManager';
import { AppIconRightClickActionType } from '@definitions/desktopTypes';
import { AppIconVariant } from '@definitions/applicationTypes';
import { formatDate, formatTime } from './helperFunctions';

function Taskbar() {
  const {
    taskbarAlignment,
    isSearchVisible,
    showMoreIcons,
    setStartMenuOpen,
    startMenuOpen,
    searchValue,
    setSearchValue,
    timeFormat,
    dateFormat,
    autoSyncDateTime,
    timezone,
    activeQuickActions,
  } = useSystemUIState();

  // const [showTaskbarContextMenu, setShowTaskbarContextMenu] = useState(false);
  // const [taskbarContextMenuPosition, setTaskbarContextMenuPosition] = useState({
  //   x: 0,
  //   y: 0,
  // });
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const {
    taskbarPinnedAppIds,
    windowInstanceCounters,
    togglePin,
    activeWindows,
  } = useWorkspaceState();
  const { focusWindow, closeWindow, restoreOrFocusApp, launchWindow } =
    useWindowManager();

  // Combine pinned apps and apps with open windows
  // Use Set to avoid duplicates
  const taskbarAppIds = React.useMemo(() => {
    const appsWithOpenWindows = Object.keys(windowInstanceCounters).filter(
      (appId) => windowInstanceCounters[appId] > 0
    );
    const combined = new Set([...taskbarPinnedAppIds, ...appsWithOpenWindows]);
    return Array.from(combined);
  }, [taskbarPinnedAppIds, windowInstanceCounters]);

  // Update time every minute and when format/timezone changes
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const tz = autoSyncDateTime ? undefined : timezone;
      setCurrentTime(formatTime(now, timeFormat, tz));
      setCurrentDate(formatDate(now, dateFormat, tz));
    };

    // Update immediately when format changes
    updateDateTime();

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
  }, [timeFormat, dateFormat, autoSyncDateTime, timezone]);

  // Global Windows key handler
  useEffect(() => {
    const handleWindowsKeyPress = (event: KeyboardEvent) => {
      // Windows/Meta key press
      if (event.key === 'Meta') {
        event.preventDefault();
        setStartMenuOpen(!setStartMenuOpen);
      }
    };

    window.addEventListener('keydown', handleWindowsKeyPress);
    return () => window.removeEventListener('keydown', handleWindowsKeyPress);
  }, [setStartMenuOpen]);

  const srcSet = START_MENU_WINDOWS.mobileIcon
    ? `${START_MENU_WINDOWS.mobileIcon} 1x, ${START_MENU_WINDOWS.desktopIcon} 2x`
    : START_MENU_WINDOWS.desktopIcon;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Open Start Menu when user starts typing
    if (value.trim() && !startMenuOpen) {
      setStartMenuOpen(true);
    }
  };

  const handleSearchFocus = () => {
    // Open Start Menu when search is focused with content
    if (!startMenuOpen) {
      setStartMenuOpen(true);
    }
  };

  // Right click handler (placeholder for future context menu)
  // To Do: Uncomment when snap animation has been improved
  // const handleTaskbarRightClick = useCallback(
  //   (e: MouseEvent<HTMLDivElement>) => {
  //     // Only show context menu if clicking directly on taskbar background
  //     const target = e.target as HTMLElement;
  //     const isTaskbarBackground = target.classList.contains('taskbar');

  //     if (!isTaskbarBackground) {
  //       logInDev('has taskbar children');
  //       return; // Don't show context menu for child elements
  //     }

  //     logInDev('no taskbar children');

  //     e.preventDefault();
  //     setTaskbarContextMenuPosition({ x: e.clientX, y: e.clientY });
  //     setShowTaskbarContextMenu(true);
  //   },
  //   []
  // );

  const handleQuickActionsClick = () => {
    setIsQuickActionsOpen((prev) => !prev);
  };

  const handleQuickActionsClose = () => {
    setIsQuickActionsOpen(false);
  };

  const handleStartMenuClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Toggle startMenuOpen state when windows-button is clicked
    // Prevent the click from bubbling to useClickOutsideModal
    e.preventDefault();
    setStartMenuOpen(!startMenuOpen);
  };

  // Handle context menu actions from AppIcon
  const handleContextMenuItemClick = useCallback(
    (
      appId: string,
      action: AppIconRightClickActionType,
      _variant: AppIconVariant
    ) => {
      switch (action) {
        case 'new-window':
          // Always launch a new window instance
          launchWindow(appId);
          break;
        case 'pin-to-taskbar':
        case 'unpin-from-taskbar':
          togglePin(appId);
          break;
        case 'close-window':
          // Close the most recently focused window for this app
          {
            const appWindows = activeWindows.filter((w) =>
              w.id?.startsWith(`${appId}-`)
            );
            if (appWindows.length > 0) {
              // Find the window with highest zIndex (most recently focused)
              const mostRecentWindow = appWindows.reduce((prev, current) =>
                current.zIndex > prev.zIndex ? current : prev
              );
              if (mostRecentWindow.id) {
                closeWindow(mostRecentWindow.id);
              }
            }
          }
          break;
        case 'close-all-windows':
          // Close all windows for this app
          {
            const appWindows = activeWindows.filter((w) =>
              w.id?.startsWith(`${appId}-`)
            );
            appWindows.forEach((window) => {
              if (window.id) {
                closeWindow(window.id);
              }
            });
          }
          break;
        case 'properties':
          // Future: Open properties dialog
          break;
      }
    },
    [activeWindows, closeWindow, launchWindow, togglePin]
  );

  return (
    <div
      className={`taskbar ${taskbarAlignment}`}
      // onContextMenu={handleTaskbarRightClick}
    >
      {/* Windows icon for Start menu */}
      <button
        type="button"
        className="taskbar__windows-button"
        onClick={handleStartMenuClick}
        data-start-menu-trigger
        aria-label="Start menu"
      >
        <img
          src={START_MENU_WINDOWS.desktopIcon} // Fallback when srcSet isn't supported
          alt={START_MENU_WINDOWS.name}
          srcSet={srcSet}
          className="taskbar__windows-icon"
        />
      </button>
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
              onFocus={handleSearchFocus}
              placeholder="Search"
              value={searchValue}
              className="taskbar__search"
            />
          </div>
        )}
      {/* Taskbar apps container with pinned apps and open windows */}
      <div className={`taskbar__apps-container ${taskbarAlignment}`}>
        {taskbarAppIds.map((id) => {
          const isPinned = taskbarPinnedAppIds.includes(id);
          return (
            <AppIcon
              appId={id}
              iconVariant="taskbar"
              key={id}
              isPinned={isPinned}
              onSingleClick={restoreOrFocusApp}
              onWindowFocus={focusWindow}
              onWindowClose={closeWindow}
              onContextMenuItemClick={handleContextMenuItemClick}
            />
          );
        })}
      </div>
      {/* Spacer for vertical taskbar alignment */}
      <div className={`taskbar__spacer ${taskbarAlignment}`} />
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
            {activeQuickActions.includes('airplane') ? (
              <WifiOffRegular className="taskbar__fluent-icon" />
            ) : (
              <Wifi1Regular className="taskbar__fluent-icon" />
            )}
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
      {/* To Do: Uncomment after improving snap animation */}
      {/* {showTaskbarContextMenu && (
        <TaskbarRightClickMenu
          position={taskbarContextMenuPosition}
          onClose={() => setShowTaskbarContextMenu(false)}
        />
      )} */}
    </div>
  );
}

export default Taskbar;
