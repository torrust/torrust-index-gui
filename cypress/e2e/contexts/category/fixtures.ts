export function random_category_name (): string {
  return `category-${random_category_id()}`;
}

function random_category_id (): number {
  return Math.floor(Math.random() * 1000000);
}
