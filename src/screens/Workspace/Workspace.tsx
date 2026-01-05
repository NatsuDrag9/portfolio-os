import { useAuth, useSystemUIState } from '@store/store';
import './Workspace.scss';
import {
  Desktop,
  Loader,
  StartMenu,
  Taskbar,
  WindowManager,
} from '@components/index';
import { useEffect } from 'react';

function Workspace() {
  const { username } = useAuth();
  const {
    isNightLightActive,
    brightnessLevel,
    displayLoader,
    setDisplayLoader,
  } = useSystemUIState();

  // Reset the displayLoader state after a timeout regardless of wherever it's triggered from
  useEffect(() => {
    if (displayLoader.isLoading) {
      setTimeout(
        () =>
          setDisplayLoader({
            isLoading: false,
            triggeredFrom: 'undefined',
          }),
        3000
      );
    }
  }, [displayLoader.isLoading, setDisplayLoader]);

  // Convert brightness level (0-100) to overlay opacity (1-0)
  // 100% brightness = 0 opacity, 0% brightness = 0.8 opacity (max dimming)
  const brightnessOpacity = ((100 - brightnessLevel) / 100) * 0.8;

  const renderWithLoader = () => {
    if (displayLoader.isLoading) {
      return (
        <Loader
          fullscreen
          customText={[
            'Applying Your Settings',
            'Updating Workspace',
            'Please Wait ...',
          ]}
        />
      );
    }

    return (
      <>
        <Desktop />
        <WindowManager />
        <StartMenu />
      </>
    );
  };

  return (
    <div className="workspace">
      <h4 className="workspace__title"> Hello, {username}</h4>
      {renderWithLoader()}
      <Taskbar />
      {isNightLightActive && <div className="workspace__night-light-overlay" />}
      {brightnessLevel < 100 && (
        <div
          className="workspace__brightness-overlay"
          style={{ opacity: brightnessOpacity }}
        />
      )}
    </div>
  );
}

export default Workspace;
