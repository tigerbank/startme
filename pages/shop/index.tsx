import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { filterProducts, getNavData, getProducts } from '@/util/api';
import AddToCart from '@/components/AddToCart';
import { ProductProps } from '@/interfaces/common';
import FilterProduct from '@/components/Shop/FilterProduct';
import Loading from '@/components/Loading/Index';

function Shop({ data }: { data: ProductProps[] }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(data);
  const [productFilter, setProductFilter] = useState({
    s: '',
    range: [],
  });

  useEffect(() => {
    setProducts(data);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await filterProducts(productFilter);
      setProducts(result);
      setLoading(false);
    };

    fetchProducts();
  }, [productFilter]);

  return (
    <>
      <NextSeo title="Shop" description="A short description goes here." />
      <Box className="container" mt="40px">
        <Flex flexDir={{ base: 'column', xl: 'row' }}>
          <Box w={{ base: '100%', xl: '20%' }} mb="50px">
            <Box pr="50px">
              <FilterProduct
                productFilter={productFilter}
                setProductFilter={setProductFilter}
              />
            </Box>
          </Box>

          <Box w={{ base: '100%', xl: '80%' }}>
            <Heading as="h3" ml="20px">
              Shop
            </Heading>
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
                              src={product.image.url}
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
                            <Text>THB {product.price}</Text>
                          </Box>

                          <Box mt="5px">
                            <AddToCart product={product} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Flex>
            ) : loading ? (
              <Loading />
            ) : (
              <Text mt="20px" ml="20px">
                No product available
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const data = await getProducts();
  const nav = await getNavData(locale);

  return {
    props: {
      data: [],
      nav,
    },
  };
}

export default Shop;
