import { describe, expect, it } from 'vitest';
import { getDrumPatterns } from './drumPatterns';

describe('getDrumPatterns', () => {
  it('returns 4 patterns for 4/4 meter', () => {
    const patterns = getDrumPatterns('4/4');
    expect(patterns.map((p) => p.id)).toEqual([
      'basic-rock',
      'four-on-the-floor',
      'backbeat',
      'half-time',
    ]);
  });

  it('returns 3/4 patterns for 3/4 meter, offsets within [0,1)', () => {
    const patterns = getDrumPatterns('3/4');
    expect(patterns.map((p) => p.id)).toEqual(['waltz', '3-4-rock']);
    patterns.forEach((pattern) => {
      pattern.steps.forEach((step) => {
        expect(step.offset).toBeGreaterThanOrEqual(0);
        expect(step.offset).toBeLessThan(1);
      });
    });
  });

  it('ids are unique within each meter', () => {
    ['4/4', '3/4'].forEach((meter) => {
      const ids = getDrumPatterns(meter as '4/4' | '3/4').map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});
