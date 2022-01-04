import React from 'react';
import { render, screen } from '@testing-library/react';
import SortProperty from '@/components/RealEstate/SortProperty';

describe('Search property', () => {
  beforeEach(() => {
    render(
      <SortProperty
        sortBy="newest"
        setSortBy={() => {
          // do nothing
        }}
      />,
    );
  });

  it('should render SortProperty Component', () => {
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });
});
