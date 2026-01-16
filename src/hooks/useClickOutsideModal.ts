import { RefObject, useEffect, useRef, useCallback } from 'react';

interface UseClickOutsideModalOptions {
  fadeOutDuration?: number; // Duration in ms before actual close
  onBeforeClose?: () => void; // Called when starting fade-out
}

function useClickOutsideModal(
  isOpen: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement> | null,
  ignoreRefs?: RefObject<HTMLElement>[],
  options?: UseClickOutsideModalOptions
): void {
  const { fadeOutDuration = 300, onBeforeClose } = options || {};
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoized close handler that supports fade-out animation
  const handleClose = useCallback(() => {
    if (fadeOutDuration > 0) {
      // Trigger fade-out animation first
      onBeforeClose?.();

      // Close after animation completes
      closeTimeoutRef.current = setTimeout(() => {
        onClose();
      }, fadeOutDuration);
    } else {
      // No animation, close immediately
      onClose();
    }
  }, [fadeOutDuration, onBeforeClose, onClose]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (containerRef === null) return;

      const target = event.target as Node;

      // Check if click is inside an ignored element
      const isClickOnIgnoredElement = ignoreRefs?.some((ref) =>
        ref.current?.contains(target)
      );
      if (isClickOnIgnoredElement) {
        return;
      }

      // Check if click is outside the container
      if (
        containerRef.current &&
        !containerRef.current.contains(target as Node)
      ) {
        handleClose();
      }
    },
    [containerRef, ignoreRefs, handleClose]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  // Setup and cleanup event listeners
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyDown);

      // Cleanup any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);
}

export default useClickOutsideModal;
