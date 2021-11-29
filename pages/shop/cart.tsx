import { Box, Heading, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useContext } from 'react';
import { Store } from '@/util/Store';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import dynamic from 'next/dynamic';

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
      <Heading as="h3" fontSize="16px">
        Shopping Cart
      </Heading>
      {cartItems.length === 0 && <Box>Cart is empty</Box>}

      {cartItems.length !== 0 && (
        <Box d="flex" mt="30px">
          <Box w="70%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item: any) => (
                  <Tr key={item.name}>
                    <Td>
                      <Image
                        src={item.image}
                        layout="fixed"
                        width="100"
                        height="100"
                        alt=""
                      />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>
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
                    <Td>{item.price}</Td>
                    <Td>
                      <button onClick={() => handleDelete(item)}>X</button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box w="30%" textAlign="right">
            <Heading as="h4">Subtotal</Heading>
            <Text>
              {cartItems.reduce((a: any, c: any) => a + c.quantity, 0)} Items
            </Text>
            <Text>
              {cartItems.reduce(
                (a: any, c: any) => a + c.quantity * c.price,
                0,
              )}{' '}
              THB
            </Text>
            <Link href="/shipping" passHref>
              <a>
                <Button mt="20px" isFullWidth>
                  Check out
                </Button>
              </a>
            </Link>
          </Box>
        </Box>
      )}

      <Box mt="30px">
        <Link href="/shop">Back to shop</Link>
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
