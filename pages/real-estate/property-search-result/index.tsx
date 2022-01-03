import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { filterProperty, getGlobalData } from '@/util/api';
import PropertyLists from '@/components/RealEstate/PropertyLists';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import DefaultTemplate from '@/components/templates/DefaultTemplate';
import Breadcrumbs from '@/components/Common/Breadcrumb';

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
    <DefaultTemplate
      title="Property Search"
      description="Description goes here"
    >
      <Breadcrumbs
        lists={[
          { name: 'Real Estate', link: '/real-estate' },
          { name: 'Search', link: '/real-estate/property-search-result#' },
        ]}
      />
      <Box mt="20px">Search Result: {searchString}</Box>
      {isLoading && <div>Loading...</div>}
      {properties && <PropertyLists properties={properties} />}
      <BackToRealEstate />
    </DefaultTemplate>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      global,
    },
  };
}

export default PropertySearchResult;
