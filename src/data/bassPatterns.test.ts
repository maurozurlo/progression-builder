import { describe, expect, it } from 'vitest';
import { getBassPatterns } from './bassPatterns';

describe('getBassPatterns', () => {
  it('returns 4/4 patterns for 4/4 meter, including the original core set', () => {
    const patterns = getBassPatterns('4/4');
    const ids = patterns.map((p) => p.id);
    expect(ids).toEqual(expect.arrayContaining([
      'root-only',
      'root-fifth',
      'root-octave-pulse',
      'walking',
    ]));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('returns 3/4 patterns for 3/4 meter, offsets within [0,1)', () => {
    const patterns = getBassPatterns('3/4');
    patterns.forEach((pattern) => {
      pattern.steps.forEach((step) => {
        expect(step.offset).toBeGreaterThanOrEqual(0);
        expect(step.offset).toBeLessThan(1);
      });
    });
  });
});
