import * as Tone from 'tone';
import { DrumPattern } from '../types/music';

export interface DrumKit {
  kick: Tone.MembraneSynth;
  snare: Tone.NoiseSynth;
  hihat: Tone.NoiseSynth;
}

export const createDrumKit = (): DrumKit => {
  const hihatFilter = new Tone.Filter(7000, 'highpass').toDestination();

  return {
    kick: new Tone.MembraneSynth().toDestination(),
    snare: new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.15, sustain: 0 },
    }).toDestination(),
    hihat: new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
    }).connect(hihatFilter),
  };
};

export const scheduleDrumLine = (
  kit: DrumKit,
  pattern: DrumPattern,
  bpm: number,
  meter: [number, number]
): Tone.Loop => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.timeSignature = meter;

  const loop = new Tone.Loop((time) => {
    const barSeconds = Tone.Time('1m').toSeconds();
    pattern.steps.forEach((step) => {
      const stepTime = time + step.offset * barSeconds;
      if (step.voice === 'kick') {
        kit.kick.triggerAttackRelease('C1', '8n', stepTime);
      } else if (step.voice === 'snare') {
        kit.snare.triggerAttackRelease('16n', stepTime);
      } else {
        kit.hihat.triggerAttackRelease('16n', stepTime);
      }
    });
  }, '1m');

  loop.start(0);
  return loop;
};

export const disposeDrumKit = (kit: DrumKit): void => {
  kit.kick.dispose();
  kit.snare.dispose();
  kit.hihat.dispose();
};
