import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BassDrawer from './BassDrawer';
import { ProgressionProvider } from '../context/ProgressionContext';

describe('BassDrawer', () => {
  it('renders bass pattern dropdown defaulting to Off, and a status line', () => {
    render(
      <ProgressionProvider>
        <BassDrawer />
      </ProgressionProvider>
    );

    expect(screen.getByText('Bass pattern')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Off')).toBeInTheDocument();
    expect(screen.getByText('Stopped')).toBeInTheDocument();
  });

  it('lists 4/4 bass patterns by default', () => {
    render(
      <ProgressionProvider>
        <BassDrawer />
      </ProgressionProvider>
    );

    expect(screen.getByText('Root only')).toBeInTheDocument();
    expect(screen.getByText('Walking')).toBeInTheDocument();
  });
});
