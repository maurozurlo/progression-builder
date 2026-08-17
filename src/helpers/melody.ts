import { getScaleNoteName } from './music';
import { smoothProgressionOctaves } from './pitch';
import {
  Chord,
  MelodyEvent,
  MelodyGenre,
  MotifStep,
  MotifVariation,
  VoicedNote,
} from '../types/music';
import { melodyGenres, GenrePreset } from '../data/melodyGenres';

const pickWeighted = <T>(options: [T, number][]): T => {
  const total = options.reduce((sum, [, weight]) => sum + weight, 0);
  let r = Math.random() * total;
  for (const [value, weight] of options) {
    if (r < weight) return value;
    r -= weight;
  }
  return options[options.length - 1][0];
};

const pickOffsets = (preset: GenrePreset): number[] => {
  const numNotes = Math.min(
    preset.offsets.length,
    preset.numNotes[0] +
      Math.floor(Math.random() * (preset.numNotes[1] - preset.numNotes[0] + 1))
  );
  const rest = preset.offsets.filter((o) => o !== 0);
  const chosen = new Set<number>([0]);
  while (chosen.size < numNotes && chosen.size < preset.offsets.length) {
    const candidate = rest[Math.floor(Math.random() * rest.length)];
    chosen.add(candidate);
  }
  return Array.from(chosen).sort((a, b) => a - b);
};

//A motif is a short (one-bar) rhythmic/contour cell generated once per phrase and then reused across
//the whole progression via varyMotif, rather than generated independently per chord -- this repetition
//is what makes the result read as a written melody instead of chord-tone noodling.
export const generateMotif = (genre: MelodyGenre): MotifStep[] => {
  const preset = melodyGenres[genre];
  const offsets = pickOffsets(preset);
  let cumulative = 0;
  return offsets.map((offset, i) => {
    if (i === 0) return { offset, degreeOffset: 0 };
    cumulative += pickWeighted(preset.intervalWeights);
    return { offset, degreeOffset: cumulative };
  });
};

export const varyMotif = (
  motif: MotifStep[],
  variation: MotifVariation
): MotifStep[] => {
  switch (variation) {
    case 'invert':
      return motif.map((s) => ({ ...s, degreeOffset: -s.degreeOffset }));
    case 'sequence':
      return motif.map((s) => ({ ...s, degreeOffset: s.degreeOffset + 1 }));
    case 'fragment': {
      const half = motif.slice(0, Math.max(1, Math.ceil(motif.length / 2)));
      return [...half, { offset: 0.875, degreeOffset: 0 }];
    }
    case 'repeat':
    default:
      return motif;
  }
};

//Maps phrase position to a variation, shaping tension/release across the progression: state the motif,
//develop it, contrast it, then resolve it back toward the anchor on the final chord (a cadence gesture).
const curvesByLength: Record<number, MotifVariation[]> = {
  1: ['repeat'],
  2: ['repeat', 'fragment'],
  3: ['repeat', 'sequence', 'fragment'],
  4: ['repeat', 'sequence', 'invert', 'fragment'],
};

export const buildTensionCurve = (numChords: number): MotifVariation[] => {
  if (curvesByLength[numChords]) return curvesByLength[numChords];
  const base = curvesByLength[4];
  return Array.from({ length: numChords }, (_, i) =>
    i === numChords - 1 ? 'fragment' : base[i % base.length]
  );
};

//Anchors the motif's first note to a chord tone (root/third/fifth, stacked diatonically from the chord's
//own scale degree) and walks the rest of the motif's relative shape from there, so every note stays
//diatonic to the current chord's key context.
const pickAnchorDegree = (
  chordInterval: number,
  isPhraseEdge: boolean
): number => {
  const root = chordInterval;
  const third = chordInterval + 2;
  const fifth = chordInterval + 4;
  if (isPhraseEdge) return root;
  return pickWeighted<number>([
    [root, 3],
    [third, 2],
    [fifth, 1],
  ]);
};

export const applyMotifToChord = (
  motif: MotifStep[],
  key: string,
  mode: number,
  anchorDegree: number,
  octave: number
): MelodyEvent[] =>
  motif.map((step) => {
    const absoluteDegree = anchorDegree + step.degreeOffset;
    const octaveShift = Math.floor(absoluteDegree / 7);
    const note = getScaleNoteName(key, mode, absoluteDegree);
    return {
      note: { note, octave: octave + octaveShift },
      offset: step.offset,
    };
  });

//A single pass through a short progression (e.g. 4 chords) only gives the tension curve 4 bars to work
//with, so the whole motif development plays out once and then the loop repeats the identical phrase
//forever -- feels short and static. Repeating the chord list into one longer phrase before generating
//gives the curve room to actually develop (state, vary, contrast, resolve) across several loops of the
//progression before the melody starts over, targeting roughly an 8-bar phrase.
const targetPhraseBars = 8;
const phraseRepeatsFor = (chordCount: number): number =>
  Math.min(4, Math.max(1, Math.round(targetPhraseBars / chordCount)));

export const buildMelodyLine = (
  list: Chord[],
  fixedKey: number | string,
  fixedMode: number,
  genre: MelodyGenre,
  octave = 4
): MelodyEvent[][] => {
  if (list.length === 0) return [];
  const repeats = phraseRepeatsFor(list.length);
  const phrase = Array.from({ length: repeats }, () => list).flat();
  const motif = generateMotif(genre);
  const curve = buildTensionCurve(phrase.length);

  const bars = phrase.map((chord, i) => {
    const tone = fixedKey !== -1 ? (fixedKey as string) : chord.tone;
    const mode = fixedMode !== -1 ? fixedMode : chord.mode;
    const isPhraseEdge = i === 0 || i === phrase.length - 1;
    const anchorDegree = pickAnchorDegree(chord.interval, isPhraseEdge);
    const varied = varyMotif(motif, curve[i]);
    return applyMotifToChord(varied, tone, mode, anchorDegree, octave);
  });

  //smoothProgressionOctaves works over VoicedNote[][], so run the events' pitches through it, then
  //carry the resulting octave shift back onto the original per-note offsets.
  const pitchesOnly: VoicedNote[][] = bars.map((events) =>
    events.map((e) => e.note)
  );
  const smoothed = smoothProgressionOctaves(pitchesOnly);
  return bars.map((events, i) =>
    events.map((event, j) => ({ ...event, note: smoothed[i][j] }))
  );
};
