# 🎄 Advent of Code - TypeScript

My solutions for [Advent of Code](https://adventofcode.com/) written in TypeScript. I used AI to scaffold the project structure and utility functions to speed up development.

The solutions are all written by a human (me!), without AI assistance.

## Setup

### Prerequisites

- Node.js 18+ or Bun
- npm or yarn

### Installation

```bash
npm install
```

## Usage

### Running Solutions

Run a specific day:

```bash
npm run day src/2025/day01/solution.ts
```

Run with watch mode (auto-rerun on save):

```bash
tsx --watch src/2025/day01/solution.ts
```

### Creating a New Day

Use the setup script to scaffold a new day:

```bash
./setup-day.sh 1
```

This creates:

- `src/2025/dayXX/solution.ts` - Solution template
- `src/2025/dayXX/input.txt` - Your puzzle input (paste from AoC)
- `src/2025/dayXX/example.txt` - Example input from puzzle description

## Project Structure

```
advent-of-code/
├── src/
│   ├── 2025/
│   │   ├── day01/
│   │   │   ├── solution.ts
│   │   │   ├── input.txt      (gitignored)
│   │   │   └── example.txt
│   │   └── day02/
│   │       └── ...
│   └── utils/
│       ├── input.ts           # File reading helpers
│       ├── grid.ts            # 2D grid utilities
│       ├── math.ts            # Math helpers (gcd, lcm, etc.)
│       ├── collections.ts     # Array/Map/Set utilities
│       └── search.ts          # BFS, DFS, Dijkstra
├── setup-day.sh
├── package.json
└── tsconfig.json
```

## Utilities

The `src/utils/` directory contains helpful functions for common AoC patterns:

### Input Parsing (`input.ts`)

- `readInput()` - Read entire file as string
- `readLines()` - Read as array of lines
- `readNumbers()` - Read as array of numbers
- `readGrid()` - Read as 2D character grid
- `readBlocks()` - Read blocks separated by blank lines

### Grid Operations (`grid.ts`)

- `DIRECTIONS` - Cardinal direction vectors (N, S, E, W)
- `DIRECTIONS_8` - All 8 directions including diagonals
- `inBounds()` - Check if position is within grid
- `getNeighbors()` - Get valid neighbors (4 or 8 directions)
- `printGrid()` - Debug print a grid

### Math (`math.ts`)

- `gcd()` - Greatest Common Divisor
- `lcm()` - Least Common Multiple
- `sum()`, `product()` - Array aggregation
- `range()` - Generate number ranges

### Collections (`collections.ts`)

- `counter()` - Count occurrences
- `groupBy()` - Group items by key
- `uniqueBy()` - Get unique items by key
- `chunk()` - Split array into chunks

### Search Algorithms (`search.ts`)

- `bfs()` - Breadth-First Search
- `dfs()` - Depth-First Search
- `dijkstra()` - Shortest path with weights

## Example Solution

```typescript
import { readInput, readLines } from '../../utils/input.js';
import { sum } from '../../utils/math.js';

const lines = readLines('input.txt', import.meta.url);

function part1(lines: string[]): number {
  const numbers = lines.map(Number);
  return sum(numbers);
}

function part2(lines: string[]): number {
  // Part 2 solution
  return 0;
}

console.log('Part 1:', part1(lines));
console.log('Part 2:', part2(lines));
```

## Development Tips

1. **Start with the example** - Test against the example input first
2. **Use watch mode** - `tsx --watch` for instant feedback
3. **Import utilities** - Don't rewrite common patterns
4. **Comment out part 2** - Until you've solved part 1

## License

MIT
