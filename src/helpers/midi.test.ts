import { describe, expect, it } from 'vitest';
import {
  noteToMidiNumber,
  writeVarLen,
  buildMidiBytes,
  buildMultiTrackMidiBytes,
  buildMelodyTrackEvents,
} from './midi';
import { BassPattern, DrumPattern } from '../types/music';

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

describe('buildMultiTrackMidiBytes', () => {
  it('produces a format-1 header with 3 tracks (tempo, chords, bass)', () => {
    const bassPattern: BassPattern = {
      id: 'root-only',
      name: 'Root only',
      genre: 'pop',
      steps: [{ offset: 0, degree: 'root' }],
    };
    const bytes = buildMultiTrackMidiBytes(
      [[{ note: 'C', octave: 4 }]],
      120,
      4,
      {
        line: [
          {
            root: { note: 'C', octave: 2 },
            third: { note: 'E', octave: 2 },
            fifth: { note: 'G', octave: 2 },
            octave: { note: 'C', octave: 3 },
          },
        ],
        pattern: bassPattern,
      }
    );

    const header = String.fromCharCode(...bytes.slice(0, 4));
    expect(header).toBe('MThd');
    expect(bytes[9]).toBe(1); // format 1
    expect(bytes[11]).toBe(3); // 3 tracks
    //Three MTrk chunk headers should be present
    const asString = String.fromCharCode(...bytes);
    expect(asString.split('MTrk').length - 1).toBe(3);
  });

  it('adds a fourth track when a drum pattern is given', () => {
    const drumPattern: DrumPattern = {
      id: 'basic-rock',
      name: 'Basic Rock',
      genre: 'pop',
      steps: [{ offset: 0, voice: 'kick' }],
    };
    const bytes = buildMultiTrackMidiBytes(
      [[{ note: 'C', octave: 4 }]],
      120,
      4,
      undefined,
      { pattern: drumPattern }
    );

    expect(bytes[11]).toBe(3); // tempo, chords, drums
    const asString = String.fromCharCode(...bytes);
    expect(asString.split('MTrk').length - 1).toBe(3);
  });

  it('adds a track when a melody line is given', () => {
    const bytes = buildMultiTrackMidiBytes(
      [[{ note: 'C', octave: 4 }]],
      120,
      4,
      undefined,
      undefined,
      { line: [[{ note: { note: 'E', octave: 4 }, offset: 0 }]] }
    );

    expect(bytes[11]).toBe(3); // tempo, chords, melody
    const asString = String.fromCharCode(...bytes);
    expect(asString.split('MTrk').length - 1).toBe(3);
    expect(asString).toContain('Melody');
  });
});

describe('buildMelodyTrackEvents', () => {
  it('produces a note-on/note-off pair per event, offset within its bar', () => {
    const events = buildMelodyTrackEvents(
      [
        [
          { note: { note: 'C', octave: 4 }, offset: 0 },
          { note: { note: 'E', octave: 4 }, offset: 0.5 },
        ],
      ],
      4
    );

    expect(events).toHaveLength(4);
    const noteOns = events.filter((e) => e.status === 0x90);
    expect(noteOns.map((e) => e.note)).toEqual([60, 64]);
    expect(noteOns[1].tick).toBe(960); // 0.5 * 4 beats * 480 ticks
  });
});
