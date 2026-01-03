import { AppMetadata } from '@definitions/applicationTypes';
import { WindowData } from '@definitions/applicationTypes';
import { APP_REGISTRY } from '@constants/desktopConstants';

/**
 * Find an app by name using case-insensitive partial matching
 */
export const findAppByName = (name: string): AppMetadata | undefined => {
  const searchTerm = name.toLowerCase();
  return APP_REGISTRY.find((app) =>
    app.appName.toLowerCase().includes(searchTerm)
  );
};

/**
 * Find the most recent window for a given app ID
 * Uses the windowInstanceCounters to construct the most recent window ID
 * Example: if windowInstanceCounters['notepad'] = 5, returns the window with ID 'notepad-5'
 */
export const findMostRecentWindow = (
  appId: string,
  activeWindows: WindowData[],
  windowInstanceCounters: Record<string, number>
): WindowData | null => {
  const latestInstanceNumber = windowInstanceCounters[appId];

  if (!latestInstanceNumber) return null;

  // Construct the most recent window ID using the instance counter
  const mostRecentWindowId = `${appId}-${latestInstanceNumber}`;

  // Find and return this window from activeWindows
  return activeWindows.find((w) => w.id === mostRecentWindowId) || null;
};

/**
 * Validate that arguments are provided for a command
 */
export const validateArgs = (
  args: string[],
  commandName: string,
  errorCallback: (msg: string) => void
): boolean => {
  if (args.length === 0) {
    errorCallback(
      `Error: Please specify an app name. Usage: ${commandName} <app-name>`
    );
    return false;
  }
  return true;
};

/**
 * Parse command input into command and arguments
 */
export const parseCommandInput = (
  input: string
): { command: string; args: string[] } => {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
  };
};

/**
 * Get the maximum z-index from active windows
 */
export const getMaxZIndex = (activeWindows: WindowData[]): number => {
  return Math.max(...activeWindows.map((w) => w.zIndex), 0);
};
