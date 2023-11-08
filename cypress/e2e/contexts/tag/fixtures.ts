export function random_tag_name (): string {
  return `tag-${random_tag_id()}`;
}

function random_tag_id (): number {
  return Math.floor(Math.random() * 1000000);
}
