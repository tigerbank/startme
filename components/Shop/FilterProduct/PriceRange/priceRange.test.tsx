import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceRangeScreen from '@/components/Shop/FilterProduct/PriceRange';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe('PriceRange ', () => {
  it('render "priceRange" Component', () => {
    render(<PriceRangeScreen range={[0, 50000]} setRange={() => {}} />);
    const textElement = screen.getByText(/price/i);
    expect(textElement).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('50000')).toBeInTheDocument();
  });
});
