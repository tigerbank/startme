import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockProperties from '../../../mocks/data/properties.json';
import PropertyLists from '@/components/RealEstate/PropertyLists';

describe('PropertyLists', () => {
  it('should show no properties message if property array is empty', () => {
    render(<PropertyLists properties={[]} />);
    expect(screen.getByText(/No property.../i)).toBeInTheDocument();
  });

  it('should show length of lists per page', () => {
    render(<PropertyLists properties={MockProperties} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('should show the rest of lists (1)', () => {
    render(<PropertyLists properties={MockProperties} />);
    const page2 = screen.getByTestId('paginationList-2');
    userEvent.click(page2);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
