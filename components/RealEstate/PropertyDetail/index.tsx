import React from 'react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import styles from './PropertyDetail.module.scss';
import { PropertyProps } from '@/interfaces/common';
import TruncateText from '@/components/Common/TruncateText';
import PropertyGallery from '@/components/RealEstate/PropertyGallery';

function PropertyDetail({ property }: { property: PropertyProps }) {
  return (
    <Box className={styles.propertyDetail}>
      <Box className="container">
        <Heading as="h2" mb="15px">
          {property.name}
        </Heading>
      </Box>

      <PropertyGallery images={property.images} />

      <Box className="container">
        <TruncateText text={property.shortDetail} width="100%" />

        <Box mt="20px">
          <Heading as="h3">Details</Heading>

          <UnorderedList
            className={styles.propertyDetail__info}
            d="flex"
            mb="20px"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <ListItem>
              <Text>Address</Text>
              <Text>{property.address}</Text>
            </ListItem>
            <ListItem>
              <Text>Property Type</Text>
              <Text>{property.type}</Text>
            </ListItem>
            <ListItem>
              <Text>List Type</Text>
              <Text>{property.listType}</Text>
            </ListItem>
            <ListItem>
              <Text>Price</Text>
              <Text>{property.price}</Text>
            </ListItem>
            <ListItem>
              <Text>Bed Room</Text>
              <Text>{property.bedRoom}</Text>
            </ListItem>
            <ListItem>
              <Text>Bath Room</Text>
              <Text>{property.bathRoom}</Text>
            </ListItem>
            <ListItem>
              <Text>Car park</Text>
              <Text>{property.carPark}</Text>
            </ListItem>
            <ListItem>
              <Text>Listed on</Text>
              <Text>{property.created_at}</Text>
            </ListItem>
          </UnorderedList>

          <Box mt="50px">{property.fullDetail}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PropertyDetail;
