import { Box, Heading } from '@chakra-ui/layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import Loading from '../Common/Loading/Index';
import TruncateText from '@/components/Common/TruncateText';
import { BoxCarouselDetailProps, BoxCarouselProps } from '@/interfaces/common';

function BoxCarousel({ data }: { data: BoxCarouselProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.BoxCarouselDetail === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3.5,
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

  if (loading) {
    return <Loading />;
  }

  return (
    <Box mb="20px">
      <Slider {...settings}>
        {data &&
          data.BoxCarouselDetail.map((item: BoxCarouselDetailProps) => (
            <Box key={item.id} p="10px">
              <Box bg="white" h="100%" p="20px">
                <Box w="100%" h="100%">
                  <Link href={item.url ? item.url : '#'}>
                    <a target="_blank">
                      {item.image && (
                        <Image
                          width={item.image.width}
                          height={item.image.height}
                          src={item.image.url}
                          alt=""
                          layout="responsive"
                          priority
                        />
                      )}
                    </a>
                  </Link>
                </Box>
                <Heading mt="15px" as="h4" fontSize="20px">
                  {item.title}
                </Heading>

                <TruncateText text={item.subtitle} width="100%" />
              </Box>
            </Box>
          ))}
      </Slider>
    </Box>
  );
}

export default BoxCarousel;
