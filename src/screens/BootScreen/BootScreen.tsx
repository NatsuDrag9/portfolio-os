import { useAuth, useBootStatus } from '@store/store';
import './BootScreen.scss';
import { useEffect } from 'react';

const OPERATION_DURATION = 1500; // milliseconds per operation

function BootScreen() {
  const { allOperations, updateBootStatus } = useBootStatus();
  const { username } = useAuth();

  useEffect(() => {
    if (allOperations.length === 0) return;

    // Set up automatic progression through operations
    const totalDuration = allOperations.length * OPERATION_DURATION;

    const timer = setTimeout(() => {
      // All operations displayed, transition to next screen
      if (!username) {
        updateBootStatus('DISPLAY_LOGIN_SCREEN');
      } else {
        updateBootStatus('ON');
      }
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [allOperations, updateBootStatus, username]);

  // Calculate progress (0 to 100)
  const progress =
    ((allOperations.length || 1) / Math.max(allOperations.length, 1)) * 100;

  return (
    <div className="bs-screen">
      <ul className="bs-screen__operations">
        {allOperations.map((operation, idx) => (
          <li
            key={`${idx + 1}`}
            className="bs-screen__operation"
            style={{
              animationDelay: `${idx * OPERATION_DURATION}ms`,
            }}
          >
            {operation}
          </li>
        ))}
      </ul>

      <div className="bs-screen__progress-container">
        <div
          className="bs-screen__progress-bar"
          style={{
            width: `${progress}%`,
            animation: `fill-progress ${allOperations.length * OPERATION_DURATION}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}

export default BootScreen;
