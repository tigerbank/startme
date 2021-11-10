import { Box, Heading } from '@chakra-ui/layout';
import React from 'react';

function Restaurant({ restaurants }: any) {
  return (
    <Box className="container">
      <Heading>Restaurant</Heading>
      {restaurants &&
        restaurants.map((restaurant: any) => (
          <Box key={restaurant.name}>{restaurant.name}</Box>
        ))}
    </Box>
  );
}

export default Restaurant;

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/restaurants`,
  );
  const restaurants = await res.json();

  if (!restaurants) {
    return {
      notFound: true,
    };
  }

  return {
    props: { restaurants },
  };
}
