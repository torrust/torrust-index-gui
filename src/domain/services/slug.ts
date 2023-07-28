export function generateSlug (input: string): string {
  return input
    .toLowerCase()
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with -
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
