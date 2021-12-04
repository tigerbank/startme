import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { getNavData, getProducts } from '@/util/api';
import AddToCart from '@/components/AddToCart';
import { ProductProps } from '@/interfaces/common';

function Shop({ products }: { products: ProductProps[] }) {
  return (
    <>
      <NextSeo title="Shop" description="A short description goes here." />
      <Box className="container" mt="40px">
        <Heading as="h3">Shop</Heading>
        <Flex
          mt="20px"
          flexWrap="wrap"
          gridGap={{ base: 0, xl: 30 }}
          justifyContent={{ base: 'space-between', xl: 'initial' }}
        >
          {products &&
            products.map((product: ProductProps) => (
              <Box
                key={product.name}
                width={{ base: '100%', md: '48%', xl: '380px' }}
              >
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
                    <Text fontWeight="bold">{product.name}</Text>
                    <Text>THB {product.price}</Text>
                  </Box>

                  <Box mt="5px">
                    <AddToCart product={product} />
                  </Box>
                </Box>
              </Box>
            ))}
        </Flex>
      </Box>
    </>
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
