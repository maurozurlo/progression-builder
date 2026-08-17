import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chord from './Chord';
import { ProgressionProvider } from '../context/ProgressionContext';

describe('Chord', () => {
  it('renders the initial scale and updates it when a different key is chosen', async () => {
    render(
      <ProgressionProvider>
        <Chord index={0} />
      </ProgressionProvider>
    );

    expect(screen.getByText('C Dm Em F G Am Bdim')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByTitle('key'), 'G');

    expect(screen.getByText('G Am Bm C D Em F#dim')).toBeInTheDocument();
  });

  it('shows the notes that make up the currently generated chord', () => {
    render(
      <ProgressionProvider>
        <Chord index={0} />
      </ProgressionProvider>
    );

    expect(screen.getByText('C E G')).toBeInTheDocument();
  });

  it('locks the key selector when fixedKey is set', () => {
    render(
      <ProgressionProvider initialState={{ fixedKey: 'G' }}>
        <Chord index={0} />
      </ProgressionProvider>
    );

    expect(screen.getByTitle('key')).toBeDisabled();
  });
});
