import React from 'react';
import { render, screen } from '@testing-library/react';
import mockProducts from '../../../mocks/data/products.json';
import ProductLists from '@/components/Shop/ProductLists';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe('Product lists', () => {
  it('should render button', () => {
    render(<ProductLists products={mockProducts} loading={false} />);
    expect(screen.getByText('Nike Sport shirt')).toBeInTheDocument();
  });

  it('should show No product available message', () => {
    render(<ProductLists products={[]} loading={false} />);
    expect(screen.getByText('No product available')).toBeInTheDocument();
  });

  it('Product length should be correct', () => {
    render(<ProductLists products={mockProducts} loading={false} />);
    expect(screen.getAllByText('add_to_cart').length).toBe(7);
  });
});
