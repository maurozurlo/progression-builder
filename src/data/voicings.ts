import { Genre, VoicingStyle } from '../types/music';

export const defaultVoicingByGenre: Record<Genre, VoicingStyle> = {
  jazz: 'shell',
  blues12: 'seventh',
  punk: 'power',
  reggae: 'triad',
  metal: 'power',
  ambient: 'ninth',
  pop: 'triad',
  hiphop: 'seventh',
};

export const voicingStyles: VoicingStyle[] = [
  'triad',
  'triad-1st-inv',
  'power',
  'shell',
  'seventh',
  'ninth',
];
