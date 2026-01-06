import { Power24Regular } from '@fluentui/react-icons';
import { useBootStatus } from '@store/store';
import './PowerButton.scss';

function PowerButton() {
  const { updateBootStatus } = useBootStatus();

  const handlePowerOff = () => {
    updateBootStatus('OFF');
  };

  return (
    <button
      type="button"
      className="power-button"
      onClick={handlePowerOff}
      aria-label="Shut down"
    >
      <Power24Regular className="power-button__icon" />
    </button>
  );
}

export default PowerButton;
