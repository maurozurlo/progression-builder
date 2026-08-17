import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneratorDrawer from './GeneratorDrawer';
import { ProgressionProvider } from '../context/ProgressionContext';

describe('GeneratorDrawer', () => {
  it('renders the random tab by default with a Shuffle button', () => {
    render(
      <ProgressionProvider>
        <GeneratorDrawer />
      </ProgressionProvider>
    );
    expect(screen.getByText('Shuffle')).toBeInTheDocument();
  });

  it('auto-generates a preview on mount and allows applying it as a replacement', () => {
    render(
      <ProgressionProvider>
        <GeneratorDrawer />
      </ProgressionProvider>
    );

    expect(screen.getByText('Replace')).not.toBeDisabled();
  });

  it('shows common progression templates on the Common tab', async () => {
    render(
      <ProgressionProvider>
        <GeneratorDrawer />
      </ProgressionProvider>
    );

    await userEvent.click(screen.getByText('Common'));

    expect(screen.getByText(/I - V - vi - IV/)).toBeInTheDocument();
  });
});
