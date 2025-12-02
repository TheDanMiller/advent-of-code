import { readInput, readLines } from '../../utils/input.js';

const lines = readLines('input.txt', import.meta.url);
const wrapDial = (position: number): number => {
  while (position < 0) position += 100;
  while (position > 99) position -= 100;
  return position;
};

function part1(input: string[]): number {
  /*
  1. Create variable that holds opening value
  2. Read each input
  3. Perform calculation
  4. Compare and see if 0
    */
  let dialPosition = 50;
  let passWord = 0;
  for (const line of input) {
    let direction = line[0];
    let value = parseInt(line.slice(1));
    if (direction === 'L') {
      dialPosition -= value;
    } else if (direction === 'R') {
      dialPosition += value;
    }
    dialPosition = wrapDial(dialPosition);
    if (dialPosition === 0) {
      passWord += 1;
    }
  }
  return passWord;
}

function part2(input: string[]): number {
  let dialPosition = 50;
  let passWord = 0;

  for (const line of input) {
    const direction = line[0];
    const value = parseInt(line.slice(1));
    const step = direction === 'L' ? -1 : 1;

    for (let i = 0; i < value; i++) {
      dialPosition = wrapDial(dialPosition + step);
      if (dialPosition === 0) {
        passWord += 1;
      }
    }
  }
  return passWord;
}

// Example tests
const example = readLines('example.txt', import.meta.url);
console.log('Example Part 1:', part1(example));
console.log('Example Part 2:', part2(example));

console.log('\n--- Actual Input ---');
console.log('Part 1:', part1(lines));
console.log('Part 2:', part2(lines));
