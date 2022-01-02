import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { filterProperty, getGlobalData } from '@/util/api';
import PropertyLists from '@/components/RealEstate/PropertyLists';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

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
      Search Result: {searchString}
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
