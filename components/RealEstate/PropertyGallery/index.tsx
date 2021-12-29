import { Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

function PropertyGallery({ images }: { images: any }) {
  const [galleries, setGalleries] = useState([]);

  const settings = {
    dots: true,
    speed: 500,
    className: 'slider variable-width',
    variableWidth: true,
    adaptiveHeight: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const noImageObj = (key: number) => {
    return {
      id: key,
      formats: {
        small: {
          width: 600,
          height: 300,
          url: 'https://via.placeholder.com/600x300/cecece?text=No+Image',
        },
      },
    };
  };

  useEffect(() => {
    let newGalleries = images && [...images];
    if (images && images.length === 1) {
      newGalleries = [...images, noImageObj(1), noImageObj(2)];
      setGalleries(newGalleries);
    } else if (images && images.length === 2) {
      newGalleries = [...images, noImageObj(1)];
      setGalleries(newGalleries);
    } else {
      setGalleries(newGalleries);
    }
  }, []);

  return (
    <Box mb="60px">
      {images && images.length > 1 ? (
        <Slider {...settings}>
          {galleries &&
            galleries.length > 0 &&
            galleries.map((image: any) => (
              <Box key={image.id} height="300px" overflow="hidden" px="2px">
                <Image
                  src={image.formats.small.url}
                  alt=""
                  objectFit="cover"
                  height="300px"
                  width="100%"
                />
              </Box>
            ))}
        </Slider>
      ) : (
        images &&
        images[0] && (
          <Image
            src={images[0].formats.small.url}
            alt=""
            objectFit="cover"
            height="300px"
            width="100%"
          />
        )
      )}
    </Box>
  );
}

export default PropertyGallery;
