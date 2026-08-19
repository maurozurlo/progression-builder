import {
  getFunctionsInScale,
  ChordFunction,
  calculateChord,
  transposeTone,
  buildChordSymbol,
} from './music';
import { Chord, MoodChordPair } from '../types/music';

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

//Builds an absolute, chromatic two-chord pair from a mood shorthand (e.g. "M2M" -> major chord,
//up a major 2nd, major chord). Both chords carry an explicit `symbol` so they play at their own
//root regardless of the current key/mode or a fixed-key override.
export const buildMoodPairChords = (
  pair: MoodChordPair,
  rootTone: string
): Chord[] => [
  { tone: rootTone, mode: 0, interval: 0, symbol: buildChordSymbol(rootTone, pair.firstQuality) },
  {
    tone: rootTone,
    mode: 0,
    interval: 0,
    symbol: buildChordSymbol(
      transposeTone(rootTone, pair.semitones),
      pair.secondQuality
    ),
  },
];

//Resolves each chord's diatonic symbol and bakes it in, so the list stays in its own key even
//if it's later concatenated with chords under a different fixed key/mode (e.g. a chorus section).
export const bakeChordSymbols = (chords: Chord[]): Chord[] =>
  chords.map((chord) => ({
    ...chord,
    symbol: chord.symbol ?? calculateChord(chord.tone, chord.mode, chord.interval),
  }));
