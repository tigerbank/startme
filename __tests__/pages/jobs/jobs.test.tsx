import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Jobs from '@/pages/jobs/';

describe('Real Estate', () => {
  beforeEach(() => {
    render(<Jobs />);
  });

  it('should render Real Estate', () => {
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it('should render "position" ', async () => {
    expect(await screen.findByText(/project manager/i)).toBeInTheDocument();
  });

  it('should show correct result based on search', async () => {
    const searchInput = screen.getByPlaceholderText(/Company or Position/i);
    userEvent.type(searchInput, 'project manager');
    expect(await screen.findByText(/project manager/i)).toBeInTheDocument();
    expect(await screen.queryByText(/ux/i)).not.toBeInTheDocument();
  });

  it('should show correct result based on sort', async () => {
    const selectSort = screen.getByRole('option', { name: /newest/i });
    userEvent.click(selectSort);
    const allH3 = await screen.findAllByRole('heading', { level: 3 });
    expect(allH3[0]).toHaveTextContent('UX/UI mock');
  });
});
