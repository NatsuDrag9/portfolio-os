import { useAuth, useBootStatus } from '@store/store';
import './BootScreen.scss';
import { useEffect, useState } from 'react';

const TIME_OUT = 5; // in sec

function BootScreen() {
  const [timer, setTimer] = useState(TIME_OUT);
  const { allOperations, updateBootStatus } = useBootStatus();
  const { username } = useAuth();

  useEffect(() => {
    if (timer <= 0) {
      if (!username) {
        updateBootStatus('DISPLAY_LOGIN_SCREEN');
      } else {
        updateBootStatus('ON');
      }

      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, updateBootStatus, username]);

  return (
    <div className="bs-screen">
      <ul className="bs-screen__operations">
        {allOperations.map((operation, idx) => (
          <li key={`${idx + 1}`} className="bs-screen__operation">
            {operation}
          </li>
        ))}
      </ul>

      <p className="bs-screen__countdown">
        Transitioning in {timer} seconds...
      </p>
    </div>
  );
}

export default BootScreen;
