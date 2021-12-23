import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import { PropertyProps } from '@/interfaces/common';
import { getGlobalData, getPropertyBySlug } from '@/util/api';

import { Box } from '@chakra-ui/react';
import React from 'react';

function Property({ property }: { property: PropertyProps }) {
  return (
    <Box className="container" mt="100px">
      {property.name}
      <br />
      {property.type}
      <br />
      {property.listType}
      <br />
      {property.address}
      <br />
      {property.price}
      <br />
      {property.shortDetail}
      <br />
      {property.fullDetail}
      <br />
      {property.bedRoom}
      <br />
      {property.bathRoom}
      <br />
      {property.carPark}
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
