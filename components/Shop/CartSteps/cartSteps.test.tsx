import React from 'react';
import { render, screen } from '@testing-library/react';
import CartSteps from '@/components/Shop/CartSteps';

describe('CartSteps', () => {
  it('should render all steps and currrent step should be bold ', () => {
    render(<CartSteps currentStep={1} />);
    expect(screen.getByText(/step 1/i)).toBeInTheDocument();
    expect(screen.getByText(/step 2/i)).toBeInTheDocument();
    expect(screen.getByText(/step 3/i)).toBeInTheDocument();
    expect(screen.getByTestId('step1')).toHaveStyle('font-weight: bold');
  });
});
