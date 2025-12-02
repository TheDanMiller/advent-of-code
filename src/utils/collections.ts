/**
 * Count occurrences of each item
 */
export const counter = <T>(items: T[]): Map<T, number> => {
  const map = new Map<T, number>();
  for (const item of items) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  return map;
};

/**
 * Get unique items by a key function
 */
export const uniqueBy = <T, K>(items: T[], keyFn: (item: T) => K): T[] => {
  const seen = new Set<K>();
  return items.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/**
 * Group items by a key function
 */
export const groupBy = <T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  const result = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    (result[key] ||= []).push(item);
  }
  return result;
};

/**
 * Create a deep copy of an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Chunk array into smaller arrays of specified size
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
