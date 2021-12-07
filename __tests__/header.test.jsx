import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Layout/Header';
import '../__mocks__/matchMedia';

describe('header', () => {
  beforeEach(() => {
    render(<Header />);
  });
  test('render "Teerasakyukan" as a text', () => {
    expect(screen.getByText(/Teerasakyukan/i)).toBeInTheDocument();
  });
  test('logo should link to home', () => {
    expect(screen.getByText(/Teerasakyukan/i).closest('a')).toHaveAttribute(
      'href',
      '/',
    );
  });
});
