import * as Tone from 'tone';
import { StrumPattern } from '../types/music';

//Pure helper, kept free of Tone.js so it can be unit tested independent of the audio context
export const computeStepTimes = (
  pattern: StrumPattern,
  barSeconds: number
): number[] => pattern.steps.map((step) => step.offset * barSeconds);

export const initAudio = async (): Promise<void> => {
  await Tone.start();
};

export const createStrumSynth = (): Tone.PolySynth =>
  new Tone.PolySynth(Tone.Synth).toDestination();

export const scheduleProgression = (
  synth: Tone.PolySynth,
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

export const startTransport = (bpm: number): void => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.start();
};

export const stopTransport = (): void => {
  Tone.Transport.stop();
};

//Notes already scheduled by triggerAttackRelease have their release tied to Transport time, so stopping
//the Transport mid-note can leave it stuck on; forcing release on the synth guarantees silence.
export const stopAllSound = (synth: Tone.PolySynth): void => {
  Tone.Transport.cancel();
  synth.releaseAll();
};

export const setTempo = (bpm: number): void => {
  Tone.Transport.bpm.value = bpm;
};
