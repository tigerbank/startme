import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterProduct from '@/components/Shop/FilterProduct';

describe('FilterProduct ', () => {
  beforeEach(() => {
    render(<FilterProduct />);
  });
  test('render "Filter Product" Component', () => {
    expect(screen.getByText(/Filter Product/i)).toBeInTheDocument();
  });

  test('render "input" search by product title', () => {
    expect(screen.getByPlaceholderText(/Product name/i)).toBeInTheDocument();
  });
});
