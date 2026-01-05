import { ChangeEvent, FormEventHandler, useState } from 'react';
import './Accounts.scss';
import { useAuth, useSystemUIState } from '@store/store';
import { PrimaryButton } from '@components/index';
import { Natsu } from '@assets/images/specifics';
import { PersonCircleRegular } from '@fluentui/react-icons';

interface AccountsProps {
  onClose: () => void;
}

function Accounts({ onClose }: AccountsProps) {
  const [newUsername, setNewUsername] = useState<string>('');
  const { username, isAdmin, updateAuthState, updateUserAvatar } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string>(() =>
    isAdmin ? Natsu : ''
  );
  const { setDisplayLoader } = useSystemUIState();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isAdmin && newUsername.trim()) {
      // Update displayLoader state
      setDisplayLoader({ isLoading: true, triggeredFrom: 'settings' });

      // Update the username in the store
      updateAuthState(newUsername.trim());
      // Clear the input field after successful update
      setNewUsername('');

      // Close the settings window
      onClose();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isAdmin) return; // Prevent file changes for admin

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewUrl(imageUrl);
        updateUserAvatar(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      setNewUsername(event.target.value);
    }
  };

  return (
    <div className={`accounts ${isAdmin ? 'accounts--disabled' : ''}`}>
      <div className="accounts__avatar">
        {previewUrl ? (
          <img
            className="accounts__preview-avatar"
            src={previewUrl}
            alt="preview avatar"
          />
        ) : (
          <PersonCircleRegular className="accounts__preview-avatar accounts__preview-avatar--icon" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="accounts__file-input"
          id="avatar-upload"
          disabled={isAdmin}
        />
        <label
          htmlFor="avatar-upload"
          className={`accounts__upload-label ${isAdmin ? 'accounts__upload-label--disabled' : ''}`}
        >
          Choose Avatar
        </label>
      </div>
      <form
        className="accounts__form"
        id="username-form"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="username-input" className="accounts__form-label">
          Change Username
        </label>
        <input
          id="username-input"
          className="accounts__username-input"
          type="text"
          name="username-input"
          value={newUsername}
          onChange={handleUsernameChange}
          placeholder={username || 'Enter new username'}
          disabled={isAdmin}
        />
        <PrimaryButton
          buttonType="submit"
          name="Change"
          formId="username-form"
          isDisabled={isAdmin}
        />
      </form>

      {isAdmin && (
        <p className="accounts__admin-message">
          Admin account settings cannot be modified
        </p>
      )}
    </div>
  );
}

export default Accounts;
