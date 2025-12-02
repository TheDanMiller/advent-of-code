#!/bin/bash

# Setup script for creating a new Advent of Code day

if [ -z "$1" ]; then
  echo "Usage: ./setup-day.sh <day_number>"
  echo "Example: ./setup-day.sh 5"
  exit 1
fi

DAY=$(printf "%02d" $1)
YEAR="2025"
DIR="src/$YEAR/day$DAY"

if [ -d "$DIR" ]; then
  echo "❌ Day $DAY already exists at $DIR"
  exit 1
fi

echo "📁 Creating directory: $DIR"
mkdir -p "$DIR"

# Create solution.ts
cat > "$DIR/solution.ts" << 'EOF'
import { readInput, readLines } from '../../utils/input.js';

const input = readInput('input.txt', import.meta.url);
const lines = readLines('input.txt', import.meta.url);

function part1(input: string): number {
  // TODO: Implement Part 1
  return 0;
}

function part2(input: string): number {
  // TODO: Implement Part 2
  return 0;
}

// Example tests
const example = readInput('example.txt', import.meta.url);
console.log('Example Part 1:', part1(example));
// console.log('Example Part 2:', part2(example));

console.log('\n--- Actual Input ---');
console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
EOF

# Create empty input files
touch "$DIR/input.txt"
touch "$DIR/example.txt"

echo "✅ Created day $DAY!"
echo ""
echo "Next steps:"
echo "  1. Copy your puzzle input to: $DIR/input.txt"
echo "  2. Copy the example from the puzzle to: $DIR/example.txt"
echo "  3. Run with: npm run day src/$YEAR/day$DAY/solution.ts"
echo "  4. Or with watch mode: tsx --watch src/$YEAR/day$DAY/solution.ts"
