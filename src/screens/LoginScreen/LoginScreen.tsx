import React, { useState } from 'react';
import { useAuth, useBootStatus } from '@store/store';
import { ADMIN } from '@constants/storeConstants';
import { Natsu, LoginScreenWallpaper } from '@assets/images/specifics';
import DateTimeDisplay from './DateTimeDisplay';
import PowerButton from './PowerButton';
import './LoginScreen.scss';

function LoginScreen() {
  const { updateAuthState } = useAuth();
  const { updateBootStatus } = useBootStatus();
  const [showNewUserInput, setShowNewUserInput] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleAdminLogin = () => {
    updateAuthState(ADMIN);
    updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', ADMIN);
  };

  const handleNewUserLogin = () => {
    if (!newUsername.trim()) return;
    updateAuthState(newUsername.trim());
    updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', newUsername.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNewUserLogin();
    }
  };

  return (
    <div
      className="login-screen"
      style={{ backgroundImage: `url(${LoginScreenWallpaper})` }}
    >
      {/* Smoke overlay for dimming background */}
      <div className="login-screen__overlay" />

      {/* Time and Date display */}
      <DateTimeDisplay />

      {/* Power button */}
      <PowerButton />

      {/* User selection panel */}
      <div className="login-screen__panel">
        {/* Admin user card */}
        <button
          type="button"
          className="login-screen__user-card"
          onClick={handleAdminLogin}
        >
          <img
            src={Natsu}
            alt={ADMIN}
            className="login-screen__avatar login-screen__avatar--admin"
          />
          <div className="login-screen__user">
            <span className="login-screen__username">{ADMIN}</span>
            <span className="login-screen__role">Administrator</span>
          </div>
        </button>

        {/* Divider */}
        <div className="login-screen__divider" />

        {/* New user section */}
        {!showNewUserInput ? (
          <button
            type="button"
            className="login-screen__user-card login-screen__user-card--other"
            onClick={() => setShowNewUserInput(true)}
          >
            <div className="login-screen__avatar login-screen__avatar--other">
              +
            </div>
            <div className="login-screen__user">
              <span className="login-screen__username">Other user</span>
              <span className="login-screen__role">Sign in as guest</span>
            </div>
          </button>
        ) : (
          <form className="login-screen__input-section">
            <div className="login-screen__avatar login-screen__avatar--other">
              {newUsername.charAt(0).toUpperCase() || '?'}
            </div>
            <input
              type="text"
              className="login-screen__input"
              placeholder="Enter username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="login-screen__input-actions">
              <button
                type="button"
                className="login-screen__action-btn login-screen__action-btn--submit"
                onClick={handleNewUserLogin}
                disabled={!newUsername.trim()}
              >
                Sign in
              </button>
              <button
                type="button"
                className="login-screen__action-btn login-screen__action-btn--cancel"
                onClick={() => {
                  setShowNewUserInput(false);
                  setNewUsername('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
