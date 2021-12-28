import React from 'react';
import BackendJobs from '@/pages/backend-filter-jobs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Backend Filtering Jobs', () => {
  it('should return loading', () => {
    render(<BackendJobs />);
    expect(screen.getByTestId('loadElement')).toBeInTheDocument();
  });

  it('should display correct jobs length', async () => {
    render(<BackendJobs />);
    const allJobs = await screen.findAllByRole('heading', { level: 3 });
    expect(allJobs.length).toBe(3);
  });

  it('should render correct result when search by position', async () => {
    render(<BackendJobs />);
    userEvent.type(screen.getByRole('textbox'), 'UX/UI mock');
    expect(screen.getByRole('textbox')).toHaveValue('UX/UI mock');
  });
});
