import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';

function CartSteps({ currentStep }: { currentStep: number }) {
  const stepsArray = [
    { label: 'Shipping Address', link: '/shop/shipping' },
    { label: 'Payment Method', link: '/shop/payment' },
    { label: 'Place order', link: '/shop/placeorder' },
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
            flexDir={{ base: 'column', md: 'row' }}
            key={i}
            fontWeight={currentStep === i + 1 ? 'bold' : ''}
            alignItems={{ base: 'flex-start', md: 'center' }}
            w="100%"
            gridGap={{ base: 1, md: 10 }}
          >
            <Box>
              <Box textAlign={{ base: 'left', md: 'center' }}>Step {i + 1}</Box>

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
