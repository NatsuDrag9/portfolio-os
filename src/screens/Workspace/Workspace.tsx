import { useAuth, useSystemUIState } from '@store/store';
import './Workspace.scss';
import { Desktop, StartMenu, Taskbar, WindowManager } from '@components/index';

function Workspace() {
  const { username } = useAuth();
  const { isNightLightActive, brightnessLevel } = useSystemUIState();

  // Convert brightness level (0-100) to overlay opacity (1-0)
  // 100% brightness = 0 opacity, 0% brightness = 0.8 opacity (max dimming)
  const brightnessOpacity = ((100 - brightnessLevel) / 100) * 0.8;

  return (
    <div className="workspace">
      <h4 className="workspace__title"> Hello, {username}</h4>
      <Desktop />
      <WindowManager />
      <StartMenu />
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
