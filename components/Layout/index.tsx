import React from 'react';
import Header from './Header';
import DesktopNavigation from './Navigation/Desktop';
import { NavProps } from '@/interfaces/common';

function Layout({
  children,
  nav,
}: {
  children: React.ReactNode;
  nav: NavProps[];
}) {
  return (
    <>
      <Header />
      {nav && <DesktopNavigation nav={nav} />}
      <main>{children}</main>
    </>
  );
}

export default Layout;
