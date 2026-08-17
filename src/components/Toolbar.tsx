import styles from './Toolbar.module.css';

import add from '../img/add.svg';
import del from '../img/delete.svg';
import samplerIcon from '../img/sampler.svg';
import generatorIcon from '../img/generator.svg';
import { useProgressionContext } from '../context/ProgressionContext';

const Toolbar = () => {
  const { list, maxChords, addChord, removeChord, toggleSampler, toggleGenerator } =
    useProgressionContext();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.triggerButton} onClick={toggleGenerator}>
          <img src={generatorIcon} alt="Toggle generator" />
        </button>
        <button onClick={addChord} disabled={list.length >= maxChords}>
          <img src={add} alt="Add chord" />
        </button>
        <button onClick={removeChord} disabled={list.length <= 1}>
          <img src={del} alt="Delete chord" />
        </button>
        <button className={styles.triggerButton} onClick={toggleSampler}>
          <img src={samplerIcon} alt="Toggle sampler" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
