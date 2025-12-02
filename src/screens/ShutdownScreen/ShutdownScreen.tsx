import { useBootStatus } from '@store/store';
import './ShutdownScreen.scss';
import { useEffect } from 'react';

const OPERATION_DURATION = 1500; // milliseconds per operation

function ShutdownScreen() {
  const { allOperations, updateBootStatus } = useBootStatus();

  useEffect(() => {
    if (allOperations.length === 0) return;

    // Set up automatic progression through operations
    const totalDuration = allOperations.length * OPERATION_DURATION;

    const timer = setTimeout(() => {
      // All operations displayed, transition to OFF screen
      updateBootStatus('OFF');
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [allOperations, updateBootStatus]);

  // Calculate progress (0 to 100)
  const progress =
    ((allOperations.length || 1) / Math.max(allOperations.length, 1)) * 100;

  return (
    <div className="sd-screen">
      <ul className="sd-screen__operations">
        {allOperations.map((operation, idx) => (
          <li
            key={`${idx + 1}`}
            className="sd-screen__operation"
            style={{
              animationDelay: `${idx * OPERATION_DURATION}ms`,
            }}
          >
            {operation}
          </li>
        ))}
      </ul>

      <div className="sd-screen__progress-container">
        <div
          className="sd-screen__progress-bar"
          style={{
            width: `${progress}%`,
            animation: `sd-fill-progress ${allOperations.length * OPERATION_DURATION}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}

export default ShutdownScreen;
