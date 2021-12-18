import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { NextSeo } from 'next-seo';
import {
  useToast,
  Spinner,
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from '@chakra-ui/react';
import { OrderItemProps } from '@/interfaces/common';
import CartSteps from '@/components/CartSteps';
import BackToShop from '@/components/BackToShop';
import { totalItemPrice } from '@/util/cart';
import { Store } from '@/util/Store';
import { getGlobalData } from '@/util/api';

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
      router.push('/shop/shipping');
    }

    if (!paymentMethod) {
      router.push('/shop/payment');
    }
  }, []);

  const itemPrice = totalItemPrice(cartItems);
  const shippingPrice = itemPrice > 200 ? 0 : 15;
  const taxPrice = (itemPrice * 0.07).toFixed(2);
  const total = itemPrice + shippingPrice + Number(taxPrice);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      paymentMethod,
      shippingAddress: { ...shippingAddress },
      orderItems: cartItems,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice: total,
      user: user.id,
    };

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
          body: JSON.stringify(data),
        },
      );

      const orderResponse = await order.json();

      if (order.status !== 200) {
        throw new Error(order.statusText);
      }

      await fetch(`/api/mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (paymentMethod === 'cash') {
        toast({
          title: 'Success',
          description: 'Submitted order successfully',
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
      }

      dispatch({
        type: 'CLEAR_CART',
      });
      Cookies.remove('cartItems');
      router.push(`/shop/order/${orderResponse.id}`);
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
    <>
      <NextSeo title="Register" description="A short description goes here." />
      <Box className="container">
        <CartSteps currentStep={3} />
        <Heading as="h3">Place order</Heading>
        <Flex flexDir={{ base: 'column', xl: 'row' }}>
          <Box w={{ base: '100%', xl: '70%' }} mr="40px">
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
              <Table
                variant="simple"
                overflowX="scroll"
                d={{ base: 'block', md: 'table' }}
              >
                <Thead>
                  <Tr>
                    <Th textAlign="center">Image</Th>
                    <Th textAlign="center">Name</Th>
                    <Th textAlign="center">Quantity</Th>
                    <Th textAlign="center">Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map((item: OrderItemProps) => (
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
                      <Td textAlign="center">{item.quantity}</Td>
                      <Td textAlign="center">{item.price.toLocaleString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
          <Box flex="1" w={{ base: '100%', xl: 'auto' }}>
            <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
              <Heading mb="10px" as="h4" fontSize="18px">
                Order Summary
              </Heading>
              <Flex justifyContent="space-between">
                <Text>Items:</Text>
                <Text>
                  {itemPrice.toLocaleString()}
                  THB
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Tax:</Text>
                <Text>{taxPrice.toLocaleString()}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Shipping:</Text>
                <Text>{shippingPrice.toLocaleString()}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Total:</Text>
                <Text fontWeight="bold">{total.toLocaleString()}</Text>
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
        <BackToShop />
      </Box>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const global = await getGlobalData(locale);

  return {
    props: {
      global,
    },
  };
}

export default PlaceOrder;
