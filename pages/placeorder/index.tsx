import CartSteps from '@/components/CartSteps';
import { Store } from '@/util/Store';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useToast, Spinner } from '@chakra-ui/react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { totalItemPrice } from '@/util/cart';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import Cookies from 'js-cookie';
import { OrderItemProps } from '@/interfaces/common';

function PlaceOrder() {
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const {
    user,
    cart: { shippingAddress, paymentMethod, cartItems },
  } = state;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }

    if (!shippingAddress.address) {
      router.push('/shipping');
    }

    if (!paymentMethod) {
      router.push('/payment');
    }
  }, []);

  const itemPrice = totalItemPrice(cartItems);
  const shippingPrice = itemPrice > 200 ? 0 : 15;
  const taxPrice = (itemPrice * 0.07).toFixed(2);
  const total = itemPrice + shippingPrice + Number(taxPrice);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const order = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwt}`,
          },
          body: JSON.stringify({
            paymentMethod,
            shippingAddress: { ...shippingAddress },
            orderItems: cartItems,
            itemPrice,
            shippingPrice,
            taxPrice,
            totalPrice: total,
            user: user.id,
          }),
        },
      );

      const orderResponse = await order.json();

      if (order.status !== 200) {
        throw new Error(order.statusText);
      }

      setLoading(false);
      toast({
        title: 'Success',
        description: 'Submitted order successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: 'CLEAR_CART',
      });
      Cookies.remove('cartItems');
      router.push(`/order/${orderResponse.id}`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  return (
    <Box className="container">
      <CartSteps currentStep={3} />
      <Heading as="h3">Place order</Heading>
      <Flex flexDir={{ base: 'column', lg: 'row' }}>
        <Box w={{ base: '100%', lg: '70%' }} mr="40px">
          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
            <Heading mb="10px" as="h4" fontSize="18px">
              Shipping Address
            </Heading>
            <Text>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode} {shippingAddress.country}
            </Text>
          </Box>

          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
            <Heading mb="10px" as="h4" fontSize="18px">
              Payment Method
            </Heading>
            <Text>{paymentMethod}</Text>
          </Box>

          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
            <Heading mb="10px" as="h4" fontSize="18px">
              Order Items
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th d={{ base: 'none', lg: 'table-cell' }}>Image</Th>
                  <Th>Name</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item: OrderItemProps) => (
                  <Tr key={item.name}>
                    <Td d={{ base: 'none', lg: 'table-cell' }}>
                      <Image
                        src={item.image}
                        layout="fixed"
                        width="100"
                        height="100"
                        alt=""
                      />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        <Box flex="1" w={{ base: '100%', lg: 'auto' }}>
          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
            <Heading mb="10px" as="h4" fontSize="18px">
              Order Summary
            </Heading>
            <Flex justifyContent="space-between">
              <Text>Items:</Text>
              <Text>
                {itemPrice}
                THB
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Tax:</Text>
              <Text>{taxPrice}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Shipping:</Text>
              <Text>{shippingPrice}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold">{total}</Text>
            </Flex>
            <Button
              colorScheme="teal"
              mt="20px"
              isFullWidth
              onClick={handleSubmit}
            >
              Place order
            </Button>
            {loading && (
              <Box textAlign="center" mt="20px">
                <Spinner />
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
      <Box mt="30px">
        <Link href="/shop">Back to shop</Link>
      </Box>
    </Box>
  );
}

export default PlaceOrder;
