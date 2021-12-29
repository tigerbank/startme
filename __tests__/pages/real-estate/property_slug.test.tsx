import React from 'react';
import { render, screen } from '@testing-library/react';
import Property from '@/pages/real-estate/[property_slug]';
import { mockProperty } from '__mocks__/mockPropertiesData';
import '../../../__mocks__/matchMedia.js';

describe('Property', () => {
  beforeEach(() => {
    render(<Property property={mockProperty} />);
  });
  it('should render property name', async () => {
    const propertyName = screen.getAllByText(/Kent street/i);
    expect(propertyName[0]).toBeInTheDocument();
  });

  it('should render property list Type', async () => {
    expect(screen.getByText(/sale/i)).toBeInTheDocument();
  });

  it('should render property price', async () => {
    expect(screen.getByText(/1200000/i)).toBeInTheDocument();
  });
  it('should render property short detail', async () => {
    expect(screen.getByText(/Offering an exceptional/i)).toBeInTheDocument();
  });
  it('should render property full detail', async () => {
    expect(screen.getByText(/Showcasing two/i)).toBeInTheDocument();
  });
});
