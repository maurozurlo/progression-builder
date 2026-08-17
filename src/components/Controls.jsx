import React, { useState } from 'react'
import styles from './Controls.module.css';
import { modeNames } from '../helpers/music'

const Controls = (props) => {
  //Key
  const [pressedKey, setPressedKey] = useState(false);

  const editClassK = () => {
    !pressedKey ? setPressedKey(true) : setPressedKey(false);
    props.keyClick(!pressedKey);
  }
  //Mode
  const [pressedMode, setPressedMode] = useState(false);

  const editClassM = () => {
    !pressedMode ? setPressedMode(true) : setPressedMode(false);
    props.modeClick(!pressedMode);
  }

  return (
    <div className={styles.mainControls}>
      <button onClick={editClassK}
              className={props.fixedKey !== -1 ? styles.pressed : undefined}>
      <strong>Key:</strong> {props.fixedKey !== -1 ?  props.fixedKey : 'Mixed'}
				</button>
    <button  onClick={editClassM}
              className={props.fixedMode !== -1 ? styles.pressed : undefined}>
      <strong>Mode:</strong> {props.fixedMode !== -1 ?  modeNames[props.fixedMode] : 'Mixed'}
				</button>
        </div>)
}

export default Controls;