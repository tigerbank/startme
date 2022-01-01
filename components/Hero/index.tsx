import { Box } from '@chakra-ui/layout';
import React from 'react';
import Slider from 'react-slick';
// @ts-ignore
import Image from 'next/image';

function Hero({ data }: { data: any }) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box maxW="1700px" ml="auto" mr="auto" mb="20px">
      <Slider {...settings}>
        {data &&
          data.heroImage.map((item: any) => (
            <Box key={item.id}>
              <Image
                width={item.image.width}
                height={item.image.height}
                layout="responsive"
                alt={item.image.alternativeText}
                src={item.image.url}
                priority
              />
            </Box>
          ))}
      </Slider>
    </Box>
  );
}

export default Hero;
