import React from 'react';
import { render, screen } from '@testing-library/react';
import DesktopNavigation from '@/components/Layout/Navigation/Desktop';
import { mockNav } from '../../../../__mocks__/mockData';

describe('Nav', () => {
  beforeEach(() => {
    render(<DesktopNavigation nav={mockNav} />);
  });
  it('should render nav title', () => {
    const navTitle = screen.getAllByText('Home');
    expect(navTitle[0]).toBeVisible();
  });
});
