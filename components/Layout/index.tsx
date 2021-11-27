import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
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
      {nav && <Navigation nav={nav} />}
      <main>{children}</main>
    </>
  );
}

export default Layout;
