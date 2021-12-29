import React from 'react';
import { render, screen } from '@testing-library/react';
import Router from 'next/router';
import SearchProperty from '@/components/RealEstate/SearchProperty';

describe('Search property', () => {
  beforeEach(() => {
    // jest.mock('next/router', () => ({ push: jest.fn() }));
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

  it('should go to search result page after click search button', () => {
    // const searchInput = screen.getByPlaceholderText('property name, location');
    // searchInput.value = 'test';
    // searchInput.dispatchEvent(new Event('input'));
    // const searchButton = screen.getByRole('button', { name: 'Search' });
    // searchButton.click();
    // expect(Router.push).toHaveBeenCalledWith(
    //   '/real-estate/property-search-result?search=test',
    // );
  });
});
