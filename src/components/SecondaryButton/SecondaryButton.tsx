import { ComponentType } from 'react';
import './SecondaryButton.scss';

export interface SecondaryButtonProps {
  icon: ComponentType<{ className: string }>;
  name: string;
  iconPosition?: 'left' | 'right';
  onButtonClick?: () => void;
}

function SecondaryButton({
  icon,
  name,
  iconPosition,
  onButtonClick,
}: SecondaryButtonProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  const Icon = icon;

  return (
    <button
      type="button"
      className="secondary-button"
      onClick={handleButtonClick}
    >
      {iconPosition === 'left' && (
        <Icon className="secondary-button__fluent-icon" />
      )}
      <p className="secondary-button__name">{name}</p>
      {iconPosition === 'right' && (
        <Icon className="secondary-button__fluent-icon" />
      )}
    </button>
  );
}

export default SecondaryButton;
