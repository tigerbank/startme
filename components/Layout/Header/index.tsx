import React from 'react';
import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/layout';

function Header() {
  return (
    <>
      <Box
        height="60px"
        borderBottom="solid 1px #cecece"
        mb="20px"
        display="flex"
        alignItems="center"
      >
        <Box className="container">
          <Heading fontSize="20px" as="h3" fontFamily="Comfortaa, cursive">
            <Link href="/">STARTME</Link>
          </Heading>
        </Box>
      </Box>
    </>
  );
}

export default Header;
