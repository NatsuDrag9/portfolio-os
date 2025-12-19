import { DropdownType } from '@definitions/utlityTypes';
import './GenericDropdown.scss';
import { ChevronDownRegular } from '@fluentui/react-icons';
import {
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

export interface GenericDropdownProps {
  options: DropdownType[];
  selectedOption: DropdownType;
  label: string;
  placeholder?: string;
  onOptionSelect: (selectedOption: DropdownType) => void;
  isDisabled?: boolean;
}

function GenericDropdown({
  options,
  selectedOption,
  label,
  placeholder = 'Select an option',
  onOptionSelect,
  isDisabled,
}: GenericDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useClickOutsideModal(
    isOpen,
    () => setIsOpen(false),
    dropdownRef as RefObject<HTMLDivElement>
  );

  // Focus on the focused option when focusedIndex changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && dropdownRef.current) {
      const optionElement = dropdownRef.current.querySelectorAll(
        '[role="option"]'
      )[focusedIndex] as HTMLElement;
      optionElement?.focus();
    }
  }, [focusedIndex, isOpen]);

  const handleToggleDropdown = (_event: MouseEvent) => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
      setFocusedIndex(-1);
    }
  };

  const handleOptionSelect = (option: DropdownType) => {
    if (!isDisabled) {
      onOptionSelect(option);
      setFocusedIndex(-1);
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    option: DropdownType
  ) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleOptionSelect(option);
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`generic-dropdown ${isDisabled ? 'generic-dropdown--disabled' : ''}`}
      ref={dropdownRef}
    >
      <p className="generic-dropdown__label">{label}</p>
      <button
        className={`generic-dropdown__selected-option-container ${isOpen ? 'open' : ''}`}
        onClick={handleToggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isDisabled}
      >
        <p className="generic-dropdown__selected-option">
          {selectedOption.displayName || placeholder}
        </p>
        <ChevronDownRegular
          className={`generic-dropdown__fluent-icon ${isOpen ? 'open' : ''} `}
        />
      </button>

      {isOpen && (
        <div role="listbox" className="generic-dropdown__options">
          {options.map((option, index) => {
            return (
              <div
                key={option.value}
                className={`generic-dropdown__option ${focusedIndex === index ? 'focused' : ''} ${option.value === selectedOption.value ? 'selected' : ''}`}
                role="option"
                onClick={(_event: MouseEvent) => handleOptionSelect(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, option)}
                tabIndex={focusedIndex === index ? 0 : -1}
                aria-selected={option.value === selectedOption.value}
              >
                {option.displayName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GenericDropdown;
