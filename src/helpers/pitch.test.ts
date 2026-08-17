import { describe, expect, it } from 'vitest';
import {
  getVoicedChordNotes,
  toToneJsPitch,
  smoothProgressionOctaves,
} from './pitch';

describe('getVoicedChordNotes', () => {
  it('voices a root-position major chord without octave wraparound', () => {
    expect(getVoicedChordNotes('C')).toEqual([
      { note: 'C', octave: 4 },
      { note: 'E', octave: 4 },
      { note: 'G', octave: 4 },
    ]);
  });

  it('bumps the octave when a note wraps chromatically below the previous one', () => {
    // B major: B(11), D#(3), F#(6) -> D# and F# wrap past the octave boundary
    expect(getVoicedChordNotes('B')).toEqual([
      { note: 'B', octave: 4 },
      { note: 'D#', octave: 5 },
      { note: 'F#', octave: 5 },
    ]);
  });

  it('respects a custom base octave', () => {
    expect(getVoicedChordNotes('C', 3)).toEqual([
      { note: 'C', octave: 3 },
      { note: 'E', octave: 3 },
      { note: 'G', octave: 3 },
    ]);
  });
});

describe('toToneJsPitch', () => {
  it('concatenates note name and octave', () => {
    expect(toToneJsPitch({ note: 'C', octave: 4 })).toBe('C4');
    expect(toToneJsPitch({ note: 'F#', octave: 3 })).toBe('F#3');
  });
});

describe('smoothProgressionOctaves', () => {
  it('leaves the first chord untouched and pulls a later chord down when it drifted too high', () => {
    const chords = [
      getVoicedChordNotes('C'), // C4 E4 G4
      // Same triad voiced a full octave higher, simulating an independently-anchored chord that drifted
      getVoicedChordNotes('C', 5), // C5 E5 G5
    ];
    const smoothed = smoothProgressionOctaves(chords);
    expect(smoothed[0]).toEqual(chords[0]);
    expect(smoothed[1]).toEqual(getVoicedChordNotes('C', 4));
  });

  it('leaves chords already within a tritone of each other alone', () => {
    const chords = [getVoicedChordNotes('C'), getVoicedChordNotes('F')];
    expect(smoothProgressionOctaves(chords)).toEqual(chords);
  });

  it('pulls a chord whose own voicing drifted a fifth+ higher back down for continuity', () => {
    // G's fifth (D) lands in the next octave up by design, pushing its average pitch
    // more than a tritone above C's -- smoothing should pull the whole chord down an octave
    const chords = [getVoicedChordNotes('C'), getVoicedChordNotes('G')];
    const smoothed = smoothProgressionOctaves(chords);
    expect(smoothed[0]).toEqual(chords[0]);
    expect(smoothed[1]).toEqual([
      { note: 'G', octave: 3 },
      { note: 'B', octave: 3 },
      { note: 'D', octave: 4 },
    ]);
  });

  it('handles an empty progression', () => {
    expect(smoothProgressionOctaves([])).toEqual([]);
  });
});
