import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationList from '@/components/Jobs/LocationList';
import MockLocations from '../../../mocks/data/locations.json';

describe('LocationList component', () => {
  beforeEach(() => {
    render(<LocationList locations={MockLocations} />);
  });

  it('render locationList option correctly', () => {
    let options = screen.getAllByTestId('select-option');
    expect(options[0]).toBeInTheDocument();
    expect(options[1]).toHaveValue('5');
  });
});
