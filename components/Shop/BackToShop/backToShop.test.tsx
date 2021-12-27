import React from 'react';
import { render, screen } from '@testing-library/react';
import BackToShop from '@/components/Shop/BackToShop';

describe('Back to shop Link', () => {
  it('should render Back to shop link', () => {
    render(<BackToShop />);
    expect(screen.getByText(/back to shop/i)).toBeInTheDocument();
  });
});
