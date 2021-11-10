import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';

function Page({ page }: any) {
  return (
    <Box className="container">
      <Heading>{page.title}</Heading>
      <Text>{page.body}</Text>
    </Box>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const { locale } = context;

  let translation = undefined;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pages/${id}`,
  );

  const page = await res.json();

  if (locale === 'en') {
    const translationRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/pages/${page.localizations[0].id}`,
    );

    translation = await translationRes.json();
  }

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page: translation ? translation : page },
  };
}

export default Page;
