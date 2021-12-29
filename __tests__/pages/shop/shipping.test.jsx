import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Shipping from '@/pages/shop/shipping';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const push = jest.fn();
useRouter.mockImplementation(() => ({
  push,
}));

const renderShipping = () => {
  render(<Shipping />);

  const fullName = screen.getByPlaceholderText('Full Name');
  const address = screen.getByPlaceholderText('Address');
  const city = screen.getByPlaceholderText('City');
  const postal = screen.getByPlaceholderText('Postal Code');
  const country = screen.getByPlaceholderText('Country');
  const button = screen.getByRole('button', { name: 'Continue' });

  return {
    fullName,
    address,
    city,
    postal,
    country,
    button,
  };
};

describe('Shipping', () => {
  it('should render shipping page', () => {
    render(<Shipping />);
    const textElement = screen.getByText('Shipping');
    expect(textElement).toBeInTheDocument();
  });

  it('should render full name, address, city, postal code, country, Continue Button', () => {
    const { fullName, address, city, postal, country, button } =
      renderShipping();

    expect(fullName).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(postal).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should render error message when full name is empty', async () => {
    const { fullName, button } = renderShipping();
    userEvent.click(button);
    expect(fullName).toHaveValue('');
    expect(
      await screen.findByText('Full name is required'),
    ).toBeInTheDocument();
  });

  it('should render error message when address is empty', async () => {
    const { address, button } = renderShipping();
    userEvent.click(button);
    expect(address).toHaveValue('');
    expect(await screen.findByText('Address is required')).toBeInTheDocument();
  });

  it('should render error message when city is empty', async () => {
    const { city, button } = renderShipping();
    userEvent.click(button);
    expect(city).toHaveValue('');
    expect(await screen.findByText('City is required')).toBeInTheDocument();
  });

  it('should render error message when Postal Code is empty', async () => {
    const { postal, button } = renderShipping();
    userEvent.click(button);
    expect(postal).not.toHaveValue();
    expect(
      await screen.findByText('Postal Code is required'),
    ).toBeInTheDocument();
  });

  it('should render error message when country is empty', async () => {
    const { country, button } = renderShipping();
    userEvent.click(button);
    expect(country).toHaveValue('');
    expect(await screen.findByText('Country is required')).toBeInTheDocument();
  });

  it('should redirect to login page if no user login', () => {});
});
