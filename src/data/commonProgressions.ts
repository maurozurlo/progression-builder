import { ProgressionTemplate } from '../types/music';

export const commonProgressions: ProgressionTemplate[] = [
  {
    id: 'I-V-vi-IV',
    name: 'I - V - vi - IV (Pop)',
    genre: 'pop',
    degrees: [0, 4, 5, 3],
  },
  { id: 'ii-V-I', name: 'ii - V - I (Jazz)', genre: 'jazz', degrees: [1, 4, 0] },
  {
    id: 'I-vi-IV-V',
    name: 'I - vi - IV - V (50s)',
    genre: 'pop',
    degrees: [0, 5, 3, 4],
  },
  {
    id: 'vi-IV-I-V',
    name: 'vi - IV - I - V',
    genre: 'pop',
    degrees: [5, 3, 0, 4],
  },
  {
    id: 'I-IV-V',
    name: 'I - IV - V (Blues/Rock)',
    genre: 'blues12',
    degrees: [0, 3, 4],
  },
];
