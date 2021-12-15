import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FilterProduct from '@/components/Shop/FilterProduct';

import mockAxios from 'axios';
jest.mock('axios');

describe('FilterProduct ', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Nike' },
        { id: 2, name: 'Adidas' },
      ],
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('render "Filter Product" Component', async () => {

    const { getByText} = render(
      <FilterProduct
        productFilter={{
          s: '',
          range: [],
        }}
        setProductFilter={() => {}}
      />,
    );
    const textElement = await waitFor(() => getByText('Filter Product'));
    expect(textElement).toBeInTheDocument();
  });

  it('render "input" search by product title', async () => {

      const { findByPlaceholderText } = render(
      <FilterProduct
        productFilter={{
          s: '',
          range: [],
        }}
        setProductFilter={() => {}}
      />,
    );
    const inputElement = await waitFor(() =>
     findByPlaceholderText('Product name'),
    );
    expect(inputElement).toBeInTheDocument();
  });
});
