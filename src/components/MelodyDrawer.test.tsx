import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MelodyDrawer from './MelodyDrawer';
import { ProgressionProvider } from '../context/ProgressionContext';

describe('MelodyDrawer', () => {
  it('renders genre dropdown defaulting to Off, and a status line', () => {
    render(
      <ProgressionProvider>
        <MelodyDrawer />
      </ProgressionProvider>
    );

    expect(screen.getByText('Melody genre')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Off')).toBeInTheDocument();
    expect(screen.getByText('Stopped')).toBeInTheDocument();
  });

  it('lists the genre presets', () => {
    render(
      <ProgressionProvider>
        <MelodyDrawer />
      </ProgressionProvider>
    );

    expect(screen.getByText('Pop')).toBeInTheDocument();
    expect(screen.getByText('Jazz')).toBeInTheDocument();
    expect(screen.getByText('Hip Hop')).toBeInTheDocument();
  });
});
