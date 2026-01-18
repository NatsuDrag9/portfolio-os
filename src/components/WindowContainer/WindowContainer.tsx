import { ReactNode, useMemo, useEffect, useState } from 'react';
import './WindowContainer.scss';
import { useWorkspaceState } from '@store/store';
import { WindowDisplayType } from '@definitions/applicationTypes';
import {
  DismissRegular,
  SquareMultipleRegular,
  SubtractRegular,
} from '@fluentui/react-icons';
import { Rnd } from 'react-rnd';
import { useMediaQuery } from '@hooks/useMediaQuery';

export interface WindowContainerProps {
  children: ReactNode;
  windowId: string;
}

function WindowContainer({ children, windowId }: WindowContainerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isMobileView = useMediaQuery('(max-width: 819px)');

  const {
    activeWindows,
    setWindowIsMaximized,
    requestCloseWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWorkspaceState();

  const windowData = useMemo(
    () => activeWindows.find((w) => w.id === windowId),
    [activeWindows, windowId]
  );

  const handleWindowDisplayClick = (displayType: WindowDisplayType) => {
    if (displayType === 'maximized') {
      const newState =
        windowData?.isMaximized === 'maximized' ? 'normal' : 'maximized';
      setWindowIsMaximized(windowId, newState);
      return;
    }
    // For minimized and normal
    setWindowIsMaximized(windowId, displayType);
  };

  const handleCloseClick = () => {
    requestCloseWindow(windowId);
  };

  // Fade-in animation on mount
  useEffect(() => {
    // Use requestAnimationFrame to ensure the DOM has rendered before applying the fade-in
    const rafId = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Derive visibility from mounted state and isClosing flag
  const isVisible = isMounted && !windowData?.isClosing;

  const isMaximized = windowData?.isMaximized === 'maximized';
  const isMinimized = windowData?.isMaximized === 'minimized';

  // Default position centered in viewport
  const defaultX = windowData?.position?.x ?? 50;
  const defaultY = windowData?.position?.y ?? 50;
  const defaultWidth = windowData?.size?.width ?? 450;
  const defaultHeight = windowData?.size?.height ?? 300;

  // Taskbar height in pixels (5.0rem = 50px at 10px base)
  // const TASKBAR_HEIGHT = 45;

  const isMobileFullscreen = isMobileView || isMaximized;

  return (
    <Rnd
      position={{
        x: isMobileFullscreen ? 0 : defaultX,
        y: isMobileFullscreen ? 0 : defaultY,
      }}
      size={{
        width: isMobileFullscreen ? '100%' : defaultWidth,
        height: isMobileFullscreen ? '100%' : defaultHeight,
      }}
      minWidth={isMobileFullscreen ? 0 : 600}
      minHeight={isMobileFullscreen ? 0 : 400}
      bounds="parent"
      onDragStop={(_e, d) => {
        updateWindowPosition(windowId, d.x, d.y);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        updateWindowSize(windowId, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(windowId, position.x, position.y);
      }}
      disableDragging={isMobileFullscreen}
      enableResizing={!isMobileFullscreen}
      enableUserSelectHack={false}
      dragHandleClassName="window-container__top"
      className={`window-container window-container--${windowData?.isMaximized} ${isVisible ? 'window-container--visible' : 'window-container--hidden'}`}
      style={{
        zIndex: windowData?.zIndex,
        visibility: isMinimized ? 'hidden' : 'visible',
        borderRadius: isMobileView ? '0' : undefined,
      }}
    >
      <div className="window-container__top">
        <h5 className="window-container__title">
          {windowData?.title ?? 'Untitled'}
        </h5>
        <div className="window-container__window-buttons">
          {!isMobileView && (
            <>
              <button
                type="button"
                className="window-container__button minimize"
                onClick={() => handleWindowDisplayClick('minimized')}
              >
                <SubtractRegular className="window-container__fluent-icon" />
              </button>
              <button
                type="button"
                className="window-container__button maximize"
                onClick={() => handleWindowDisplayClick('maximized')}
              >
                <SquareMultipleRegular className="window-container__fluent-icon" />
              </button>
            </>
          )}
          <button
            type="button"
            className="window-container__button close"
            onClick={handleCloseClick}
          >
            <DismissRegular className="window-container__fluent-icon" />
          </button>
        </div>
      </div>

      <div className="window-container__paint">{children}</div>
    </Rnd>
  );
}

export default WindowContainer;
