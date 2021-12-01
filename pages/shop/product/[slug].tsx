import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import { getNavData, getProductsBySlug } from '@/util/api';
import Link from 'next/link';
import AddToCart from 'components/AddToCart';
import { ProductProps } from '@/interfaces/common';

function ProductScreen({ product }: { product: ProductProps }) {
  if (!product) {
    return <Box>Product not found</Box>;
  }

  return (
    <Box className="container" mt="50px">
      <Box d={{ base: 'block', lg: 'flex' }}>
        <Box w={{ base: '100%', lg: '50%' }}>
          <Image
            width="900"
            height="900"
            src={product.image.url}
            alt=""
            layout="responsive"
          />
        </Box>
        <Box w={{ base: '100%', lg: '50%' }}>
          <Box px="30px">
            <Heading>{product.name}</Heading>
            <Text>{product.category}</Text>
            <Text>{product.brand}</Text>
            <Text>{product.rating}</Text>
            <Text>{product.description}</Text>
            <Text>{product.price}</Text>

            <AddToCart product={product} />
          </Box>
        </Box>
      </Box>
      <Box mt="30px">
        <Link href="/shop">Back to shop</Link>
      </Box>
    </Box>
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
