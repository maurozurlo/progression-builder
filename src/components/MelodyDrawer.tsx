import styles from './MelodyDrawer.module.css';
import { useProgressionContext } from '../context/ProgressionContext';
import { MelodyGenre, genreLabels } from '../types/music';

const genreOptions = Object.entries(genreLabels) as [MelodyGenre, string][];

const MelodyDrawer = () => {
  const { melodyGenre, setMelodyGenre, isPlaying } = useProgressionContext();

  return (
    <div>
      <div className={styles.field}>
        <label>Melody genre</label>
        <select
          value={melodyGenre}
          onChange={(e) => setMelodyGenre(e.target.value as '' | MelodyGenre)}
        >
          <option value="">Off</option>
          {genreOptions.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
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

export default MelodyDrawer;
