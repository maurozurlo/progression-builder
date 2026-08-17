import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('renders the key selector when value=0 and confirms with the current key selection', async () => {
    const fix = vi.fn();
    render(
      <Modal
        close={() => {}}
        value={0}
        fix={fix}
        fixedKey={-1}
        fixedMode={-1}
      />
    );

    expect(screen.getByText('Fixed Key')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByTitle('key'), 'G');
    await userEvent.click(screen.getByText('OK'));

    expect(fix).toHaveBeenCalledWith(['key', 'G']);
  });

  it('renders the mode selector when value=1 and confirms with the current mode selection', async () => {
    const fix = vi.fn();
    render(
      <Modal
        close={() => {}}
        value={1}
        fix={fix}
        fixedKey={-1}
        fixedMode={-1}
      />
    );

    expect(screen.getByText('Fixed Mode')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByTitle('mode'), '2');
    await userEvent.click(screen.getByText('OK'));

    expect(fix).toHaveBeenCalledWith(['mode', 2]);
  });

  it('calls close when Cancel is clicked', async () => {
    const close = vi.fn();
    render(
      <Modal
        close={close}
        value={0}
        fix={() => {}}
        fixedKey={-1}
        fixedMode={-1}
      />
    );

    await userEvent.click(screen.getByText('Cancel'));

    expect(close).toHaveBeenCalled();
  });
});
