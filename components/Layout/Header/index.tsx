import React from 'react';
import Link from 'next/link';

import SubMenu from '@/components/Layout/Header/SubMenu';
import { Box, Heading, useBreakpointValue } from '@chakra-ui/react';
import MobileNavigation from '../Navigation/Mobile';

function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Box
        height="60px"
        borderBottom="solid 1px #cecece"
        display="flex"
        alignItems="center"
      >
        <Box
          className="container"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading fontSize="20px" as="h3" fontFamily="Comfortaa, cursive">
            <Link href="/">
              <a>TEERASAKYUKAN</a>
            </Link>
          </Heading>
          {!isMobile && <SubMenu />}
          {isMobile && <MobileNavigation />}
        </Box>
      </Box>
    </>
  );
}

export default Header;
