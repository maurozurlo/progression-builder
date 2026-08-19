import { DrumPattern, Genre } from '../types/music';

export const drumPatterns4_4: DrumPattern[] = [
  {
    id: 'basic-rock',
    name: 'Basic Rock',
    genre: 'pop',
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
    genre: 'pop',
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
    genre: 'pop',
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
    genre: 'ambient',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.5, voice: 'hihat' },
      { offset: 0.75, voice: 'snare' },
    ],
  },
  {
    id: 'jazz-swing-ride',
    name: 'Swing (hihat ride)',
    genre: 'jazz',
    steps: [
      { offset: 0, voice: 'hihat' },
      { offset: 1 / 3, voice: 'hihat' },
      { offset: 0.5, voice: 'kick' },
      { offset: 2 / 3, voice: 'hihat' },
      { offset: 0.75, voice: 'snare' },
    ],
  },
  {
    id: 'jazz-brushes',
    name: 'Brush feel',
    genre: 'jazz',
    steps: [
      { offset: 0, voice: 'hihat' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
  {
    id: 'jazz-comping',
    name: 'Comping',
    genre: 'jazz',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.375, voice: 'snare' },
      { offset: 0.625, voice: 'hihat' },
    ],
  },
  {
    id: 'jazz-sparse',
    name: 'Sparse ride',
    genre: 'jazz',
    steps: [
      { offset: 0, voice: 'hihat' },
      { offset: 0.5, voice: 'hihat' },
    ],
  },
  {
    id: 'blues-shuffle-drums',
    name: 'Shuffle',
    genre: 'blues12',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 1 / 3, voice: 'hihat' },
      { offset: 0.5, voice: 'snare' },
      { offset: 2 / 3, voice: 'hihat' },
    ],
  },
  {
    id: 'blues-triplet-drums',
    name: 'Triplet feel',
    genre: 'blues12',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
  {
    id: 'blues-boogie-drums',
    name: 'Boogie',
    genre: 'blues12',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.25, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.75, voice: 'kick' },
    ],
  },
  {
    id: 'blues-slow-12',
    name: 'Slow blues',
    genre: 'blues12',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
    ],
  },
  {
    id: 'punk-fast-beat',
    name: 'Fast punk beat',
    genre: 'punk',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0, voice: 'hihat' },
      { offset: 0.25, voice: 'snare' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.5, voice: 'hihat' },
      { offset: 0.75, voice: 'snare' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
  {
    id: 'punk-driving',
    name: 'Driving eighths',
    genre: 'punk',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.125, voice: 'kick' },
      { offset: 0.25, voice: 'snare' },
      { offset: 0.375, voice: 'kick' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.625, voice: 'kick' },
      { offset: 0.75, voice: 'snare' },
      { offset: 0.875, voice: 'kick' },
    ],
  },
  {
    id: 'punk-blast',
    name: 'Blast-ish',
    genre: 'punk',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.25, voice: 'snare' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.75, voice: 'snare' },
    ],
  },
  {
    id: 'punk-simple',
    name: 'Simple thrash',
    genre: 'punk',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
    ],
  },
  {
    id: 'reggae-one-drop-drums',
    name: 'One drop',
    genre: 'reggae',
    steps: [
      { offset: 0.5, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
  {
    id: 'reggae-steppers',
    name: 'Steppers',
    genre: 'reggae',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.25, voice: 'kick' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.75, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
    ],
  },
  {
    id: 'reggae-rockers-drums',
    name: 'Rockers',
    genre: 'reggae',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.5, voice: 'kick' },
    ],
  },
  {
    id: 'reggae-skank-drums',
    name: 'Skank',
    genre: 'reggae',
    steps: [
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.75, voice: 'hihat' },
      { offset: 0.5, voice: 'kick' },
    ],
  },
  {
    id: 'metal-double-kick',
    name: 'Double kick',
    genre: 'metal',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.125, voice: 'kick' },
      { offset: 0.25, voice: 'snare' },
      { offset: 0.375, voice: 'kick' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.625, voice: 'kick' },
      { offset: 0.75, voice: 'snare' },
      { offset: 0.875, voice: 'kick' },
    ],
  },
  {
    id: 'metal-blast-beat',
    name: 'Blast beat',
    genre: 'metal',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.125, voice: 'snare' },
      { offset: 0.25, voice: 'kick' },
      { offset: 0.375, voice: 'snare' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.625, voice: 'snare' },
      { offset: 0.75, voice: 'kick' },
      { offset: 0.875, voice: 'snare' },
    ],
  },
  {
    id: 'metal-gallop-drums',
    name: 'Galloping',
    genre: 'metal',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.375, voice: 'kick' },
      { offset: 0.625, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
    ],
  },
  {
    id: 'metal-half-time-breakdown',
    name: 'Breakdown',
    genre: 'metal',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.75, voice: 'kick' },
    ],
  },
  {
    id: 'ambient-pulse',
    name: 'Slow pulse',
    genre: 'ambient',
    steps: [{ offset: 0, voice: 'kick' }],
  },
  {
    id: 'ambient-texture',
    name: 'Soft texture',
    genre: 'ambient',
    steps: [
      { offset: 0, voice: 'hihat' },
      { offset: 0.5, voice: 'hihat' },
    ],
  },
  {
    id: 'ambient-minimal',
    name: 'Minimal',
    genre: 'ambient',
    steps: [{ offset: 0.5, voice: 'kick' }],
  },
  {
    id: 'ambient-drift-drums',
    name: 'Drift',
    genre: 'ambient',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
  {
    id: 'hiphop-boom-bap',
    name: 'Boom bap',
    genre: 'hiphop',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.375, voice: 'snare' },
      { offset: 0.5, voice: 'kick' },
      { offset: 0.875, voice: 'snare' },
    ],
  },
  {
    id: 'hiphop-trap-hats',
    name: 'Trap hats',
    genre: 'hiphop',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.125, voice: 'hihat' },
      { offset: 0.25, voice: 'hihat' },
      { offset: 0.375, voice: 'hihat' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.625, voice: 'hihat' },
      { offset: 0.75, voice: 'hihat' },
      { offset: 0.875, voice: 'hihat' },
    ],
  },
  {
    id: 'hiphop-lofi-drums',
    name: 'Lo-fi swing',
    genre: 'hiphop',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.625, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
    ],
  },
  {
    id: 'hiphop-sparse',
    name: 'Sparse loop',
    genre: 'hiphop',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 0.5, voice: 'snare' },
      { offset: 0.75, voice: 'hihat' },
    ],
  },
];

export const drumPatterns3_4: DrumPattern[] = [
  {
    id: 'waltz',
    name: 'Waltz',
    genre: 'jazz',
    steps: [
      { offset: 0, voice: 'kick' },
      { offset: 1 / 3, voice: 'snare' },
      { offset: 2 / 3, voice: 'snare' },
    ],
  },
  {
    id: '3-4-rock',
    name: '3/4 Rock',
    genre: 'pop',
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

export const getDrumPatternsByGenre = (
  meter: '4/4' | '3/4',
  genre: Genre
): DrumPattern[] => getDrumPatterns(meter).filter((p) => p.genre === genre);
