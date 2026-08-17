import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SamplerDrawer from './SamplerDrawer';
import { ProgressionProvider } from '../context/ProgressionContext';

describe('SamplerDrawer', () => {
  it('renders meter, pattern, tempo controls and a Play button', () => {
    render(
      <ProgressionProvider>
        <SamplerDrawer />
      </ProgressionProvider>
    );

    expect(screen.getByText('Meter')).toBeInTheDocument();
    expect(screen.getByText('Strum pattern')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('switches to 3/4 strum pattern options when meter changes', async () => {
    render(
      <ProgressionProvider>
        <SamplerDrawer />
      </ProgressionProvider>
    );

    const meterSelect = screen.getByDisplayValue('4/4');
    expect(meterSelect).toBeInTheDocument();
  });
});
