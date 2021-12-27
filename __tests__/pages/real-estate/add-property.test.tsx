import React from 'react';
import { render, screen } from '@testing-library/react';
import AddPropertyScreen from '@/pages/real-estate/add-property';

describe('Real Estate Add property', () => {
  it('should render Add preperty page', () => {
    render(<AddPropertyScreen />);
    expect(screen.getByText(/Add property/i)).toBeInTheDocument();
  });

  it('should show login message for non-login user', () => {
    render(<AddPropertyScreen />);
    expect(screen.getByText(/You are not logged in/i)).toBeInTheDocument();
  });
});
