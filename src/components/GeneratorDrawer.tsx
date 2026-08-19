import { useEffect, useState } from 'react';
import styles from './GeneratorDrawer.module.css';
import { toneNames, modeNames, calculateChord } from '../helpers/music';
import {
  generateFullyRandom,
  generateSmart,
  buildChordsFromDegrees,
} from '../helpers/generator';
import { commonProgressions } from '../data/commonProgressions';
import { useProgressionContext } from '../context/ProgressionContext';
import { Genre, genreLabels } from '../types/music';
import { generateSong } from '../helpers/songGenerator';

type Tab = 'random' | 'smart' | 'common' | 'genre';

const genres = Object.keys(genreLabels) as Genre[];

const GeneratorDrawer = () => {
  const { fixedKey, fixedMode, applyGenerated, applyGeneratedSong, maxChords, meter } =
    useProgressionContext();
  const [songGenre, setSongGenre] = useState<Genre>('pop');
  const [songBars, setSongBars] = useState<4 | 8>(4);

  const [tab, setTab] = useState<Tab>('random');
  const [length, setLength] = useState(4);
  const [tone, setTone] = useState<string>(
    fixedKey !== -1 ? (fixedKey as string) : 'C'
  );
  const [mode, setMode] = useState<number>(fixedMode !== -1 ? fixedMode : 0);
  const [degrees, setDegrees] = useState<number[]>([]);

  const generate = () => {
    setDegrees(
      tab === 'smart' ? generateSmart(length) : generateFullyRandom(length)
    );
  };

  //Keep the local key/mode in sync if the user fixes/unfixes them elsewhere while this drawer stays mounted
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs local key with the context's fixedKey when it's set/cleared elsewhere
    if (fixedKey !== -1) setTone(fixedKey as string);
  }, [fixedKey]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs local mode with the context's fixedMode when it's set/cleared elsewhere
    if (fixedMode !== -1) setMode(fixedMode);
  }, [fixedMode]);

  //Random/Smart tabs generate a preview automatically whenever the tab or its params change, no manual trigger needed
  useEffect(() => {
    if (tab === 'common') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- auto-generating a fresh preview is the whole point of this effect
    setDegrees(
      tab === 'smart' ? generateSmart(length) : generateFullyRandom(length)
    );
  }, [tab, length, tone, mode]);

  const preview = degrees
    .map((degree) => calculateChord(tone, mode, degree))
    .join(' - ');

  const apply = (mergeMode: 'replace' | 'append') => {
    applyGenerated(buildChordsFromDegrees(degrees, tone, mode), mergeMode);
  };

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={tab === 'random' ? styles.active : undefined}
          onClick={() => setTab('random')}
        >
          Random
        </button>
        <button
          className={tab === 'smart' ? styles.active : undefined}
          onClick={() => setTab('smart')}
        >
          Smart
        </button>
        <button
          className={tab === 'common' ? styles.active : undefined}
          onClick={() => setTab('common')}
        >
          Common
        </button>
        <button
          className={tab === 'genre' ? styles.active : undefined}
          onClick={() => setTab('genre')}
        >
          Genre
        </button>
      </div>

      {tab === 'genre' ? (
        <>
          <div className={styles.field}>
            <label>Genre</label>
            <select
              value={songGenre}
              onChange={(e) => setSongGenre(e.target.value as Genre)}
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {genreLabels[g]}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Bars</label>
            <select
              value={songBars}
              onChange={(e) => setSongBars(Number(e.target.value) as 4 | 8)}
            >
              <option value={4}>4 (verse)</option>
              <option value={8}>8 (verse + chorus)</option>
            </select>
          </div>
          <p className={styles.helperText}>
            Also sets strum, bass, drums, melody and tempo.
          </p>
          <button
            className={styles.shuffleButton}
            onClick={() =>
              applyGeneratedSong(generateSong(songGenre, meter, songBars))
            }
          >
            Generate Song
          </button>
        </>
      ) : tab !== 'common' ? (
        <>
          <div className={styles.field}>
            <label>Length</label>
            <input
              type="number"
              min={1}
              max={maxChords}
              value={length}
              onChange={(e) =>
                setLength(
                  Math.min(maxChords, Math.max(1, Number(e.target.value) || 1))
                )
              }
            />
          </div>
          <div className={styles.field}>
            <label>Key</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={fixedKey !== -1}
            >
              {toneNames.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(Number(e.target.value))}
              disabled={fixedMode !== -1}
            >
              {modeNames.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.preview}>{preview}</div>

          <button className={styles.shuffleButton} onClick={generate}>
            Shuffle
          </button>

          <div className={styles.actions}>
            <button
              disabled={degrees.length === 0}
              onClick={() => apply('replace')}
            >
              Replace
            </button>
            <button
              disabled={degrees.length === 0}
              onClick={() => apply('append')}
            >
              Append
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.field}>
            <label>Key</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={fixedKey !== -1}
            >
              {toneNames.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(Number(e.target.value))}
              disabled={fixedMode !== -1}
            >
              {modeNames.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.templateList}>
            {commonProgressions.map((template) => (
              <div key={template.id} className={styles.templateItem}>
                <span>
                  {template.name}:{' '}
                  {template.degrees
                    .map((degree) => calculateChord(tone, mode, degree))
                    .join(' - ')}
                </span>
                <button
                  onClick={() =>
                    applyGenerated(
                      buildChordsFromDegrees(template.degrees, tone, mode),
                      'replace'
                    )
                  }
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GeneratorDrawer;
