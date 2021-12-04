import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';

function CartSteps({ currentStep }: { currentStep: number }) {
  const stepsArray = [
    { label: 'Shipping Address', link: '/shipping' },
    { label: 'Payment Method', link: '/payment' },
    { label: 'Place order', link: '/placeorder' },
  ];

  return (
    <Box mt="20px" mb="20px" pb="20px">
      <Flex
        justifyContent="space-between"
        gridGap={10}
        flexDir={{ base: 'column', md: 'row' }}
      >
        {stepsArray.map((item, i) => (
          <Box
            d="flex"
            key={i}
            fontWeight={currentStep === i + 1 ? 'bold' : ''}
            alignItems="center"
            w="100%"
            gridGap="10"
          >
            <Box>
              <Box textAlign="center">Step {i + 1}</Box>

              <Link href={item.link}>
                <a>{item.label}</a>
              </Link>
            </Box>
            <Box
              d={{ base: 'none', md: 'block' }}
              flexGrow="1"
              borderTop="solid 1px #cecece"
            ></Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default CartSteps;
