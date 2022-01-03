import { Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AddForm from '@/components/RealEstate/AddForm';
import { Store } from '@/util/Store';
import BackToRealEstate from '@/components/RealEstate/BackToRealEstate';
import DefaultTemplate from '@/components/templates/DefaultTemplate';
import { getGlobalData } from '@/util/api';
import Breadcrumbs from '@/components/Common/Breadcrumb';

function AddPropertyScreen() {
  const { state } = useContext(Store);
  const { user } = state;

  return (
    <DefaultTemplate title="Add Property" description="description">
      <Breadcrumbs
        lists={[
          { name: 'Real Estate', link: '/real-estate' },
          { name: 'Add Property', link: '/real-estate/add-property' },
        ]}
      />
      <Heading as="h3">Add Property</Heading>
      {user ? <AddForm /> : 'You are not logged in'}
      <BackToRealEstate />
    </DefaultTemplate>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      global,
    },
  };
}

export default AddPropertyScreen;
