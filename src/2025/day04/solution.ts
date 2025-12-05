import { getNeighbors, getNeighbors8 } from '@utils/grid.js';
import { readGrid } from '../../utils/input.js';

const input = readGrid('input.txt', import.meta.url);

function part1(input: string[][]): number {
  // console.log(input);
  /* 
  1. Iterate through each row and column of the grid.
  2. For each cell, check its neighbors (up, down, left, right).
  3. Check each up, down, left, right neighbor for an @ symbol.
  4 if fewer than 4 neighbors have @, increment a counter.
  5. Return the counter.
  */
  let forkliftAccess = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] !== '@') continue;
      // console.log(`Checking position (${x}, ${y} with value ${input[y][x]})`);
      let adjacentPositons = getNeighbors8(input, x, y).filter(
        (pos) => input[pos.y][pos.x] === '@'
      );
      if (adjacentPositons.length < 4) {
        forkliftAccess++;
      }
    }
  }
  return forkliftAccess;
}

function part2(input: string[][]): number {
  let forkliftAccess = 0;
  let removedRoles = 0;
  let removingPaper = true;
  while (removingPaper) {
    // outer while loop for rounds of removal
    // tracks positions to be removed this pass
    let toBeRemoved: { x: number; y: number }[] = [];
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        if (input[y][x] !== '@') continue;
        // console.log(`Checking position (${x}, ${y} with value ${input[y][x]})`);
        let adjacentPositons = getNeighbors8(input, x, y).filter(
          (pos) => input[pos.y][pos.x] === '@'
        );
        if (adjacentPositons.length < 4) {
          toBeRemoved.push({ x, y });
          forkliftAccess++;
        }
      }
    }
    // check if we are done looping -- could create a forever loop
    if (toBeRemoved.length <= 0) {
      removingPaper = false;
    }
    // update the grid for remove roles and increment
    for (const pos of toBeRemoved) {
      input[pos.y][pos.x] = '.';
      removedRoles++;
    }
    // debugging statement for working with the example values
    // console.log(`Removed ${toBeRemoved.length} this round.`);
  }
  return removedRoles;
}

// Example tests
const example = readGrid('example.txt', import.meta.url);
console.log('Example Part 1:', part1(example));
console.log('Example Part 2:', part2(example));

console.log('\n--- Actual Input ---');
console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
