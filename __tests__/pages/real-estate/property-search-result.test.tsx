import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertySearchResult from '@/pages/real-estate/property-search-result';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { listType: 'rent', search: 'sydney' },
    };
  },
}));

describe('Property Search Result', () => {
  it('Show text', async () => {
    render(<PropertySearchResult />);
    const text = screen.getByText(/Search Result/i);
    expect(text).toBeInTheDocument();
  });

  it('Loading text is shown while API request is in progress', async () => {
    render(<PropertySearchResult />);

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });
});
