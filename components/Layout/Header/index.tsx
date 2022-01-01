import React from 'react';
import Link from 'next/link';
import { Box, Heading, useBreakpointValue } from '@chakra-ui/react';
import SubMenu from '@/components/Layout/Header/SubMenu';
import CartMenu from '@/components/Layout/Header/CartMenu';
import MobileNavigation from '@/components/Layout/Navigation/Mobile';
import { NavProps } from '@/interfaces/common';

function Header({ nav }: { nav: NavProps[] }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <Box
        position="fixed"
        top="0"
        width="100%"
        borderBottom="solid 1px #b1b1b1"
        display="flex"
        alignItems="center"
        bg="#f9f9f9"
        zIndex={9999}
        height="45px"
      >
        <Box
          className="container"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            fontSize="20px"
            as="h3"
            fontFamily="Comfortaa, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
          >
            <Link href="/">
              <a>TEERASAKYUKAN</a>
            </Link>
          </Heading>
          {!isMobile && <SubMenu />}

          {/*If it is not [[...slug]], need to pass nav prop to page */}
          {isMobile && nav && (
            <Box d="flex" alignItems="center">
              <Box mr="5px">
                <CartMenu />
              </Box>
              <MobileNavigation nav={nav} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Header;
