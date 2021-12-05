import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
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
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Header nav={nav} />
      {!isMobile && nav && <DesktopNavigation nav={nav} />}
      <main>{children}</main>
    </>
  );
}

export default Layout;
