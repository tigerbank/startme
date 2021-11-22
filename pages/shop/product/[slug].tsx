import { Box, Heading, Text } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/button';
import { getProductsBySlug } from 'util/api';
import { Store } from 'util/Store';

function ProductScreen({ product }: any) {
  const { dispatch } = useContext(Store);

  if (!product) {
    return <Box>Product not found</Box>;
  }

  const transformProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
  };

  const addToCartHandler = () => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...transformProduct, quantity: 1 },
    });
  };

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
            <Button onClick={addToCartHandler} mt="30px">
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;
  const product = await getProductsBySlug(slug);

  return {
    props: {
      product,
    },
  };
}

export default ProductScreen;
