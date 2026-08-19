import { describe, expect, it } from 'vitest';
import {
  generateFullyRandom,
  generateSmart,
  buildChordsFromDegrees,
  buildMoodPairChords,
  bakeChordSymbols,
} from './generator';
import { getChordFunction } from './music';
import { MoodChordPair } from '../types/music';

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

describe('buildMoodPairChords', () => {
  const pair: MoodChordPair = {
    id: 'M2M',
    name: 'Protagonism',
    mood: 'Protagonism',
    firstQuality: 'major',
    semitones: 2,
    secondQuality: 'major',
  };

  it('builds two chromatic chords carrying explicit symbols', () => {
    const chords = buildMoodPairChords(pair, 'C');
    expect(chords).toHaveLength(2);
    expect(chords[0].symbol).toBe('C');
    expect(chords[1].symbol).toBe('D');
  });

  it('resolves a minor second chord with the "m" suffix', () => {
    const minorPair: MoodChordPair = { ...pair, secondQuality: 'minor', semitones: 5 };
    const chords = buildMoodPairChords(minorPair, 'C');
    expect(chords[1].symbol).toBe('Fm');
  });
});

describe('bakeChordSymbols', () => {
  it('resolves each diatonic chord into an explicit symbol', () => {
    const chords = buildChordsFromDegrees([0, 1], 'C', 0);
    expect(bakeChordSymbols(chords).map((c) => c.symbol)).toEqual(['C', 'Dm']);
  });

  it('leaves an already-baked symbol untouched', () => {
    const chords = [{ tone: 'C', mode: 0, interval: 0, symbol: 'Ebm' }];
    expect(bakeChordSymbols(chords)[0].symbol).toBe('Ebm');
  });
});
