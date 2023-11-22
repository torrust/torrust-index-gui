type UnixTime = number;

/*
  Takes the date in seconds from Epoch time and converts it to human readable format.
  Date() can only work with integers between -8640000000000000 and 8640000000000000 to create a new Date object.
*/

export function unixTimeToHumanReadableUTC (seconds: UnixTime) {
  if (Number.isInteger(seconds) && seconds < 8640000000000000 && seconds > -8640000000000000) {
    const milliseconds = seconds * 1000;
    return new Date(milliseconds).toDateString();
  } else {
    return "Invalid date";
  }
}
