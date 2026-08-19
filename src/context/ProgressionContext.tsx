import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import * as Tone from 'tone';
import { Chord, MelodyGenre, VoicingStyle } from '../types/music';
import { GeneratedSong } from '../helpers/songGenerator';
import { buildBassLine } from '../helpers/bass';
import { buildMelodyLine } from '../helpers/melody';
import {
  initAudio,
  createStrumSynth,
  createBassSynth,
  createMelodySynth,
  scheduleProgression,
  scheduleBassLine,
  scheduleMelodyLine,
  startTransport,
  stopTransport,
  stopAllSound,
  setTempo,
} from '../helpers/audio';
import {
  createDrumKit,
  disposeDrumKit,
  scheduleDrumLine,
  DrumKit,
} from '../helpers/drums';
import { buildChordPitches, meterTuple, Meter } from '../helpers/playback';
import { getStrumPatterns } from '../data/strumPatterns';
import { getBassPatterns } from '../data/bassPatterns';
import { getDrumPatterns } from '../data/drumPatterns';

type FixValue = ['key', string | number] | ['mode', number];

export interface ProgressionState {
  list: Chord[];
  fixedKey: number | string;
  fixedMode: number;
  modalState: number;
  samplerOpen: boolean;
  generatorOpen: boolean;
  bassOpen: boolean;
  drumsOpen: boolean;
  melodyOpen: boolean;
  chordsOn: boolean;
  bpm: number;
  meter: Meter;
  patternId: string;
  bassPatternId: string;
  drumPatternId: string;
  melodyGenre: '' | MelodyGenre;
  voicingId: VoicingStyle;
}

interface ProgressionContextValue extends ProgressionState {
  maxChords: number;
  isPlaying: boolean;
  setList: (list: Chord[]) => void;
  setChordAt: (index: number, patch: Partial<Chord>) => void;
  addChord: () => void;
  removeChord: () => void;
  fix: (val: FixValue) => void;
  openModal: (n: number) => void;
  closeModal: () => void;
  applyGenerated: (chords: Chord[], mode: 'replace' | 'append') => void;
  applyGeneratedSong: (song: GeneratedSong) => void;
  toggleSampler: () => void;
  toggleGenerator: () => void;
  toggleBass: () => void;
  toggleDrums: () => void;
  toggleMelody: () => void;
  setChordsOn: (on: boolean) => void;
  setBpm: (bpm: number) => void;
  setMeter: (meter: Meter) => void;
  setPatternId: (id: string) => void;
  setBassPatternId: (id: string) => void;
  setDrumPatternId: (id: string) => void;
  setMelodyGenre: (genre: '' | MelodyGenre) => void;
  setVoicingId: (voicing: VoicingStyle) => void;
  togglePlay: () => void;
}

const defaultChord: Chord = {
  tone: 'C',
  mode: 0,
  interval: 0,
};

const maxChords = 12;

const ProgressionContext = createContext<ProgressionContextValue | undefined>(
  undefined
);

