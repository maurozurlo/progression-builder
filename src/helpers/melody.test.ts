import { describe, expect, it } from 'vitest';
import {
  applyMotifToChord,
  buildMelodyLine,
  buildTensionCurve,
  generateMotif,
  varyMotif,
} from './melody';
import { getScaleNoteName } from './music';
import { Chord, MotifStep } from '../types/music';

describe('generateMotif', () => {
  it('always starts on offset 0 with degreeOffset 0, respecting genre note-count range', () => {
    for (const genre of ['pop', 'jazz', 'ambient'] as const) {
      const motif = generateMotif(genre);
      expect(motif[0]).toEqual({ offset: 0, degreeOffset: 0 });
      expect(motif.length).toBeGreaterThanOrEqual(1);
      //offsets must be strictly increasing
      for (let i = 1; i < motif.length; i++) {
        expect(motif[i].offset).toBeGreaterThan(motif[i - 1].offset);
      }
    }
  });
});

describe('varyMotif', () => {
  const motif: MotifStep[] = [
    { offset: 0, degreeOffset: 0 },
    { offset: 0.25, degreeOffset: 2 },
    { offset: 0.5, degreeOffset: -1 },
  ];

  it('repeat returns the motif unchanged', () => {
    expect(varyMotif(motif, 'repeat')).toEqual(motif);
  });

  it('invert flips the sign of every degreeOffset', () => {
    const result = varyMotif(motif, 'invert');
    expect(result.map((s) => ({ offset: s.offset, degreeOffset: s.degreeOffset || 0 }))).toEqual([
      { offset: 0, degreeOffset: 0 },
      { offset: 0.25, degreeOffset: -2 },
      { offset: 0.5, degreeOffset: 1 },
    ]);
  });

  it('sequence shifts every degreeOffset by one scale step', () => {
    expect(varyMotif(motif, 'sequence')).toEqual([
      { offset: 0, degreeOffset: 1 },
      { offset: 0.25, degreeOffset: 3 },
      { offset: 0.5, degreeOffset: 0 },
    ]);
  });

  it('fragment truncates to the first half and appends a cadential tail back to the anchor', () => {
    const result = varyMotif(motif, 'fragment');
    expect(result).toEqual([
      { offset: 0, degreeOffset: 0 },
      { offset: 0.25, degreeOffset: 2 },
      { offset: 0.875, degreeOffset: 0 },
    ]);
  });
});

describe('buildTensionCurve', () => {
  it('returns the curated statement/development/contrast/resolution curve for a 4-chord phrase', () => {
    expect(buildTensionCurve(4)).toEqual([
      'repeat',
      'sequence',
      'invert',
      'fragment',
    ]);
  });

  it('always resolves the final chord to fragment for longer phrases', () => {
    const curve = buildTensionCurve(8);
    expect(curve).toHaveLength(8);
    expect(curve[curve.length - 1]).toBe('fragment');
  });
});

describe('applyMotifToChord', () => {
  it('anchors the first note on the given scale degree and stays diatonic', () => {
    const motif: MotifStep[] = [
      { offset: 0, degreeOffset: 0 },
      { offset: 0.5, degreeOffset: 2 },
    ];
    const events = applyMotifToChord(motif, 'C', 0, 0, 4);

    expect(events[0].note).toEqual({ note: 'C', octave: 4 });
    expect(events[1].note).toEqual({
      note: getScaleNoteName('C', 0, 2),
      octave: 4,
    });
  });

  it('shifts octave up once the absolute degree wraps past the top of the scale', () => {
    const motif: MotifStep[] = [
      { offset: 0, degreeOffset: 0 },
      { offset: 0.5, degreeOffset: 7 },
    ];
    const events = applyMotifToChord(motif, 'C', 0, 0, 4);
    expect(events[1].note).toEqual({ note: 'C', octave: 5 });
  });
});

describe('buildMelodyLine', () => {
  it('repeats a short progression into a longer phrase so the motif has room to develop', () => {
    const list: Chord[] = [
      { tone: 'C', mode: 0, interval: 0 },
      { tone: 'C', mode: 0, interval: 4 },
      { tone: 'C', mode: 0, interval: 5 },
      { tone: 'C', mode: 0, interval: 3 },
    ];
    const bars = buildMelodyLine(list, -1, -1, 'pop');
    //4 chords repeated twice gives an 8-bar phrase, not a 4-bar loop that repeats identically forever
    expect(bars).toHaveLength(8);
    bars.forEach((bar) => expect(bar.length).toBeGreaterThan(0));
  });

  it('returns an empty array for an empty progression', () => {
    expect(buildMelodyLine([], -1, -1, 'pop')).toEqual([]);
  });
});
