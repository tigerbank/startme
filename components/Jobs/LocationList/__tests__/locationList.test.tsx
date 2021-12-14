import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationList from '@/components/Jobs/LocationList';

const locations = [
  {
    id: 1,
    name: 'Bangkok',
  },
  {
    id: 2,
    name: 'Singapore',
  },
];

describe('LocationList component', () => {
  beforeEach(() => {
    render(<LocationList locations={locations} />);
  });

  it('render locationList option correctly', () => {
    let options = screen.getAllByTestId('select-option');
    expect(options[0]).toBeInTheDocument();
    expect(options[1]).toHaveValue('1');
  });
});
