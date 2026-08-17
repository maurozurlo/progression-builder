import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ProgressionProvider,
  useProgressionContext,
} from './ProgressionContext';

const Probe = () => {
  const {
    list,
    addChord,
    removeChord,
    toggleSampler,
    samplerOpen,
    generatorOpen,
  } = useProgressionContext();
  return (
    <div>
      <span>count:{list.length}</span>
      <span>sampler:{String(samplerOpen)}</span>
      <span>generator:{String(generatorOpen)}</span>
      <button onClick={addChord}>add</button>
      <button onClick={removeChord}>remove</button>
      <button onClick={toggleSampler}>toggle-sampler</button>
    </div>
  );
};

describe('ProgressionProvider', () => {
  it('starts with a single default chord', () => {
    render(
      <ProgressionProvider>
        <Probe />
      </ProgressionProvider>
    );
    expect(screen.getByText('count:1')).toBeInTheDocument();
  });

  it('adds and removes chords, capped at 12 and floored at 1', async () => {
    render(
      <ProgressionProvider>
        <Probe />
      </ProgressionProvider>
    );

    for (let i = 0; i < 15; i++) {
      await userEvent.click(screen.getByText('add'));
    }
    expect(screen.getByText('count:12')).toBeInTheDocument();

    for (let i = 0; i < 15; i++) {
      await userEvent.click(screen.getByText('remove'));
    }
    expect(screen.getByText('count:1')).toBeInTheDocument();
  });

  it('toggling sampler closes generator (mutually exclusive)', async () => {
    render(
      <ProgressionProvider initialState={{ generatorOpen: true }}>
        <Probe />
      </ProgressionProvider>
    );

    expect(screen.getByText('generator:true')).toBeInTheDocument();

    await userEvent.click(screen.getByText('toggle-sampler'));

    expect(screen.getByText('sampler:true')).toBeInTheDocument();
    expect(screen.getByText('generator:false')).toBeInTheDocument();
  });
});
