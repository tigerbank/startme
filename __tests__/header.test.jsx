import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Layout/Header';

describe('header', () => {
  test('render "Teerasakyukan" as a text', () => {
    //arrnge
    render(<Header />);
    // screen.debug();

    //Act

    //Assert
    const textElement = screen.getByText('Teerasakyukan', { exact: false });
    expect(textElement).toBeInTheDocument();
  });

  test('logo should link to home', () => {
    //arrnge
    render(<Header />);

    //Act

    //Assert
    const textElement = screen.getByText('Teerasakyukan', { exact: false });
    expect(textElement.closest('a')).toHaveAttribute('href', '/');
  });
});
