import styles from './SamplerDrawer.module.css';
import { buildVoicedChords } from '../helpers/playback';
import { buildBassLine } from '../helpers/bass';
import { buildMidiBlob } from '../helpers/midi';
import { getStrumPatterns } from '../data/strumPatterns';
import { getBassPatterns } from '../data/bassPatterns';
import { getDrumPatterns } from '../data/drumPatterns';
import { useProgressionContext } from '../context/ProgressionContext';

type Meter = '4/4' | '3/4';

const SamplerDrawer = () => {
  const {
    list,
    fixedKey,
    fixedMode,
    meter,
    setMeter,
    patternId,
    setPatternId,
    bassPatternId,
    drumPatternId,
    bpm,
    setBpm,
    isPlaying,
    togglePlay,
  } = useProgressionContext();

  const exportMidi = () => {
    const bassPatterns = getBassPatterns(meter);
    const bassPattern = bassPatterns.find((p) => p.id === bassPatternId);
    const bass = bassPattern
      ? { line: buildBassLine(list, fixedKey, fixedMode), pattern: bassPattern }
      : undefined;

    const drumPatterns = getDrumPatterns(meter);
    const drumPattern = drumPatterns.find((p) => p.id === drumPatternId);
    const drums = drumPattern ? { pattern: drumPattern } : undefined;

    const blob = buildMidiBlob(
      buildVoicedChords(list, fixedKey, fixedMode),
      bpm,
      meter === '4/4' ? 4 : 3,
      bass,
      drums
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'progression.mid';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className={styles.field}>
        <label>Meter</label>
        <select
          value={meter}
          onChange={(e) => setMeter(e.target.value as Meter)}
        >
          <option value="4/4">4/4</option>
          <option value="3/4">3/4</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Strum pattern</label>
        <select
          value={patternId}
          onChange={(e) => setPatternId(e.target.value)}
        >
          {getStrumPatterns(meter).map((pattern) => (
            <option key={pattern.id} value={pattern.id}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>Tempo: {bpm} BPM</label>
        <input
          type="range"
          min={40}
          max={220}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </div>

      <div className={styles.transport}>
        <button onClick={togglePlay} disabled={list.length === 0}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <button className={styles.exportButton} onClick={exportMidi}>
        Export MIDI
      </button>
    </div>
  );
};

export default SamplerDrawer;
