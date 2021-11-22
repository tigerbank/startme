import { Box, Text } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/button';
import Link from 'next/link';
import { getProducts } from 'util/api';
import { Store } from 'util/Store';
import { useRouter } from 'next/router';

function Shop({ products }: any) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const addToCartHandler = (product: any) => {
    const updateItem = state.cart.cartItems.find(
      (item: any) => item.id === product.id,
    );

    const transformProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image.formats.small.url,
      countInStock: product.countInStock,
    };

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...transformProduct,
        quantity: updateItem ? updateItem.quantity + 1 : 1,
      },
    });
    router.push('/shop/cart');
  };

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

                <Button onClick={() => addToCartHandler(product)}>
                  Add to cart
                </Button>
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
