import { BassPattern, Genre } from '../types/music';

export const bassPatterns4_4: BassPattern[] = [
  {
    id: 'root-only',
    name: 'Root only',
    genre: 'ambient',
    steps: [{ offset: 0, degree: 'root' }],
  },
  {
    id: 'root-fifth',
    name: 'Root-Fifth',
    genre: 'pop',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'fifth' },
    ],
  },
  {
    id: 'root-octave-pulse',
    name: 'Root-Octave pulse',
    genre: 'pop',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.25, degree: 'octave' },
      { offset: 0.5, degree: 'root' },
      { offset: 0.75, degree: 'octave' },
    ],
  },
  {
    id: 'walking',
    name: 'Walking',
    genre: 'jazz',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.25, degree: 'third' },
      { offset: 0.5, degree: 'fifth' },
      { offset: 0.75, degree: 'octave' },
    ],
  },
  {
    id: 'jazz-walking-swing',
    name: 'Swing walk',
    genre: 'jazz',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 1 / 3, degree: 'fifth' },
      { offset: 2 / 3, degree: 'third' },
    ],
  },
  {
    id: 'jazz-two-feel',
    name: 'Two feel',
    genre: 'jazz',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'fifth' },
    ],
  },
  {
    id: 'jazz-anchor',
    name: 'Root anchor',
    genre: 'jazz',
    steps: [{ offset: 0, degree: 'root' }],
  },
  {
    id: 'blues-shuffle-bass',
    name: 'Shuffle bass',
    genre: 'blues12',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 1 / 3, degree: 'fifth' },
      { offset: 0.5, degree: 'root' },
      { offset: 2 / 3 + 1 / 6, degree: 'fifth' },
    ],
  },
  {
    id: 'blues-boogie',
    name: 'Boogie woogie',
    genre: 'blues12',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.25, degree: 'fifth' },
      { offset: 0.5, degree: 'octave' },
      { offset: 0.75, degree: 'fifth' },
    ],
  },
  {
    id: 'blues-walking',
    name: 'Blues walk',
    genre: 'blues12',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.25, degree: 'third' },
      { offset: 0.5, degree: 'fifth' },
      { offset: 0.75, degree: 'octave' },
    ],
  },
  {
    id: 'blues-root-fifth',
    name: 'Root-Fifth',
    genre: 'blues12',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'fifth' },
    ],
  },
  {
    id: 'punk-eighths-bass',
    name: 'Driving eighths',
    genre: 'punk',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.125, degree: 'root' },
      { offset: 0.25, degree: 'root' },
      { offset: 0.375, degree: 'root' },
      { offset: 0.5, degree: 'root' },
      { offset: 0.625, degree: 'root' },
      { offset: 0.75, degree: 'root' },
      { offset: 0.875, degree: 'root' },
    ],
  },
  {
    id: 'punk-root-octave',
    name: 'Root-Octave',
    genre: 'punk',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'octave' },
    ],
  },
  {
    id: 'punk-power-root',
    name: 'Power root',
    genre: 'punk',
    steps: [{ offset: 0, degree: 'root' }],
  },
  {
    id: 'punk-galloping',
    name: 'Galloping root',
    genre: 'punk',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.375, degree: 'root' },
      { offset: 0.625, degree: 'root' },
    ],
  },
  {
    id: 'reggae-one-drop-bass',
    name: 'One drop',
    genre: 'reggae',
    steps: [{ offset: 0.5, degree: 'root' }],
  },
  {
    id: 'reggae-riddim',
    name: 'Riddim bounce',
    genre: 'reggae',
    steps: [
      { offset: 0.5, degree: 'root' },
      { offset: 0.75, degree: 'fifth' },
    ],
  },
  {
    id: 'reggae-rockers',
    name: 'Rockers',
    genre: 'reggae',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'root' },
    ],
  },
  {
    id: 'reggae-walking',
    name: 'Reggae walk',
    genre: 'reggae',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.375, degree: 'third' },
      { offset: 0.75, degree: 'fifth' },
    ],
  },
  {
    id: 'metal-pedal',
    name: 'Pedal eighths',
    genre: 'metal',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.125, degree: 'root' },
      { offset: 0.25, degree: 'root' },
      { offset: 0.375, degree: 'root' },
      { offset: 0.5, degree: 'root' },
      { offset: 0.625, degree: 'root' },
      { offset: 0.75, degree: 'root' },
      { offset: 0.875, degree: 'root' },
    ],
  },
  {
    id: 'metal-gallop-bass',
    name: 'Gallop',
    genre: 'metal',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.375, degree: 'root' },
      { offset: 0.625, degree: 'root' },
    ],
  },
  {
    id: 'metal-root-fifth',
    name: 'Root-Fifth',
    genre: 'metal',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'fifth' },
    ],
  },
  {
    id: 'metal-octave-drop',
    name: 'Octave drop',
    genre: 'metal',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'octave' },
    ],
  },
  {
    id: 'ambient-drift',
    name: 'Slow drift',
    genre: 'ambient',
    steps: [{ offset: 0, degree: 'fifth' }],
  },
  {
    id: 'ambient-root-third',
    name: 'Root-Third',
    genre: 'ambient',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'third' },
    ],
  },
  {
    id: 'ambient-sparse',
    name: 'Sparse root',
    genre: 'ambient',
    steps: [{ offset: 0.5, degree: 'root' }],
  },
  {
    id: 'pop-pulse',
    name: 'Steady pulse',
    genre: 'pop',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'root' },
    ],
  },
  {
    id: 'hiphop-808-root',
    name: '808 root hold',
    genre: 'hiphop',
    steps: [{ offset: 0, degree: 'root' }],
  },
  {
    id: 'hiphop-syncopated',
    name: 'Syncopated 808',
    genre: 'hiphop',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.375, degree: 'root' },
      { offset: 0.75, degree: 'octave' },
    ],
  },
  {
    id: 'hiphop-loop-bass',
    name: 'Loop bounce',
    genre: 'hiphop',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.625, degree: 'fifth' },
    ],
  },
  {
    id: 'hiphop-triplet',
    name: 'Triplet bounce',
    genre: 'hiphop',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 1 / 3, degree: 'root' },
      { offset: 2 / 3, degree: 'fifth' },
    ],
  },
];

export const bassPatterns3_4: BassPattern[] = [
  {
    id: 'root-only',
    name: 'Root only',
    genre: 'ambient',
    steps: [{ offset: 0, degree: 'root' }],
  },
  {
    id: 'root-fifth',
    name: 'Root-Fifth',
    genre: 'pop',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 2 / 3, degree: 'fifth' },
    ],
  },
  {
    id: 'root-octave-pulse',
    name: 'Root-Octave pulse',
    genre: 'jazz',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 1 / 3, degree: 'octave' },
      { offset: 2 / 3, degree: 'root' },
    ],
  },
  {
    id: 'walking',
    name: 'Walking',
    genre: 'jazz',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 1 / 3, degree: 'third' },
      { offset: 2 / 3, degree: 'fifth' },
    ],
  },
];

export const getBassPatterns = (meter: '4/4' | '3/4'): BassPattern[] =>
  meter === '4/4' ? bassPatterns4_4 : bassPatterns3_4;

export const getBassPatternsByGenre = (
  meter: '4/4' | '3/4',
  genre: Genre
): BassPattern[] => getBassPatterns(meter).filter((p) => p.genre === genre);
