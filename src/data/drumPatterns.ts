import { DrumPattern } from '../types/music';

export const drumPatterns4_4: DrumPattern[] = [
  {
    id: 'basic-rock',
    name: 'Basic Rock',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0, voice: 'hihat' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.5, voice: 'hihat' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
  {
    id: 'four-on-the-floor',
    name: 'Four on the Floor',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0, voice: 'hihat' },
      { offset: 0.25, voice: 'kick' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.5, voice: 'hihat' },
      { offset: 0.75, voice: 'kick' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
  {
    id: 'backbeat',
    name: 'Backbeat',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.125, voice: 'hihat' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.375, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.625, voice: 'hihat' },
      { offset: 0.75, voice: 'hihat' },
      { offset: 0.875, voice: 'hihat' },
    ],
  },
  {
    id: 'half-time',
    name: 'Half-time',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.5, voice: 'hihat' },
      { offset: 0.75, voice: 'snare' },
    ],
  },
];

export const drumPatterns3_4: DrumPattern[] = [
  {
    id: 'waltz',
    name: 'Waltz',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 1 / 3, voice: 'snare' },
      { offset: 2 / 3, voice: 'snare' },
    ],
  },
  {
    id: '3-4-rock',
    name: '3/4 Rock',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0, voice: 'hihat' },
      { offset: 1 / 3, voice: 'hihat' },
      { offset: 1 / 3, voice: 'snare' },
      { offset: 2 / 3, voice: 'hihat' },
    ],
  },
];

export const getDrumPatterns = (meter: '4/4' | '3/4'): DrumPattern[] =>
  meter === '4/4' ? drumPatterns4_4 : drumPatterns3_4;
