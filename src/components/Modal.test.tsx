import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import Controls from './Controls';
import { ProgressionProvider } from '../context/ProgressionContext';

describe('Modal', () => {
  it('renders the key selector when modalState=0 and fixes the selected key', async () => {
    render(
      <ProgressionProvider initialState={{ modalState: 0 }}>
        <Modal />
        <Controls />
      </ProgressionProvider>
    );

    expect(screen.getByText('Fixed Key')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByTitle('key'), 'G');
    await userEvent.click(screen.getByText('OK'));

    expect(screen.getByText('Key:').closest('button')).toHaveTextContent(
      'Key: G'
    );
  });

  it('renders the mode selector when modalState=1 and fixes the selected mode', async () => {
    render(
      <ProgressionProvider initialState={{ modalState: 1 }}>
        <Modal />
        <Controls />
      </ProgressionProvider>
    );

    expect(screen.getByText('Fixed Mode')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByTitle('mode'), '2');
    await userEvent.click(screen.getByText('OK'));

    expect(screen.getByText('Mode:').closest('button')).toHaveTextContent(
      'Mode: Phrygian'
    );
  });

  it('does not change the fixed key/mode when Cancel is clicked', async () => {
    render(
      <ProgressionProvider initialState={{ modalState: 0 }}>
        <Modal />
        <Controls />
      </ProgressionProvider>
    );

    await userEvent.selectOptions(screen.getByTitle('key'), 'G');
    await userEvent.click(screen.getByText('Cancel'));

    expect(screen.getByText('Key:').closest('button')).toHaveTextContent(
      'Key: Mixed'
    );
  });
});