export const ProgressionProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: Partial<ProgressionState>;
}) => {
  const [list, setList] = useState<Chord[]>(
    initialState?.list ?? [defaultChord]
  );
  //Fixed Key
  //-1: Key is not fixed
  //0-11: toneNames[]
  const [fixedKey, setFixedKey] = useState<number | string>(
    initialState?.fixedKey ?? -1
  );
  //Fixed Mode
  const [fixedMode, setFixedMode] = useState<number>(
    initialState?.fixedMode ?? -1
  );
  //Modal
  //-1: Closed modal
  //0: Fix key
  //1: Fix mode
  const [modalState, setModalState] = useState<number>(
    initialState?.modalState ?? -1
  );
  const [samplerOpen, setSamplerOpen] = useState<boolean>(
    initialState?.samplerOpen ?? false
  );
  const [generatorOpen, setGeneratorOpen] = useState<boolean>(
    initialState?.generatorOpen ?? false
  );
  const [bassOpen, setBassOpen] = useState<boolean>(
    initialState?.bassOpen ?? false
  );
  const [drumsOpen, setDrumsOpen] = useState<boolean>(
    initialState?.drumsOpen ?? false
  );
  const [melodyOpen, setMelodyOpen] = useState<boolean>(
    initialState?.melodyOpen ?? false
  );
  const [chordsOn, setChordsOn] = useState<boolean>(
    initialState?.chordsOn ?? true
  );

  const [bpm, setBpm] = useState<number>(initialState?.bpm ?? 120);
  const [meter, setMeterState] = useState<Meter>(
    initialState?.meter ?? '4/4'
  );
  const [patternId, setPatternId] = useState<string>(
    initialState?.patternId ?? getStrumPatterns(meter)[0].id
  );
  const [bassPatternId, setBassPatternId] = useState<string>(
    initialState?.bassPatternId ?? ''
  );
  const [drumPatternId, setDrumPatternId] = useState<string>(
    initialState?.drumPatternId ?? ''
  );
  const [melodyGenre, setMelodyGenre] = useState<'' | MelodyGenre>(
    initialState?.melodyGenre ?? ''
  );
  const [voicingId, setVoicingId] = useState<VoicingStyle>(
    initialState?.voicingId ?? 'triad'
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const bassSynthRef = useRef<Tone.PolySynth | null>(null);
  const melodySynthRef = useRef<Tone.PolySynth | null>(null);
  const drumKitRef = useRef<DrumKit | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);
  const bassLoopRef = useRef<Tone.Loop | null>(null);
  const melodyLoopRef = useRef<Tone.Loop | null>(null);
  const drumLoopRef = useRef<Tone.Loop | null>(null);

  const closeModal = () => setModalState(-1);
  const openModal = (n: number) => setModalState(n);

  const fix = (val: FixValue) => {
    closeModal();
    if (val[0] === 'key') {
      setFixedKey(val[1]);
    } else {
      setFixedMode(val[1]);
    }
  };

  const setChordAt = (index: number, patch: Partial<Chord>) => {
    setList((prev) =>
      prev.map((chord, i) => (i === index ? { ...chord, ...patch } : chord))
    );
  };

  const addChord = () => {
    setList((prev) =>
      prev.length < maxChords ? [...prev, defaultChord] : prev
    );
  };

  const removeChord = () => {
    setList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const applyGenerated = (chords: Chord[], mode: 'replace' | 'append') => {
    setList((prev) => {
      const next = mode === 'replace' ? chords : [...prev, ...chords];
      return next.slice(0, maxChords);
    });
  };

  const applyGeneratedSong = (song: GeneratedSong) => {
    setList(song.chords);
    setFixedKey(song.tone);
    setFixedMode(song.mode);
    setPatternId(song.patternId);
    setBassPatternId(song.bassPatternId);
    setDrumPatternId(song.drumPatternId);
    setMelodyGenre(song.melodyGenre);
    setVoicingId(song.voicingId);
    handleSetBpm(song.bpm);
  };

  const toggleSampler = () => {
    setSamplerOpen((prev) => !prev);
    setGeneratorOpen(false);
    setBassOpen(false);
    setDrumsOpen(false);
    setMelodyOpen(false);
  };

  const toggleGenerator = () => {
    setGeneratorOpen((prev) => !prev);
    setSamplerOpen(false);
    setBassOpen(false);
    setDrumsOpen(false);
    setMelodyOpen(false);
  };

  const toggleBass = () => {
    setBassOpen((prev) => !prev);
    setSamplerOpen(false);
    setGeneratorOpen(false);
    setDrumsOpen(false);
    setMelodyOpen(false);
  };

  const toggleDrums = () => {
    setDrumsOpen((prev) => !prev);
    setSamplerOpen(false);
    setGeneratorOpen(false);
    setBassOpen(false);
    setMelodyOpen(false);
  };

  const toggleMelody = () => {
    setMelodyOpen((prev) => !prev);
    setSamplerOpen(false);
    setGeneratorOpen(false);
    setBassOpen(false);
    setDrumsOpen(false);
  };

  const setMeter = (value: Meter) => {
    setMeterState(value);
    setPatternId(getStrumPatterns(value)[0].id);
  };

  const stop = () => {
    stopTransport();
    if (synthRef.current) {
      stopAllSound(synthRef.current);
    }
    if (bassSynthRef.current) {
      stopAllSound(bassSynthRef.current);
    }
    if (melodySynthRef.current) {
      stopAllSound(melodySynthRef.current);
    }
    loopRef.current?.dispose();
    loopRef.current = null;
    bassLoopRef.current?.dispose();
    bassLoopRef.current = null;
    melodyLoopRef.current?.dispose();
    melodyLoopRef.current = null;
    drumLoopRef.current?.dispose();
    drumLoopRef.current = null;
    setIsPlaying(false);
  };

  const play = async () => {
    if (list.length === 0) return;
    await initAudio();
    if (chordsOn) {
      if (!synthRef.current) {
        synthRef.current = createStrumSynth();
      }
      const patterns = getStrumPatterns(meter);
      const pattern = patterns.find((p) => p.id === patternId) ?? patterns[0];
      loopRef.current = scheduleProgression(
        synthRef.current,
        buildChordPitches(list, fixedKey, fixedMode, voicingId),
        pattern,
        bpm,
        meterTuple(meter)
      );
    }

    if (bassPatternId) {
      if (!bassSynthRef.current) {
        bassSynthRef.current = createBassSynth();
      }
      const bassPatterns = getBassPatterns(meter);
      const bassPattern =
        bassPatterns.find((p) => p.id === bassPatternId) ?? bassPatterns[0];
      bassLoopRef.current = scheduleBassLine(
        bassSynthRef.current,
        buildBassLine(list, fixedKey, fixedMode),
        bassPattern,
        bpm,
        meterTuple(meter)
      );
    }

    if (melodyGenre) {
      if (!melodySynthRef.current) {
        melodySynthRef.current = createMelodySynth();
      }
      melodyLoopRef.current = scheduleMelodyLine(
        melodySynthRef.current,
        buildMelodyLine(list, fixedKey, fixedMode, melodyGenre),
        bpm,
        meterTuple(meter)
      );
    }

    if (drumPatternId) {
      if (!drumKitRef.current) {
        drumKitRef.current = createDrumKit();
      }
      const drumPatterns = getDrumPatterns(meter);
      const drumPattern =
        drumPatterns.find((p) => p.id === drumPatternId) ?? drumPatterns[0];
      drumLoopRef.current = scheduleDrumLine(
        drumKitRef.current,
        drumPattern,
        bpm,
        meterTuple(meter)
      );
    }

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

  const handleSetBpm = (value: number) => {
    setBpm(value);
    if (isPlaying) {
      setTempo(value);
    }
  };

  //The running Tone.Loops are bound to a fixed chord set/pattern/meter/bpm at schedule time, so any of
  //these changing while playing needs a stop+reschedule+restart to actually be heard. A single effect
  //(rather than acting inline from each setter) avoids acting on stale state from the same render.
  useEffect(() => {
    if (!isPlaying) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- stop()/play() drive the live Tone.Transport, an external system; isPlaying is incidental
    stop();
    void play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    list,
    fixedKey,
    fixedMode,
    patternId,
    bassPatternId,
    drumPatternId,
    melodyGenre,
    voicingId,
    chordsOn,
    meter,
  ]);

  useEffect(() => {
    return () => {
      if (loopRef.current) {
        loopRef.current.dispose();
      }
      if (bassLoopRef.current) {
        bassLoopRef.current.dispose();
      }
      if (melodyLoopRef.current) {
        melodyLoopRef.current.dispose();
      }
      if (drumLoopRef.current) {
        drumLoopRef.current.dispose();
      }
      stopTransport();
      if (synthRef.current) {
        stopAllSound(synthRef.current);
      }
      if (bassSynthRef.current) {
        stopAllSound(bassSynthRef.current);
      }
      if (melodySynthRef.current) {
        stopAllSound(melodySynthRef.current);
      }
      if (drumKitRef.current) {
        disposeDrumKit(drumKitRef.current);
      }
    };
  }, []);

  const value: ProgressionContextValue = {
    list,
    fixedKey,
    fixedMode,
    modalState,
    samplerOpen,
    generatorOpen,
    bassOpen,
    drumsOpen,
    melodyOpen,
    chordsOn,
    bpm,
    meter,
    patternId,
    bassPatternId,
    drumPatternId,
    melodyGenre,
    voicingId,
    maxChords,
    isPlaying,
    setList,
    setChordAt,
    addChord,
    removeChord,
    fix,
    openModal,
    closeModal,
    applyGenerated,
    applyGeneratedSong,
    toggleSampler,
    toggleGenerator,
    toggleBass,
    toggleDrums,
    toggleMelody,
    setChordsOn,
    setBpm: handleSetBpm,
    setMeter,
    setPatternId,
    setBassPatternId,
    setDrumPatternId,
    setMelodyGenre,
    setVoicingId,
    togglePlay,
  };

  return (
    <ProgressionContext.Provider value={value}>
      {children}
    </ProgressionContext.Provider>
  );
};

export const useProgressionContext = (): ProgressionContextValue => {
  const ctx = useContext(ProgressionContext);
  if (!ctx) {
    throw new Error(
      'useProgressionContext must be used within a ProgressionProvider'
    );
  }
  return ctx;
};
