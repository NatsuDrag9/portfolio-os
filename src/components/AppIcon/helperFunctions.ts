import { AppIconVariant } from '@definitions/applicationTypes';

// Truncation length constants for different icon variants
export const START_MENU_TRUNCATE_LENGTH = 20;
export const DESKTOP_TRUNCATE_LENGTH = 30;

export function truncateAppName(name: string, variant: AppIconVariant): string {
  let maxLength: number;

  switch (variant) {
    case 'start-menu':
      maxLength = START_MENU_TRUNCATE_LENGTH;
      break;
    case 'desktop':
      maxLength = DESKTOP_TRUNCATE_LENGTH;
      break;
    case 'taskbar':
      // Taskbar doesn't show text, return as-is
      return name;
    default:
      return name;
  }

  if (name.length <= maxLength) {
    return name;
  }

  return `${name.slice(0, maxLength - 3)}...`;
}

// Build dot class for taskbar indicator
export const getDotModifier = (
  hasOpenWindows: boolean,
  isThisAppFocused: boolean
) => {
  if (!hasOpenWindows) return 'app-icon__dot--hidden';
  return isThisAppFocused
    ? 'app-icon__dot--focused'
    : 'app-icon__dot--unfocused';
};

// Build button class - add modifiers for variant states
export const getVariantModifiers = (
  iconVariant: AppIconVariant,
  hasMultipleWindows: boolean,
  isThisAppFocused: boolean
) => {
  const classes: string[] = [];

  if (iconVariant === 'taskbar') {
    classes.push('app-icon--taskbar');
    if (hasMultipleWindows) classes.push('app-icon--multiple-windows');
    if (isThisAppFocused) classes.push('app-icon--taskbar-focused');
  } else if (iconVariant === 'desktop') {
    classes.push('app-icon--desktop');
  } else if (iconVariant === 'start-menu') {
    classes.push('app-icon--start-menu');
  }

  return classes.join(' ');
};
