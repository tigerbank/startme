import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchProperty from '@/components/RealEstate/SearchProperty';

describe('Search property', () => {
  beforeEach(() => {
    render(<SearchProperty />);
  });

  it('should render Search button', () => {
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('should render search input', () => {
    expect(
      screen.getByPlaceholderText('property name, location'),
    ).toBeInTheDocument();
  });
});
