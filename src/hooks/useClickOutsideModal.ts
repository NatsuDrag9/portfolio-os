import { RefObject, useEffect } from 'react';

function useClickOutsideModal(
  isOpen: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement> | null
): void {
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef === null) return;

    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
}

export default useClickOutsideModal;
