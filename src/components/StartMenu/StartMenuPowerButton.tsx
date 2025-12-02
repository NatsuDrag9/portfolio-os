import { PowerRegular } from '@fluentui/react-icons';
import { useBootStatus } from '@store/store';
import { RefObject, useRef, useState } from 'react';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

function StartMenuPowerButton() {
  const startMenuPowerOffRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { updateBootStatus } = useBootStatus();

  // Close power options popup when clicking outside
  useClickOutsideModal(
    showPopup,
    () => setShowPopup(false),
    startMenuPowerOffRef as RefObject<HTMLElement>
  );

  const handleSignoutClick = () => {
    updateBootStatus('DISPLAY_LOGIN_SCREEN');
  };

  const handlePowerOffClick = () => {
    updateBootStatus('DISPLAY_SHUTDOWN_SCREEN');
  };

  return (
    <button
      type="button"
      className="start-menu__power-off"
      onClick={() => setShowPopup(true)}
    >
      <PowerRegular className="start-menu__fluent-icon" />

      {showPopup && (
        <div
          className="start-menu__power-off-options"
          ref={startMenuPowerOffRef}
        >
          <span
            className="start-menu__power-off-option"
            onClick={handleSignoutClick}
          >
            Sign Out
          </span>
          <span
            className="start-menu__power-off-option"
            onClick={handlePowerOffClick}
          >
            Power Off
          </span>
        </div>
      )}
    </button>
  );
}

export default StartMenuPowerButton;
