import { Box } from '@chakra-ui/layout';
import React from 'react';
import Slider from 'react-slick';
// @ts-ignore
import { Image } from 'cloudinary-react';

function Hero({ data }: { data: any }) {
  const settings = {
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
                secure
                cloudName="di4k2zher"
                publicId={item.image.provider_metadata.public_id}
                width={item.image.width}
                height={item.image.height}
                crop="fill"
                alt={item.image.alternativeText}
              />
            </Box>
          ))}
      </Slider>
    </Box>
  );
}

export default Hero;
