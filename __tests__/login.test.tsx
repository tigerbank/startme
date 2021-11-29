import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/pages/login';

describe('Login', () => {
  test('render "Login" as a text', () => {
    //arrnge
    render(<Login />);
    // screen.debug();

    //Act

    const textElement = screen.getByText('Sign in to your accoun', {
      exact: false,
    });
    expect(textElement).toBeInTheDocument();
  });

  test('render button', () => {
    render(<Login />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('render button', () => {
    render(<Login />);

    userEvent.type(screen.getByPlaceholderText('email'), 'Javascript');
  });
});
