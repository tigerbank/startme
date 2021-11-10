import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';

function Card({ content }: any) {
  return (
    <Box
      border="solid 1px"
      borderColor="gray.200"
      padding="20px"
      mt="20px"
      mr="20px"
      w="300px"
      borderRadius="10px"
    >
      <Image
        src={content.main_image.url}
        alt={content.main_image.alternativeText}
        width="300px"
        height="200px"
      />
      <Heading as="h6" fontSize="22px">
        {content.name}
      </Heading>
      <Text>{content.detail}</Text>
    </Box>
  );
}

export default Card;
