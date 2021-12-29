import React from 'react';
import { Box } from '@chakra-ui/react';
import { PropertyProps } from '@/interfaces/common';

function PropertyDetail({ property }: { property: PropertyProps }) {
  console.log(property);
  console.log(typeof property);
  return (
    <Box>
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
    </Box>
  );
}

export default PropertyDetail;
