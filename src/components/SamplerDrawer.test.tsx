import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders a Chords checkbox checked by default and togglable', async () => {
    render(
      <ProgressionProvider>
        <SamplerDrawer />
      </ProgressionProvider>
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Chords' });
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
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
