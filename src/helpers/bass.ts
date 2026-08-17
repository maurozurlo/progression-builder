import { calculateChord, getNotesInChord } from './music';
import { smoothProgressionOctaves } from './pitch';
import { Chord, BassChordNotes, VoicedNote } from '../types/music';

export const buildBassChordNotes = (
  chord: Chord,
  fixedKey: number | string,
  fixedMode: number,
  octave = 2
): BassChordNotes => {
  const tone = fixedKey !== -1 ? (fixedKey as string) : chord.tone;
  const mode = fixedMode !== -1 ? fixedMode : chord.mode;
  const symbol = calculateChord(tone, mode, chord.interval);
  const notes = getNotesInChord(symbol).split(' ');

  const root: VoicedNote = { note: notes[0], octave };
  const third: VoicedNote = { note: notes[1] ?? notes[0], octave };
  const fifth: VoicedNote = { note: notes[2] ?? notes[0], octave };
  const octaveUp: VoicedNote = { note: notes[0], octave: octave + 1 };

  return { root, third, fifth, octave: octaveUp };
};

//Each chord's root/third/fifth/octave are voiced independently at a fixed base octave, which leaves no
//continuity between chords -- e.g a root of B followed by a root of C is only a semitone apart musically
//but renders as a major-7th leap (B2 -> C2) since both sit at the same fixed octave. smoothProgressionOctaves
//keeps a set's *average* pitch close to the previous set's, but this set already spans a root and its
//own octave-up, which flattens the average and masks exactly the jump we want to smooth -- so smooth on
//the root alone, then carry that same octave shift over to third/fifth/octave to keep their voicing intact.
export const buildBassLine = (
  list: Chord[],
  fixedKey: number | string,
  fixedMode: number,
  octave = 2
): BassChordNotes[] => {
  const chordNotes = list.map((chord) =>
    buildBassChordNotes(chord, fixedKey, fixedMode, octave)
  );
  const smoothedRoots = smoothProgressionOctaves(
    chordNotes.map((notes) => [notes.root])
  );
  return chordNotes.map((notes, i) => {
    const shift = smoothedRoots[i][0].octave - notes.root.octave;
    return {
      root: { ...notes.root, octave: notes.root.octave + shift },
      third: { ...notes.third, octave: notes.third.octave + shift },
      fifth: { ...notes.fifth, octave: notes.fifth.octave + shift },
      octave: { ...notes.octave, octave: notes.octave.octave + shift },
    };
  });
};
