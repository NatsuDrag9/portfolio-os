import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  daysBetween,
  addDays,
  subtractDays,
  // sleep,
  getCurrentTimestamp,
  timeoutPromise,
  convertUTCDate,
  convertDateToYYYYMMDD,
  extractDay,
  formatDateTime,
  isDateAfter,
  convertTo24HourFormat,
  convertTimeToMinutes,
} from '../dateTimeUtils';

describe('dateUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Use Fake Timers before each test
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers after each test
  });

  describe('daysBetween', () => {
    it('should calculate the number of days between two dates', () => {
      const startDate = new Date('2023-08-01');
      const endDate = new Date('2023-08-10');
      expect(daysBetween(startDate, endDate)).toBe(9);
    });

    it('should return 0 if the dates are the same', () => {
      const date = new Date('2023-08-10');
      expect(daysBetween(date, date)).toBe(0);
    });

    it('should calculate days when endDate is before startDate', () => {
      const startDate = new Date('2023-08-10');
      const endDate = new Date('2023-08-01');
      expect(daysBetween(startDate, endDate)).toBe(9);
    });
  });

  describe('addDays', () => {
    it('should add days to a date', () => {
      const date = new Date('2023-08-01');
      expect(addDays(date, 10)).toEqual(new Date('2023-08-11'));
    });

    it('should correctly handle adding days across months', () => {
      const date = new Date('2023-01-30');
      expect(addDays(date, 5)).toEqual(new Date('2023-02-04'));
    });
  });

  describe('subtractDays', () => {
    it('should subtract days from a date', () => {
      const date = new Date('2023-08-10');
      expect(subtractDays(date, 5)).toEqual(new Date('2023-08-05'));
    });

    it('should correctly handle subtracting days across months', () => {
      const date = new Date('2023-03-01');
      expect(subtractDays(date, 5)).toEqual(new Date('2023-02-24'));
    });
  });

  // describe('sleep', () => {
  //   it('should delay execution for the specified milliseconds', async () => {
  //     const ms = 1000;
  //     const logInDevSpy = vi.fn();
  //     vi.mock('@utils/logUtils', () => ({
  //       logInDev: logInDevSpy,
  //     }));

  //     const sleepPromise = sleep(ms);

  //     expect(logInDevSpy).toHaveBeenCalledWith(`Waiting for ${ms} seconds...`);

  //     // Advance the fake timers by `ms` milliseconds
  //     vi.advanceTimersByTime(ms);

  //     await sleepPromise; // Wait for the sleep function to complete

  //     // No additional assertions needed as the function is expected to resolve after the timer advances
  //   });
  // });

  describe('getCurrentTimestamp', () => {
    it('should return the current timestamp in seconds', () => {
      const now = 1691620800000; // Mocked current time
      vi.setSystemTime(now); // Set the fake system time

      const expectedTimestamp = Math.floor(now / 1000);
      expect(getCurrentTimestamp()).toBe(expectedTimestamp);
    });
  });

  describe('timeoutPromise', () => {
    it('should resolve if the promise resolves before the timeout', async () => {
      const ms = 500;
      const promise = new Promise((resolve) => {
        setTimeout(resolve, 100, 'resolved');
      });

      const resultPromise = timeoutPromise(promise, ms);

      // Advance the fake timers to just before the timeout
      vi.advanceTimersByTime(100);

      const result = await resultPromise;
      expect(result).toBe('resolved');
    });

    it('should reject if the promise takes longer than the timeout', async () => {
      const ms = 500;
      const promise = new Promise((resolve) => {
        setTimeout(resolve, 1000, 'resolved');
      });

      const resultPromise = timeoutPromise(promise, ms);

      // Advance the fake timers to just after the timeout
      vi.advanceTimersByTime(ms);

      await expect(resultPromise).rejects.toThrow(
        `Promise timed out after ${ms} milliseconds`
      );
    });

    it('should clear the timeout if the promise resolves in time', async () => {
      const ms = 500;
      const promise = new Promise((resolve) => {
        setTimeout(resolve, 100, 'resolved');
      });

      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      const resultPromise = timeoutPromise(promise, ms);

      // Advance the fake timers by 100ms (the promise resolution time)
      vi.advanceTimersByTime(100);

      await resultPromise;

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });

  describe('convertUTCDate', () => {
    it('converts a valid date string correctly', () => {
      const input = '2024-09-13T20:21:14.168851+05:30';
      expect(convertUTCDate(input)).toBe('13-09-2024');
    });

    it('handles different time zones', () => {
      const input = '2024-09-13T20:21:14.168851-07:00';
      expect(convertUTCDate(input)).toBe('14-09-2024'); // Note: This is now correct as per UTC
    });

    it('handles dates at the start of a month', () => {
      const input = '2024-01-01T00:00:00.000Z';
      expect(convertUTCDate(input)).toBe('01-01-2024');
    });

    it('handles dates at the end of a month', () => {
      const input = '2024-12-31T23:59:59.999Z';
      expect(convertUTCDate(input)).toBe('31-12-2024');
    });

    it('throws an error for invalid date strings', () => {
      const input = 'not a date';
      expect(() => convertUTCDate(input)).toThrow(
        'Invalid date string provided'
      );
    });
  });

  describe('convertDateToYYYYMMDD', () => {
    it('should format date correctly with single-digit month and day', () => {
      const date = new Date(2024, 0, 5); // January 5, 2024
      expect(convertDateToYYYYMMDD(date)).toBe('2024-01-05');
    });

    it('should format date correctly with double-digit month and day', () => {
      const date = new Date(2024, 11, 25); // December 25, 2024
      expect(convertDateToYYYYMMDD(date)).toBe('2024-12-25');
    });

    it('should handle last day of the year', () => {
      const date = new Date(2024, 11, 31); // December 31, 2024
      expect(convertDateToYYYYMMDD(date)).toBe('2024-12-31');
    });

    it('should handle first day of the year', () => {
      const date = new Date(2024, 0, 1); // January 1, 2024
      expect(convertDateToYYYYMMDD(date)).toBe('2024-01-01');
    });

    it('should handle leap year date', () => {
      const date = new Date(2024, 1, 29); // February 29, 2024
      expect(convertDateToYYYYMMDD(date)).toBe('2024-02-29');
    });
  });

  describe('extractDay', () => {
    it('should return single-digit day with leading zero', () => {
      const date = new Date(2024, 0, 5); // January 5, 2024
      expect(extractDay(date)).toBe('05');
    });

    it('should return double-digit day as is', () => {
      const date = new Date(2024, 0, 15); // January 15, 2024
      expect(extractDay(date)).toBe('15');
    });

    it('should handle first day of month', () => {
      const date = new Date(2024, 0, 1); // January 1, 2024
      expect(extractDay(date)).toBe('01');
    });

    it('should handle last day of month', () => {
      const date = new Date(2024, 0, 31); // January 31, 2024
      expect(extractDay(date)).toBe('31');
    });

    it('should handle last day of different months', () => {
      const months = [
        { month: 1, lastDay: 29 }, // February 2024 (leap year)
        { month: 3, lastDay: 30 }, // April
        { month: 4, lastDay: 31 }, // May
      ];

      months.forEach(({ month, lastDay }) => {
        const date = new Date(2024, month, lastDay);
        expect(extractDay(date)).toBe(String(lastDay).padStart(2, '0'));
      });
    });
  });

  describe('dateUtils', () => {
    describe('formatDateTime', () => {
      // Set up a fixed timezone for all tests
      beforeEach(() => {
        // Mock timezone to UTC
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it('formats a valid ISO date string correctly', () => {
        const isoDate = '2024-11-19T11:09:15.172195+05:30';
        const result = formatDateTime(isoDate);

        expect(result).toMatch(
          /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat), \d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} at \d{1,2}:\d{2} (AM|PM)$/
        );
      });

      it('handles different times of day correctly', () => {
        // Testing specific times with mock date
        const mockDate = new Date('2024-01-01T09:00:00');
        vi.setSystemTime(mockDate);

        // Test morning time (9 AM)
        let result = formatDateTime('2024-01-01T09:00:00');
        expect(result).toContain('9:00 AM');

        // Test afternoon time (2 PM)
        result = formatDateTime('2024-01-01T14:00:00');
        expect(result).toContain('2:00 PM');

        // Test midnight
        result = formatDateTime('2024-01-01T00:00:00');
        expect(result).toContain('12:00 AM');

        // Test noon
        result = formatDateTime('2024-01-01T12:00:00');
        expect(result).toContain('12:00 PM');
      });

      it('formats minutes with leading zeros', () => {
        const result = formatDateTime('2024-01-01T12:05:00');
        expect(result).toContain(':05');
      });

      it('converts 24-hour format to 12-hour format correctly', () => {
        const testCases = [
          { input: '2024-01-01T00:00:00', expectedTime: '12:00 AM' },
          { input: '2024-01-01T12:00:00', expectedTime: '12:00 PM' },
          { input: '2024-01-01T13:00:00', expectedTime: '1:00 PM' },
          { input: '2024-01-01T23:00:00', expectedTime: '11:00 PM' },
        ];

        testCases.forEach(({ input, expectedTime }) => {
          const result = formatDateTime(input);
          expect(result).toContain(expectedTime);
        });
      });

      it('handles different dates correctly', () => {
        const mockDate = new Date('2024-12-25T12:00:00');
        vi.setSystemTime(mockDate);

        const result = formatDateTime('2024-12-25T12:00:00');

        expect(result).toContain('Wed');
        expect(result).toContain('25');
        expect(result).toContain('Dec');
        expect(result).toContain('2024');
      });

      it('throws error for invalid date strings', () => {
        const invalidDates = [
          '',
          'invalid-date',
          '2024-13-01T00:00:00', // invalid month
          '2024-12-32T00:00:00', // invalid day
        ];

        invalidDates.forEach((invalidDate) => {
          expect(() => formatDateTime(invalidDate)).toThrow(
            'Failed to parse date'
          );
        });

        /*    // Test null and undefined separately
        expect(() => formatDateTime(null as any)).toThrow(
          'Failed to parse date: Date string is required'
        );

        expect(() => formatDateTime(undefined as any)).toThrow(
          'Failed to parse date: Date string is required'
        ); */
      });

      it('formats a specific date-time correctly', () => {
        // Set a specific fixed time
        const specificDate = new Date('2024-11-19T11:09:15.172195+05:30');
        vi.setSystemTime(specificDate);

        const result = formatDateTime('2024-11-19T11:09:15.172195+05:30');

        // Test the exact format we expect
        const parts = result.split(' at ');
        expect(parts[0]).toBe('Tue, 19 Nov 2024');
        expect(parts[1]).toMatch(/^(1[0-2]|[1-9]):[0-5][0-9] (AM|PM)$/);
      });
    });
  });

  describe('isDateAfter', () => {
    it('should return true when end date is after start date', () => {
      const startDate = '2024-01-01';
      const endDate = '2024-01-02';

      expect(isDateAfter(startDate, endDate)).toBe(true);
    });

    it('should return false when end date is before start date', () => {
      const startDate = '2024-01-02';
      const endDate = '2024-01-01';

      expect(isDateAfter(startDate, endDate)).toBe(false);
    });

    it('should return true when dates are undefined', () => {
      expect(isDateAfter(undefined, undefined)).toBe(true);
    });

    it('should return true when start date is undefined', () => {
      const endDate = '2024-01-01';

      expect(isDateAfter(undefined, endDate)).toBe(true);
    });

    it('should return true when end date is undefined', () => {
      const startDate = '2024-01-01';

      expect(isDateAfter(startDate, undefined)).toBe(true);
    });

    it('should handle same dates correctly', () => {
      const date = '2024-01-01';

      expect(isDateAfter(date, date)).toBe(false);
    });

    it('should handle different date formats', () => {
      const startDate = '2024-01-01T00:00:00.000Z';
      const endDate = '2024-01-02';

      expect(isDateAfter(startDate, endDate)).toBe(true);
    });

    it('should handle dates with times', () => {
      const startDate = '2024-01-01 10:00:00';
      const endDate = '2024-01-01 11:00:00';

      expect(isDateAfter(startDate, endDate)).toBe(true);
    });

    it('should handle dates across different months', () => {
      const startDate = '2024-01-31';
      const endDate = '2024-02-01';

      expect(isDateAfter(startDate, endDate)).toBe(true);
    });

    it('should handle dates across different years', () => {
      const startDate = '2023-12-31';
      const endDate = '2024-01-01';

      expect(isDateAfter(startDate, endDate)).toBe(true);
    });
  });

  describe('convertTo24HourFormat', () => {
    it('should convert 12:00 AM to 00:00', () => {
      expect(convertTo24HourFormat('12', '00', 'AM')).toBe('00:00');
    });

    it('should convert 12:30 AM to 00:30', () => {
      expect(convertTo24HourFormat('12', '30', 'AM')).toBe('00:30');
    });

    it('should convert 1:00 AM to 01:00', () => {
      expect(convertTo24HourFormat('1', '00', 'AM')).toBe('01:00');
    });

    it('should convert 11:59 AM to 11:59', () => {
      expect(convertTo24HourFormat('11', '59', 'AM')).toBe('11:59');
    });

    it('should convert 12:00 PM to 12:00', () => {
      expect(convertTo24HourFormat('12', '00', 'PM')).toBe('12:00');
    });

    it('should convert 12:45 PM to 12:45', () => {
      expect(convertTo24HourFormat('12', '45', 'PM')).toBe('12:45');
    });

    it('should convert 1:00 PM to 13:00', () => {
      expect(convertTo24HourFormat('1', '00', 'PM')).toBe('13:00');
    });

    it('should convert 11:59 PM to 23:59', () => {
      expect(convertTo24HourFormat('11', '59', 'PM')).toBe('23:59');
    });

    it('should handle single digit hours with leading zeros', () => {
      expect(convertTo24HourFormat('01', '00', 'AM')).toBe('01:00');
      expect(convertTo24HourFormat('09', '15', 'AM')).toBe('09:15');
    });

    it('should handle single digit minutes with leading zeros', () => {
      expect(convertTo24HourFormat('3', '05', 'PM')).toBe('15:05');
      expect(convertTo24HourFormat('7', '09', 'AM')).toBe('07:09');
    });

    it('should handle case-insensitive AM/PM', () => {
      expect(convertTo24HourFormat('1', '00', 'am')).toBe('01:00');
      expect(convertTo24HourFormat('1', '00', 'Am')).toBe('01:00');
      expect(convertTo24HourFormat('1', '00', 'pM')).toBe('13:00');
    });

    it('should pad hours and minutes with leading zeros', () => {
      expect(convertTo24HourFormat('6', '8', 'AM')).toBe('06:08');
      expect(convertTo24HourFormat('4', '3', 'PM')).toBe('16:03');
    });

    it('should handle various noon and midnight edge cases', () => {
      expect(convertTo24HourFormat('12', '01', 'AM')).toBe('00:01');
      expect(convertTo24HourFormat('12', '59', 'AM')).toBe('00:59');
      expect(convertTo24HourFormat('12', '01', 'PM')).toBe('12:01');
      expect(convertTo24HourFormat('12', '59', 'PM')).toBe('12:59');
    });
  });

  describe('convertTimeToMinutes', () => {
    it('should convert 12:00 AM to 0 minutes', () => {
      expect(convertTimeToMinutes('12', '00', 'AM')).toBe(0);
    });

    it('should convert 12:30 AM to 30 minutes', () => {
      expect(convertTimeToMinutes('12', '30', 'AM')).toBe(30);
    });

    it('should convert 1:00 AM to 60 minutes', () => {
      expect(convertTimeToMinutes('1', '00', 'AM')).toBe(60);
    });

    it('should convert 11:59 AM to 719 minutes', () => {
      expect(convertTimeToMinutes('11', '59', 'AM')).toBe(719);
    });

    it('should convert 12:00 PM to 720 minutes (12 hours)', () => {
      expect(convertTimeToMinutes('12', '00', 'PM')).toBe(720);
    });

    it('should convert 12:45 PM to 765 minutes', () => {
      expect(convertTimeToMinutes('12', '45', 'PM')).toBe(765);
    });

    it('should convert 1:00 PM to 780 minutes (13 hours)', () => {
      expect(convertTimeToMinutes('1', '00', 'PM')).toBe(780);
    });

    it('should convert 11:59 PM to 1439 minutes (23 hours 59 minutes)', () => {
      expect(convertTimeToMinutes('11', '59', 'PM')).toBe(1439);
    });

    it('should handle various times throughout the day', () => {
      expect(convertTimeToMinutes('6', '30', 'AM')).toBe(390); // 6.5 * 60
      expect(convertTimeToMinutes('3', '15', 'PM')).toBe(915); // 15.25 * 60
      expect(convertTimeToMinutes('5', '45', 'PM')).toBe(1065); // 17.75 * 60
    });

    it('should handle case-insensitive AM/PM', () => {
      expect(convertTimeToMinutes('1', '00', 'am')).toBe(60);
      expect(convertTimeToMinutes('1', '00', 'Am')).toBe(60);
      expect(convertTimeToMinutes('1', '00', 'pM')).toBe(780);
    });

    it('should calculate correct differences for comparison', () => {
      const startTime = convertTimeToMinutes('9', '00', 'AM');
      const endTime = convertTimeToMinutes('5', '00', 'PM');
      expect(endTime - startTime).toBe(480); // 8 hours difference
    });

    it('should handle midnight edge case', () => {
      expect(convertTimeToMinutes('12', '01', 'AM')).toBe(1);
      expect(convertTimeToMinutes('12', '59', 'AM')).toBe(59);
    });

    it('should handle noon edge case', () => {
      expect(convertTimeToMinutes('12', '01', 'PM')).toBe(721);
      expect(convertTimeToMinutes('12', '59', 'PM')).toBe(779);
    });

    it('should correctly compare same times in different formats', () => {
      const morning = convertTimeToMinutes('10', '30', 'AM');
      const evening = convertTimeToMinutes('10', '30', 'PM');
      expect(evening - morning).toBe(720); // 12 hours difference
    });
  });
});
