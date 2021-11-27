import React from 'react';
import { render, screen } from '@testing-library/react';
import Shop from '@/pages/shop';

describe('Shop', () => {
  it('render "Shop" page', async () => {
    render(<Shop />);
    const textElement = screen.getByText('Shop', {
      exact: false,
    });
    expect(textElement).toBeInTheDocument();
  });
});
