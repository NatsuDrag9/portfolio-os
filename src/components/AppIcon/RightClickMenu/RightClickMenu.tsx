import { AppIconVariant } from '@definitions/applicationTypes';
import './RightClickMenu.scss';
import {
  RightClickActionType,
  RightClickCondition,
} from '@definitions/desktopTypes';
import { APP_REGISTRY, RIGHT_CLICK_OPTIONS } from '@constants/desktopConstants';
import { useWorkspaceState } from '@store/store';
import { RefObject, useRef } from 'react';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

export interface RightClickMenuProps {
  appId: string;
  iconVariant: AppIconVariant;
  isPinned?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onClick?: (
    appId: string,
    action: RightClickActionType,
    variant: AppIconVariant
  ) => void;
}

function RightClickMenu({
  appId,
  iconVariant,
  isOpen = false,
  isPinned = false,
  onClose,
  onClick,
}: RightClickMenuProps) {
  const { windowInstanceCounters } = useWorkspaceState();
  const menuRef = useRef<HTMLDivElement>(null);

  const appMetaData = APP_REGISTRY.find((app) => app.id === appId);
  const instanceCount = windowInstanceCounters[appId] || 0;
  const hasWindows = instanceCount > 0;
  const hasMultipleWindows = instanceCount > 1;

  // Close menu when clicking outside
  useClickOutsideModal(
    isOpen,
    onClose || (() => {}),
    menuRef as RefObject<HTMLElement>
  );

  const shouldShowOption = (condition?: RightClickCondition): boolean => {
    if (!condition || condition === 'always') return true;
    if (condition === 'pinned') return isPinned;
    if (condition === 'unpinned') return !isPinned;
    if (condition === 'has-windows') return hasWindows;
    if (condition === 'has-multiple-windows') return hasMultipleWindows;
    return true;
  };

  const handleMenuItemClick = (action: RightClickActionType) => {
    if (onClick) {
      onClick(appId, action, iconVariant);
    }
  };

  const options = RIGHT_CLICK_OPTIONS[iconVariant];

  return (
    <div
      className={`rc-menu ${iconVariant === 'taskbar' ? 'rc-menu--top-right' : 'rc-menu--bottom-right'}`}
      ref={menuRef}
      role="menu"
      tabIndex={0}
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
              onClick={() => handleMenuItemClick(option.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleMenuItemClick(option.id);
                }
              }}
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
}

export default RightClickMenu;
