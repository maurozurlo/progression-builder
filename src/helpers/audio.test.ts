import { describe, expect, it } from 'vitest';
import { computeStepTimes } from './audio';
import { strumPatterns4_4, strumPatterns3_4 } from '../data/strumPatterns';

describe('computeStepTimes', () => {
  it('scales each pattern step offset by the bar duration', () => {
    const pattern = strumPatterns4_4.find((p) => p.id === 'ddu-uu')!;
    expect(computeStepTimes(pattern, 2)).toEqual([0, 0.5, 1, 1.5]);
  });

  it('handles a single-step (down only) pattern', () => {
    const pattern = strumPatterns4_4.find((p) => p.id === 'down-only')!;
    expect(computeStepTimes(pattern, 2)).toEqual([0]);
  });

  it('works for 3/4 patterns too', () => {
    const pattern = strumPatterns3_4.find((p) => p.id === 'ddu-uu')!;
    const times = computeStepTimes(pattern, 3);
    expect(times[0]).toBeCloseTo(0);
    expect(times[1]).toBeCloseTo(1);
    expect(times[2]).toBeCloseTo(2);
  });
});
