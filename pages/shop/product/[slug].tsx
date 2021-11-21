import { Box, Heading, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/button';
import { getProductsBySlug } from 'util/api';

function ProductScreen({ product }: any) {
  if (!product) {
    return <Box>Product not found</Box>;
  }
  return (
    <Box className="container" mt="50px">
      <Box d="flex">
        <Box w="50%">
          <Image
            width="900"
            height="900"
            src={product.image.url}
            alt=""
            layout="responsive"
          />
        </Box>
        <Box w="50%">
          <Box px="30px">
            <Heading>{product.name}</Heading>
            <Text>{product.category}</Text>
            <Text>{product.brand}</Text>
            <Text>{product.rating}</Text>
            <Text>{product.description}</Text>
            <Text>{product.price}</Text>
            <Button mt="30px">Add to cart</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const product = await getProductsBySlug(slug);

  console.log(product);

  return {
    props: {
      product,
    },
  };
}

export default ProductScreen;
