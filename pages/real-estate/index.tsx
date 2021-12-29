import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { getGlobalData, getAllProperties } from '@/util/api';
import { PropertyProps } from '@/interfaces/common';

import PropertyLists from '@/components/RealEstate/PropertyLists';
import SearchProperty from '@/components/RealEstate/SearchProperty';

function RealEstateMain({ properties }: { properties: PropertyProps[] }) {
  return (
    <>
      <Box h="300px" w="100%" className="realEstate__main">
        <Box className="container">
          <SearchProperty />
        </Box>
      </Box>

      <Box mt={{ base: '150px', md: '100px' }} className="container">
        <Button>
          <Link href="/real-estate/add-property">Add property</Link>
        </Button>
        Real Estate App
        <PropertyLists properties={properties} />
      </Box>
    </>
  );
}

export const getStaticProps = async (context: any) => {
  const locale = context.locale;
  const properties = await getAllProperties();
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
  };
};

export default RealEstateMain;
