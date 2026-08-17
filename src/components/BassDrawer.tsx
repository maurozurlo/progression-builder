import styles from './BassDrawer.module.css';
import { getBassPatterns } from '../data/bassPatterns';
import { useProgressionContext } from '../context/ProgressionContext';

const BassDrawer = () => {
  const { meter, bassPatternId, setBassPatternId, isPlaying } =
    useProgressionContext();

  return (
    <div>
      <div className={styles.field}>
        <label>Bass pattern</label>
        <select
          value={bassPatternId}
          onChange={(e) => setBassPatternId(e.target.value)}
        >
          <option value="">Off</option>
          {getBassPatterns(meter).map((pattern) => (
            <option key={pattern.id} value={pattern.id}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.status}>
        {isPlaying ? 'Playing with Sampler' : 'Stopped'}
      </div>
    </div>
  );
};

export default BassDrawer;
