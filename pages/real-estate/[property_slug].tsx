import { Box } from '@chakra-ui/react';
import React from 'react';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import PropertyDetail from '@/components/RealEstate/PropertyDetail';
import { PropertyProps } from '@/interfaces/common';
import { getAllProperties, getGlobalData, getPropertyBySlug } from '@/util/api';

function Property({ property }: { property: PropertyProps }) {
  return (
    <Box mt="50px">
      <PropertyDetail property={property} />
      <Box className="container">
        <BackToRealEstate />
      </Box>
    </Box>
  );
}

export async function getStaticPaths({ locales }: { locales: any }) {
  const properties = await getAllProperties(null);

  let propertyPaths: any = [];
  properties.forEach((property: PropertyProps) => {
    for (const locale of locales) {
      propertyPaths.push({
        params: {
          property_slug: property.property_slug,
        },
        locale,
      });
    }
  });

  return {
    paths: propertyPaths,
    fallback: true,
  };
}

export const getStaticProps = async ({ params, locale }: any) => {
  const propertySlug = params.property_slug;
  const property = await getPropertyBySlug(propertySlug);
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
    revalidate: 10,
  };
};

export default Property;
