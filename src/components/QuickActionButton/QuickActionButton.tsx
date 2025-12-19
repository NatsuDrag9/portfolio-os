import { ComponentType } from 'react';
import './QuickActionButton.scss';
import { QuickActionsType } from '@definitions/desktopTypes';

export interface QuickActionButtonProps {
  components: {
    default: ComponentType<{ className?: string }>;
    clicked: ComponentType<{ className?: string }>;
  };
  actionType: QuickActionsType;
  name: string;
  isActive?: boolean;
  onButtonClick?: (actionType: QuickActionsType) => void;
}

function QuickActionButton({
  actionType,
  components,
  name,
  isActive = false,
  onButtonClick,
}: QuickActionButtonProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick(actionType);
    }
  };

  const getImage = () => {
    if (isActive) {
      const ClickedIcon = components.clicked;
      return <ClickedIcon className="qa-button__fluent-icon" />;
    }

    const DefaultIcon = components.default;
    return (
      <DefaultIcon className="qa-button__fluent-icon qa-button__fluent-icon--default" />
    );
  };

  return (
    <div className="qa-button">
      <button
        type="button"
        className={`qa-button__button${isActive ? ' qa-button__button--active' : ''}`}
        onClick={handleButtonClick}
      >
        {getImage()}
      </button>
      <p className="qa-button__name">{name}</p>
    </div>
  );
}

export default QuickActionButton;
