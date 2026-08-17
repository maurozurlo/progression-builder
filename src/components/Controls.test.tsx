import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Controls from './Controls';
import { ProgressionProvider } from '../context/ProgressionContext';

describe('Controls', () => {
  it('shows "Mixed" for both key and mode when neither is fixed', () => {
    render(
      <ProgressionProvider>
        <Controls />
      </ProgressionProvider>
    );
    expect(screen.getAllByText('Mixed')).toHaveLength(2);
  });

  it('shows the fixed key value when fixedKey is set', () => {
    render(
      <ProgressionProvider initialState={{ fixedKey: 'C' }}>
        <Controls />
      </ProgressionProvider>
    );
    expect(screen.getByText(/C/)).toBeInTheDocument();
  });

  it('shows the fixed mode value when fixedMode is set', () => {
    render(
      <ProgressionProvider initialState={{ fixedMode: 2 }}>
        <Controls />
      </ProgressionProvider>
    );
    expect(screen.getByText(/Phrygian/)).toBeInTheDocument();
  });
});
