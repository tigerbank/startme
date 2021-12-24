import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { filterProperty } from '@/util/api';
import PropertyLists from '@/components/RealEstate/PropertyLists';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';

function PropertySearchResult() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchString = router.query.search;
  const listType = router.query.listType;

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const result = await filterProperty(searchString, listType);
        setProperties(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResult();
  }, []);

  return (
    <Box className="container" mt="50px">
      Search Result: {searchString}
      {isLoading && <div>Loading...</div>}
      {properties && <PropertyLists properties={properties} />}
      <BackToRealEstate />
    </Box>
  );
}

export default PropertySearchResult;
