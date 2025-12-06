import { parse } from 'path';
import { readGrid, readLines } from '../../utils/input.js';
import { printGrid, rotateGrid90 } from '@utils/grid.js';

const grid = readGrid('input.txt', import.meta.url);
const lines = readLines('input.txt', import.meta.url);
type Problem = {
  operand: string | null;
  values: number[];
};

function part1(input: string[]): number {
  let rotatedProblems: Problem[] = [];
  let lineNumber = 0;
  let total = 0;

  for (const line of input) {
    let split = line.trim().split(/\s+/);

    split.map((x, index) => {
      if (lineNumber === 0) {
        rotatedProblems.push({
          operand: null,
          values: [],
        });
      }
      let convertedX = Number(x);
      if (isNaN(convertedX)) {
        rotatedProblems[index].operand = x;
      } else {
        rotatedProblems[index].values.push(convertedX);
      }
    });
    lineNumber++;
  }
  // console.log(rotatedProblems);
  for (const problem of rotatedProblems) {
    if (problem.operand === '+') {
      total += problem.values.reduce((a, b) => a + b, 0);
    } else if (problem.operand === '*') {
      total += problem.values.reduce((a, b) => a * b, 1);
    }
  }
  return total;
}

function part2(input: string[]): number {
  /*
  1. Make all lines the same legnth by padding with spaces
  2. Identify all space columns to separate problems
  3. Split into problem chunks
  4. For each problem chunk, read columns right-to-left, reading vertically to form numbers
  5. Apply operator and sum results
  */
  // Find the maximum line length
  const maxLength = Math.max(...input.map((line) => line.length));

  // Make all lines to the same length
  const updatedLines = input.map((line) => line.padEnd(maxLength, ' '));

  // Identify problem boundaries
  const problemBoundaries: number[] = [];
  for (let col = 0; col < maxLength; col++) {
    let isAllSpaces = true;
    for (let row = 0; row < updatedLines.length - 1; row++) {
      // Check all rows except operator row
      if (updatedLines[row][col] !== ' ') {
        isAllSpaces = false;
        break;
      }
    }
    if (isAllSpaces) {
      problemBoundaries.push(col);
    }
  }
  // Split into problem chunks
  const problems: string[][] = [];
  let startCol = 0;

  for (const boundary of problemBoundaries) {
    if (boundary > startCol) {
      const problemChunk = updatedLines.map((line) => line.substring(startCol, boundary));
      problems.push(problemChunk);
    }
    startCol = boundary + 1;
  }

  // Last problem
  if (startCol < maxLength) {
    const problemChunk = updatedLines.map((line) => line.substring(startCol));
    problems.push(problemChunk);
  }

  // console.log(`Found ${problems.length} problems`);

  let grandTotal = 0;

  // Process each problem right-to-left
  problems.forEach((problem) => {
    const problemWidth = problem[0].length;
    const operator = problem[problem.length - 1].trim();

    const numbers: number[] = [];

    // Read columns right-to-left (reverse column order)
    for (let col = problemWidth - 1; col >= 0; col--) {
      let verticalNumber = '';

      // Read vertically (top to bottom) in this column
      for (let row = 0; row < problem.length - 1; row++) {
        // Exclude operator row
        const char = problem[row][col];
        if (char >= '0' && char <= '9') {
          verticalNumber += char;
        }
      }

      if (verticalNumber) {
        numbers.push(Number(verticalNumber));
      }
    }

    // Calculate result
    if (numbers.length > 0) {
      let result = 0;
      if (operator === '+') {
        result = numbers.reduce((a, b) => a + b, 0);
      } else if (operator === '*') {
        result = numbers.reduce((a, b) => a * b, 1);
      }
      grandTotal += result;
    }
  });

  return grandTotal;
}

// Example tests

// Example tests
const example = readLines('example.txt', import.meta.url);
console.log('Example Part 1:', part1(example));
console.log('Example Part 2:', part2(example));

console.log('\n--- Actual Input ---');
console.log('Part 1:', part1(lines));
console.log('Part 2:', part2(lines));
