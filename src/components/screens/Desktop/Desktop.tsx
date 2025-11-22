import { useAuth } from '@store/store';
import './Desktop.scss';

function Desktop() {
  const { username } = useAuth();

  return (
    <div className="desktop">
      <h4 className="desktop__title"> Hello, {username}</h4>
    </div>
  );
}

export default Desktop;
