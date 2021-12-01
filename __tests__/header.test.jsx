import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Layout/Header';
import '../__mocks__/matchMedia';

describe('header', () => {
  test('render "Teerasakyukan" as a text', () => {
    render(<Header />);
    const textElement = screen.getByText('Teerasakyukan', { exact: false });
    expect(textElement).toBeInTheDocument();
  });

  test('logo should link to home', () => {
    render(<Header />);
    const textElement = screen.getByText('Teerasakyukan', { exact: false });
    expect(textElement.closest('a')).toHaveAttribute('href', '/');
  });
});
