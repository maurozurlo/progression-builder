import '@testing-library/jest-dom';
import { vi } from 'vitest';

// jsdom has no Web Audio API, so Tone.js's real Transport/synths throw.
// Stub the surface the app touches with no-op/chainable fakes.
vi.mock('tone', () => {
  class FakeNode {
    toDestination() {
      return this;
    }
    connect() {
      return this;
    }
    triggerAttackRelease() {}
    releaseAll() {}
    dispose() {}
  }

  class FakeLoop extends FakeNode {
    start() {
      return this;
    }
    stop() {
      return this;
    }
  }

  return {
    start: vi.fn().mockResolvedValue(undefined),
    loaded: vi.fn().mockResolvedValue(undefined),
    PolySynth: FakeNode,
    Synth: FakeNode,
    Sampler: FakeNode,
    MembraneSynth: FakeNode,
    NoiseSynth: FakeNode,
    Filter: FakeNode,
    Loop: FakeLoop,
    Time: () => ({ toSeconds: () => 0 }),
    Transport: {
      bpm: { value: 120 },
      timeSignature: [4, 4],
      start: vi.fn(),
      stop: vi.fn(),
      cancel: vi.fn(),
    },
  };
});
