import { StrumPattern } from '../types/music';

export const strumPatterns4_4: StrumPattern[] = [
  {
    id: 'down-only',
    name: 'Down only',
    steps: [{ offset: 0, direction: 'D' }],
  },
  {
    id: 'ddu-uu',
    name: 'Down-Down-Up-Up',
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
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 0.25, direction: 'U' },
      { offset: 0.5, direction: 'D' },
      { offset: 0.75, direction: 'U' },
    ],
  },
];

export const strumPatterns3_4: StrumPattern[] = [
  {
    id: 'down-only',
    name: 'Down only',
    steps: [{ offset: 0, direction: 'D' }],
  },
  {
    id: 'ddu-uu',
    name: 'Down-Down-Up-Up',
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 1 / 3, direction: 'D' },
      { offset: 2 / 3, direction: 'U' },
    ],
  },
  {
    id: 'folk',
    name: 'Folk D-DU-UDU',
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
    steps: [
      { offset: 0, direction: 'D' },
      { offset: 1 / 3, direction: 'U' },
      { offset: 2 / 3, direction: 'D' },
    ],
  },
];

export const getStrumPatterns = (meter: '4/4' | '3/4'): StrumPattern[] =>
  meter === '4/4' ? strumPatterns4_4 : strumPatterns3_4;
