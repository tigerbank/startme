import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { filterProperty } from '@/util/api';
import PropertyLists from '@/components/RealEstate/PropertyLists';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';

function PropertySearchResult() {
  const router = useRouter();
  const searchString = router.query.search;
  const listType = router.query.listType;

  console.log(searchString);
  console.log(listType);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      const result = await filterProperty(searchString, listType);
      setProperties(result);
    };
    fetchResult();
  }, []);

  return (
    <Box className="container" mt="50px">
      Search Result: {searchString}
      {properties && <PropertyLists properties={properties} />}
      <BackToRealEstate />
    </Box>
  );
}

export default PropertySearchResult;
