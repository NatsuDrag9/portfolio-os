import { RefObject, useRef, useMemo } from 'react';
import useClickOutsideModal from '@hooks/useClickOutsideModal';
import { useWindowManager } from '@hooks/useWindowManager';
import { useSystemUIState } from '@store/store';
import { TaskbarMenuAction } from '@definitions/desktopTypes';
import { TASKBAR_MENU_OPTIONS } from '@constants/desktopConstants';
import './TaskbarRightClickMenu.scss';
import { logInDev } from '@utils/logUtils';

export interface TaskbarRightClickMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
}

function TaskbarRightClickMenu({
  position,
  onClose,
}: TaskbarRightClickMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { launchWindow } = useWindowManager();
  const { taskbarAlignment, updateTaskbarAlignment } = useSystemUIState();

  useClickOutsideModal(true, onClose, menuRef as RefObject<HTMLElement>);

  const menuStyle = useMemo(() => {
    switch (taskbarAlignment) {
      case 'bottom':
        return {
          left: `${position.x}px`,
          // bottom: `calc(100% - ${position.y}px)`,
          bottom: '0',
          transform: 'translateY(-50%)',
        };
      case 'top':
        return {
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translateY(0)',
        };
      case 'left':
        return {
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translateX(0)',
        };
      case 'right':
        return {
          right: '7.5rem',
          top: `${position.y}px`,
          transform: 'translateY(-50%)',
        };
      default:
        return {
          left: `${position.x}px`,
          bottom: `calc(100% - ${position.y}px)`,
          transform: 'translateY(-55%)',
        };
    }
  }, [taskbarAlignment, position.x, position.y]);

  logInDev('Menu style: ', menuStyle);

  const handleMenuItemClick = (action: TaskbarMenuAction) => {
    switch (action) {
      case 'settings':
        launchWindow('settings');
        onClose();
        break;
      case 'right':
        updateTaskbarAlignment('right');
        onClose();
        break;
      case 'bottom':
        updateTaskbarAlignment('bottom');
        onClose();
        break;
      case 'top':
        updateTaskbarAlignment('top');
        onClose();
        break;
      case 'left':
        updateTaskbarAlignment('left');
        onClose();
        break;
      default:
        onClose();
    }
  };

  return (
    <div
      className="taskbar-rc-menu"
      ref={menuRef}
      role="menu"
      tabIndex={0}
      style={menuStyle}
    >
      {TASKBAR_MENU_OPTIONS.filter(
        (option) => option.id !== taskbarAlignment
      ).map((option) => {
        const IconComponent = option.icon;
        return (
          <div
            key={option.id}
            className="taskbar-rc-menu__item"
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
            <span className="taskbar-rc-menu__item-icon">
              <IconComponent className="taskbar-rc-menu__item-fluent-icon" />
            </span>
            <span className="taskbar-rc-menu__item-label">{option.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default TaskbarRightClickMenu;
