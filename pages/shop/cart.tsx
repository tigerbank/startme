import { Box, Heading, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useContext } from 'react';
import { Store } from '@/util/Store';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import dynamic from 'next/dynamic';
import { totalItemPrice } from '@/util/cart';
import { CartItemProps } from '@/interfaces/common';
import BackToShop from '@/components/BackToShop';

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
    <Box className="container" mt="30px">
      <Heading as="h3">Shopping Cart</Heading>
      {cartItems.length === 0 && <Box mt="20px">Cart is empty</Box>}

      {cartItems.length !== 0 && (
        <Box d={{ base: 'block', xl: 'flex' }} mt="30px">
          <Box w={{ base: '100%', xl: '65%' }} mr={{ base: '0', xl: '5%' }}>
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
                      <Td textAlign="center">{item.price}</Td>
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
            w={{ base: '100%', xl: '30%' }}
            textAlign="right"
            mt={{ base: '30px', xl: '0px' }}
          >
            <Heading as="h4">Subtotal</Heading>
            <Text>
              {cartItems.reduce((a: any, c: any) => a + c.quantity, 0)} Items
            </Text>
            <Text>
              {totalItemPrice(cartItems)}
              THB
            </Text>
            <Link href="/shipping" passHref>
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
    </Box>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
