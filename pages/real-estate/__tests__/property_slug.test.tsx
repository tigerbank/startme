import React from 'react';
import { render, screen } from '@testing-library/react';
import Property from '@/pages/real-estate/[property_slug]';
import { mockProperty } from '../__mocks__/mockPropertiesData';

describe('Property', () => {
  beforeEach(() => {
    render(<Property property={mockProperty} />);
  });
  it('should render property name', async () => {
    expect(screen.getByText(/Kent Street, Sydney/i)).toBeInTheDocument();
  });
  it('should render property type', async () => {
    expect(screen.getByText(/apartment/i)).toBeInTheDocument();
  });
  it('should render property list Type', async () => {
    expect(screen.getByText(/sale/i)).toBeInTheDocument();
  });
  it('should render property address', async () => {
    expect(screen.getByText(/Kent Street, Sydney/i)).toBeInTheDocument();
  });
  it('should render property price', async () => {
    expect(screen.getByText(/1200000/i)).toBeInTheDocument();
  });
  it('should render property short detail', async () => {
    expect(screen.getByText(/opportunity/i)).toBeInTheDocument();
  });
  it('should render property full detail', async () => {
    expect(screen.getByText(/Showcasing two/i)).toBeInTheDocument();
  });
});
