import { Box } from '@chakra-ui/react';
import React from 'react';

function Disclaimer({ align }: { align: string }) {
  return (
    <Box
      mb="10px"
      color="gray.500"
      textAlign={align === 'left' ? 'left' : 'right'}
    >
      * Content in this page is for demo purpose only. It not intended to
      represent a real product or service.
    </Box>
  );
}

export default Disclaimer;
