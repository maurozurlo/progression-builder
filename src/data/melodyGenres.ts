import { Genre } from '../types/music';

export interface GenrePreset {
  offsets: number[]; // candidate rhythmic subdivision points across a bar, always includes 0
  numNotes: [number, number]; // min/max notes in a generated motif
  intervalWeights: [number, number][]; // [diatonic step size (+/-), weight]
}

export const melodyGenres: Record<Genre, GenrePreset[]> = {
  pop: [
    {
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
    {
      offsets: [0, 0.25, 0.375, 0.5, 0.75],
      numNotes: [4, 5],
      intervalWeights: [
        [1, 4],
        [-1, 3],
        [2, 2],
        [0, 1],
      ],
    },
    {
      offsets: [0, 0.5, 0.625, 0.75],
      numNotes: [2, 3],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [0, 2],
      ],
    },
    {
      offsets: [0, 0.125, 0.375, 0.625, 0.875],
      numNotes: [4, 6],
      intervalWeights: [
        [1, 3],
        [-1, 3],
        [2, 2],
        [-2, 2],
        [3, 1],
      ],
    },
  ],
  jazz: [
    {
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
    {
      offsets: [0, 0.1875, 0.375, 0.5625, 0.75],
      numNotes: [5, 7],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [2, 2],
        [-2, 1],
        [4, 1],
        [-4, 1],
      ],
    },
    {
      offsets: [0, 0.25, 0.5, 0.75],
      numNotes: [3, 4],
      intervalWeights: [
        [2, 2],
        [-2, 2],
        [0, 2],
        [1, 1],
      ],
    },
    {
      offsets: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
      numNotes: [6, 8],
      intervalWeights: [
        [1, 3],
        [-1, 3],
        [2, 1],
        [-2, 1],
      ],
    },
  ],
  blues12: [
    {
      offsets: [0, 0.25, 0.375, 0.625, 0.75],
      numNotes: [3, 5],
      intervalWeights: [
        [-2, 3],
        [1, 2],
        [-1, 2],
        [3, 1],
      ],
    },
    {
      offsets: [0, 0.1875, 0.5, 0.6875],
      numNotes: [3, 4],
      intervalWeights: [
        [-2, 2],
        [2, 2],
        [0, 2],
      ],
    },
    {
      offsets: [0, 0.125, 0.375, 0.625, 0.875],
      numNotes: [4, 6],
      intervalWeights: [
        [-2, 3],
        [1, 2],
        [3, 1],
        [-1, 1],
      ],
    },
    {
      offsets: [0, 0.5],
      numNotes: [2, 3],
      intervalWeights: [
        [-2, 3],
        [0, 2],
      ],
    },
  ],
  punk: [
    {
      offsets: [0, 0.5],
      numNotes: [2, 3],
      intervalWeights: [
        [0, 3],
        [1, 2],
        [-1, 2],
      ],
    },
    {
      offsets: [0, 0.25, 0.5, 0.75],
      numNotes: [3, 4],
      intervalWeights: [
        [0, 2],
        [1, 3],
        [-1, 2],
      ],
    },
    {
      offsets: [0, 0.125, 0.25, 0.375],
      numNotes: [2, 3],
      intervalWeights: [
        [1, 3],
        [0, 2],
      ],
    },
    {
      offsets: [0, 0.375, 0.5, 0.875],
      numNotes: [3, 4],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [0, 1],
      ],
    },
  ],
  reggae: [
    {
      offsets: [0.25, 0.75],
      numNotes: [2, 3],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [0, 1],
      ],
    },
    {
      offsets: [0.25, 0.5, 0.75],
      numNotes: [2, 4],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [2, 1],
      ],
    },
    {
      offsets: [0, 0.375, 0.75],
      numNotes: [2, 3],
      intervalWeights: [
        [-1, 2],
        [1, 2],
      ],
    },
    {
      offsets: [0.25, 0.625, 0.875],
      numNotes: [2, 4],
      intervalWeights: [
        [1, 1],
        [-1, 1],
        [0, 2],
      ],
    },
  ],
  metal: [
    {
      offsets: [0, 0.125, 0.5, 0.625],
      numNotes: [4, 6],
      intervalWeights: [
        [4, 1],
        [-4, 1],
        [1, 2],
        [-1, 2],
        [0, 2],
      ],
    },
    {
      offsets: [0, 0.25, 0.5, 0.75],
      numNotes: [3, 4],
      intervalWeights: [
        [0, 3],
        [-1, 2],
        [1, 1],
      ],
    },
    {
      offsets: [0, 0.125, 0.25, 0.375, 0.5, 0.625],
      numNotes: [5, 6],
      intervalWeights: [
        [-1, 3],
        [1, 2],
        [-2, 1],
        [4, 1],
      ],
    },
    {
      offsets: [0, 0.5],
      numNotes: [2, 3],
      intervalWeights: [
        [5, 1],
        [-5, 1],
        [0, 2],
      ],
    },
  ],
  ambient: [
    {
      offsets: [0, 0.5],
      numNotes: [1, 2],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [0, 3],
      ],
    },
    {
      offsets: [0, 0.75],
      numNotes: [1, 2],
      intervalWeights: [
        [2, 1],
        [-2, 1],
        [0, 3],
      ],
    },
    {
      offsets: [0, 0.25, 0.5, 0.75],
      numNotes: [2, 3],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [0, 2],
      ],
    },
    {
      offsets: [0],
      numNotes: [1, 1],
      intervalWeights: [[0, 1]],
    },
  ],
  hiphop: [
    {
      offsets: [0, 0.375, 0.625],
      numNotes: [2, 3],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [0, 2],
      ],
    },
    {
      offsets: [0, 0.25, 0.625, 0.875],
      numNotes: [3, 4],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [2, 1],
      ],
    },
    {
      offsets: [0, 0.5, 0.75],
      numNotes: [2, 3],
      intervalWeights: [
        [0, 3],
        [1, 1],
        [-1, 1],
      ],
    },
    {
      offsets: [0, 0.125, 0.375, 0.75],
      numNotes: [3, 4],
      intervalWeights: [
        [1, 2],
        [-1, 2],
        [-2, 1],
      ],
    },
  ],
};
