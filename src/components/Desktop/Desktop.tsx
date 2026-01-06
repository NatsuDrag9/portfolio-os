import { APP_REGISTRY } from '@constants/desktopConstants';
import './Desktop.scss';
import { Rnd, DraggableData } from 'react-rnd';
import AppIcon from '@components/AppIcon/AppIcon';
import { useWorkspaceState } from '@store/store';
import { AppIconRightClickActionType } from '@definitions/desktopTypes';
import { AppIconVariant } from '@definitions/applicationTypes';
import {
  useState,
  useCallback,
  useRef,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import DesktopRightClickMenu from './DesktopRightClickMenu/DesktopRightClickMenu';
import {
  IconPosition,
  gridToPixel,
  pixelToGrid,
  findNearestAvailablePosition,
  getInitialIconPositions,
} from './helperFunctions';
import {
  GRID_CELL_HEIGHT,
  GRID_CELL_WIDTH,
  GRID_ROWS,
} from '@constants/desktopConstants';
import { isDevMode } from '@utils/logUtils';
import { useWindowManager } from '@hooks/useWindowManager';

function Desktop() {
  const [showDesktopContextMenu, setShowDesktopContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [iconPositions, setIconPositions] = useState<
    Record<string, IconPosition>
  >(() => getInitialIconPositions(APP_REGISTRY.map((app) => app.id)));

  const desktopRef = useRef<HTMLDivElement>(null);
  const { taskbarPinnedAppIds, togglePin, activeBackground } =
    useWorkspaceState();
  const { launchWindow } = useWindowManager();
  const isMobile = useMediaQuery('(max-width: 819px)');

  // Handle drag stop - snap to grid
  const handleDragStop = useCallback((appId: string, d: DraggableData) => {
    const { gridX, gridY } = pixelToGrid(d.x, d.y);
    const clampedY = Math.max(0, Math.min(GRID_ROWS - 1, gridY));
    const clampedX = Math.max(0, gridX);

    setIconPositions((prev) => {
      const availablePos = findNearestAvailablePosition(
        clampedX,
        clampedY,
        appId,
        prev
      );
      return {
        ...prev,
        [appId]: availablePos,
      };
    });
  }, []);

  // Handle app context menu actions
  const handleAppContextMenuClick = useCallback(
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
        case 'properties':
          break;
      }
    },
    [launchWindow, togglePin]
  );

  // Handle desktop right-click
  const handleDesktopRightClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // Only show context menu if clicking on the desktop background or icons container in dev mode
      const target = e.target as HTMLElement;
      if (isDevMode()) {
        const isDesktopBackground =
          target === desktopRef.current ||
          target.classList.contains('desktop__icons-container');

        if (isDesktopBackground) {
          e.preventDefault();
          setContextMenuPosition({ x: e.clientX, y: e.clientY });
          setShowDesktopContextMenu(true);
          setSelectedAppId(null);
        }
        // Don't prevent default for other elements - allows browser inspect on icons in dev mode
        return;
      }

      // Production
      setContextMenuPosition({ x: e.clientX, y: e.clientY });
      setShowDesktopContextMenu(true);
      setSelectedAppId(null);
    },
    []
  );

  // Handle single click on desktop background - deselect
  const handleDesktopClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget || e.target === desktopRef.current) {
      setSelectedAppId(null);
      setShowDesktopContextMenu(false);
    }
  }, []);

  // Handle single click on app icon - select it
  const handleAppSingleClick = useCallback((appId: string) => {
    setSelectedAppId(appId);
    setShowDesktopContextMenu(false);
  }, []);

  // Handle double click on app icon - open window
  const handleAppDoubleClick = useCallback(
    (appId: string) => {
      launchWindow(appId);
    },
    [launchWindow]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const totalApps = APP_REGISTRY.length;
      if (totalApps === 0) return;

      // If no icon is focused yet, start with the first icon on arrow key press
      if (focusedIndex === -1) {
        if (
          ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)
        ) {
          e.preventDefault();
          setFocusedIndex(0);
          setSelectedAppId(APP_REGISTRY[0].id);
        }
        return;
      }

      const currentPos = iconPositions[APP_REGISTRY[focusedIndex]?.id];
      if (!currentPos) return;

      let newIndex = focusedIndex;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          // Move up in the same column
          if (currentPos.gridY > 0) {
            // Find app at position above
            const targetAppId = Object.entries(iconPositions).find(
              ([_, pos]) =>
                pos.gridX === currentPos.gridX &&
                pos.gridY === currentPos.gridY - 1
            )?.[0];
            if (targetAppId) {
              newIndex = APP_REGISTRY.findIndex(
                (app) => app.id === targetAppId
              );
            }
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          // Move down in the same column
          if (currentPos.gridY < GRID_ROWS - 1) {
            const targetAppId = Object.entries(iconPositions).find(
              ([_, pos]) =>
                pos.gridX === currentPos.gridX &&
                pos.gridY === currentPos.gridY + 1
            )?.[0];
            if (targetAppId) {
              newIndex = APP_REGISTRY.findIndex(
                (app) => app.id === targetAppId
              );
            }
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Move to previous column
          if (currentPos.gridX > 0) {
            const targetAppId = Object.entries(iconPositions).find(
              ([_, pos]) =>
                pos.gridX === currentPos.gridX - 1 &&
                pos.gridY === currentPos.gridY
            )?.[0];
            if (targetAppId) {
              newIndex = APP_REGISTRY.findIndex(
                (app) => app.id === targetAppId
              );
            }
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Move to next column
          {
            const targetAppId = Object.entries(iconPositions).find(
              ([_, pos]) =>
                pos.gridX === currentPos.gridX + 1 &&
                pos.gridY === currentPos.gridY
            )?.[0];
            if (targetAppId) {
              newIndex = APP_REGISTRY.findIndex(
                (app) => app.id === targetAppId
              );
            }
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          // Open the focused app
          if (APP_REGISTRY[focusedIndex]) {
            handleAppDoubleClick(APP_REGISTRY[focusedIndex].id);
          }
          break;
        case 'Escape':
          setSelectedAppId(null);
          setShowDesktopContextMenu(false);
          break;
      }

      if (newIndex !== focusedIndex && newIndex >= 0 && newIndex < totalApps) {
        setFocusedIndex(newIndex);
        setSelectedAppId(APP_REGISTRY[newIndex].id);
      }
    },
    [focusedIndex, iconPositions, handleAppDoubleClick]
  );

  return (
    <div
      ref={desktopRef}
      className="desktop"
      style={{ backgroundImage: `url(${activeBackground})` }}
      onContextMenu={handleDesktopRightClick}
      onClick={handleDesktopClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="grid"
      aria-label="Desktop"
    >
      {!isMobile && (
        <div className="desktop__icons-container">
          {APP_REGISTRY.map((app, index) => {
            const isAppPinned = taskbarPinnedAppIds.includes(app.id);
            const isSelected = selectedAppId === app.id;
            const isFocused = focusedIndex === index;
            const position = iconPositions[app.id] || {
              gridX: 0,
              gridY: index,
            };
            const pixelPos = gridToPixel(position.gridX, position.gridY);

            return (
              <Rnd
                key={app.id}
                position={{ x: pixelPos.x, y: pixelPos.y }}
                size={{ width: GRID_CELL_WIDTH, height: GRID_CELL_HEIGHT }}
                enableResizing={false}
                bounds="parent"
                dragGrid={[GRID_CELL_WIDTH, GRID_CELL_HEIGHT]}
                onDragStop={(_e, d) => handleDragStop(app.id, d)}
                className={`desktop__icon-wrapper ${isSelected ? 'desktop__icon-wrapper--selected' : ''} ${isFocused ? 'desktop__icon-wrapper--focused' : ''}`}
              >
                <AppIcon
                  appId={app.id}
                  iconVariant="desktop"
                  isPinned={isAppPinned}
                  onSingleClick={handleAppSingleClick}
                  onDoubleClick={handleAppDoubleClick}
                  onContextMenuItemClick={handleAppContextMenuClick}
                />
              </Rnd>
            );
          })}
        </div>
      )}

      {showDesktopContextMenu && (
        <DesktopRightClickMenu
          position={contextMenuPosition}
          onClose={() => {
            setShowDesktopContextMenu(false);
          }}
        />
      )}
    </div>
  );
}

export default Desktop;
