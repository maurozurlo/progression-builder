import { VoicingStyle, ChordQualityName, KeyRelation } from '../types/music';

//Intervals
export const intervalNames = [
  'I (T)',
  'II (SD)',
  'III (T)',
  'IV (SD)',
  'V (D)',
  'VI (T)',
  'VII (D)',
];

//Modes
export const modeNames = [
  'Ionian (Major)',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian (Minor)',
  'Locrian',
];
//Modes are saved as multidimensional arrays, where each interval has two values:
//[0] Semitones from the root
//[1] Quality of the chord
type ModeInterval = [number, string];
const major: ModeInterval[] = [
  [0, ''],
  [2, 'm'],
  [4, 'm'],
  [5, ''],
  [7, ''],
  [9, 'm'],
  [11, 'dim'],
];
const dorian: ModeInterval[] = [
  [0, 'm'],
  [2, 'm'],
  [3, ''],
  [5, ''],
  [7, 'm'],
  [9, 'dim'],
  [10, ''],
];
const phrygian: ModeInterval[] = [
  [0, 'm'],
  [1, ''],
  [3, ''],
  [5, 'm'],
  [7, 'dim'],
  [8, ''],
  [10, 'm'],
];
const lydian: ModeInterval[] = [
  [0, ''],
  [2, ''],
  [4, 'm'],
  [6, 'dim'],
  [7, ''],
  [9, 'm'],
  [11, 'm'],
];
const myxolydian: ModeInterval[] = [
  [0, ''],
  [2, 'm'],
  [4, 'dim'],
  [5, ''],
  [7, 'm'],
  [9, 'm'],
  [10, ''],
];
const aeolian: ModeInterval[] = [
  [0, 'm'],
  [2, 'dim'],
  [3, ''],
  [5, 'm'],
  [7, 'm'],
  [8, ''],
  [10, ''],
];
const locrian: ModeInterval[] = [
  [0, 'dim'],
  [1, ''],
  [3, 'm'],
  [5, 'm'],
  [6, ''],
  [8, ''],
  [10, 'm'],
];
//Saving the all mode arrays in a bigger array for further use
const modes: ModeInterval[][] = [
  major,
  dorian,
  phrygian,
  lydian,
  myxolydian,
  aeolian,
  locrian,
];

//Chromatic scale / Note names
export const toneNames = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const calculateChord = (
  key: string,
  mode: number | string,
  interval: number | string
): string => {
  const tone = toneNames.findIndex((element) => element === key);
  const modeArr = modes[Number(mode)];
  const note =
    toneNames[checkifHigherThanTwelve(tone + modeArr[Number(interval)][0])];
  return `${note}${modeArr[Number(interval)][1]}`;
};

export const getChordInScale = (
  key: string,
  mode: number | string
): string[] => {
  const list: string[] = [];

  modes[Number(mode)].map((interval: ModeInterval) => {
    const tone = toneNames.findIndex((element) => element === key);
    const note = toneNames[checkifHigherThanTwelve(tone + interval[0])];
    return list.push(`${note}${interval[1]} `);
  });
  return list;
};

type ChordQuality = 'major' | 'minor' | 'dim';

const parseChordQuality = (
  chord: string
): { toneInWords: string; quality: ChordQuality } => {
  let toneInWords = chord[0];
  let isSharp = false;
  if (chord[1] === '#') {
    toneInWords += '#';
    isSharp = true;
  }
  //This ternary checks if the Chord is sharp, in which case we should look for the third character of the string and not the second
  const arrayIndex = isSharp ? 2 : 1;
  let quality: ChordQuality;
  switch (chord[arrayIndex]) {
    case 'm':
      quality = 'minor';
      break;
    case 'd':
      quality = 'dim';
      break;
    default:
      quality = 'major';
  }
  return { toneInWords, quality };
};

