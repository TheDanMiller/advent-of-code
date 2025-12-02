import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the directory path of the current file (works with ESM)
 */
export const getInputPath = (filename: string, importMetaUrl: string): string => {
  const dir = dirname(fileURLToPath(importMetaUrl));
  return join(dir, filename);
};

/**
 * Read entire file as string
 */
export const readInput = (filename: string, importMetaUrl: string): string => {
  return readFileSync(getInputPath(filename, importMetaUrl), 'utf-8').trim();
};

/**
 * Read file as array of lines
 */
export const readLines = (filename: string, importMetaUrl: string): string[] => {
  return readInput(filename, importMetaUrl).split('\n');
};

/**
 * Read file as array of numbers (one per line)
 */
export const readNumbers = (filename: string, importMetaUrl: string): number[] => {
  return readLines(filename, importMetaUrl).map(Number);
};

/**
 * Read file as 2D grid of characters
 */
export const readGrid = (filename: string, importMetaUrl: string): string[][] => {
  return readLines(filename, importMetaUrl).map(line => line.split(''));
};

/**
 * Read blocks separated by blank lines
 */
export const readBlocks = (filename: string, importMetaUrl: string): string[][] => {
  return readInput(filename, importMetaUrl).split('\n\n').map(block => block.split('\n'));
};
