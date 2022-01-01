import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import React from 'react';
import { NextSeo } from 'next-seo';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import PropertyDetail from '@/components/RealEstate/PropertyDetail';
import { PropertyProps } from '@/interfaces/common';
import { getAllProperties, getGlobalData, getPropertyBySlug } from '@/util/api';

function Property({ property }: { property: PropertyProps }) {
  return (
    <>
      <NextSeo
        title={property && property.name}
        description="A short description goes here."
      />
      <Box mt="50px" className="container">
        <Box mb="10px">
          <Breadcrumb fontWeight="medium" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Real Estate</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">
                {property && property.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
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
