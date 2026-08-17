import {
  BassChordNotes,
  BassPattern,
  DrumPattern,
  DrumVoice,
  MelodyEvent,
  VoicedNote,
} from '../types/music';

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
const EIGHTH_NOTE_TICKS = TICKS_PER_QUARTER / 2;

interface MidiEvent {
  tick: number;
  status: number;
  note: number;
  velocity: number;
}

export const buildChordTrackEvents = (
  chords: VoicedNote[][],
  beatsPerBar: number
): MidiEvent[] => {
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

  return events;
};

export const buildBassTrackEvents = (
  bassLine: BassChordNotes[],
  pattern: BassPattern,
  beatsPerBar: number
): MidiEvent[] => {
  const ticksPerBar = TICKS_PER_QUARTER * beatsPerBar;
  const events: MidiEvent[] = [];

  bassLine.forEach((chordNotes, i) => {
    const barStartTick = i * ticksPerBar;
    pattern.steps.forEach((step) => {
      const startTick = barStartTick + Math.round(step.offset * ticksPerBar);
      const endTick = startTick + EIGHTH_NOTE_TICKS;
      const note = noteToMidiNumber(chordNotes[step.degree]);
      events.push({ tick: startTick, status: 0x90, note, velocity: 100 });
      events.push({ tick: endTick, status: 0x80, note, velocity: 0 });
    });
  });

  return events;
};

export const buildMelodyTrackEvents = (
  melodyLine: MelodyEvent[][],
  beatsPerBar: number
): MidiEvent[] => {
  const ticksPerBar = TICKS_PER_QUARTER * beatsPerBar;
  const events: MidiEvent[] = [];

  melodyLine.forEach((bar, i) => {
    const barStartTick = i * ticksPerBar;
    bar.forEach((event) => {
      const startTick = barStartTick + Math.round(event.offset * ticksPerBar);
      const endTick = startTick + EIGHTH_NOTE_TICKS;
      const note = noteToMidiNumber(event.note);
      events.push({ tick: startTick, status: 0x90, note, velocity: 100 });
      events.push({ tick: endTick, status: 0x80, note, velocity: 0 });
    });
  });

  return events;
};

//General MIDI percussion key map (channel 10)
const GM_DRUM_NOTES: Record<DrumVoice, number> = {
  kick: 36, // Acoustic Bass Drum
  snare: 38, // Acoustic Snare
  hihat: 42, // Closed Hi-Hat
};

const DRUM_CHANNEL = 9;

export const buildDrumTrackEvents = (
  pattern: DrumPattern,
  barCount: number,
  beatsPerBar: number
): MidiEvent[] => {
  const ticksPerBar = TICKS_PER_QUARTER * beatsPerBar;
  const events: MidiEvent[] = [];

  for (let i = 0; i < barCount; i++) {
    const barStartTick = i * ticksPerBar;
    pattern.steps.forEach((step) => {
      const startTick = barStartTick + Math.round(step.offset * ticksPerBar);
      const endTick = startTick + EIGHTH_NOTE_TICKS;
      const note = GM_DRUM_NOTES[step.voice];
      events.push({
        tick: startTick,
        status: 0x90 | DRUM_CHANNEL,
        note,
        velocity: 100,
      });
      events.push({
        tick: endTick,
        status: 0x80 | DRUM_CHANNEL,
        note,
        velocity: 0,
      });
    });
  }

  return events;
};

//Note-offs before note-ons at the same tick, so a note repeated immediately after doesn't overlap itself
const sortEvents = (events: MidiEvent[]): MidiEvent[] =>
  [...events].sort((a, b) => a.tick - b.tick || a.status - b.status);

const trackNameBytes = (name: string): number[] => {
  const nameBytes = Array.from(name, (c) => c.charCodeAt(0));
  return [...writeVarLen(0), 0xff, 0x03, ...writeVarLen(nameBytes.length), ...nameBytes];
};

