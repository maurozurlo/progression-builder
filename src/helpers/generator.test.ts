import { describe, expect, it } from 'vitest';
import {
  generateFullyRandom,
  generateSmart,
  buildChordsFromDegrees,
} from './generator';
import { getChordFunction } from './music';

describe('generateFullyRandom', () => {
  it('returns the requested length, each a valid degree 0-6', () => {
    const result = generateFullyRandom(8);
    expect(result).toHaveLength(8);
    result.forEach((degree) => {
      expect(degree).toBeGreaterThanOrEqual(0);
      expect(degree).toBeLessThanOrEqual(6);
    });
  });
});

describe('generateSmart', () => {
  it('returns the requested length, each a valid degree 0-6', () => {
    const result = generateSmart(6);
    expect(result).toHaveLength(6);
    result.forEach((degree) => {
      expect(degree).toBeGreaterThanOrEqual(0);
      expect(degree).toBeLessThanOrEqual(6);
    });
  });

  it('always ends on a tonic-function degree', () => {
    for (let i = 0; i < 20; i++) {
      const result = generateSmart(4);
      expect(getChordFunction(result[result.length - 1])).toBe('T');
    }
  });
});

describe('buildChordsFromDegrees', () => {
  it('builds a Chord per degree using the given tone/mode', () => {
    expect(buildChordsFromDegrees([0, 4, 5], 'G', 0)).toEqual([
      { tone: 'G', mode: 0, interval: 0 },
      { tone: 'G', mode: 0, interval: 4 },
      { tone: 'G', mode: 0, interval: 5 },
    ]);
  });
});
