import { Genre } from '../types/music';

export const genreTempoRanges: Record<Genre, [number, number]> = {
  jazz: [110, 200],
  blues12: [70, 120],
  punk: [150, 220],
  reggae: [60, 90],
  metal: [100, 180],
  ambient: [50, 80],
  pop: [95, 130],
  hiphop: [70, 100],
};

// index into modeNames (helpers/music.ts): 0 Ionian, 1 Dorian, 5 Aeolian, etc.
export const genreDefaultMode: Record<Genre, number> = {
  jazz: 0,
  blues12: 0,
  punk: 0,
  reggae: 5,
  metal: 5,
  ambient: 5,
  pop: 0,
  hiphop: 5,
};
