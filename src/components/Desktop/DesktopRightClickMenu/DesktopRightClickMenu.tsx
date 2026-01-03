import { RefObject, useRef, useState } from 'react';
import useClickOutsideModal from '@hooks/useClickOutsideModal';
import { useWindowManager } from '@hooks/useWindowManager';
import { DesktopMenuAction } from '@definitions/desktopTypes';
import { DESKTOP_MENU_OPTIONS } from '@constants/desktopConstants';
import './DesktopRightClickMenu.scss';
import { useSettingsState } from '@store/store';

export interface DesktopRightClickMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
}

function DesktopRightClickMenu({
  position,
  onClose,
}: DesktopRightClickMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { launchWindow } = useWindowManager();
  const { setActiveSettingButton } = useSettingsState();

  useClickOutsideModal(true, onClose, menuRef as RefObject<HTMLElement>);

  const handleMenuItemClick = (action: DesktopMenuAction) => {
    switch (action) {
      case 'refresh':
        setIsRefreshing(true);
        // Simulate refresh with opacity transition
        setTimeout(() => {
          setIsRefreshing(false);
          onClose();
        }, 500);
        break;
      case 'settings':
        launchWindow('settings');
        onClose();
        break;
      case 'personalize':
        // Open Settings app (personalization is part of settings)
        setActiveSettingButton('personalization');
        launchWindow('settings');
        onClose();
        break;
      case 'terminal':
        launchWindow('command-prompt');
        onClose();
        break;
      default:
        onClose();
    }
  };

  return (
    <div
      className={`desktop-rc-menu ${isRefreshing ? 'desktop-rc-menu--refreshing' : ''}`}
      ref={menuRef}
      role="menu"
      tabIndex={0}
      style={{ left: position.x, top: position.y }}
    >
      {DESKTOP_MENU_OPTIONS.map((option) => {
        const IconComponent = option.icon;
        return (
          <div
            key={option.id}
            className="desktop-rc-menu__item"
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
            <span className="desktop-rc-menu__item-icon">
              <IconComponent className="desktop-rc-menu__item-fluent-icon" />
            </span>
            <span className="desktop-rc-menu__item-label">{option.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default DesktopRightClickMenu;
