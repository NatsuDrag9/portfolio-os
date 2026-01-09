import { PowerRegular } from '@fluentui/react-icons';
import {
  useAuth,
  useBootStatus,
  useSystemUIState,
  useWorkspaceState,
} from '@store/store';
import { RefObject, useRef, useState } from 'react';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

function StartMenuPowerButton() {
  const startMenuPowerOffRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { updateBootStatus } = useBootStatus();
  const { updateAuthState, updateUserAvatar } = useAuth();
  const { reset: resetSystemUIState } = useSystemUIState();
  const { reset: resetWorkspaceState } = useWorkspaceState();

  // Close power options popup when clicking outside
  useClickOutsideModal(
    showPopup,
    () => setShowPopup(false),
    startMenuPowerOffRef as RefObject<HTMLElement>
  );

  const handleSignoutClick = () => {
    // Reset all stores to default values
    resetSystemUIState();
    resetWorkspaceState();
    // Logout the user
    updateAuthState(null);
    // Clear the avatar
    updateUserAvatar(undefined);

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

      {/* To Do: Add a transition to display these options using requestAnimationFrame */}
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
