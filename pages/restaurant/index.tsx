import { Box, Heading } from '@chakra-ui/layout';
import Card from 'components/Common/Card';
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_RESTAURANTS } from 'graphql/queries';

function Restaurant({ restaurants }: any) {
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
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/restaurants`,
  // );
  // const restaurants = await res.json();

  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_API,
    cache: new InMemoryCache(),
  });

  console.log(client);

  const { data } = await client.query({ query: GET_ALL_RESTAURANTS });

  console.log(data.restaurants);

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