const buildTrackChunk = (
  events: MidiEvent[],
  options?: { name?: string; tempoMicroseconds?: number }
): number[] => {
  const trackBytes: number[] = [];

  if (options?.name !== undefined) {
    trackBytes.push(...trackNameBytes(options.name));
  }

  if (options?.tempoMicroseconds !== undefined) {
    trackBytes.push(
      ...writeVarLen(0),
      0xff,
      0x51,
      0x03,
      (options.tempoMicroseconds >> 16) & 0xff,
      (options.tempoMicroseconds >> 8) & 0xff,
      options.tempoMicroseconds & 0xff
    );
  }

  let prevTick = 0;
  sortEvents(events).forEach((event) => {
    trackBytes.push(...writeVarLen(event.tick - prevTick));
    trackBytes.push(event.status, event.note, event.velocity);
    prevTick = event.tick;
  });
  trackBytes.push(...writeVarLen(0), 0xff, 0x2f, 0x00);

  const trackLength = trackBytes.length;
  return [
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
};

const buildHeader = (trackCount: number): number[] => [
  0x4d,
  0x54,
  0x68,
  0x64, // 'MThd'
  0x00,
  0x00,
  0x00,
  0x06, // header length
  0x00,
  trackCount > 1 ? 0x01 : 0x00, // format 0 (single track) or 1 (multi-track)
  0x00,
  trackCount, // track count
  (TICKS_PER_QUARTER >> 8) & 0xff,
  TICKS_PER_QUARTER & 0xff,
];

export const buildMidiBytes = (
  chords: VoicedNote[][],
  bpm: number,
  beatsPerBar: number
): number[] => {
  const microsecondsPerQuarter = Math.round(60000000 / bpm);
  const track = buildTrackChunk(buildChordTrackEvents(chords, beatsPerBar), {
    name: 'Chords',
    tempoMicroseconds: microsecondsPerQuarter,
  });
  return [...buildHeader(1), ...track];
};

//Some players treat track 0 of a format-1 file as a conductor track and ignore any notes in it, so
//tempo gets its own leading track rather than sharing one with the chord notes -- otherwise only the
//later (bass) track would be heard.
export const buildMultiTrackMidiBytes = (
  chords: VoicedNote[][],
  bpm: number,
  beatsPerBar: number,
  bass?: { line: BassChordNotes[]; pattern: BassPattern },
  drums?: { pattern: DrumPattern },
  melody?: { line: MelodyEvent[][] }
): number[] => {
  const microsecondsPerQuarter = Math.round(60000000 / bpm);
  const tempoTrack = buildTrackChunk([], {
    name: 'Tempo',
    tempoMicroseconds: microsecondsPerQuarter,
  });
  const chordTrack = buildTrackChunk(buildChordTrackEvents(chords, beatsPerBar), {
    name: 'Chords',
  });
  const tracks = [tempoTrack, chordTrack];

  if (bass) {
    tracks.push(
      buildTrackChunk(
        buildBassTrackEvents(bass.line, bass.pattern, beatsPerBar),
        { name: 'Bass' }
      )
    );
  }

  if (melody) {
    tracks.push(
      buildTrackChunk(buildMelodyTrackEvents(melody.line, beatsPerBar), {
        name: 'Melody',
      })
    );
  }

  if (drums) {
    tracks.push(
      buildTrackChunk(
        buildDrumTrackEvents(drums.pattern, chords.length, beatsPerBar),
        { name: 'Drums' }
      )
    );
  }

  return [...buildHeader(tracks.length), ...tracks.flat()];
};

export const buildMidiBlob = (
  chords: VoicedNote[][],
  bpm: number,
  beatsPerBar: number,
  bass?: { line: BassChordNotes[]; pattern: BassPattern },
  drums?: { pattern: DrumPattern },
  melody?: { line: MelodyEvent[][] }
): Blob => {
  const bytes =
    bass || drums || melody
      ? buildMultiTrackMidiBytes(chords, bpm, beatsPerBar, bass, drums, melody)
      : buildMidiBytes(chords, bpm, beatsPerBar);
  return new Blob([new Uint8Array(bytes)], { type: 'audio/midi' });
};
