import React from 'react';
import { render, screen, within } from '@testing-library/react';
import mockProperties from '../../../mocks/data/properties.json';
import RealEstateMain from '@/pages/real-estate/';

describe('Real Estate', () => {
  beforeEach(() => {
    render(<RealEstateMain properties={mockProperties} />);
  });

  it('should render Real Estate', () => {
    expect(screen.getByText(/Real Estate App/i)).toBeInTheDocument();
  });

  it('should render lists of properties per page 6', () => {
    const allProperties = screen.getByRole('list', {
      name: 'properties',
    });
    const { getAllByRole } = within(allProperties);
    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBe(6);
  });
});
