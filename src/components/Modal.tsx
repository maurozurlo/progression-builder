import React, { useState } from 'react';
import styles from './Modal.module.css';

import { toneNames, modeNames } from '../helpers/music';

type FixValue = ['key', string | number] | ['mode', number];

interface ModalProps {
  close: () => void;
  value: number;
  fix: (val: FixValue) => void;
  fixedKey: string | number;
  fixedMode: string | number;
}

const Modal = (props: ModalProps) => {
  //Input
  const handleInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.title) {
      case 'mode':
        setFixedMode(e.target.value);
        break;
      case 'key':
        setFixedKey(e.target.value);
        break;
      default:
        return null;
    }
  };

  const [fixedKey, setFixedKey] = useState(props.fixedKey);
  const [fixedMode, setFixedMode] = useState(props.fixedMode);

  const returnEitherKeyOrMode = (): FixValue => {
    return props.value === 0 ? ['key', fixedKey] : ['mode', Number(fixedMode)];
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCard}>
        {/* Fixed Mode */}
        <div className={styles.inputContainer}>
          <label>Fixed {props.value === 0 ? 'Key' : 'Mode'}</label>
          {props.value === 0 ? (
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
          <button className={styles.outline} onClick={props.close}>
            Cancel
          </button>
          <button
            className={styles.primary}
            onClick={() => props.fix(returnEitherKeyOrMode())}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
