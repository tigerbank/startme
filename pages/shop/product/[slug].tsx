import React from 'react';
import Image from 'next/image';
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ProductProps } from '@/interfaces/common';
import AddToCart from '@/components/Shop/AddToCart';
import BackToShop from '@/components/Shop/BackToShop';
import { getGlobalData, getProducts, getProductsBySlug } from '@/util/api';

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
              src={
                product.image.url
                  ? product.image.url
                  : 'https://via.placeholder.com/800'
              }
              alt=""
              layout="responsive"
            />
          </Box>
          <Box mt={{ base: '20px', md: 0 }} w={{ base: '100%', md: '50%' }}>
            <Box px="30px">
              <Heading>{product.name}</Heading>
              <Text mb="20px" fontSize="20px" fontWeight="bold">
                THB {product.price.toLocaleString()}
              </Text>
              <Text>
                <strong>Category:</strong> {product.category}
              </Text>
              <Text>
                <strong>Brand:</strong> {product.brands.name}
              </Text>
              <Text>
                <strong>Stock:</strong> {product.countInStock}
              </Text>
              <Box as="hr" my="20px" />
              <Text>
                <strong>Detail:</strong>
                <br /> {product.description}
              </Text>

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

export async function getStaticPaths({ locales }: { locales: any }) {
  const products = await getProducts();

  let productPaths: any = [];
  products.forEach((product: ProductProps) => {
    for (const locale of locales) {
      productPaths.push({
        params: {
          slug: product.slug,
        },
        locale,
      });
    }
  });

  return {
    paths: productPaths,
    fallback: true,
  };
}

export async function getStaticProps({ params, locale }: any) {
  const slug = params.slug;
  const product = await getProductsBySlug(slug);
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      product,
      global,
    },
    revalidate: 10,
  };
}

export default ProductScreen;
