/**
 * Breadth-First Search
 */
export const bfs = <T>(
  start: T,
  getNeighbors: (node: T) => T[],
  isTarget: (node: T) => boolean,
  getKey: (node: T) => string = JSON.stringify
): T | null => {
  const queue: T[] = [start];
  const visited = new Set<string>([getKey(start)]);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (isTarget(current)) return current;

    for (const neighbor of getNeighbors(current)) {
      const key = getKey(neighbor);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push(neighbor);
      }
    }
  }
  return null;
};

/**
 * Depth-First Search
 */
export const dfs = <T>(
  start: T,
  getNeighbors: (node: T) => T[],
  isTarget: (node: T) => boolean,
  getKey: (node: T) => string = JSON.stringify
): T | null => {
  const stack: T[] = [start];
  const visited = new Set<string>([getKey(start)]);

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (isTarget(current)) return current;

    for (const neighbor of getNeighbors(current)) {
      const key = getKey(neighbor);
      if (!visited.has(key)) {
        visited.add(key);
        stack.push(neighbor);
      }
    }
  }
  return null;
};

/**
 * Dijkstra's shortest path algorithm
 */
export const dijkstra = <T>(
  start: T,
  getNeighbors: (node: T) => Array<[T, number]>,
  isTarget: (node: T) => boolean,
  getKey: (node: T) => string = JSON.stringify
): { node: T | null; distance: number } => {
  const distances = new Map<string, number>();
  const pq: Array<[T, number]> = [[start, 0]];
  const visited = new Set<string>();
  
  distances.set(getKey(start), 0);

  while (pq.length > 0) {
    // Simple priority queue - sort by distance
    pq.sort((a, b) => a[1] - b[1]);
    const [current, dist] = pq.shift()!;
    const currentKey = getKey(current);

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (isTarget(current)) {
      return { node: current, distance: dist };
    }

    for (const [neighbor, weight] of getNeighbors(current)) {
      const neighborKey = getKey(neighbor);
      const newDist = dist + weight;
      
      if (!distances.has(neighborKey) || newDist < distances.get(neighborKey)!) {
        distances.set(neighborKey, newDist);
        pq.push([neighbor, newDist]);
      }
    }
  }

  return { node: null, distance: Infinity };
};
