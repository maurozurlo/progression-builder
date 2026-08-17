import React, { useState, useEffect } from 'react';
import styles from './Chord.module.css';

import * as theory from '../helpers/music';
import Tooltip from './Tooltip';

interface ChordProps {
  tone: string;
  mode: number;
  interval: number;
  fixedMode: number;
  fixedKey: number | string;
}

const Chord = (props: ChordProps) => {
  //Key
  const [chordTone, setChordTone] = useState<string>(props.tone);
  //Mode
  const [chordMode, setChordMode] = useState<number | string>(props.mode);
  //Interval
  const [chordInterval, setChordInterval] = useState<number | string>(
    props.interval
  );
  //Current chord
  const [chord, setChord] = useState(
    theory.calculateChord(props.tone, props.mode, props.interval)
  );
  //Chord list
  const [chordList, setChordList] = useState(
    theory.getChordInScale(props.tone, props.mode)
  );
  //Chord notes
  const [notesInChord, setNotesInChord] = useState(
    theory.getNotesInChord(chord)
  );
  //Show tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  //Find out if there's a cleaner way to do this

  const updateChord = (e?: React.ChangeEvent<HTMLSelectElement>) => {
    let newChord;

    if (typeof e !== 'undefined' && typeof e === 'object') {
      switch (e.target.title) {
        case 'key':
          newChord = theory.calculateChord(
            e.target.value,
            chordMode,
            chordInterval
          );
          setChordTone(e.target.value);
          setChordList(theory.getChordInScale(e.target.value, chordMode));
          break;
        case 'mode':
          newChord = theory.calculateChord(
            chordTone,
            e.target.value,
            chordInterval
          );
          setChordMode(e.target.value);
          setChordList(theory.getChordInScale(chordTone, e.target.value));
          break;
        case 'interval':
          newChord = theory.calculateChord(
            chordTone,
            chordMode,
            e.target.value
          );
          setChordInterval(e.target.value);
          break;
        default:
          newChord = undefined;
          break;
      }
      reRenderChord(newChord);
    }
    //Fix Key
    if (props.fixedKey !== -1 && chordTone !== props.fixedKey) {
      newChord = theory.calculateChord(
        props.fixedKey as string,
        chordMode,
        chordInterval
      );
      setChordList(theory.getChordInScale(props.fixedKey as string, chordMode));
      setChordTone(props.fixedKey as string);
      reRenderChord(newChord);
    }
    //Fix Mode
    if (props.fixedMode !== -1 && chordMode !== props.fixedMode) {
      newChord = theory.calculateChord(
        chordTone,
        props.fixedMode,
        chordInterval
      );
      setChordMode(props.fixedMode);
      setChordList(theory.getChordInScale(chordTone, props.fixedMode));
      reRenderChord(newChord);
    }
  };

  const reRenderChord = (chord?: string) => {
    setChord(chord as string);
    updateNotes(chord as string);
  };

  const updateNotes = (chord: string) => {
    setNotesInChord(theory.getNotesInChord(chord));
  };

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pre-existing pattern used to sync fixedKey/fixedMode props into state every render; not touched by this migration
    updateChord();
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inputContainer}>
          <label className={styles.title}>KEY</label>
          <select
            className={styles.selectInput}
            title="key"
            onChange={updateChord}
            value={chordTone}
            disabled={props.fixedKey !== -1}
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
            onChange={updateChord}
            value={chordMode}
            disabled={props.fixedMode !== -1}
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
            onChange={updateChord}
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
