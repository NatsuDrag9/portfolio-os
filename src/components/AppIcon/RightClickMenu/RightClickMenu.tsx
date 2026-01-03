import { AppIconVariant } from '@definitions/applicationTypes';
import './RightClickMenu.scss';
import {
  AppIconRightClickActionType,
  AppIconRightClickCondition,
} from '@definitions/desktopTypes';
import { APP_REGISTRY, RIGHT_CLICK_OPTIONS } from '@constants/desktopConstants';
import { useWorkspaceState } from '@store/store';
import { RefObject, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

export interface RightClickMenuProps {
  appId: string;
  iconVariant: AppIconVariant;
  isPinned?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onClick?: (
    appId: string,
    action: AppIconRightClickActionType,
    variant: AppIconVariant
  ) => void;
  anchorElement?: HTMLElement | null;
}

function RightClickMenu({
  appId,
  iconVariant,
  isOpen = false,
  isPinned = false,
  onClose,
  onClick,
  anchorElement,
}: RightClickMenuProps) {
  const { activeWindows } = useWorkspaceState();
  const menuRef = useRef<HTMLDivElement>(null);

  const appMetaData = APP_REGISTRY.find((app) => app.id === appId);

  // Count actual open windows for this app from activeWindows
  // Note: windowInstanceCounters is an ID generator, not a window count
  const openWindowsForApp = activeWindows.filter((w) =>
    w.id?.startsWith(`${appId}-`)
  );
  const instanceCount = openWindowsForApp.length;
  const hasWindows = instanceCount > 0;
  const hasMultipleWindows = instanceCount > 1;

  // Calculate position based on anchor element
  const position = useMemo(() => {
    if (!anchorElement || !isOpen) {
      return { top: 0, left: 0 };
    }

    const rect = anchorElement.getBoundingClientRect();

    // Position based on variant
    if (iconVariant === 'taskbar') {
      // Position above taskbar icon
      return {
        top: rect.top - 70, // Offset above the icon
        left: rect.left + 40, // Offset to the right
      };
    }

    // Position bottom-right for desktop icons
    return {
      top: rect.bottom - 15, // Offset below the icon
      left: rect.right - 15, // Offset to the right
    };
  }, [anchorElement, isOpen, iconVariant]);

  // Close menu when clicking outside
  useClickOutsideModal(
    isOpen,
    onClose || (() => {}),
    menuRef as RefObject<HTMLElement>
  );

  const shouldShowOption = (
    condition?: AppIconRightClickCondition
  ): boolean => {
    if (!condition || condition === 'always') return true;
    if (condition === 'pinned') return isPinned;
    if (condition === 'unpinned') return !isPinned;
    if (condition === 'has-windows') return hasWindows;
    if (condition === 'has-multiple-windows') return hasMultipleWindows;
    return true;
  };

  const handleMenuItemClick = (action: AppIconRightClickActionType) => {
    if (onClick) {
      onClick(appId, action, iconVariant);
    }
  };

  const options = RIGHT_CLICK_OPTIONS[iconVariant];

  const menuContent = (
    <div
      className={`rc-menu ${iconVariant === 'taskbar' ? 'rc-menu--top-right' : 'rc-menu--bottom-right'}`}
      ref={menuRef}
      role="menu"
      tabIndex={0}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {options
        .filter((option) => shouldShowOption(option.showWhen))
        .map((option) => {
          const IconComponent =
            option.iconSource?.type === 'fluent'
              ? option.iconSource.icon
              : null;

          return (
            <div
              key={option.id}
              className={`rc-menu__item ${option.destructive ? 'rc-menu__item--destructive' : ''}`}
              role="menuitem"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                handleMenuItemClick(option.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleMenuItemClick(option.id);
                }
              }}
              title={option.label}
            >
              <span className="rc-menu__item-icon">
                {option.iconSource?.type === 'app-registry' &&
                  appMetaData &&
                  (() => {
                    // Fluent UI icons are React.memo wrapped, so typeof is 'object', not 'function'
                    const isFluentIcon =
                      typeof appMetaData.desktopIcon !== 'string';
                    if (isFluentIcon) {
                      const AppFluentIcon = appMetaData.desktopIcon;
                      return (
                        <AppFluentIcon className="rc-menu__item-app-icon" />
                      );
                    }
                    return (
                      <img
                        src={
                          (appMetaData.mobileIcon as string | undefined) ||
                          (appMetaData.desktopIcon as string)
                        }
                        alt=""
                        className="rc-menu__item-app-icon"
                      />
                    );
                  })()}
                {IconComponent && (
                  <IconComponent className="rc-menu__item-fluent-icon" />
                )}
              </span>
              <span className="rc-menu__item-label">{option.label}</span>
            </div>
          );
        })}
    </div>
  );

  // Render to portal at document body to escape stacking context
  return isOpen ? createPortal(menuContent, document.body) : null;
}

export default RightClickMenu;
