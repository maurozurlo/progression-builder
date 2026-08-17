import React, { useState } from 'react';
import styles from './Modal.module.css';

import { toneNames, modeNames } from '../helpers/music';
import { useProgressionContext } from '../context/ProgressionContext';

type FixValue = ['key', string | number] | ['mode', number];

const Modal = () => {
  const {
    modalState: value,
    fixedKey: ctxFixedKey,
    fixedMode: ctxFixedMode,
    fix,
    closeModal,
  } = useProgressionContext();

  //Input
  const handleInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.title) {
      case 'mode':
        setFixedMode(Number(e.target.value));
        break;
      case 'key':
        //Select values are always strings, so "Mixed" (option value -1) must be coerced back to a number to match the -1 sentinel used everywhere else
        setFixedKey(e.target.value === '-1' ? -1 : e.target.value);
        break;
      default:
        return null;
    }
  };

  const [fixedKey, setFixedKey] = useState(ctxFixedKey);
  const [fixedMode, setFixedMode] = useState<string | number>(ctxFixedMode);

  const returnEitherKeyOrMode = (): FixValue => {
    return value === 0 ? ['key', fixedKey] : ['mode', Number(fixedMode)];
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCard}>
        {/* Fixed Mode */}
        <div className={styles.inputContainer}>
          <label>Fixed {value === 0 ? 'Key' : 'Mode'}</label>
          {value === 0 ? (
            <select
              className={styles.selectInput}
              title="key"
              onChange={handleInput}
              value={fixedKey}
              autoFocus
            >
              <option value={-1}>Mixed</option>
              {toneNames.map((tone, i) => (
                <option key={'t' + i} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          ) : (
            <select
              className={styles.selectInput}
              title="mode"
              onChange={handleInput}
              value={fixedMode}
              autoFocus
            >
              <option value={-1}>Mixed</option>
              {modeNames.map((mode, i) => (
                <option key={'m' + i} value={i}>
                  {mode}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Fixed Key */}

        <div className={styles.buttonContainer}>
          <button className={styles.outline} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles.primary}
            onClick={() => fix(returnEitherKeyOrMode())}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
