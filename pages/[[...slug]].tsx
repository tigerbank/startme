import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { getPageData, getNavData, fetchAPI } from 'util/api';

function Page({ page }: any) {
  return (
    <Box className="container">
      <Heading>{page.title}</Heading>
      <Text>{page.body}</Text>
    </Box>
  );
}

export async function getStaticPaths(context: any) {
  // Get all pages from Strapi
  const allPages = await context.locales.map(async (locale: any) => {
    return fetchAPI(`/pages?_locale=${locale}`);
  });

  const pages = await Promise.all(allPages);

  const pagesCombined = pages.flat();

  const paths = pagesCombined.map((page: any) => {
    const slugArray = !page.slug ? false : page.slug.split('/');

    return {
      params: { slug: slugArray },
      locale: page.locale,
    };
  });

  return { paths, fallback: 'blocking' };
}
export async function getStaticProps(context: any) {
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
