export interface Chord {
  tone: string;
  mode: number;
  interval: number;
}

export interface StrumPattern {
  id: string;
  name: string;
  steps: { offset: number; direction: 'D' | 'U' }[]; // fraction-of-bar [0,1)
}

export interface ProgressionTemplate {
  id: string;
  name: string;
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
  steps: { offset: number; degree: BassDegree }[]; // fraction-of-bar [0,1)
}

export type BassChordNotes = Record<BassDegree, VoicedNote>;

export type DrumVoice = 'kick' | 'snare' | 'hihat';

export interface DrumPattern {
  id: string;
  name: string;
  steps: { offset: number; voice: DrumVoice }[]; // fraction-of-bar [0,1)
}

export type MelodyGenre = 'pop' | 'jazz' | 'classical';

export type MotifVariation = 'repeat' | 'invert' | 'sequence' | 'fragment';

export interface MotifStep {
  offset: number; // fraction-of-bar [0,1)
  degreeOffset: number; // diatonic scale steps relative to the motif's own start note
}

export interface MelodyEvent {
  note: VoicedNote;
  offset: number; // fraction-of-bar [0,1)
}
