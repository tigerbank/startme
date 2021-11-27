import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import Slider from 'react-slick';
import { BoxCarouselDetailProps, BoxCarouselProps } from '@/interfaces/common';

function BoxCarousel({ data }: { data: BoxCarouselProps }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Box className="container" mb="20px">
      <Slider {...settings}>
        {data &&
          data.BoxCarouselDetail.map((item: BoxCarouselDetailProps) => (
            <Box key={item.id}>
              <Box bg="white" mr="20px" p="20px">
                <Heading as="h4">{item.title}</Heading>
                <Text>{item.subtitle}</Text>
              </Box>
            </Box>
          ))}
      </Slider>
    </Box>
  );
}

export default BoxCarousel;
