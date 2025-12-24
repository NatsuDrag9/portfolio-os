import { useAuth, useSystemUIState } from '@store/store';
import './Workspace.scss';
import { Desktop, StartMenu, Taskbar, WindowManager } from '@components/index';

function Workspace() {
  const { username } = useAuth();
  const { isNightLightActive } = useSystemUIState();

  return (
    <div className="workspace">
      <h4 className="workspace__title"> Hello, {username}</h4>
      <Desktop />
      <WindowManager />
      <StartMenu />
      <Taskbar />
      {isNightLightActive && <div className="workspace__night-light-overlay" />}
    </div>
  );
}

export default Workspace;
