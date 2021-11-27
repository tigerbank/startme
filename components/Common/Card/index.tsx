import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
// @ts-ignore
import { Image } from 'cloudinary-react';
import { RestaurantProps } from '@/interfaces/common';

function Card({ content }: { content: RestaurantProps }) {
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
      {content.main_image && (
        <Image
          secure
          cloudName="di4k2zher"
          publicId={content.main_image.hash}
          width="300"
          height="200"
          crop="fill"
          alt={content.main_image.alternativeText}
        />
      )}

      <Heading as="h6" fontSize="22px">
        {content.name}
      </Heading>
      <Text>{content.detail}</Text>
    </Box>
  );
}

export default Card;
