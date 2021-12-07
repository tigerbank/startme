import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/pages/login';

describe('Login', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('render "Login" as a text', () => {
    const textElement = screen.getByText(/Sign in to your accoun/i);
    expect(textElement).toBeInTheDocument();
  });

  test('render button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('render button', () => {
    userEvent.type(screen.getByPlaceholderText('email'), 'Javascript');
  });
});
