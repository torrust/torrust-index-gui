type UnixTime = number;

function isValidDate (date: Date) {
  return date instanceof Date && !isNaN(date.valueOf());
}

// Takes the date in seconds from Epoch time and converts it to human readable format.

export function unixTimeToHumanReadableUTC (seconds: UnixTime) {
  const milliseconds = seconds * 1000;
  const convertedDate = new Date(milliseconds);

  return isValidDate(convertedDate) ? convertedDate.toDateString() : "Invalid date";
}
