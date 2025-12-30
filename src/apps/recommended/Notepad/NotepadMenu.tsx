import { RefObject, useRef } from 'react';
import { Checkmark16Regular } from '@fluentui/react-icons';
import useClickOutsideModal from '@hooks/useClickOutsideModal';
import './Notepad.scss';

export type NotepadMenuItemCategory = 'file' | 'edit' | 'view';

export interface NotepadMenuItem {
  id: number;
  displayName: string;
  displayShortcut: string;
  category: NotepadMenuItemCategory;
  isAToggle: boolean;
  isDisabled: boolean;
  isToggled?: boolean;
}

export interface NotepadMenuProps {
  menuItems: NotepadMenuItem[];
  isOpen: boolean;
  onClose: (id?: number, category?: NotepadMenuItemCategory) => void;
}

function NotepadMenu({ menuItems, isOpen, onClose }: NotepadMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    onClose(undefined, undefined);
  };

  useClickOutsideModal(
    isOpen,
    handleClickOutside,
    menuRef as RefObject<HTMLElement>
  );

  return (
    <div className="notepad-menu" ref={menuRef}>
      {menuItems.map((menuItem: NotepadMenuItem) => (
        <button
          type="button"
          className={`notepad-menu__item ${menuItem.isDisabled ? 'disabled' : ''}`}
          key={`${menuItem.category}-${menuItem.id}`}
          onClick={() => {
            onClose(menuItem.id, menuItem.category);
          }}
        >
          <>
            <p className="notepad-menu__item-left">
              {menuItem.isAToggle && menuItem.isToggled ? (
                <Checkmark16Regular className="notepad-menu__fluent-icon" />
              ) : (
                <span className="notepad-menu__fluent-icon-placeholder" />
              )}
              <span className="notepad-menu__item-name">
                {menuItem.displayName}
              </span>
            </p>
            <p className="notepad-menu__item-right">
              {menuItem.displayShortcut}
            </p>
          </>
        </button>
      ))}
    </div>
  );
}

export default NotepadMenu;
