import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Shop from '../pages/shop';

describe('Shop', () => {
  it('render "Shop" page', async () => {
    render(<Shop />);
    const textElement = await screen.getByText('Shop', {
      exact: false,
    });
    expect(textElement).toBeInTheDocument();
  });
});
