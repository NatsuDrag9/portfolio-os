import './ToggleButton.scss';

export interface ToggleButtonProps {
  name: string;
  isActive: boolean;
  onToggleClick: (value: boolean) => void;
  isDisabled?: boolean;
}

function ToggleButton({
  name,
  isActive,
  onToggleClick,
  isDisabled = false,
}: ToggleButtonProps) {
  const handleToggleClick = () => {
    onToggleClick(!isActive);
  };

  return (
    <div
      className={`toggle-button ${isDisabled ? 'toggle-button--disabled' : ''}`}
    >
      <p className="toggle-button__name" title={name}>
        {name}
      </p>
      <button
        className={`toggle-button__button ${isActive ? 'active' : ''}`}
        disabled={isDisabled}
        onClick={handleToggleClick}
      >
        <span className={`toggle-button__circle ${isActive ? 'active' : ''}`} />
      </button>
    </div>
  );
}

export default ToggleButton;
