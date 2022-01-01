import { Box, Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { NextSeo } from 'next-seo';
import AddForm from '@/components/RealEstate/AddForm';
import { Store } from '@/util/Store';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';

function AddPropertyScreen() {
  const { state } = useContext(Store);
  const { user } = state;

  return (
    <>
      <NextSeo
        title="Add Property"
        description="A short description goes here."
      />
      <Box className="container" mt="100px">
        <Heading as="h3">Add Property</Heading>
        {user ? <AddForm /> : 'You are not logged in'}
        <BackToRealEstate />
      </Box>
    </>
  );
}

export default AddPropertyScreen;
