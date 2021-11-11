import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { getPageData, getNavData } from 'util/api';

function Page({ page }: any) {
  return (
    <Box className="container">
      <Heading>{page.title}</Heading>
      <Text>{page.body}</Text>
    </Box>
  );
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const { locale } = context;

  const page = await getPageData(slug ? slug : [''], locale);
  const nav = await getNavData(locale);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page, nav },
  };
}

export default Page;
