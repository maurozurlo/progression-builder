import { describe, expect, it } from 'vitest';
import { noteToMidiNumber, writeVarLen, buildMidiBytes } from './midi';

describe('noteToMidiNumber', () => {
  it('converts middle C (C4) to 60', () => {
    expect(noteToMidiNumber({ note: 'C', octave: 4 })).toBe(60);
  });

  it('converts A4 to 69', () => {
    expect(noteToMidiNumber({ note: 'A', octave: 4 })).toBe(69);
  });
});

describe('writeVarLen', () => {
  it('encodes values under 128 as a single byte', () => {
    expect(writeVarLen(0)).toEqual([0]);
    expect(writeVarLen(127)).toEqual([127]);
  });

  it('encodes multi-byte values per the MIDI spec', () => {
    expect(writeVarLen(128)).toEqual([0x81, 0x00]);
    expect(writeVarLen(480)).toEqual([0x83, 0x60]);
  });
});

describe('buildMidiBytes', () => {
  it('produces a valid SMF header and track chunk', () => {
    const bytes = buildMidiBytes(
      [[{ note: 'C', octave: 4 }], [{ note: 'G', octave: 4 }]],
      120,
      4
    );
    const header = String.fromCharCode(...bytes.slice(0, 4));
    expect(header).toBe('MThd');
    const trackChunkStart = bytes.slice(14, 18);
    expect(String.fromCharCode(...trackChunkStart)).toBe('MTrk');
    //Ends with the end-of-track meta event
    expect(bytes.slice(-3)).toEqual([0xff, 0x2f, 0x00]);
  });
});
