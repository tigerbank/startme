import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactAgent from '@/components/RealEstate/ContactAgent';

describe('ContactAgent', () => {
  beforeEach(() => {
    render(<ContactAgent />);
  });

  it('should render ContactAgent component', () => {
    expect(screen.getByText('Contact Agent')).toBeInTheDocument();
  });

  it('should render name, phone, email input', () => {
    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const phoneInput = screen.getByRole('textbox', { name: 'Phone' });
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
  });

  it('input should be blank when click submit', () => {
    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const phoneInput = screen.getByRole('textbox', { name: 'Phone' });
    expect(nameInput).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(phoneInput.value).toBe('');
  });
});
