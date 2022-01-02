import { Box, Heading, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Store } from '@/util/Store';
import { totalItemPrice } from '@/util/cart';
import { CartItemProps } from '@/interfaces/common';
import BackToShop from '@/components/Shop/BackToShop';
import { getGlobalData } from '@/util/api';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

function CartScreen() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = (item: any, quantity: number) => {
    if (item.countInStock <= 0) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...item,
        quantity,
      },
    });
  };

  const handleDelete = (item: any) => {
    dispatch({
      type: 'CART_DELETE_ITEM',
      payload: item,
    });
  };

  return (
    <DefaultTemplate title="Cart" description="description">
      <Heading as="h3">Shopping Cart</Heading>
      {cartItems.length === 0 && <Box mt="20px">Cart is empty</Box>}

      {cartItems.length !== 0 && (
        <Box d={{ base: 'block', lg: 'flex' }} mt="30px">
          <Box w={{ base: '100%', lg: '65%' }} mr={{ base: '0', lg: '5%' }}>
            <Box bg="white" borderRadius="md" boxShadow="md" p="30px">
              <Heading mb="10px" as="h4" fontSize="18px">
                Order Items
              </Heading>
              <Table
                variant="simple"
                overflowX="auto"
                d={{ base: 'block', md: 'table' }}
              >
                <Thead>
                  <Tr>
                    <Th textAlign="center">Image</Th>
                    <Th textAlign="center">Name</Th>
                    <Th textAlign="center">Quantity</Th>
                    <Th textAlign="center">Price</Th>
                    <Th textAlign="center">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map((item: CartItemProps) => (
                    <Tr key={item.name}>
                      <Td textAlign="center">
                        <Image
                          src={item.image}
                          layout="fixed"
                          width="100"
                          height="100"
                          alt=""
                        />
                      </Td>
                      <Td textAlign="center">{item.name}</Td>
                      <Td textAlign="center">
                        <select
                          value={Number(item.quantity)}
                          onChange={(e) =>
                            updateCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                      </Td>
                      <Td textAlign="center">{item.price.toLocaleString()}</Td>
                      <Td textAlign="center">
                        <button onClick={() => handleDelete(item)}>X</button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>

          <Box
            w={{ base: '100%', lg: '30%' }}
            textAlign="right"
            mt={{ base: '30px', lg: '0px' }}
          >
            <Heading as="h4">Subtotal</Heading>
            <Text>
              {cartItems.reduce((a: any, c: any) => a + c.quantity, 0)} Items
            </Text>
            <Text fontWeight="bold">
              {totalItemPrice(cartItems).toLocaleString()}
              THB
            </Text>
            <Link href="/shop/shipping" passHref>
              <a>
                <Button colorScheme="teal" mt="20px" isFullWidth>
                  Check out
                </Button>
              </a>
            </Link>
          </Box>
        </Box>
      )}

      <BackToShop />
    </DefaultTemplate>
  );
}

// export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

export async function getServerSideProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      global,
    },
  };
}

export default CartScreen;
