import { useAuth } from '@store/store';
import './Desktop.scss';
import { StartMenu, Taskbar } from '@components/index';

function Workspace() {
  const { username } = useAuth();

  return (
    <div className="workspace">
      <h4 className="workspace__title"> Hello, {username}</h4>
      <StartMenu />
      <Taskbar />
    </div>
  );
}

export default Workspace;
