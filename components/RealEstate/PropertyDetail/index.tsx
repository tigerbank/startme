import React from 'react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import ContactAgent from '../ContactAgent';
import styles from './PropertyDetail.module.scss';
import { PropertyProps } from '@/interfaces/common';
import TruncateText from '@/components/Common/TruncateText';
import PropertyGallery from '@/components/RealEstate/PropertyGallery';
import Disclaimer from '@/components/Common/Disclaimer';
import ContentWithSidebar from '@/components/templates/ContentWithSiderbar';

function PropertyDetail({ property }: { property: PropertyProps }) {
  if (!property) {
    return <Box>property not found</Box>;
  }

  return (
    <Box className={styles.propertyDetail}>
      <Box className="container">
        <Heading as="h2" mb="15px">
          {property.name}
        </Heading>
      </Box>
      <PropertyGallery images={property.images} />
      <Box className="container">
        <ContentWithSidebar>
          <Box>
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
                  <Text>THB {property.price.toLocaleString()}</Text>
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

              <Box mt="50px" mb="30px">
                {property.fullDetail}
              </Box>

              <Disclaimer align="left" />
            </Box>
          </Box>
          <ContactAgent listId={property.id} />
        </ContentWithSidebar>
      </Box>
    </Box>
  );
}

export default PropertyDetail;
