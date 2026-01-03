import { DateFormat, TimeFormat } from '@definitions/settingsTypes';

export const formatTime = (
  date: Date,
  timeFormat: TimeFormat,
  timezone?: string
): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: timeFormat === '12h',
    timeZone: timezone,
  });
};

export const formatDate = (
  date: Date,
  dateFormat: DateFormat,
  timezone?: string
): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: timezone,
  };

  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  const [day, month, year] = formattedDate.split('/');

  return dateFormat === 'DD/MM/YYYY'
    ? `${day}-${month}-${year}`
    : `${month}-${day}-${year}`;
};
