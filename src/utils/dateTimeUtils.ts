// import { setTimeout as setTimeoutPromise } from 'timers/promises';

import { logInDev } from './logUtils';

/**
 * Calculates the number of days between two dates.
 *
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @returns The number of days between the two dates.
 */
export function daysBetween(startDate: Date, endDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.abs(
    Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay)
  );
}

/**
 * Adds a number of days to a date.
 *
 * @param date - The original date.
 * @param days - The number of days to add.
 * @returns The new date with the days added.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtracts a number of days from a date.
 *
 * @param date - The original date.
 * @param days - The number of days to subtract.
 * @returns The new date with the days subtracted.
 */
export function subtractDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

/**
 * Delays execution for a given number of milliseconds.
 *
 * @param ms - The number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export function sleep(ms: number): Promise<void> {
  logInDev(`Waiting for ${ms} seconds...`);
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
  // return setTimeoutPromise(ms);
}

/**
 * Returns the current timestamp in seconds.
 *
 * @returns The current timestamp in seconds.
 */
export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Executes a promise with a timeout.
 *
 * @param promise - The promise to execute.
 * @param ms - The timeout in milliseconds.
 * @returns A promise that either resolves to the original promise's resolution or rejects if the timeout is exceeded.
 */
export function timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutHandle: ReturnType<typeof setTimeout>;

  const timeoutPromiseCore = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(new Error(`Promise timed out after ${ms} milliseconds`));
    }, ms);
  });

  return Promise.race([promise, timeoutPromiseCore]).then((result) => {
    clearTimeout(timeoutHandle);
    return result; // This return is fine as it's part of a `then` handler.
  });
}

/**
 * Converts a date string from ISO 8601 format to DD-MM-YYYY format.
 *
 * @param {string} dateString - The input date string in ISO 8601 format.
 * @returns {string} The formatted date string in DD-MM-YYYY format.
 *
 * @throws {Error} If the input date string is invalid.
 *
 * @example
 * const result = convertUTCDate("2024-09-13T20:21:14.168851+05:30");
 * logInDev(result); // Output: "13-09-2024"
 */
export function convertUTCDate(dateString: string) {
  const date = new Date(dateString);

  if (dateString) {
    // Check if the date is valid
    if (Number.isNaN(date.getTime())) {
      throw new Error('Invalid date string provided');
    }

    // Format the date to DD-MM-YYYY using UTC
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() returns 0-11
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
  return ''; // Return empty string if invalid string
}

export const convertDateToYYYYMMDD = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const extractDay = (date: Date): string => {
  const dateString = convertDateToYYYYMMDD(date);
  return dateString.split('-')[2]; // Returns DD part
};

/**
 * Converts an ISO 8601 datetime string to a human-readable format
 * @param {string} isoDateString - The ISO 8601 datetime string (e.g., "2024-11-05T13:34:08.136749+05:30")
 * @returns {string} Formatted date string (e.g., "Wed, 6 Dec 2023 at 4:45 AM")
 * @throws {Error} If the input date string is invalid
 */
export function formatDateTime(isoDateString: string): string {
  try {
    // Check for null/undefined/empty string
    if (!isoDateString) {
      throw new Error('Date string is required');
    }

    const date = new Date(isoDateString);

    if (Number.isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    return `${dayName}, ${day} ${month} ${year} at ${hours}:${minutes} ${period}`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(`Failed to parse date: ${message}`);
  }
}

export const isDateAfter = (
  startDate: string | undefined,
  endDate: string | undefined
): boolean => {
  if (!startDate || !endDate) return true;

  const start = new Date(startDate);
  const end = new Date(endDate);

  return end > start;
};

/**
 * Converts 12-hour format time to 24-hour format
 * @param hour - Hour in 12-hour format (1-12)
 * @param minutes - Minutes (0-59)
 * @param amPm - 'AM' or 'PM'
 * @returns Time in 24-hour format as HH:MM string
 */
export const convertTo24HourFormat = (
  hour: string,
  minutes: string,
  amPm: string
): string => {
  let hours = parseInt(hour, 10);

  if (amPm.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (amPm.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

/*
 * Helper function to convert 12-hour format time to minutes since midnight
 */
export const convertTimeToMinutes = (
  hour: string,
  minutes: string,
  amPm: string
): number => {
  let hours = parseInt(hour, 10);
  const mins = parseInt(minutes, 10);

  if (amPm.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (amPm.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + mins;
};
