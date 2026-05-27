export type ClassValue = string | number | false | null | undefined;

/**
 * Join conditional class names, dropping falsy values. A dependency-free
 * stand-in for `clsx` that keeps `className` composition readable.
 */
export function cn(...values: readonly ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
