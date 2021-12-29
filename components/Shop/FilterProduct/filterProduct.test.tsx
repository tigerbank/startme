import React from 'react';
import { render, screen } from '@testing-library/react';
import mockAxios from 'axios';
import FilterProduct from '@/components/Shop/FilterProduct';

jest.mock('axios');

describe('FilterProduct ', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
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
  it('render "Filter Product" Component', () => {
    const { getByText } = render(
      <FilterProduct
        productFilter={{
          s: '',
          range: [],
          checkedBrand: [],
        }}
        setProductFilter={() => {}}
      />,
    );
    const textElement = getByText('filter_product');
    expect(textElement).toBeInTheDocument();
  });

  it('render "input" search by product title', () => {
    render(
      <FilterProduct
        productFilter={{
          s: '',
          range: [],
          checkedBrand: [],
        }}
        setProductFilter={() => {}}
      />,
    );
    const inputElement = screen.getByPlaceholderText('product_name');
    expect(inputElement).toBeInTheDocument();
  });
});
