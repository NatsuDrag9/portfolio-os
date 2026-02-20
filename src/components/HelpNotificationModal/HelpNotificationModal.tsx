import { useState, useRef, RefObject, useCallback, useEffect } from 'react';
import './HelpNotificationModal.scss';
import { DismissRegular, SlideLayoutRegular } from '@fluentui/react-icons';
import useClickOutsideModal from '@hooks/useClickOutsideModal';
import { FADE_OUT_DELAY } from '@constants/desktopConstants';

interface HelpNotificationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

function HelpNotificationModal({
  isOpen,
  onDismiss,
}: HelpNotificationModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  // Unified close handler for all close scenarios (outside click, close button, dismiss button)
  const handleRequestClose = useCallback(() => {
    setIsExiting(true);
    closeTimeoutRef.current = setTimeout(() => {
      onDismiss();
    }, FADE_OUT_DELAY);
  }, [onDismiss]);

  // Use hook with fade-out animation
  useClickOutsideModal(
    isOpen,
    handleRequestClose,
    containerRef as RefObject<HTMLElement>,
    undefined,
    {
      fadeOutDuration: 0, // We handle the animation ourselves in handleRequestClose
    }
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`help-notification-modal ${isExiting ? 'exiting' : ''}`}>
      <div className="help-notification-modal__overlay" />
      <div className="help-notification-modal__container" ref={containerRef}>
        <button
          className="help-notification-modal__close-btn"
          onClick={handleRequestClose}
          aria-label="Close help modal"
        >
          <DismissRegular className="help-notification-modal__fluent-icon" />
        </button>

        <div className="help-notification-modal__content">
          <h1 className="help-notification-modal__title">
            Welcome to my Portfolio!
          </h1>

          <p className="help-notification-modal__subtitle">
            Quick Navigation Guide
          </p>

          <div className="help-notification-modal__icon-showcase">
            <SlideLayoutRegular className="help-notification-modal__portfolio-icon" />
          </div>

          <div className="help-notification-modal__message">
            <p>
              Hi! Click on the above <strong>Portfolio icon</strong> on the
              desktop to explore my skills, projects, and experience at a
              glance. It&apos;s the easiest way to see what I can do!
            </p>
          </div>

          <button
            className="help-notification-modal__dismiss-btn"
            onClick={handleRequestClose}
          >
            Got it, let&apos;s go!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpNotificationModal;
