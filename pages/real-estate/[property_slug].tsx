import { Box } from '@chakra-ui/react';
import React from 'react';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import PropertyDetail from '@/components/RealEstate/PropertyDetail';
import { PropertyProps } from '@/interfaces/common';
import { getGlobalData, getPropertyBySlug } from '@/util/api';

function Property({ property }: { property: PropertyProps }) {
  return (
    <Box className="container" mt="100px">
      <PropertyDetail property={property} />
      <BackToRealEstate />
    </Box>
  );
}

export const getServerSideProps = async (context: any) => {
  const { params } = context;

  const property_slug = params.property_slug;
  const locale = context.locale;
  const property = await getPropertyBySlug(property_slug);
  const global = await getGlobalData(locale);

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property: property || null,
      global,
    },
  };
};

export default Property;
