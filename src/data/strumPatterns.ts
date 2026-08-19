import { StrumPattern, Genre } from '../types/music';

export const strumPatterns4_4: StrumPattern[] = [
  {
    id: 'down-only',
    name: 'Down only',
    genre: 'metal',
    steps: [{ offset: 0, direction: 'D' }],
  },
  {
    id: 'ddu-uu',
    name: 'Down-Down-Up-Up',
    genre: 'pop',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.25, direction: 'D' },
      { offset: 0.5, direction: 'U' },
      { offset: 0.75, direction: 'U' },
    ],
  },
  {
    id: 'folk',
    name: 'Folk D-DU-UDU',
    genre: 'pop',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.25, direction: 'D' },
      { offset: 0.375, direction: 'U' },
      { offset: 0.625, direction: 'U' },
      { offset: 0.75, direction: 'D' },
      { offset: 0.875, direction: 'U' },
    ],
  },
  {
    id: 'ballad',
    name: 'Ballad D-U-D-U',
    genre: 'ambient',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.25, direction: 'U' },
      { offset: 0.5, direction: 'D' },
      { offset: 0.75, direction: 'U' },
    ],
  },
  {
    id: 'jazz-comp',
    name: 'Jazz comp (2 & 4)',
    genre: 'jazz',
    steps: [
      { offset: 0.25, direction: 'U' },
      { offset: 0.75, direction: 'U' },
    ],
  },
  {
    id: 'jazz-charleston',
    name: 'Charleston',
    genre: 'jazz',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.375, direction: 'U' },
    ],
  },
  {
    id: 'blues-shuffle',
    name: '12-bar Shuffle',
    genre: 'blues12',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 1 / 6, direction: 'U' },
      { offset: 0.5, direction: 'D' },
      { offset: 4 / 6, direction: 'U' },
    ],
  },
  {
    id: 'blues-triplet',
    name: 'Blues triplet feel',
    genre: 'blues12',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 1 / 3, direction: 'D' },
      { offset: 2 / 3, direction: 'U' },
    ],
  },
  {
    id: 'punk-eighths',
    name: 'Straight Eighths',
    genre: 'punk',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.125, direction: 'U' },
      { offset: 0.25, direction: 'D' },
      { offset: 0.375, direction: 'U' },
      { offset: 0.5, direction: 'D' },
      { offset: 0.625, direction: 'U' },
      { offset: 0.75, direction: 'D' },
      { offset: 0.875, direction: 'U' },
    ],
  },
  {
    id: 'punk-power',
    name: 'Power Chord Chug',
    genre: 'punk',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.25, direction: 'D' },
      { offset: 0.5, direction: 'D' },
      { offset: 0.75, direction: 'D' },
    ],
  },
  {
    id: 'reggae-skank',
    name: 'Reggae Skank',
    genre: 'reggae',
    steps: [
      { offset: 0.25, direction: 'U' },
      { offset: 0.75, direction: 'U' },
    ],
  },
  {
    id: 'reggae-bubble',
    name: 'Bubble',
    genre: 'reggae',
    steps: [
      { offset: 0.25, direction: 'U' },
      { offset: 0.5, direction: 'U' },
      { offset: 0.75, direction: 'U' },
    ],
  },
  {
    id: 'metal-gallop',
    name: 'Gallop',
    genre: 'metal',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.375, direction: 'D' },
      { offset: 0.625, direction: 'D' },
    ],
  },
  {
    id: 'ambient-sustain',
    name: 'Sustained swell',
    genre: 'ambient',
    steps: [{ offset: 0, direction: 'D' }],
  },
  {
    id: 'pop-strum',
    name: 'Pop Strum',
    genre: 'pop',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.5, direction: 'D' },
      { offset: 0.625, direction: 'U' },
      { offset: 0.75, direction: 'D' },
    ],
  },
  {
    id: 'hiphop-loop',
    name: 'Loop pluck',
    genre: 'hiphop',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.375, direction: 'D' },
    ],
  },
  {
    id: 'hiphop-lofi',
    name: 'Lo-fi swing',
    genre: 'hiphop',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.625, direction: 'U' },
    ],
  },
];

export const strumPatterns3_4: StrumPattern[] = [
  {
    id: 'down-only',
    name: 'Down only',
    genre: 'ambient',
    steps: [{ offset: 0, direction: 'D' }],
  },
  {
    id: 'ddu-uu',
    name: 'Down-Down-Up-Up',
    genre: 'pop',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 1 / 3, direction: 'D' },
      { offset: 2 / 3, direction: 'U' },
    ],
  },
  {
    id: 'folk',
    name: 'Folk D-DU-UDU',
    genre: 'jazz',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 1 / 3, direction: 'D' },
      { offset: 0.5, direction: 'U' },
      { offset: 2 / 3, direction: 'U' },
    ],
  },
  {
    id: 'ballad',
    name: 'Ballad D-U-D-U',
    genre: 'jazz',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 1 / 3, direction: 'U' },
      { offset: 2 / 3, direction: 'D' },
    ],
  },
];

export const getStrumPatterns = (meter: '4/4' | '3/4'): StrumPattern[] =>
  meter === '4/4' ? strumPatterns4_4 : strumPatterns3_4;

export const getStrumPatternsByGenre = (
  meter: '4/4' | '3/4',
  genre: Genre
): StrumPattern[] => getStrumPatterns(meter).filter((p) => p.genre === genre);
