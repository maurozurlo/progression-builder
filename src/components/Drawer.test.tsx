import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from './Drawer';

describe('Drawer', () => {
  it('renders its title and children', () => {
    render(
      <Drawer open={true} onClose={() => {}} title="Sampler">
        <p>content</p>
      </Drawer>
    );
    expect(screen.getByText('Sampler')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Drawer open={true} onClose={onClose} title="Sampler">
        <p>content</p>
      </Drawer>
    );
    await userEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });
});
