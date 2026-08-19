import * as Tone from 'tone';
import {
  BassChordNotes,
  BassPattern,
  MelodyEvent,
  StrumPattern,
} from '../types/music';
import { toToneJsPitch } from './pitch';

//Pure helper, kept free of Tone.js so it can be unit tested independent of the audio context
export const computeStepTimes = (
  pattern: StrumPattern,
  barSeconds: number
): number[] => pattern.steps.map((step) => step.offset * barSeconds);

export const initAudio = async (): Promise<void> => {
  await Tone.start();
};

//Real instrument samples (piano/guitar-acoustic/bass-electric) instead of synthesized tones.
//Hosted by https://github.com/nbrosowsky/tonejs-instruments, sampled per semitone; Tone.Sampler
//pitch-shifts to cover any gaps.
const SAMPLE_BASE_URL = 'https://nbrosowsky.github.io/tonejs-instruments/samples';

const SAMPLE_NOTES: Record<string, string[]> = {
  piano: [1, 2, 3, 4, 5, 6, 7].flatMap((octave) =>
    ['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'].map(
      (note) => `${note}${octave}`
    )
  ),
  'guitar-acoustic': [2, 3, 4].flatMap((octave) =>
    ['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'].map(
      (note) => `${note}${octave}`
    )
  ),
  'bass-electric': ['E1', 'G1', 'As1', 'Cs2', 'E2', 'G2', 'As2', 'Cs3'],
};

const toSampleUrls = (instrument: string): Record<string, string> =>
  Object.fromEntries(
    SAMPLE_NOTES[instrument].map((note) => [
      note.replace('s', '#'),
      `${SAMPLE_BASE_URL}/${instrument}/${note}.mp3`,
    ])
  );

const createSampler = (instrument: string): Tone.Sampler =>
  new Tone.Sampler(toSampleUrls(instrument)).toDestination();

export const createStrumSynth = (): Tone.Sampler => createSampler('piano');

export const scheduleProgression = (
  synth: Tone.Sampler,
  chords: string[][],
  pattern: StrumPattern,
  bpm: number,
  meter: [number, number]
): Tone.Loop => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.timeSignature = meter;

  let chordIndex = 0;

  const loop = new Tone.Loop((time) => {
    if (chords.length === 0) return;
    const notes = chords[chordIndex];
    const barSeconds = Tone.Time('1m').toSeconds();
    const stepTimes = computeStepTimes(pattern, barSeconds);
    stepTimes.forEach((offsetSeconds) => {
      synth.triggerAttackRelease(notes, '8n', time + offsetSeconds);
    });
    chordIndex = (chordIndex + 1) % chords.length;
  }, '1m');

  loop.start(0);
  return loop;
};

export const createBassSynth = (): Tone.Sampler =>
  createSampler('bass-electric');

export const scheduleBassLine = (
  synth: Tone.Sampler,
  chords: BassChordNotes[],
  pattern: BassPattern,
  bpm: number,
  meter: [number, number]
): Tone.Loop => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.timeSignature = meter;

  let chordIndex = 0;

  const loop = new Tone.Loop((time) => {
    if (chords.length === 0) return;
    const chordNotes = chords[chordIndex];
    const barSeconds = Tone.Time('1m').toSeconds();
    pattern.steps.forEach((step) => {
      const note = toToneJsPitch(chordNotes[step.degree]);
      synth.triggerAttackRelease(note, '8n', time + step.offset * barSeconds);
    });
    chordIndex = (chordIndex + 1) % chords.length;
  }, '1m');

  loop.start(0);
  return loop;
};

export const createMelodySynth = (): Tone.Sampler =>
  createSampler('guitar-acoustic');

export const scheduleMelodyLine = (
  synth: Tone.Sampler,
  bars: MelodyEvent[][],
  bpm: number,
  meter: [number, number]
): Tone.Loop => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.timeSignature = meter;

  let barIndex = 0;

  const loop = new Tone.Loop((time) => {
    if (bars.length === 0) return;
    const events = bars[barIndex];
    const barSeconds = Tone.Time('1m').toSeconds();
    events.forEach((event) => {
      synth.triggerAttackRelease(
        toToneJsPitch(event.note),
        '16n',
        time + event.offset * barSeconds
      );
    });
    barIndex = (barIndex + 1) % bars.length;
  }, '1m');

  loop.start(0);
  return loop;
};

export const startTransport = (bpm: number): void => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.start();
};

export const stopTransport = (): void => {
  Tone.Transport.stop();
};

//Notes already scheduled by triggerAttackRelease have their release tied to Transport time, so stopping
//the Transport mid-note can leave it stuck on; forcing release on the synth guarantees silence.
export const stopAllSound = (synth: Tone.Sampler): void => {
  Tone.Transport.cancel();
  synth.releaseAll();
};

export const setTempo = (bpm: number): void => {
  Tone.Transport.bpm.value = bpm;
};
