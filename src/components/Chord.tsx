import { useState, ChangeEvent } from 'react';
import styles from './Chord.module.css';

import * as theory from '../helpers/music';
import Tooltip from './Tooltip';
import { useProgressionContext } from '../context/ProgressionContext';

interface ChordProps {
  index: number;
}

const Chord = (props: ChordProps) => {
  const { list, fixedKey, fixedMode, setChordAt } = useProgressionContext();
  const slot = list[props.index];

  //Everything below is derived straight from context on every render instead of mirrored into local
  //state, so external changes to list (Generator apply, addChord, etc) are always reflected immediately
  const chordTone = fixedKey !== -1 ? (fixedKey as string) : slot.tone;
  const chordMode = fixedMode !== -1 ? fixedMode : slot.mode;
  const chordInterval = slot.interval;
  const chord =
    slot.symbol ?? theory.calculateChord(chordTone, chordMode, chordInterval);
  const chordList = theory.getChordInScale(chordTone, chordMode);
  const notesInChord = theory.getNotesInChord(chord);

  //Show tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  const handleKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChordAt(props.index, { tone: e.target.value });
  };

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChordAt(props.index, { mode: Number(e.target.value) });
  };

  const handleIntervalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChordAt(props.index, { interval: Number(e.target.value) });
  };

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inputContainer}>
          <label className={styles.title}>KEY</label>
          <select
            className={styles.selectInput}
            title="key"
            onChange={handleKeyChange}
            value={chordTone}
            disabled={fixedKey !== -1}
          >
            {theory.toneNames.map((tone, i) => (
              <option key={'t' + i} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.title}>MODE</label>
          <select
            className={styles.selectInput}
            title="mode"
            onChange={handleModeChange}
            value={chordMode}
            disabled={fixedMode !== -1}
          >
            {theory.modeNames.map((mode, i) => (
              <option key={'m' + i} value={i}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.title}>INTERVAL</label>
          <select
            className={styles.selectInput}
            title="interval"
            onChange={handleIntervalChange}
            value={chordInterval}
          >
            {theory.intervalNames.map((interval, i) => (
              <option key={'i' + i} value={i}>
                {interval}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.title}>CHORD</label>

          <span className={styles.generatedChord} onClick={() => handleClick()}>
            <Tooltip chordNotes={notesInChord} pop={showTooltip} />
            {chord}
          </span>
        </div>
      </div>

      <div className={styles.chordsInScale}>{chordList}</div>
    </div>
  );
};

export default Chord;
