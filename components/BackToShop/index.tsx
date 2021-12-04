import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

function BackToShop() {
  return (
    <Box mt="30px">
      <Link href="/shop" passHref>
        <a>
          <Icon mr="5px" as={ArrowBackIcon} />
          Back to shop
        </a>
      </Link>
    </Box>
  );
}

export default BackToShop;
