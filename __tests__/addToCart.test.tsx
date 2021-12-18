import React from 'react';
import { render, screen } from '@testing-library/react';
import AddToCart from '@/components/AddToCart';

describe('Add to cart Button', () => {
  it('should render button', () => {
    render(
      <AddToCart
        product={{
          id: 14,
          name: 'Nike Sport shirt',
          slug: 'nike-sport-shirt-1',
          price: 2500,
          category: 'Shirts',
          countInStock: 5,
          description: 'Good looking shirt',
          brands: {},
          image: {
            formats: {
              small: {
                url: '',
              },
            },
          },
        }}
      />,
    );
    expect(
      screen.getByRole('button', {
        name: /add_to_cart/i,
      }),
    ).toBeInTheDocument();
  });
});
