import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('starts with one chord and adds one on "Add chord"', async () => {
    render(<App />);
    expect(screen.getAllByText('KEY')).toHaveLength(1);

    await userEvent.click(screen.getByAltText('Add chord'));

    expect(screen.getAllByText('KEY')).toHaveLength(2);
  });

  it('does not delete the last remaining chord', async () => {
    render(<App />);
    expect(screen.getAllByText('KEY')).toHaveLength(1);

    await userEvent.click(screen.getByAltText('Delete chord'));

    expect(screen.getAllByText('KEY')).toHaveLength(1);
  });

  it('adds and deletes chords, capped at 12 total', async () => {
    render(<App />);
    const addButton = screen.getByAltText('Add chord');

    for (let i = 0; i < 15; i++) {
      await userEvent.click(addButton);
    }

    expect(screen.getAllByText('KEY')).toHaveLength(12);

    await userEvent.click(screen.getByAltText('Delete chord'));
    expect(screen.getAllByText('KEY')).toHaveLength(11);
  });
});
