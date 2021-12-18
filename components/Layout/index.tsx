import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
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
      <Box mt={{ base: '45px', md: '0' }}>{children}</Box>
    </>
  );
}

export default Layout;
