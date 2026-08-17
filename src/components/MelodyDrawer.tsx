import styles from './MelodyDrawer.module.css';
import { useProgressionContext } from '../context/ProgressionContext';
import { MelodyGenre } from '../types/music';

const genreOptions: { id: MelodyGenre; name: string }[] = [
  { id: 'pop', name: 'Pop' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'classical', name: 'Classical' },
];

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
          {genreOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
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
