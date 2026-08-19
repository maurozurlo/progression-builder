import { getNotesInChord, getIndexOfNote } from './music';
import { VoicedNote, VoicingStyle } from '../types/music';

export const getVoicedChordNotes = (
  chordSymbol: string,
  voicing: VoicingStyle = 'triad',
  baseOctave = 4
): VoicedNote[] => {
  const notes = getNotesInChord(chordSymbol, voicing).split(' ');
  let octave = baseOctave;
  let previousIndex = -1;
  return notes.map((note) => {
    const index = getIndexOfNote(note);
    //Bump the octave whenever a note's chromatic index wraps back below the previous note's
    if (index <= previousIndex) {
      octave += 1;
    }
    previousIndex = index;
    return { note, octave };
  });
};

export const toToneJsPitch = (n: VoicedNote): string => n.note + n.octave;

const pitchValue = (n: VoicedNote): number => getIndexOfNote(n.note) + n.octave * 12;

const averagePitch = (notes: VoicedNote[]): number =>
  notes.reduce((sum, n) => sum + pitchValue(n), 0) / notes.length;

const shiftOctave = (notes: VoicedNote[], by: number): VoicedNote[] =>
  notes.map((n) => ({ ...n, octave: n.octave + by }));

//getVoicedChordNotes voices each chord independently anchored near baseOctave, which is correct in
//isolation but leaves no continuity between chords -- e.g a chord whose top note lands in the next
//octave up, followed by a chord reset back down to the base octave, reads as a jarring register jump.
//This shifts each chord (as a whole, preserving its internal voicing) by whole octaves so its average
//pitch stays within a tritone of the previous chord's, keeping the progression in a consistent register.
export const smoothProgressionOctaves = (
  chords: VoicedNote[][]
): VoicedNote[][] => {
  if (chords.length === 0) return chords;
  const result: VoicedNote[][] = [chords[0]];
  for (let i = 1; i < chords.length; i++) {
    let candidate = chords[i];
    const prevAvg = averagePitch(result[i - 1]);
    while (averagePitch(candidate) - prevAvg > 6) {
      candidate = shiftOctave(candidate, -1);
    }
    while (prevAvg - averagePitch(candidate) > 6) {
      candidate = shiftOctave(candidate, 1);
    }
    result.push(candidate);
  }
  return result;
};
