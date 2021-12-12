import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Newsletter from '@/components/newsletter';

describe('Newsletter', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('should show Newsletter Component', () => {
    render(<Newsletter />);
    expect(screen.getByText(/Signup for Newsletter/i)).toBeInTheDocument();
  });

  it('input should be blank after submit', () => {
    render(<Newsletter />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    userEvent.type(input, 'hello@mail.com');
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(button).toHaveValue('');
  });

 
});
