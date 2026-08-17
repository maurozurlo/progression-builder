import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import styles from './SamplerDrawer.module.css';
import { calculateChord } from '../helpers/music';
import {
  getVoicedChordNotes,
  toToneJsPitch,
  smoothProgressionOctaves,
} from '../helpers/pitch';
import {
  initAudio,
  createStrumSynth,
  scheduleProgression,
  startTransport,
  stopTransport,
  stopAllSound,
  setTempo,
} from '../helpers/audio';
import { buildMidiBlob } from '../helpers/midi';
import { getStrumPatterns } from '../data/strumPatterns';
import { useProgressionContext } from '../context/ProgressionContext';
import { VoicedNote } from '../types/music';

type Meter = '4/4' | '3/4';

const meterTuple = (meter: Meter): [number, number] =>
  meter === '4/4' ? [4, 4] : [3, 4];

const SamplerDrawer = () => {
  const { list, fixedKey, fixedMode } = useProgressionContext();

  const [meter, setMeter] = useState<Meter>('4/4');
  const [patternId, setPatternId] = useState(getStrumPatterns('4/4')[0].id);
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);

  const buildVoicedChords = (): VoicedNote[][] =>
    smoothProgressionOctaves(
      list.map((chord) => {
        const tone = fixedKey !== -1 ? (fixedKey as string) : chord.tone;
        const mode = fixedMode !== -1 ? fixedMode : chord.mode;
        const symbol = calculateChord(tone, mode, chord.interval);
        return getVoicedChordNotes(symbol);
      })
    );

  const buildChordPitches = (): string[][] =>
    buildVoicedChords().map((notes) => notes.map(toToneJsPitch));

  const stop = () => {
    stopTransport();
    if (synthRef.current) {
      stopAllSound(synthRef.current);
    }
    loopRef.current?.dispose();
    loopRef.current = null;
    setIsPlaying(false);
  };

  const exportMidi = () => {
    const blob = buildMidiBlob(buildVoicedChords(), bpm, meterTuple(meter)[0]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'progression.mid';
    link.click();
    URL.revokeObjectURL(url);
  };

  const play = async () => {
    if (list.length === 0) return;
    await initAudio();
    if (!synthRef.current) {
      synthRef.current = createStrumSynth();
    }
    const patterns = getStrumPatterns(meter);
    const pattern =
      patterns.find((p) => p.id === patternId) ?? patterns[0];
    loopRef.current = scheduleProgression(
      synthRef.current,
      buildChordPitches(),
      pattern,
      bpm,
      meterTuple(meter)
    );
    startTransport(bpm);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      void play();
    }
  };

  const handleBpmChange = (value: number) => {
    setBpm(value);
    if (isPlaying) {
      setTempo(value);
    }
  };

  const handleMeterChange = (value: Meter) => {
    setMeter(value);
    setPatternId(getStrumPatterns(value)[0].id);
  };

  const handlePatternChange = (value: string) => {
    setPatternId(value);
  };

  //The running Tone.Loop is bound to a fixed chord set/pattern/meter at schedule time, so any of these
  //changing while playing needs a stop+reschedule+restart to actually be heard. A single effect (rather
  //than calling restart() inline from each handler) avoids acting on stale state from the same render.
  useEffect(() => {
    if (!isPlaying) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- stop()/play() drive the live Tone.Transport, an external system; isPlaying is incidental
    stop();
    void play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, fixedKey, fixedMode, patternId, meter]);

  useEffect(() => {
    return () => {
      if (loopRef.current) {
        loopRef.current.dispose();
        stopTransport();
      }
      if (synthRef.current) {
        stopAllSound(synthRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className={styles.field}>
        <label>Meter</label>
        <select
          value={meter}
          onChange={(e) => handleMeterChange(e.target.value as Meter)}
        >
          <option value="4/4">4/4</option>
          <option value="3/4">3/4</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Strum pattern</label>
        <select
          value={patternId}
          onChange={(e) => handlePatternChange(e.target.value)}
        >
          {getStrumPatterns(meter).map((pattern) => (
            <option key={pattern.id} value={pattern.id}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>Tempo: {bpm} BPM</label>
        <input
          type="range"
          min={40}
          max={220}
          value={bpm}
          onChange={(e) => handleBpmChange(Number(e.target.value))}
        />
      </div>

      <div className={styles.transport}>
        <button onClick={togglePlay} disabled={list.length === 0}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <button className={styles.exportButton} onClick={exportMidi}>
        Export MIDI
      </button>
    </div>
  );
};

export default SamplerDrawer;
