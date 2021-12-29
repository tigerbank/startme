import { Badge, Box } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyProps } from '@/interfaces/common';

function PropertyItem({ property }: { property: PropertyProps }) {
  return (
    <Link passHref href={`/real-estate/${property.property_slug}`}>
      <Box
        w="350px"
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        <Image
          src={property.images[0].url || 'https://via.placeholder.com/350x200'}
          alt="image name"
          width="350"
          height="200"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.bedRoom} beds &bull; {property.bathRoom} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.name}
          </Box>

          <Box>THB {property.price.toLocaleString()}</Box>

          {/* <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box> */}
        </Box>
      </Box>
    </Link>
  );
}

export default PropertyItem;
