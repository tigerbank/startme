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
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className="container" mb="20px">
      <Slider {...settings}>
        {data &&
          data.BoxCarouselDetail.map((item: BoxCarouselDetailProps) => (
            <Box key={item.id} p="10px">
              <Box bg="white" p="20px">
                <Heading as="h4" fontSize="20px">
                  {item.title}
                </Heading>
                <Text>{item.subtitle}</Text>
              </Box>
            </Box>
          ))}
      </Slider>
    </Box>
  );
}

export default BoxCarousel;
