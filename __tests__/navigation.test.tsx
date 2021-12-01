import React from 'react';
import { render, screen } from '@testing-library/react';
import DesktopNavigation from '@/components/Layout/Navigation/Desktop';

describe('Nav', () => {
  let expectedProps = [
    {
      id: 1,
      title: 'เกี่ยวกับเรา',
      page: null,
      url: '/about',
      order: 2,
    },
    {
      id: 2,
      title: 'เกี่ยวกับเรา',
      page: null,
      url: '/about',
      order: 2,
    },
    {
      id: 3,
      title: 'เกี่ยวกับเรา',
      page: null,
      url: '/about',
      order: 2,
    },
  ];

  it('should render nav title', () => {
    render(<DesktopNavigation nav={expectedProps} />);

    const navTitle = screen.getAllByText('เกี่ยวกับเรา');
    expect(navTitle[0]).toBeVisible();
  });

  it('should render Nav item', () => {
    render(<DesktopNavigation nav={expectedProps} />);

    const navs = screen.getAllByText('เกี่ยวกับเรา');
    expect(navs).toHaveLength(expectedProps.length);
  });
});
