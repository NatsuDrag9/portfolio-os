import { useBootStatus } from '@store/store';
import './PowerOffScreen.scss';

function PowerOffScreen() {
  const { updateBootStatus } = useBootStatus();

  const handleButtonClick = () => {
    updateBootStatus('DISPLAY_BOOT_SCREEN');
  };

  return (
    <div className="po-screen">
      <h4 className="po-screen__title">Powered OFF</h4>

      <button
        type="button"
        onClick={handleButtonClick}
        className="po-screen__button"
      >
        Click me to power on
      </button>
    </div>
  );
}

export default PowerOffScreen;
