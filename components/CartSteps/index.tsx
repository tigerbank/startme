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
      <Flex justifyContent="space-between" gridGap={10}>
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
              Step {i + 1}
              <br />
              <Link href={item.link}>
                <a>{item.label}</a>
              </Link>
            </Box>
            <Box flexGrow="1" borderTop="solid 1px #cecece"></Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default CartSteps;
