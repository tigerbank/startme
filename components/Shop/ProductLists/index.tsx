import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Text, Flex } from '@chakra-ui/react';
import { ProductProps } from '@/interfaces/common';
import AddToCart from '@/components/AddToCart';
import Loading from '@/components/Loading/Index';

function ProductLists({
  products,
  loading,
}: {
  products: ProductProps[];
  loading: boolean;
}) {
  const renderStatus = () => {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <Text mt="20px" ml="20px">
          No product available
        </Text>
      );
    }
  };

  return (
    <>
      {products.length > 0 ? (
        <Flex
          flexWrap="wrap"
          justifyContent={{ base: 'space-between', xl: 'initial' }}
          w="100%"
        >
          {products &&
            products.map((product: ProductProps) => (
              <Box
                key={product.name}
                width={{ base: '100%', md: '50%', xl: '33%' }}
              >
                <Box p="20px">
                  <Link href={`/shop/product/${product.slug}`} passHref>
                    <a>
                      <Image
                        src={
                          product.image.url || 'https://via.placeholder.com/800'
                        }
                        alt=""
                        layout="responsive"
                        width="800"
                        height="800"
                      />
                    </a>
                  </Link>

                  <Box p="20px" d="flex" justifyContent="space-between">
                    <Box>
                      <Text fontWeight="bold">{product.name}</Text>
                      <Text>THB {product.price.toLocaleString()}</Text>
                    </Box>

                    <Box mt="5px">
                      <AddToCart product={product} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Flex>
      ) : (
        renderStatus()
      )}
    </>
  );
}

export default ProductLists;
