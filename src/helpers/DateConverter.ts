type UnixTimestamp = number;
type FormattedDate = string;

class InvalidDateError extends Error {}

/**
 * Takes the date in seconds from Unix Epoch time and converts it to human readable format.
 *
 * For example: 1701688451 -> "Mon Dec 04 2023"
 */

export function formatTimestamp (creationDate: UnixTimestamp): FormattedDate | Error {
  const milliseconds = creationDate * 1000;

  const convertedDate = new Date(milliseconds);

  return isNaN(convertedDate.valueOf())
    ? new InvalidDateError(
      `Invalid date. Could not create a new date from timestamp value: ${creationDate}`)
    : convertedDate.toDateString();
}
