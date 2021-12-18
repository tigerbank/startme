import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { filterProducts, getGlobalData, getProducts } from '@/util/api';
import { ProductProps } from '@/interfaces/common';
import FilterProduct from '@/components/Shop/FilterProduct';
import ProductLists from '@/components/Shop/ProductLists';
import Pagination from '@/components/Pagination';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Shop({ data }: { data: ProductProps[] }) {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(data);
  const [productFilter, setProductFilter] = useState({
    s: '',
    range: [],
    brand: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

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

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = products.slice(indexOfFirstPost, indexOfLastPost);
  const noOfAllPosts = Math.ceil(products.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <NextSeo title="Shop" description="A short description goes here." />
      <Box className="container" mt="40px">
        <Flex flexDir={{ base: 'column', xl: 'row' }}>
          <Box w={{ base: '100%', xl: '20%' }} mb="50px">
            <Box px={{ base: '30px', xl: '0px' }}>
              <FilterProduct
                productFilter={productFilter}
                setProductFilter={setProductFilter}
              />
            </Box>
          </Box>

          <Box w={{ base: '100%', xl: '80%' }}>
            <Box px="25px">
              <Box d="flex" alignItems="center" justifyContent="flex-end">
                <Text fontSize="14px" mr="15px">
                  {t('show_products_per_page')}
                </Text>
                <Select
                  w="60px"
                  onChange={(e) => setPostsPerPage(Number(e.target.value))}
                  value={postsPerPage}
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                </Select>
              </Box>
            </Box>
            <ProductLists products={currentList} loading={loading} />
            <Flex alignItems="center">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={products.length}
                paginate={paginate}
              />
              <Text fontSize="12px" textAlign="right">
                Page {currentPage} of {noOfAllPosts}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const data = await getProducts();
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data,
      global,
    },
  };
}

export default Shop;
