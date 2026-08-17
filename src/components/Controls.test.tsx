import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Controls from './Controls';

describe('Controls', () => {
  it('shows "Mixed" for both key and mode when neither is fixed', () => {
    render(
      <Controls
        keyClick={() => {}}
        modeClick={() => {}}
        fixedKey={-1}
        fixedMode={-1}
      />
    );
    expect(screen.getAllByText('Mixed')).toHaveLength(2);
  });

  it('shows the fixed key value when fixedKey is set', () => {
    render(
      <Controls
        keyClick={() => {}}
        modeClick={() => {}}
        fixedKey="C"
        fixedMode={-1}
      />
    );
    expect(screen.getByText(/C/)).toBeInTheDocument();
  });

  it('calls keyClick with the toggled pressed state when the key button is clicked', async () => {
    const keyClick = vi.fn();
    render(
      <Controls
        keyClick={keyClick}
        modeClick={() => {}}
        fixedKey={-1}
        fixedMode={-1}
      />
    );

    await userEvent.click(screen.getByText('Key:').closest('button')!);

    expect(keyClick).toHaveBeenCalledWith(true);
  });

  it('calls modeClick with the toggled pressed state when the mode button is clicked', async () => {
    const modeClick = vi.fn();
    render(
      <Controls
        keyClick={() => {}}
        modeClick={modeClick}
        fixedKey={-1}
        fixedMode={-1}
      />
    );

    await userEvent.click(screen.getByText('Mode:').closest('button')!);

    expect(modeClick).toHaveBeenCalledWith(true);
  });
});
