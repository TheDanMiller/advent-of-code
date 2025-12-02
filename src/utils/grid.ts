export type Point = { x: number; y: number };
export type Direction = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';

/**
 * Cardinal direction vectors
 */
export const DIRECTIONS = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
} as const;

/**
 * All 8 directions (including diagonals)
 */
export const DIRECTIONS_8 = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
  NE: { x: 1, y: -1 },
  NW: { x: -1, y: -1 },
  SE: { x: 1, y: 1 },
  SW: { x: -1, y: 1 },
} as const;

/**
 * Check if a position is within grid bounds
 */
export const inBounds = (grid: any[][], x: number, y: number): boolean => {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
};

/**
 * Get all valid cardinal neighbors of a position
 */
export const getNeighbors = (grid: any[][], x: number, y: number): Point[] => {
  return Object.values(DIRECTIONS)
    .map(d => ({ x: x + d.x, y: y + d.y }))
    .filter(p => inBounds(grid, p.x, p.y));
};

/**
 * Get all valid neighbors including diagonals
 */
export const getNeighbors8 = (grid: any[][], x: number, y: number): Point[] => {
  return Object.values(DIRECTIONS_8)
    .map(d => ({ x: x + d.x, y: y + d.y }))
    .filter(p => inBounds(grid, p.x, p.y));
};

/**
 * Print a grid for debugging
 */
export const printGrid = (grid: any[][]): void => {
  for (const row of grid) {
    console.log(row.join(''));
  }
};
