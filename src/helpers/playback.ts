import { calculateChord } from './music';
import {
  getVoicedChordNotes,
  toToneJsPitch,
  smoothProgressionOctaves,
} from './pitch';
import { Chord, VoicedNote, VoicingStyle } from '../types/music';

export type Meter = '4/4' | '3/4';

export const meterTuple = (meter: Meter): [number, number] =>
  meter === '4/4' ? [4, 4] : [3, 4];

export const buildVoicedChords = (
  list: Chord[],
  fixedKey: number | string,
  fixedMode: number,
  voicing: VoicingStyle = 'triad'
): VoicedNote[][] =>
  smoothProgressionOctaves(
    list.map((chord) => {
      if (chord.symbol) return getVoicedChordNotes(chord.symbol, voicing);
      const tone = fixedKey !== -1 ? (fixedKey as string) : chord.tone;
      const mode = fixedMode !== -1 ? fixedMode : chord.mode;
      const symbol = calculateChord(tone, mode, chord.interval);
      return getVoicedChordNotes(symbol, voicing);
    })
  );

export const buildChordPitches = (
  list: Chord[],
  fixedKey: number | string,
  fixedMode: number,
  voicing: VoicingStyle = 'triad'
): string[][] =>
  buildVoicedChords(list, fixedKey, fixedMode, voicing).map((notes) =>
    notes.map(toToneJsPitch)
  );
