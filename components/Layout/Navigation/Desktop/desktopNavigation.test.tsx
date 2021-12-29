import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockNav } from '../../../../__mocks__/mockData';
import DesktopNavigation from '@/components/Layout/Navigation/Desktop';

describe('Nav', () => {
  beforeEach(() => {
    render(<DesktopNavigation nav={mockNav} />);
  });
  it('should render nav title', () => {
    const navTitle = screen.getAllByText('Home');
    expect(navTitle[0]).toBeVisible();
  });
});
