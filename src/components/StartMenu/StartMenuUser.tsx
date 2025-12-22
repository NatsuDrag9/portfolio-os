import { PersonCircleFilled, PersonCircleRegular } from '@fluentui/react-icons';
import { useAuth } from '@store/store';
import { RefObject, useRef, useState } from 'react';
import useClickOutsideModal from '@hooks/useClickOutsideModal';
import { Natsu } from '@assets/images/specifics';

function StartMenuUser() {
  const startMenuUserRef = useRef<HTMLDivElement>(null);
  const [showUserCard, setShowUserCard] = useState(false);
  const { username, isAdmin, uploadedUserAvatar } = useAuth();

  // Close user card popup when clicking outside
  useClickOutsideModal(
    showUserCard,
    () => setShowUserCard(false),
    startMenuUserRef as RefObject<HTMLElement>
  );

  const handleButtonClick = () => {
    setShowUserCard((prev) => !prev);
  };
  return (
    <button
      className="start-menu__user-button"
      type="button"
      onClick={handleButtonClick}
    >
      {uploadedUserAvatar ? (
        <img
          src={uploadedUserAvatar}
          alt="user avatar"
          className="start-menu__user-avatar"
        />
      ) : (
        <PersonCircleRegular className="start-menu__fluent-icon" />
      )}
      <p className="start-menu__user-name">
        {username?.toUpperCase() ?? 'N/A'}
      </p>
      {showUserCard && username && (
        <div className="start-menu__user-card" ref={startMenuUserRef}>
          {isAdmin ? (
            <img
              src={Natsu}
              alt="admin"
              className="start-menu__user-card-icon image"
            />
          ) : (
            <PersonCircleFilled className="start-menu__user-card-icon" />
          )}
          <div className="start-menu__user-details">
            <h6 className="start-menu__user-details-title">{username}</h6>
            <p className="start-menu__user-details-text">Local Account</p>
            <p className="start-menu__user-details-text">(Personal)</p>
          </div>
        </div>
      )}
    </button>
  );
}

export default StartMenuUser;
