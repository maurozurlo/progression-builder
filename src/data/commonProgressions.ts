import { ProgressionTemplate } from '../types/music';

export const commonProgressions: ProgressionTemplate[] = [
  { id: 'I-V-vi-IV', name: 'I - V - vi - IV (Pop)', degrees: [0, 4, 5, 3] },
  { id: 'ii-V-I', name: 'ii - V - I (Jazz)', degrees: [1, 4, 0] },
  { id: 'I-vi-IV-V', name: 'I - vi - IV - V (50s)', degrees: [0, 5, 3, 4] },
  { id: 'vi-IV-I-V', name: 'vi - IV - I - V', degrees: [5, 3, 0, 4] },
  { id: 'I-IV-V', name: 'I - IV - V (Blues/Rock)', degrees: [0, 3, 4] },
];
