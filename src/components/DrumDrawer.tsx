import styles from './BassDrawer.module.css';
import { getDrumPatterns } from '../data/drumPatterns';
import { useProgressionContext } from '../context/ProgressionContext';

const DrumDrawer = () => {
  const { meter, drumPatternId, setDrumPatternId, isPlaying } =
    useProgressionContext();

  return (
    <div>
      <div className={styles.field}>
        <label>Drum pattern</label>
        <select
          value={drumPatternId}
          onChange={(e) => setDrumPatternId(e.target.value)}
        >
          <option value="">Off</option>
          {getDrumPatterns(meter).map((pattern) => (
            <option key={pattern.id} value={pattern.id}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.status}>
        {isPlaying ? 'Playing with Drums' : 'Stopped'}
      </div>
    </div>
  );
};

export default DrumDrawer;
