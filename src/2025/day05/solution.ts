import { readLines } from '../../utils/input.js';

const lines = readLines('input.txt', import.meta.url);
const example = readLines('example.txt', import.meta.url);

function part1(input: string[]): number {
  let index = 0;
  let freshRanges: [number, number][] = [];
  let freshFoodCount = 0;
  for (const line of input) {
    index++;
    // console.log('Line', index, ':', line);
    if (line === '') {
      // console.log('Found empty line at index', index);
      break;
    }
    let range = line.split('-').map(Number);
    freshRanges.push([range[0], range[1]]);
    // console.log('Range:', range);
  }
  for (let i = index; i < input.length; i++) {
    // console.log('Post-empty line', i + 1, ':', input[i]);
    const num = Number(input[i]);
    if (freshRanges.some(([min, max]) => num >= min && num <= max)) {
      freshFoodCount++;
    }
  }
  return freshFoodCount;
}

function part2(input: string[]): number {
  let freshFoodCount = 0;
  let freshRanges: [number, number][] = [];
  let consolidatedRanges: [number, number][] = [];
  // grab all the ranges
  for (const line of input) {
    if (line === '') {
      // console.log('Found empty line at index', index);
      break;
    }
    let range = line.split('-').map(Number);
    if (range[0] <= range[1]) {
      freshRanges.push([range[0], range[1]]);
    } else {
      freshRanges.push([range[1], range[0]]);
      console.warn('Backwards range found', range);
    }
  }

  // consolidate overlapping ranges
  freshRanges.sort((a, b) => a[0] - b[0]); // sort by min
  // console.log('Sorted Ranges:', freshRanges);
  consolidatedRanges.push(freshRanges[0]);
  for (let i = 1; i < freshRanges.length; i++) {
    const [currentMin, currentMax] = freshRanges[i];
    const lastConsolidated = consolidatedRanges[consolidatedRanges.length - 1];
    if (currentMin <= lastConsolidated[1] + 1) {
      // overlap or contiguous
      lastConsolidated[1] = Math.max(lastConsolidated[1], currentMax);
    } else {
      consolidatedRanges.push([currentMin, currentMax]);
    }
  }
  // console.log('Consolidated Ranges:', consolidatedRanges);

  for (const [min, max] of consolidatedRanges) {
    freshFoodCount += max - min + 1;
  }
  return freshFoodCount;
}

// Example tests

console.log('Example Part 1:', part1(example));
console.log('Example Part 2:', part2(example));

console.log('\n--- Actual Input ---');
console.log('Part 1:', part1(lines));
console.log('Part 2:', part2(lines));
