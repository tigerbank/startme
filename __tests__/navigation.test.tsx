import React from 'react';
import { render, screen } from '@testing-library/react';
import DesktopNavigation from '@/components/Layout/Navigation/Desktop';

describe('Nav', () => {
  let expectedProps = [
    {
      id: 1,
      text: 'หน้าหลัก',
      newTab: false,
      url: '/',
    },
    {
      id: 2,
      text: 'เกี่ยวกับเรา',
      newTab: false,
      url: '/about',
    },
  ];

  it('should render nav title', () => {
    render(<DesktopNavigation nav={expectedProps} />);
    const navTitle = screen.getAllByText('เกี่ยวกับเรา');
    expect(navTitle[0]).toBeVisible();
  });

});
