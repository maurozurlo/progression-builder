import { describe, expect, it } from 'vitest';
import {
  calculateChord,
  getChordInScale,
  getNotesInChord,
  getIndexOfNote,
  getChordFunction,
  getFunctionsInScale,
  toneNames,
  modeNames,
  intervalNames,
  transposeTone,
  buildChordSymbol,
  getRelatedKeys,
} from './music';

describe('toneNames / modeNames / intervalNames', () => {
  it('has 12 chromatic tones', () => {
    expect(toneNames).toHaveLength(12);
  });

  it('has 7 modes and 7 interval names', () => {
    expect(modeNames).toHaveLength(7);
    expect(intervalNames).toHaveLength(7);
  });
});

describe('calculateChord', () => {
  it('returns the tonic chord (root, major) for interval 0 in Ionian', () => {
    expect(calculateChord('C', 0, 0)).toBe('C');
  });

  it('returns a minor chord for the ii in a major scale', () => {
    expect(calculateChord('C', 0, 1)).toBe('Dm');
  });

  it('returns a diminished chord for the vii in a major scale', () => {
    expect(calculateChord('C', 0, 6)).toBe('Bdim');
  });

  it('wraps chromatically past B back to C', () => {
    expect(calculateChord('B', 0, 0)).toBe('B');
    expect(calculateChord('B', 0, 3)).toBe('E');
  });

  it('accepts numeric-string mode/interval values, as produced by <select> onChange', () => {
    expect(calculateChord('C', '0', '1')).toBe('Dm');
  });
});

describe('getChordInScale', () => {
  it('lists all 7 chords of a major scale in order', () => {
    expect(getChordInScale('C', 0)).toEqual([
      'C ',
      'Dm ',
      'Em ',
      'F ',
      'G ',
      'Am ',
      'Bdim ',
    ]);
  });
});

describe('getNotesInChord', () => {
  it('returns root/third/fifth for a plain major chord', () => {
    expect(getNotesInChord('C')).toBe('C E G');
  });

  it('returns root/flat third/fifth for a minor chord', () => {
    expect(getNotesInChord('Dm')).toBe('D F A');
  });

  it('handles sharp root notes', () => {
    expect(getNotesInChord('C#')).toBe('C# F G#');
  });
});

describe('getIndexOfNote', () => {
  it('returns the chromatic index of a tone name', () => {
    expect(getIndexOfNote('C')).toBe(0);
    expect(getIndexOfNote('G')).toBe(7);
  });

  it('returns -1 for an unknown tone', () => {
    expect(getIndexOfNote('X')).toBe(-1);
  });
});

describe('getChordFunction', () => {
  it('classifies tonic, subdominant, and dominant degrees', () => {
    expect(getChordFunction(0)).toBe('T'); // I (T)
    expect(getChordFunction(1)).toBe('S'); // II (SD)
    expect(getChordFunction(4)).toBe('D'); // V (D)
  });
});

describe('getFunctionsInScale', () => {
  it('returns a function per degree, mode-independent', () => {
    expect(getFunctionsInScale()).toEqual(['T', 'S', 'T', 'S', 'D', 'T', 'D']);
  });
});

describe('transposeTone', () => {
  it('transposes within the chromatic scale', () => {
    expect(transposeTone('C', 2)).toBe('D');
    expect(transposeTone('C', 7)).toBe('G');
  });

  it('wraps around past B', () => {
    expect(transposeTone('B', 2)).toBe('C#');
  });

  it('wraps negative semitone counts', () => {
    expect(transposeTone('C', -1)).toBe('B');
  });
});

describe('buildChordSymbol', () => {
  it('builds a plain symbol for major chords', () => {
    expect(buildChordSymbol('C', 'major')).toBe('C');
  });

  it('appends "m" for minor chords', () => {
    expect(buildChordSymbol('C', 'minor')).toBe('Cm');
  });
});

describe('getRelatedKeys', () => {
  it('relates C Ionian to A Aeolian as the same-scale key', () => {
    expect(getRelatedKeys('C', 0).sameScale).toEqual({ tone: 'A', mode: 5 });
  });

  it('keeps the tonic for the other-scale (parallel) relation', () => {
    expect(getRelatedKeys('C', 0).otherScale).toEqual({ tone: 'C', mode: 5 });
  });

  it('keeps the tonic and cycles the mode for the same-tone relation', () => {
    expect(getRelatedKeys('C', 0).sameTone).toEqual({ tone: 'C', mode: 1 });
  });

  it('moves a fifth up for the neighboring-tone relation', () => {
    expect(getRelatedKeys('C', 0).neighborTone).toEqual({ tone: 'G', mode: 0 });
  });
});
