import { Box, Heading, Text } from '@chakra-ui/layout';
import { PageProps } from 'interfaces/common';
import React from 'react';
import { getPageData, getNavData, fetchAPI } from 'util/api';

function Page({ page }: { page: PageProps }) {
  return (
    <Box className="container">
      <Heading>{page.title}</Heading>
      <Text>{page.body}</Text>
    </Box>
  );
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  // Get all pages from Strapi
  const allPages = locales.map(async (locale: string) => {
    return fetchAPI(`/pages?_locale=${locale}`);
  });

  const pages = await Promise.all(allPages);

  const pagesCombined = pages.flat();

  const paths = pagesCombined.map((page: any) => {
    const slugArray = !page.slug ? [''] : page.slug.split('/');

    console.log(slugArray);

    return {
      params: { slug: slugArray },
      locale: page.locale,
    };
  });

  return { paths, fallback: 'blocking' };
}
export async function getStaticProps({
  params,
  locale,
}: {
  params: { slug: string[] };
  locale: string;
}) {
  const { slug } = params;
  const page = await getPageData(slug ? slug : [''], locale);
  const nav = await getNavData(locale);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page, nav },
    revalidate: 10,
  };
}

export default Page;
