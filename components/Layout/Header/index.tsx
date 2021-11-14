import React from 'react';
import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/layout';
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
  return (
    <>
      <Box
        height="60px"
        borderBottom="solid 1px #cecece"
        display="flex"
        alignItems="center"
      >
        <Box className="container" d="flex" justifyContent="space-between">
          <Heading fontSize="20px" as="h3" fontFamily="Comfortaa, cursive">
            <Link href="/">TEERASAKYUKAN</Link>
          </Heading>

          <LanguageSwitcher />
        </Box>
      </Box>
    </>
  );
}

export default Header;
