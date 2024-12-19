import { format, formatDistanceToNowStrict, parseISO ,differenceInHours} from 'date-fns';

/**
 * Calculates the time ago from a given date string.
 * @param dateString - The ISO date string to calculate the time ago.
 * @returns A formatted string representing the time ago (e.g., "3 hours ago").
 */
export function timeAgo(dateString: string): string {
  // Check if the dateString is valid
  if (!dateString) return '';

  // Parse the date string to ISO format and calculate the distance to now
  const date = parseISO(dateString);
  return formatDistanceToNowStrict(date, { addSuffix: true });
}

/**
 * Formats a given date string into a readable date and time format.
 * @param dateString - The ISO date string to format.
 * @returns A formatted string like "Nov 13, 2024 at 03:45 PM".
 */
export function formatUploadDateTime(dateString: string): string {
  if (!dateString) return '';

  // Parse the date string to ISO format
  const date = parseISO(dateString);

  // Get the difference in hours between the current date and the parsed date
  const hoursDifference = differenceInHours(new Date(), date);

  // If the difference is less than 24 hours, show the time (hh:mm a)
  if (hoursDifference < 24) {
    return format(date, "hh:mm a");
  }

  // If the difference is 24 hours or more, show the full date (MMM dd, yyyy)
  return format(date, "MMM dd, yyyy");
}
