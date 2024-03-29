import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { getGlobalData, getAllProperties } from '@/util/api';
import { PropertyProps } from '@/interfaces/common';

import PropertyLists from '@/components/RealEstate/PropertyLists';
import SearchProperty from '@/components/RealEstate/SearchProperty';

function RealEstateMain({ properties }: { properties: PropertyProps[] }) {
  return (
    <>
      <NextSeo
        title="Real Estate"
        description="A short description goes here."
      />
      <Box w="100%">
        <Box className="container">
          <SearchProperty />
        </Box>
      </Box>

      <Box mt={{ base: '50px', md: '50px' }} className="container">
        <Button colorScheme="red">
          <Link href="/real-estate/add-property">Add property</Link>
        </Button>
        <Box mt="20px">Real Estate App</Box>

        <PropertyLists properties={properties} />
      </Box>
    </>
  );
}

export const getStaticProps = async (context: any) => {
  const locale = context.locale;

  const properties = await getAllProperties(null);

  const global = await getGlobalData(locale);

  if (!properties) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      properties,
      global,
    },
    revalidate: 10,
  };
};

export default RealEstateMain;
