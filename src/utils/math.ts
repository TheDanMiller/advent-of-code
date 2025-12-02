/**
 * Greatest Common Divisor
 */
export const gcd = (a: number, b: number): number => {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
};

/**
 * Least Common Multiple
 */
export const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

/**
 * Sum of array elements
 */
export const sum = (arr: number[]): number => {
  return arr.reduce((a, b) => a + b, 0);
};

/**
 * Product of array elements
 */
export const product = (arr: number[]): number => {
  return arr.reduce((a, b) => a * b, 1);
};

/**
 * Generate a range of numbers [start, end)
 */
export const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start }, (_, i) => start + i);
};

/**
 * Find minimum value in array
 */
export const min = (arr: number[]): number => {
  return Math.min(...arr);
};

/**
 * Find maximum value in array
 */
export const max = (arr: number[]): number => {
  return Math.max(...arr);
};
