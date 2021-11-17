import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import { BoxCarouselDetailProps, BoxCarouselProps } from 'interfaces/common';

function BoxCarousel({ data }: { data: BoxCarouselProps }) {
  return (
    <Box mb="20px">
      <Carousel show={2.5} slide={3} swiping={true}>
        {data &&
          data.BoxCarouselDetail.map((item: BoxCarouselDetailProps) => (
            <Box mr="20px" p="20px" border="solid 1px #cecece" key={item.id}>
              <Heading as="h4">{item.title}</Heading>
              <Text>{item.subtitle}</Text>
            </Box>
          ))}
      </Carousel>
    </Box>
  );
}

export default BoxCarousel;
