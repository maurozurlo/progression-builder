import { VoicedNote } from '../types/music';

const noteOrder = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const noteToMidiNumber = (n: VoicedNote): number =>
  12 * (n.octave + 1) + noteOrder.indexOf(n.note);

//Standard MIDI variable-length quantity encoding
export const writeVarLen = (value: number): number[] => {
  const bytes = [value & 0x7f];
  let remaining = value >> 7;
  while (remaining > 0) {
    bytes.unshift((remaining & 0x7f) | 0x80);
    remaining >>= 7;
  }
  return bytes;
};

const TICKS_PER_QUARTER = 480;

interface MidiEvent {
  tick: number;
  status: number;
  note: number;
  velocity: number;
}

export const buildMidiBytes = (
  chords: VoicedNote[][],
  bpm: number,
  beatsPerBar: number
): number[] => {
  const ticksPerBar = TICKS_PER_QUARTER * beatsPerBar;
  const events: MidiEvent[] = [];

  chords.forEach((notes, i) => {
    const startTick = i * ticksPerBar;
    const endTick = startTick + ticksPerBar;
    notes.forEach((n) => {
      const note = noteToMidiNumber(n);
      events.push({ tick: startTick, status: 0x90, note, velocity: 100 });
      events.push({ tick: endTick, status: 0x80, note, velocity: 0 });
    });
  });

  //Note-offs before note-ons at the same tick, so a chord repeated in the next bar doesn't overlap itself
  events.sort((a, b) => a.tick - b.tick || a.status - b.status);

  const microsecondsPerQuarter = Math.round(60000000 / bpm);
  const trackBytes: number[] = [
    ...writeVarLen(0),
    0xff,
    0x51,
    0x03,
    (microsecondsPerQuarter >> 16) & 0xff,
    (microsecondsPerQuarter >> 8) & 0xff,
    microsecondsPerQuarter & 0xff,
  ];

  let prevTick = 0;
  events.forEach((event) => {
    trackBytes.push(...writeVarLen(event.tick - prevTick));
    trackBytes.push(event.status, event.note, event.velocity);
    prevTick = event.tick;
  });
  trackBytes.push(...writeVarLen(0), 0xff, 0x2f, 0x00);

  const header = [
    0x4d,
    0x54,
    0x68,
    0x64, // 'MThd'
    0x00,
    0x00,
    0x00,
    0x06, // header length
    0x00,
    0x00, // format 0
    0x00,
    0x01, // 1 track
    (TICKS_PER_QUARTER >> 8) & 0xff,
    TICKS_PER_QUARTER & 0xff,
  ];

  const trackLength = trackBytes.length;
  const track = [
    0x4d,
    0x54,
    0x72,
    0x6b, // 'MTrk'
    (trackLength >> 24) & 0xff,
    (trackLength >> 16) & 0xff,
    (trackLength >> 8) & 0xff,
    trackLength & 0xff,
    ...trackBytes,
  ];

  return [...header, ...track];
};

export const buildMidiBlob = (
  chords: VoicedNote[][],
  bpm: number,
  beatsPerBar: number
): Blob =>
  new Blob([new Uint8Array(buildMidiBytes(chords, bpm, beatsPerBar))], {
    type: 'audio/midi',
  });
