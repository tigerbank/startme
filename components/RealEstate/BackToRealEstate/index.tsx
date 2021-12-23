import { Box } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

function BackToRealEstate() {
  return (
    <Box mt="20">
      <Link href="/real-estate">Back</Link>
    </Box>
  );
}

export default BackToRealEstate;
