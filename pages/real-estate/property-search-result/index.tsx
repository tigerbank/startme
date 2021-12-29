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
    let controller: any = new AbortController();
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const result = await filterProperty(searchString, listType, {
          signal: controller.signal,
        });
        setProperties(result);
        setIsLoading(false);
        controller = null;
      } catch (error) {}
    };
    fetchResult();
    return () => controller?.abort();
  }, [router]);

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
