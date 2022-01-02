import { Box } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function DefaultTemplate({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <>
      <NextSeo title={title} description={description} />
      <Box className="container" mt="30px">
        {children}
      </Box>
    </>
  );
}
