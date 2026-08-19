import { ProgressionTemplate } from '../types/music';

//Progressions from an old theory cheat sheet, labeled by the mood/feel they're meant to evoke
//rather than by genre. Diatonic, same shape as commonProgressions/genreProgressions.
export const moodProgressions: ProgressionTemplate[] = [
  {
    id: 'mood-sad-ballad',
    name: 'I - IV - V - V (Sad ballad)',
    genre: 'pop',
    degrees: [0, 3, 4, 4],
  },
  {
    id: 'mood-wistful-ballad',
    name: 'I - I - IV - VI (Wistful ballad)',
    genre: 'pop',
    degrees: [0, 0, 3, 5],
  },
  {
    id: 'mood-heavy-funky',
    name: 'I - IV - I - V (Heavy/Funky)',
    genre: 'pop',
    degrees: [0, 3, 0, 4],
  },
  {
    id: 'mood-rebellious',
    name: 'IV - V - IV (Rebellious)',
    genre: 'punk',
    degrees: [3, 4, 3],
  },
  {
    id: 'mood-energetic',
    name: 'i - III - IV - VI (Energetic)',
    genre: 'pop',
    degrees: [0, 2, 3, 5],
  },
  {
    id: 'mood-creepy',
    name: 'I - vi - IV - V (Creepy)',
    genre: 'pop',
    degrees: [0, 5, 3, 4],
  },
  {
    id: 'mood-nirvana',
    name: 'I - IV - V (Nirvana/Foo Fighters)',
    genre: 'pop',
    degrees: [0, 3, 4],
  },
];
