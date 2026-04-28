/**
 * Extracts a descriptive product name from an image path.
 * If the filename is just a number or too short, it falls back to a generic name including the category.
 */
export function getProductNameFromImage(img: string, categoryName: string): string {
  let rawFName = img.split('/').pop()?.replace(/\.[^/.]+$/, "") || "";
  
  // If the filename starts with a number or is just a single number/short string,
  // it might not be descriptive, so we use the category name.
  if (/^\d+/.test(rawFName) || rawFName.length <= 2) {
    rawFName = `Premium ${categoryName}`;
  }
  
  // Replace underscores and hyphens with spaces for better readability
  return rawFName.replace(/[-_]/g, ' ');
}
