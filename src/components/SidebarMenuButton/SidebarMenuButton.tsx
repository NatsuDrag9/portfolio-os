import { ComponentType } from 'react';
import './SidebarMenuButton.scss';

export interface SidebarMenuButtonProps {
  name: string;
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
  onButtonClick: () => void;
}

function SidebarMenuButton({
  name,
  icon: Icon,
  isActive,
  onButtonClick,
}: SidebarMenuButtonProps) {
  return (
    <button
      className={`sidebar-menubutton ${isActive ? 'sidebar-menubutton--active' : ''}`}
      type="button"
      onClick={onButtonClick}
      aria-label={name}
      aria-pressed={isActive}
    >
      <Icon className="sidebar-menubutton__fluent-icon" />
      <p className="sidebar-menubutton__name">{name}</p>
    </button>
  );
}

export default SidebarMenuButton;
