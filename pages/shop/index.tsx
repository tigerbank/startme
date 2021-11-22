import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/button';
import Link from 'next/link';
import { getProducts } from 'util/api';

function Shop({ products }: any) {
  return (
    <Box className="container">
      <Box d="flex" flexWrap="wrap" justifyContent="space-between">
        {products &&
          products.map((product: any) => (
            <Box key={product.name} w="350px">
              <Link href={`/shop/product/${product.slug}`} passHref>
                <a>
                  <Image
                    src={product.image.url}
                    alt=""
                    layout="fixed"
                    width="400"
                    height="400"
                  />
                </a>
              </Link>

              <Box p="20px" d="flex" justifyContent="space-between">
                <Box>
                  <Text>{product.name}</Text>
                  <Text>{product.price}</Text>
                </Box>

                <Button>Add to cart</Button>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();

  return {
    props: {
      products,
    },
  };
}

export default Shop;
