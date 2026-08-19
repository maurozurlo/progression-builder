import { Chord, Genre, KeyRelation, VoicingStyle } from '../types/music';
import { toneNames, getRelatedKeys } from './music';
import { Meter } from './playback';
import { buildChordsFromDegrees, bakeChordSymbols } from './generator';
import { genreProgressions } from '../data/genreProgressions';
import { genreTempoRanges, genreDefaultMode } from '../data/genreTempo';
import { getStrumPatternsByGenre } from '../data/strumPatterns';
import { getBassPatternsByGenre } from '../data/bassPatterns';
import { getDrumPatternsByGenre } from '../data/drumPatterns';
import { defaultVoicingByGenre } from '../data/voicings';

export interface GeneratedSong {
  chords: Chord[];
  tone: string;
  mode: number;
  patternId: string;
  bassPatternId: string;
  drumPatternId: string;
  melodyGenre: Genre;
  voicingId: VoicingStyle;
  bpm: number;
}

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randInt = (min: number, max: number): number =>
  min + Math.floor(Math.random() * (max - min + 1));

//Genre progressions are written at their natural bar length (4, or 12 for blues); cycling the degrees
//to the requested bar count lets a short verse loop be extended into an 8-bar phrase without new data.
const extendToBars = (degrees: number[], bars: number): number[] =>
  Array.from({ length: bars }, (_, i) => degrees[i % degrees.length]);

export const generateSong = (
  genre: Genre,
  meter: Meter = '4/4',
  bars = 4,
  chorusKeyRelation?: KeyRelation
): GeneratedSong => {
  const tone = pick(toneNames);
  const mode = genreDefaultMode[genre];

  //An 8-bar song splits into a 4-bar verse (in the song's own key/mode) plus a 4-bar chorus,
  //optionally in a related key -- baked to explicit chord symbols so it keeps that key even if
  //the app's global fixed-key/mode is set to something else.
  const verseBars = bars === 8 && chorusKeyRelation ? 4 : bars;
  const verseDegrees = extendToBars(pick(genreProgressions[genre]).degrees, verseBars);
  let chords = buildChordsFromDegrees(verseDegrees, tone, mode);

  if (bars === 8 && chorusKeyRelation) {
    const related = getRelatedKeys(tone, mode)[chorusKeyRelation];
    const chorusDegrees = extendToBars(pick(genreProgressions[genre]).degrees, 4);
    const chorusChords = bakeChordSymbols(
      buildChordsFromDegrees(chorusDegrees, related.tone, related.mode)
    );
    chords = [...chords, ...chorusChords];
  }

  const strum = pick(getStrumPatternsByGenre(meter, genre));
  const bass = pick(getBassPatternsByGenre(meter, genre));
  const drum = pick(getDrumPatternsByGenre(meter, genre));
  const [min, max] = genreTempoRanges[genre];
  return {
    chords,
    tone,
    mode,
    patternId: strum.id,
    bassPatternId: bass.id,
    drumPatternId: drum.id,
    melodyGenre: genre,
    voicingId: defaultVoicingByGenre[genre],
    bpm: randInt(min, max),
  };
};
