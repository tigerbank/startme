import { Box, Heading } from '@chakra-ui/layout';
import Card from '@/components/Common/Card';
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_RESTAURANTS } from 'graphql/queries';
import { RestaurantProps } from '@/interfaces/common';

function Restaurant({ restaurants }: { restaurants: RestaurantProps[] }) {
  return (
    <Box className="container">
      <Heading>Restaurant</Heading>
      <Box d="flex">
        {restaurants &&
          restaurants.map((restaurant: any) => (
            <Card key={restaurant.id} content={restaurant} />
          ))}
      </Box>
    </Box>
  );
}

export default Restaurant;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_API,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({ query: GET_ALL_RESTAURANTS });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { restaurants: data.restaurants },
    revalidate: 10,
  };
}
