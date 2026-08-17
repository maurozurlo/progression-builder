import { createContext, useContext, useState, ReactNode } from 'react';
import { Chord } from '../types/music';

type FixValue = ['key', string | number] | ['mode', number];

export interface ProgressionState {
  list: Chord[];
  fixedKey: number | string;
  fixedMode: number;
  modalState: number;
  samplerOpen: boolean;
  generatorOpen: boolean;
}

interface ProgressionContextValue extends ProgressionState {
  maxChords: number;
  setList: (list: Chord[]) => void;
  setChordAt: (index: number, patch: Partial<Chord>) => void;
  addChord: () => void;
  removeChord: () => void;
  fix: (val: FixValue) => void;
  openModal: (n: number) => void;
  closeModal: () => void;
  applyGenerated: (chords: Chord[], mode: 'replace' | 'append') => void;
  toggleSampler: () => void;
  toggleGenerator: () => void;
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

  const toggleSampler = () => {
    setSamplerOpen((prev) => !prev);
    setGeneratorOpen(false);
  };

  const toggleGenerator = () => {
    setGeneratorOpen((prev) => !prev);
    setSamplerOpen(false);
  };

  const value: ProgressionContextValue = {
    list,
    fixedKey,
    fixedMode,
    modalState,
    samplerOpen,
    generatorOpen,
    maxChords,
    setList,
    setChordAt,
    addChord,
    removeChord,
    fix,
    openModal,
    closeModal,
    applyGenerated,
    toggleSampler,
    toggleGenerator,
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
