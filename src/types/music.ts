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
