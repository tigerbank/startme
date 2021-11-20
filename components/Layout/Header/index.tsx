import React from 'react';
import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/layout';
import LanguageSwitcher from './LanguageSwitcher';
import ColorModeSwitcher from './ColorModeSwitcher';

function Header() {
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
          <Box d="flex" alignItems="center">
            {/* <Box mr="10px">
              <ColorModeSwitcher />
            </Box> */}
            <Box>
              <LanguageSwitcher />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;
