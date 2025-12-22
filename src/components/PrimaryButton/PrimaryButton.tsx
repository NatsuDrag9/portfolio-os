import './PrimaryButton.scss';

export interface PrimaryButtonProps {
  name: string;
  onButtonClick?: () => void;
  buttonType?: 'button' | 'submit';
  formId?: string;
  isDisabled?: boolean;
}

function PrimaryButton({
  name,
  onButtonClick,
  buttonType = 'button',
  formId = undefined,
  isDisabled = false,
}: PrimaryButtonProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <button
      className="primary-button"
      type={buttonType}
      onClick={handleButtonClick}
      form={formId}
      disabled={isDisabled}
    >
      {name}
    </button>
  );
}

export default PrimaryButton;
