import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chord from './Chord';

describe('Chord', () => {
  it('renders the initial scale and updates it when a different key is chosen', async () => {
    render(
      <Chord tone="C" mode={0} interval={0} fixedMode={-1} fixedKey={-1} />
    );

    expect(screen.getByText('C Dm Em F G Am Bdim')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByTitle('key'), 'G');

    expect(screen.getByText('G Am Bm C D Em F#dim')).toBeInTheDocument();
  });

  it('shows the notes that make up the currently generated chord', () => {
    render(
      <Chord tone="C" mode={0} interval={0} fixedMode={-1} fixedKey={-1} />
    );

    expect(screen.getByText('C E G')).toBeInTheDocument();
  });

  it('locks the key selector when fixedKey is set', () => {
    render(
      <Chord tone="C" mode={0} interval={0} fixedMode={-1} fixedKey="G" />
    );

    expect(screen.getByTitle('key')).toBeDisabled();
  });
});
