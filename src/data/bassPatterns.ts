import { BassPattern } from '../types/music';

export const bassPatterns4_4: BassPattern[] = [
  {
    id: 'root-only',
    name: 'Root only',
    steps: [{ offset: 0, degree: 'root' }],
  },
  {
    id: 'root-fifth',
    name: 'Root-Fifth',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.5, degree: 'fifth' },
    ],
  },
  {
    id: 'root-octave-pulse',
    name: 'Root-Octave pulse',
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
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 0.25, degree: 'third' },
      { offset: 0.5, degree: 'fifth' },
      { offset: 0.75, degree: 'octave' },
    ],
  },
];

export const bassPatterns3_4: BassPattern[] = [
  {
    id: 'root-only',
    name: 'Root only',
    steps: [{ offset: 0, degree: 'root' }],
  },
  {
    id: 'root-fifth',
    name: 'Root-Fifth',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 2 / 3, degree: 'fifth' },
    ],
  },
  {
    id: 'root-octave-pulse',
    name: 'Root-Octave pulse',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 1 / 3, degree: 'octave' },
      { offset: 2 / 3, degree: 'root' },
    ],
  },
  {
    id: 'walking',
    name: 'Walking',
    steps: [
      { offset: 0, degree: 'root' },
      { offset: 1 / 3, degree: 'third' },
      { offset: 2 / 3, degree: 'fifth' },
    ],
  },
];

export const getBassPatterns = (meter: '4/4' | '3/4'): BassPattern[] =>
  meter === '4/4' ? bassPatterns4_4 : bassPatterns3_4;
