import { Box } from '@chakra-ui/react';
import React from 'react';
import { NextSeo } from 'next-seo';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import PropertyDetail from '@/components/RealEstate/PropertyDetail';
import { PropertyProps } from '@/interfaces/common';
import { getAllProperties, getGlobalData, getPropertyBySlug } from '@/util/api';
import Breadcrumbs from '@/components/Common/Breadcrumb';

function Property({ property }: { property: PropertyProps }) {
  return (
    <>
      <NextSeo
        title={property && property.name}
        description="A short description goes here."
      />
      <Box mt="30px">
        <Box mb="10px" className="container">
          <Breadcrumbs
            lists={[
              {
                name: 'Real Estate',
                link: '/real-estate',
              },
              {
                name: property.name,
                link: '#',
              },
            ]}
          />
        </Box>

        <PropertyDetail property={property} />
        <Box className="container">
          <BackToRealEstate />
        </Box>
      </Box>
    </>
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
