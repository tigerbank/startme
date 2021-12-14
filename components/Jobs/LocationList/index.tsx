import React from 'react';
import { LocationProps } from '@/interfaces/common';

function LocationList({ locations }: { locations: LocationProps[] }) {
  return (
    <>
      <option data-testid="select-option">All</option>
      {locations.map((location: LocationProps) => (
        <option
          data-testid="select-option"
          key={location.id}
          value={location.id}
        >
          {location.name}
        </option>
      ))}
    </>
  );
}

export default LocationList;
