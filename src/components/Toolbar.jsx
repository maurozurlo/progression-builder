import React from 'react';
import styles from './Toolbar.module.css';

import add from '../img/add.svg';
import del from '../img/delete.svg';

const Toolbar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button onClick={props.addChord}>
          <img src={add} alt="Add chord" />
        </button>
        <button onClick={props.deleteChord}>
          <img src={del} alt="Delete chord" />
        </button>
      </div>
    </div>)
}

export default Toolbar;