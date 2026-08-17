import { getFunctionsInScale, ChordFunction } from './music';
import { Chord } from '../types/music';

export const generateFullyRandom = (length: number): number[] =>
  Array.from({ length }, () => Math.floor(Math.random() * 7));

const pickWeighted = (options: [ChordFunction, number][]): ChordFunction => {
  const total = options.reduce((sum, [, weight]) => sum + weight, 0);
  let r = Math.random() * total;
  for (const [value, weight] of options) {
    if (r < weight) return value;
    r -= weight;
  }
  return options[options.length - 1][0];
};

const degreesByFunction = (
  functions: ChordFunction[]
): Record<ChordFunction, number[]> => {
  const map: Record<ChordFunction, number[]> = { T: [], S: [], D: [] };
  functions.forEach((fn, degree) => map[fn].push(degree));
  return map;
};

const pickDegreeForFunction = (
  fn: ChordFunction,
  byFunction: Record<ChordFunction, number[]>
): number => {
  const options = byFunction[fn];
  return options[Math.floor(Math.random() * options.length)];
};

export const generateSmart = (length: number): number[] => {
  const byFunction = degreesByFunction(getFunctionsInScale());
  const result: number[] = [];

  let currentFunction: ChordFunction = 'T';
  result.push(pickDegreeForFunction(currentFunction, byFunction));

  for (let i = 1; i < length; i++) {
    const isLast = i === length - 1;
    if (isLast) {
      currentFunction = 'T';
    } else if (currentFunction === 'T') {
      currentFunction = pickWeighted([
        ['S', 1],
        ['D', 1],
      ]);
    } else if (currentFunction === 'S') {
      currentFunction = pickWeighted([
        ['D', 2],
        ['T', 1],
      ]);
    } else {
      currentFunction = pickWeighted([
        ['T', 2],
        ['S', 1],
      ]);
    }
    result.push(pickDegreeForFunction(currentFunction, byFunction));
  }

  return result;
};

export const buildChordsFromDegrees = (
  degrees: number[],
  tone: string,
  mode: number
): Chord[] => degrees.map((interval) => ({ tone, mode, interval }));
