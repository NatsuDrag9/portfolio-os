import { RefObject, useEffect } from 'react';

function useClickOutsideModal(
  isOpen: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement> | null,
  ignoreRefs?: RefObject<HTMLElement>[]
): void {
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef === null) return;

    // Check if click is inside an element matching the ignore selector
    const target = event.target as Node;

    if (ignoreRefs?.some((ref) => ref.current?.contains(target))) {
      return;
    }

    if (
      containerRef.current &&
      !containerRef.current.contains(target as Node)
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
