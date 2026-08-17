import { describe, expect, it } from 'vitest';
import { buildBassChordNotes, buildBassLine } from './bass';
import { Chord } from '../types/music';

describe('buildBassChordNotes', () => {
  it('derives root/third/fifth/octave for a C major chord at the given octave', () => {
    const chord: Chord = { tone: 'C', mode: 0, interval: 0 };
    const notes = buildBassChordNotes(chord, -1, -1, 2);

    expect(notes.root).toEqual({ note: 'C', octave: 2 });
    expect(notes.third).toEqual({ note: 'E', octave: 2 });
    expect(notes.fifth).toEqual({ note: 'G', octave: 2 });
    expect(notes.octave).toEqual({ note: 'C', octave: 3 });
  });

  it('respects a fixed key/mode over the chord own tone/mode', () => {
    const chord: Chord = { tone: 'C', mode: 0, interval: 0 };
    const notes = buildBassChordNotes(chord, 'D', 0, 2);

    expect(notes.root.note).toBe('D');
  });
});

describe('buildBassLine', () => {
  it('returns one chord-notes entry per chord in the list', () => {
    const list: Chord[] = [
      { tone: 'C', mode: 0, interval: 0 },
      { tone: 'C', mode: 0, interval: 4 },
    ];
    const line = buildBassLine(list, -1, -1);
    expect(line).toHaveLength(2);
  });

  it('smooths a root of B into the next chord rooted on C into the same register, not a major-7th leap', () => {
    //B major (root B) -> C major (root C): unsmoothed both sit at the fixed base octave, so B(11) -> C(0)
    //reads as an 11-semitone drop; smoothing should keep the C root close to the B root (a semitone up).
    const list: Chord[] = [
      { tone: 'B', mode: 0, interval: 0 },
      { tone: 'C', mode: 0, interval: 0 },
    ];
    const line = buildBassLine(list, -1, -1, 2);

    const rootMidi = (note: { note: string; octave: number }) =>
      note.octave * 12 +
      ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].indexOf(
        note.note
      );

    const gap = rootMidi(line[1].root) - rootMidi(line[0].root);
    expect(Math.abs(gap)).toBeLessThanOrEqual(6);
  });
});
