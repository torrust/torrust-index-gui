type UnixTime = number;

class InvalidDateError extends Error {}

// Takes the date in seconds from Epoch time and converts it to human readable format.

export function unixTimeToHumanReadableUTC (creationDate: UnixTime) {
  try {
    return dateFromSeconds(creationDate);
  } catch (error) {
    return ("Invalid date");
  }
}

function dateFromSeconds (seconds: number) {
  if (!validateTimestamp(seconds))
  { throw new TypeError("Torrent creation date is not an integer"); }

  const milliseconds = seconds * 1000;
  const convertedDate = new Date(milliseconds);

  if (!validateDate(convertedDate))
  { throw new InvalidDateError("Date is not valid"); }

  return convertedDate.toDateString();
}

function validateDate (date: Date) {
  return date instanceof Date && !isNaN(date.valueOf());
}

function validateTimestamp (timestamp: UnixTime) {
  return Number.isInteger(timestamp);
}
