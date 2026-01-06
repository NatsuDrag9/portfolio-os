import { useState, useEffect } from 'react';
import './DateTimeDisplay.scss';

function DateTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="datetime-display">
      <time className="datetime-display__time">{formatTime(currentTime)}</time>
      <time className="datetime-display__date">{formatDate(currentTime)}</time>
    </div>
  );
}

export default DateTimeDisplay;
