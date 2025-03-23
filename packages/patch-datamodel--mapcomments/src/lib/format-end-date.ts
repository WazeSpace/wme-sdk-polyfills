/**
 * Converts a date to a string accepted by the WME for the end date of a map comment.
 * @param date The date to format.
 * @returns The formatted date (in the format of 'YYYY-MM-DD HH:MM')
 */
export function formatEndDate(date: Date) {
  return date.toISOString().slice(0, 16).replace('T', ' ');
}
