import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandCheckBox from '@/components/Shop/FilterProduct/BrandCheckBox';

describe('BrandCheckBox ', () => {
  beforeEach(() => {
    render(<BrandCheckBox />);
  });
  test('render "BrandCheckBox" Component', async () => {
    const textElement = await waitFor(() => screen.findByText(/brand/i));
    expect(textElement).toBeInTheDocument();
  });
});
