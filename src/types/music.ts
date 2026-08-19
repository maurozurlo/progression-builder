export interface Chord {
  tone: string;
  mode: number;
  interval: number;
}

export type Genre =
  | 'jazz'
  | 'blues12'
  | 'punk'
  | 'reggae'
  | 'metal'
  | 'ambient'
  | 'pop'
  | 'hiphop';

export type VoicingStyle =
  | 'triad'
  | 'triad-1st-inv'
  | 'power'
  | 'shell'
  | 'seventh'
  | 'ninth';

export const voicingLabels: Record<VoicingStyle, string> = {
  triad: 'Triads',
  'triad-1st-inv': 'Triads (1st inversion)',
  power: 'Power chords (5ths)',
  shell: 'Shell voicings (root + 7th)',
  seventh: '7th chords',
  ninth: '9th chords (add 9)',
};

export const genreLabels: Record<Genre, string> = {
  jazz: 'Jazz',
  blues12: '12-Bar Blues',
  punk: 'Punk',
  reggae: 'Reggae',
  metal: 'Metal',
  ambient: 'Ambient',
  pop: 'Pop',
  hiphop: 'Hip Hop',
};

export interface StrumPattern {
  id: string;
  name: string;
  genre: Genre;
  steps: { offset: number; direction: 'D' | 'U' }[]; // fraction-of-bar [0,1)
}

export interface ProgressionTemplate {
  id: string;
  name: string;
  genre: Genre;
  degrees: number[];
}

export interface VoicedNote {
  note: string;
  octave: number;
}

export type BassDegree = 'root' | 'third' | 'fifth' | 'octave';

export interface BassPattern {
  id: string;
  name: string;
  genre: Genre;
  steps: { offset: number; degree: BassDegree }[]; // fraction-of-bar [0,1)
}

export type BassChordNotes = Record<BassDegree, VoicedNote>;

export type DrumVoice = 'kick' | 'snare' | 'hihat';

export interface DrumPattern {
  id: string;
  name: string;
  genre: Genre;
  steps: { offset: number; voice: DrumVoice }[]; // fraction-of-bar [0,1)
}

export type MelodyGenre = Genre;

export type MotifVariation = 'repeat' | 'invert' | 'sequence' | 'fragment';

export interface MotifStep {
  offset: number; // fraction-of-bar [0,1)
  degreeOffset: number; // diatonic scale steps relative to the motif's own start note
}

export interface MelodyEvent {
  note: VoicedNote;
  offset: number; // fraction-of-bar [0,1)
}
