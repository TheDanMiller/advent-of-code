import { readInput, readLines } from '../../utils/input.js';

const lines = readLines('input.txt', import.meta.url);

function findJoltageSequence(batteryBank: number[], numberToFind: number): number[] {
  let joltageSequence: number[] = [];
  for (let i = 9; i >= 0; i--) {
    let index = batteryBank.findIndex((val) => val === i);
    const remainingBatteries = batteryBank.slice(index + 1);
    if (index !== -1 && remainingBatteries.length >= numberToFind - 1) {
      joltageSequence.push(i);
      if (numberToFind === 1) {
        return joltageSequence;
      } else {
        joltageSequence = joltageSequence.concat(
          findJoltageSequence(remainingBatteries, numberToFind - 1)
        );
      }
      break;
    }
  }
  return joltageSequence;
}

function part1(input: string[]): number {
  let powerTotal = 0;
  for (const line of input) {
    let batteryBank = line.split('').map(Number);
    // console.log(batteryBank);

    // Find the highest value and its first occurrence
    const maxValue = Math.max(...batteryBank);
    const maxIndex = batteryBank.indexOf(maxValue);

    // Find the highest distinct value after maxIndex
    const valuesAfter = batteryBank.slice(maxIndex + 1);
    const uniqueAfter = [...new Set(valuesAfter)]
      .filter((v) => v <= maxValue)
      .sort((a, b) => b - a);

    let result;
    if (uniqueAfter.length > 0) {
      // Case 1: Max comes first, then second highest after it
      const secondHighest = uniqueAfter[0];
      result = parseInt(`${maxValue}${secondHighest}`);
    } else {
      // Case 2: Max is at the end, find second highest before it
      const uniqueValues = [...new Set(batteryBank)].sort((a, b) => b - a);
      const secondHighest = uniqueValues[1];
      result = parseInt(`${secondHighest}${maxValue}`);
    }

    // console.log(result);
    powerTotal += result;
  }
  return powerTotal;
}

function part2(input: string[]): number {
  let powerTotal = 0;
  for (const line of input) {
    let batteryBank = line.split('').map(Number);
    // console.log(batteryBank);
    // Find the higest value with at least 11 numbers after it
    // In the remaining numbers find the highest number with at least 10 numbers after it
    // Repeat until you have 12 total numbers
    // Create an integer by concatenating these numbers in order found
    let joltageSequence: number[] = findJoltageSequence(batteryBank, 12);
    let sequenceValue = parseInt(joltageSequence.join(''));
    // console.log(sequenceValue);
    powerTotal += sequenceValue;
  }
  return powerTotal;
}

// Example tests
const example = readLines('example.txt', import.meta.url);
console.log('Example Part 1:', part1(example));
console.log('Example Part 2:', part2(example));

console.log('\n--- Actual Input ---');
console.log('Part 1:', part1(lines));
console.log('Part 2:', part2(lines));