const voicingIntervals: Record<VoicingStyle, Record<ChordQuality, number[]>> =
  {
    triad: { major: [0, 4, 7], minor: [0, 3, 7], dim: [0, 3, 6, 9] },
    'triad-1st-inv': {
      major: [4, 7, 12],
      minor: [3, 7, 12],
      dim: [3, 6, 12],
    },
    power: { major: [0, 7], minor: [0, 7], dim: [0, 6] },
    shell: { major: [0, 4, 11], minor: [0, 3, 10], dim: [0, 3, 9] },
    seventh: {
      major: [0, 4, 7, 11],
      minor: [0, 3, 7, 10],
      dim: [0, 3, 6, 9],
    },
    ninth: {
      major: [0, 4, 7, 11, 14],
      minor: [0, 3, 7, 10, 14],
      dim: [0, 3, 6, 9, 14],
    },
  };

export const getNotesInChord = (
  chord: string,
  voicing: VoicingStyle = 'triad'
): string => {
  const list: string[] = [];
  const { toneInWords, quality } = parseChordQuality(chord);
  const qualityNotes = voicingIntervals[voicing][quality];
  //Get array value of root
  const tone = toneNames.findIndex((element) => element === toneInWords);
  //Map through the intervals to get the note names in a list
  qualityNotes.forEach((interval) => {
    list.push(toneNames[checkifHigherThanTwelve(tone + interval)]);
  });
  //Get all the notes and turn them into a string
  let formattedString = '';
  //Map through the list of notes and only add a space if it's not the last note of the list
  list.forEach((note, i) => {
    formattedString += i !== list.length - 1 ? `${note} ` : `${note}`;
  });
  //Return the string
  return formattedString;
};

const checkifHigherThanTwelve = (val: number): number => {
  if (val > 11) {
    val -= 12;
  }
  return val;
};

export const getScaleNoteName = (
  key: string,
  mode: number | string,
  degree: number
): string => {
  const tone = toneNames.findIndex((element) => element === key);
  const modeArr = modes[Number(mode)];
  const degreeInScale = ((degree % 7) + 7) % 7;
  return toneNames[checkifHigherThanTwelve(tone + modeArr[degreeInScale][0])];
};

export const getIndexOfNote = (val: string): number => {
  const tone = toneNames.findIndex((element) => element === val);
  return tone;
};

export const transposeTone = (tone: string, semitones: number): string => {
  const index = toneNames.findIndex((element) => element === tone);
  return toneNames[((index + semitones) % 12 + 12) % 12];
};

export const buildChordSymbol = (
  root: string,
  quality: ChordQualityName
): string => `${root}${quality === 'minor' ? 'm' : ''}`;

//Every mode belongs to a "major-family" (brighter, built on the major triad) or a
//"minor-family" (darker, built on the minor triad); relating two modes for the "same
//scale"/"other scale" suggestions pairs each family with Ionian (0) or Aeolian (5).
const majorFamilyModes = [0, 3, 4]; // Ionian, Lydian, Mixolydian
const relatedModeIndex = (mode: number): number =>
  majorFamilyModes.includes(mode) ? 5 : 0;

export const getRelatedKeys = (
  tone: string,
  mode: number
): Record<KeyRelation, { tone: string; mode: number }> => {
  const targetMode = relatedModeIndex(mode);
  return {
    sameScale: {
      tone: transposeTone(tone, major[targetMode][0] - major[mode][0]),
      mode: targetMode,
    },
    otherScale: { tone, mode: targetMode },
    sameTone: { tone, mode: (mode + 1) % 7 },
    neighborTone: { tone: transposeTone(tone, 7), mode },
  };
};

export type ChordFunction = 'T' | 'S' | 'D';

export const getChordFunction = (interval: number): ChordFunction => {
  const match = intervalNames[interval].match(/\(([A-Z]+)\)/);
  const suffix = match ? match[1] : 'T';
  if (suffix === 'SD') return 'S';
  return suffix as ChordFunction;
};

export const getFunctionsInScale = (): ChordFunction[] =>
  intervalNames.map((_, i) => getChordFunction(i));

export default {
  intervalNames,
  modeNames,
  toneNames,
  calculateChord,
  getChordInScale,
  getNotesInChord,
  getScaleNoteName,
  getIndexOfNote,
  getChordFunction,
  getFunctionsInScale,
  transposeTone,
  buildChordSymbol,
  getRelatedKeys,
};
