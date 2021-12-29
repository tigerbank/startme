import React from 'react';
import { render, screen } from '@testing-library/react';
import MockProperty from '../../../mocks/data/property.json';
import PropertyDetail from '@/components/RealEstate/PropertyDetail';
import '../../../__mocks__/matchMedia.js';

describe('PropertyDetail', () => {
  beforeEach(() => {
    render(<PropertyDetail property={MockProperty} />);
  });

  it('should render PropertyDetail component', () => {
    // expect(screen.getByText(/Kent street/i)).toBeInTheDocument();
  });
});
