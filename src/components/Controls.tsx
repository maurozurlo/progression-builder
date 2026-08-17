import styles from './Controls.module.css';
import { modeNames } from '../helpers/music';
import { useProgressionContext } from '../context/ProgressionContext';

const Controls = () => {
  const { fixedKey, fixedMode, openModal } = useProgressionContext();

  return (
    <div className={styles.mainControls}>
      <button
        onClick={() => openModal(0)}
        className={fixedKey !== -1 ? styles.pressed : undefined}
      >
        <strong>Key:</strong> {fixedKey !== -1 ? fixedKey : 'Mixed'}
      </button>
      <button
        onClick={() => openModal(1)}
        className={fixedMode !== -1 ? styles.pressed : undefined}
      >
        <strong>Mode:</strong>{' '}
        {fixedMode !== -1 ? modeNames[fixedMode] : 'Mixed'}
      </button>
    </div>
  );
};

export default Controls;
