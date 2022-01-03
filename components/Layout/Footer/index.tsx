import { Box } from '@chakra-ui/react';
import React from 'react';

function Footer() {
  return (
    <Box mt="auto" bg="#ddd" py="20px" as="footer" width="100%">
      <Box className="container">© 2022 Teerasakyukan.com</Box>
    </Box>
  );
}

export default Footer;
