import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import PropertySearchResult from '@/pages/real-estate/property-search-result';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { listType: 'rent', search: '' },
    };
  },
}));

describe('Property Search Result', () => {
  it('Show text', async () => {
    render(<PropertySearchResult />);
    const text = await screen.findByText(/Search Result/i);
    expect(text).toBeInTheDocument();
    waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  });
});
