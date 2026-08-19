import { MoodChordPair } from '../types/music';

//Quality-interval-quality shorthand from an old scoring cheat sheet, e.g. "M2M" = major chord,
//up a major 2nd, major chord. Interval numbers are scale-degree distances translated to semitones
//(2nd=2, 4th=5, 5th=7, 6th=9, 8th/octave=12, 11th=17) -- shorthand from the source image, may want
//a listen-and-tweak pass.
export const moodChordPairs: MoodChordPair[] = [
  {
    id: 'M2M',
    name: 'Protagonism',
    mood: 'Protagonism',
    firstQuality: 'major',
    semitones: 2,
    secondQuality: 'major',
  },
  {
    id: 'M6M',
    name: 'Outer space',
    mood: 'Outer space',
    firstQuality: 'major',
    semitones: 6,
    secondQuality: 'major',
  },
  {
    id: 'M8M',
    name: 'Fantastical',
    mood: 'Fantastical',
    firstQuality: 'major',
    semitones: 8,
    secondQuality: 'major',
  },
  {
    id: 'M4m',
    name: 'Sadness, loss',
    mood: 'Sadness, loss',
    firstQuality: 'major',
    semitones: 4,
    secondQuality: 'minor',
  },
  {
    id: 'M5m',
    name: 'Romantic, Middle Eastern',
    mood: 'Romantic, Middle Eastern',
    firstQuality: 'major',
    semitones: 5,
    secondQuality: 'minor',
  },
  {
    id: 'm5M',
    name: 'Wonder, transcendence',
    mood: 'Wonder, transcendence',
    firstQuality: 'minor',
    semitones: 5,
    secondQuality: 'major',
  },
  {
    id: 'm2M',
    name: 'Mystery or dark comedy',
    mood: 'Mystery or dark comedy',
    firstQuality: 'minor',
    semitones: 2,
    secondQuality: 'major',
  },
  {
    id: 'm11M',
    name: 'Dramatic (early 21st C.)',
    mood: 'Dramatic (early 21st C.)',
    firstQuality: 'minor',
    semitones: 11,
    secondQuality: 'major',
  },
  {
    id: 'm6m',
    name: 'Antagonism, danger',
    mood: 'Antagonism, danger',
    firstQuality: 'minor',
    semitones: 6,
    secondQuality: 'minor',
  },
  {
    id: 'm8m',
    name: 'Antagonism, evil',
    mood: 'Antagonism, evil',
    firstQuality: 'minor',
    semitones: 8,
    secondQuality: 'minor',
  },
];
