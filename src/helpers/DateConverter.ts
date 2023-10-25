export function epochToUtc (date: number) {
  const convertedDate = new Date(date * 1000);
  return convertedDate.toDateString();
}
