import { product } from '@utils/math.js';
import { readInput, readLines } from '../../utils/input.js';
import { parse } from 'path';
import { chunk } from '@utils/collections.js';

const input = readInput('input.txt', import.meta.url);
const lines = readLines('input.txt', import.meta.url);

function part1(input: string): number {
  /*
  1. split by commas into array
  2. forEach string in array split by dash to get two strings
  3. remove leading 0s from each string
  4. if strings can be split in half and the two halves are the same then add to sum
  5. return sum
    */
  let sumInvalidIds = 0;
  input.split(',').forEach((rangeStr) => {
    const [startId, endId] = rangeStr.split('-');
    let startRange = parseInt(startId);
    let endRange = parseInt(endId);

    for (let prodId = startRange; prodId <= endRange; prodId++) {
      const idStr = prodId.toString();
      if (idStr.length % 2 !== 0) continue; // Skip if length is odd
      const half = Math.floor(idStr.length / 2);
      let isValid = true;
      for (let i = 0; i < half; i++) {
        if (idStr[i] !== idStr[i + half]) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        sumInvalidIds += prodId;
      }
    }
  });
  return sumInvalidIds;
}

function part2(input: string): number {
  /*
  1. split by commas into array
  2. forEach string in array split by dash to get two strings
  3. remove leading 0s from each string
  4. iterate range and check if each id meets criteria
  5. find patterns in digits 111, 121212, 12341234 (repeating sequences of digits)
  6. return sum
    */
  let sumInvalidIds = 0;
  input.split(',').forEach((rangeStr) => {
    const [startId, endId] = rangeStr.split('-');
    let startRange = parseInt(startId);
    let endRange = parseInt(endId);

    for (let prodId = startRange; prodId <= endRange; prodId++) {
      const idStr = prodId.toString();
      let isValid = false;

      // Check for repeating sequences
      for (
        let sequenceLength = 1;
        sequenceLength <= Math.floor(idStr.length / 2);
        sequenceLength++
      ) {
        // Sequence length must divide the string length evenly
        if (idStr.length % sequenceLength !== 0) continue;
        const sequence = idStr.slice(0, sequenceLength);
        // console.log(`Checking sequence: ${sequence} for ID: ${idStr}`);
        const chunkedArray = chunk(idStr.split(''), sequenceLength);
        if (chunkedArray.every((chunk) => chunk.join('') === sequence)) {
          isValid = true;
          // console.log(`Found sequence: ${sequence} for ID: ${idStr}`);
          sumInvalidIds += prodId;
          break;
        }
      }
    }
  });
  return sumInvalidIds;
}

// Example tests
const example = readInput('example.txt', import.meta.url);
// console.log('Example Part 1:', part1(example));
// console.log('Example Part 2:', part2(example));

console.log('\n--- Actual Input ---');
console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
