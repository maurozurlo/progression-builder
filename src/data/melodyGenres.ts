import { MelodyGenre } from '../types/music';

export interface GenrePreset {
  offsets: number[]; // candidate rhythmic subdivision points across a bar, always includes 0
  numNotes: [number, number]; // min/max notes in a generated motif
  intervalWeights: [number, number][]; // [diatonic step size (+/-), weight]
}

export const melodyGenres: Record<MelodyGenre, GenrePreset> = {
  pop: {
    offsets: [0, 0.25, 0.5, 0.75],
    numNotes: [3, 4],
    intervalWeights: [
      [1, 3],
      [-1, 3],
      [2, 2],
      [-2, 2],
      [0, 1],
    ],
  },
  jazz: {
    offsets: [0, 0.125, 0.375, 0.5, 0.625, 0.875],
    numNotes: [4, 6],
    intervalWeights: [
      [1, 2],
      [-1, 2],
      [2, 2],
      [-2, 2],
      [3, 1],
      [-3, 1],
      [4, 1],
      [-4, 1],
    ],
  },
  classical: {
    offsets: [0, 0.25, 0.5, 0.75],
    numNotes: [3, 5],
    intervalWeights: [
      [1, 4],
      [-1, 4],
      [2, 1],
      [-2, 1],
      [0, 1],
    ],
  },
};
