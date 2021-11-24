import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getNavData, getProducts } from 'util/api';
import AddToCart from 'components/AddToCart';

function Shop({ products }: any) {
  return (
    <Box className="container" mt="40px">
      Shop
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

                <AddToCart product={product} />
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const products = await getProducts();
  const nav = await getNavData(locale);

  return {
    props: {
      products,
      nav,
    },
  };
}

export default Shop;
