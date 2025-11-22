import { useBootStatus } from '@store/store';
import './PowerOffScreen.scss';
import { PowerFilled } from '@fluentui/react-icons';

function PowerOffScreen() {
  const { updateBootStatus } = useBootStatus();

  const handleButtonClick = () => {
    updateBootStatus('DISPLAY_BOOT_SCREEN');
  };

  return (
    <div className="po-screen">
      <button
        type="button"
        onClick={handleButtonClick}
        className="po-screen__button"
      >
        <PowerFilled className="po-screen__image" />
      </button>

      <p className="po-screen__text">Press Power to turn on</p>
    </div>
  );
}

export default PowerOffScreen;
