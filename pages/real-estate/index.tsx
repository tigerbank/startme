import { PropertyProps } from '@/interfaces/common';
import { getGlobalData, getAllProperties } from '@/util/api';
import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

import PropertyLists from '@/components/RealEstate/PropertyLists';
import SearchProperty from '@/components/RealEstate/SearchProperty';

function RealEstateMain({ properties }: { properties: PropertyProps[] }) {
  return (
    <Box className="container">
      <SearchProperty />
      <Button>
        <Link href="/real-estate/add-property">Add property</Link>
      </Button>
      <br />
      Real Estate App
      <PropertyLists properties={properties} />
    </Box>
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
