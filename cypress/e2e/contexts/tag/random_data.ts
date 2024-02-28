// Logic for generating random data for tests

export function randomTagName (): string {
  return `tag-${randomTagId()}`;
}
function randomTagId (): number {
  return Math.floor(Math.random() * 1000000);
}
