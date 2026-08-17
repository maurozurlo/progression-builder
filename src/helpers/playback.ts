import { calculateChord } from './music';
import {
  getVoicedChordNotes,
  toToneJsPitch,
  smoothProgressionOctaves,
} from './pitch';
import { Chord, VoicedNote } from '../types/music';

export type Meter = '4/4' | '3/4';

export const meterTuple = (meter: Meter): [number, number] =>
  meter === '4/4' ? [4, 4] : [3, 4];

export const buildVoicedChords = (
  list: Chord[],
  fixedKey: number | string,
  fixedMode: number
): VoicedNote[][] =>
  smoothProgressionOctaves(
    list.map((chord) => {
      const tone = fixedKey !== -1 ? (fixedKey as string) : chord.tone;
      const mode = fixedMode !== -1 ? fixedMode : chord.mode;
      const symbol = calculateChord(tone, mode, chord.interval);
      return getVoicedChordNotes(symbol);
    })
  );

export const buildChordPitches = (
  list: Chord[],
  fixedKey: number | string,
  fixedMode: number
): string[][] =>
  buildVoicedChords(list, fixedKey, fixedMode).map((notes) =>
    notes.map(toToneJsPitch)
  );
