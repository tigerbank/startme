import React from 'react';
import Image from 'next/image';
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { ProductProps } from '@/interfaces/common';
import AddToCart from '@/components/AddToCart';
import BackToShop from '@/components/BackToShop';
import { getNavData, getProductsBySlug } from '@/util/api';

function ProductScreen({ product }: { product: ProductProps }) {
  if (!product) {
    return <Box>Product not found</Box>;
  }

  return (
    <>
      <NextSeo
        title={product.name}
        description="A short description goes here."
      />
      <Box className="container" mt="50px">
        <Box d={{ base: 'block', md: 'flex' }}>
          <Box w={{ base: '100%', md: '50%' }}>
            <Image
              width="900"
              height="900"
              src={product.image.url}
              alt=""
              layout="responsive"
            />
          </Box>
          <Box mt={{ base: '20px', md: 0 }} w={{ base: '100%', md: '50%' }}>
            <Box px="30px">
              <Heading>{product.name}</Heading>
              <Text>{product.category}</Text>
              <Text>{product.brand}</Text>
              <Text>{product.rating}</Text>
              <Text>{product.description}</Text>
              <Text>THB {product.price}</Text>

              <Box mt="20px">
                <AddToCart product={product} />
              </Box>
            </Box>
          </Box>
        </Box>
        <BackToShop />
      </Box>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;
  const locale = context.locale;
  const product = await getProductsBySlug(slug);
  const nav = await getNavData(locale);

  return {
    props: {
      product,
      nav,
    },
  };
}

export default ProductScreen;
