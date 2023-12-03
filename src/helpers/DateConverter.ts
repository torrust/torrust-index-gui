type UnixTime = number;

class InvalidDateError extends Error {}
class WrongTimestamp extends Error {}

// Takes the date in seconds from Epoch time and converts it to human readable format.

export function unixTimeToHumanReadableUTC (creationDate: UnixTime) {
  let milliseconds;
  let convertedDate;
  try {
    milliseconds = creationDate * 1000;
  } catch (error) {
    return new WrongTimestamp(`Could not convert ${creationDate} to milliseconds`);
  }
  try {
    convertedDate = new Date(milliseconds);
  } catch (error) {
    return new InvalidDateError(`Could not create a new date from ${milliseconds}`);
  }
  return !isNaN(convertedDate.valueOf()) ? convertedDate.toDateString() : new InvalidDateError(`Could not create a valid date from ${milliseconds}`);
}
