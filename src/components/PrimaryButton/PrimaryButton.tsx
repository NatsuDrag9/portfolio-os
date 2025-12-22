import './PrimaryButton.scss';

export interface PrimaryButtonProps {
  name: string;
  onButtonClick?: () => void;
  buttonType?: 'button' | 'submit';
  formId?: string;
}

function PrimaryButton({
  name,
  onButtonClick,
  buttonType = 'button',
  formId = undefined,
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
    >
      {name}
    </button>
  );
}

export default PrimaryButton;
