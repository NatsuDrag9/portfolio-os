import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useClickOutsideModal from '../useClickOutsideModal';

describe('useClickOutsideModal', () => {
  let containerElement: HTMLDivElement;
  let childElement: HTMLDivElement;
  let externalElement: HTMLDivElement;
  let onCloseMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = '';

    // Create container and child elements
    containerElement = document.createElement('div');
    containerElement.id = 'modal-container';

    childElement = document.createElement('div');
    childElement.id = 'modal-child';

    externalElement = document.createElement('div');
    externalElement.id = 'external-element';

    // Append to DOM
    containerElement.appendChild(childElement);
    document.body.appendChild(containerElement);
    document.body.appendChild(externalElement);

    // Mock onClose callback
    onCloseMock = vi.fn();
  });

  afterEach(() => {
    // Clear mocks
    vi.clearAllMocks();
  });

  describe('Event listener setup and cleanup', () => {
    it('should add event listeners when modal is open', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        true
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
    });

    it('should not add event listeners when modal is closed', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(false, onCloseMock, containerRef));

      expect(addEventListenerSpy).not.toHaveBeenCalled();

      addEventListenerSpy.mockRestore();
    });

    it('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      const containerRef = { current: containerElement };

      const { unmount } = renderHook(() =>
        useClickOutsideModal(true, onCloseMock, containerRef)
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        true
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Click outside behavior', () => {
    it('should call onClose when clicking outside the container', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Simulate click outside the container
      const clickEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent, 'target', {
        value: externalElement,
        enumerable: true,
      });

      document.dispatchEvent(clickEvent);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when clicking inside the container', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Simulate click inside the container
      const clickEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent, 'target', {
        value: childElement,
        enumerable: true,
      });

      document.dispatchEvent(clickEvent);

      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should not call onClose when clicking on the container itself', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Simulate click on the container element itself
      const clickEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent, 'target', {
        value: containerElement,
        enumerable: true,
      });

      document.dispatchEvent(clickEvent);

      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should not call onClose if containerRef is null', () => {
      const containerRef = null;

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Simulate click
      const clickEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent, 'target', {
        value: externalElement,
        enumerable: true,
      });

      document.dispatchEvent(clickEvent);

      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should not call onClose when modal is closed', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(false, onCloseMock, containerRef));

      // Simulate click outside
      const clickEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent, 'target', {
        value: externalElement,
        enumerable: true,
      });

      document.dispatchEvent(clickEvent);

      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard escape behavior', () => {
    it('should call onClose when Escape key is pressed', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Simulate Escape key press
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });

      document.dispatchEvent(escapeEvent);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose for other key presses', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Simulate other key presses
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });

      const aEvent = new KeyboardEvent('keydown', {
        key: 'a',
        bubbles: true,
        cancelable: true,
      });

      document.dispatchEvent(enterEvent);
      document.dispatchEvent(aEvent);

      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should not call onClose when Escape is pressed and modal is closed', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(false, onCloseMock, containerRef));

      // Simulate Escape key press
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });

      document.dispatchEvent(escapeEvent);

      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });

  describe('Multiple interactions', () => {
    it('should handle multiple clicks outside', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // First click outside
      const clickEvent1 = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent1, 'target', {
        value: externalElement,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent1);

      // Second click outside
      const clickEvent2 = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent2, 'target', {
        value: externalElement,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent2);

      expect(onCloseMock).toHaveBeenCalledTimes(2);
    });

    it('should handle mix of inside clicks and outside clicks', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Click inside
      const insideEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(insideEvent, 'target', {
        value: childElement,
        enumerable: true,
      });
      document.dispatchEvent(insideEvent);

      // Click outside
      const outsideEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(outsideEvent, 'target', {
        value: externalElement,
        enumerable: true,
      });
      document.dispatchEvent(outsideEvent);

      // Click inside again
      const insideEvent2 = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(insideEvent2, 'target', {
        value: childElement,
        enumerable: true,
      });
      document.dispatchEvent(insideEvent2);

      // Only outside click should trigger callback
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should handle Escape key and click outside in combination', () => {
      const containerRef = { current: containerElement };

      renderHook(() => useClickOutsideModal(true, onCloseMock, containerRef));

      // Press Escape
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(escapeEvent);

      // Click outside
      const clickEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent, 'target', {
        value: externalElement,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(onCloseMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('Container ref changes', () => {
    it('should handle containerRef being updated', () => {
      const initialRef = { current: containerElement };
      const newContainer = document.createElement('div');
      newContainer.id = 'new-container';
      document.body.appendChild(newContainer);

      const { rerender } = renderHook(
        ({ containerRef }) =>
          useClickOutsideModal(true, onCloseMock, containerRef),
        { initialProps: { containerRef: initialRef } }
      );

      // Update ref to point to new container
      const updatedRef = { current: newContainer };
      rerender({ containerRef: updatedRef });

      // Click outside new container
      const clickEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(clickEvent, 'target', {
        value: externalElement,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
