import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getNavData, getProducts } from '@/util/api';
import AddToCart from '@/components/AddToCart';
import { Flex } from '@chakra-ui/react';

function Shop({ products }: any) {
  return (
    <Box className="container" mt="40px">
      <Heading as="h3" fontSize="18px">
        Shop
      </Heading>
      <Flex flexWrap="wrap" gridGap={30}>
        {products &&
          products.map((product: any) => (
            <Box key={product.name} width={{ base: '100%', lg: '380px' }}>
              <Link href={`/shop/product/${product.slug}`} passHref>
                <a>
                  <Image
                    src={product.image.url}
                    alt=""
                    layout="responsive"
                    width="380"
                    height="380"
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
      </Flex>
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
