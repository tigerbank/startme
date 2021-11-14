import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Layout/Header';

describe('header', () => {
  test('render Hellow world as a text', () => {
    //arrnge
    render(<Header />);

    //Act

    //Assert
    const textElement = screen.getByText('STARTME', { exact: false });
    expect(textElement).toBeInTheDocument();
  });
});
