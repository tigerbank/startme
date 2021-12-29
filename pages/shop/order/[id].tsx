import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { PayPalButton } from 'react-paypal-button-v2';
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
} from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { OrderProps } from '@/interfaces/common';
import { Store } from '@/util/Store';
import BackToShop from '@/components/Shop/BackToShop';
import { getGlobalData, getOrder, updateOrderStatus } from '@/util/api';

function Order({ orderId }: { orderId: number }) {
  const router = useRouter();
  const toast = useToast();
  const { state } = useContext(Store);
  const { user } = state;

  const [isLoaded, setIsLoaded] = useState(true);
  const [order, setOrder] = useState({} as OrderProps);

  const fetchOrder = async () => {
    const data = await getOrder(Number(orderId));
    setOrder(data);
    setIsLoaded(false);
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchOrder();
    }
  }, []);

  if (isLoaded) {
    return (
      <Box className="container" mt="50px" textAlign="center">
        <Spinner />
      </Box>
    );
  } else {
    return (
      <>
        <NextSeo
          title="Order detail"
          description="A short description goes here."
        />
        <Box className="container" pt="30px">
          <Heading as="h3">Order Summary</Heading>
          <Flex flexDir={{ base: 'column', lg: 'row' }}>
            <Box w={{ base: '100%', lg: '70%' }} mr="40px">
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p="30px"
                mt="20px"
              >
                <Heading mb="10px" as="h4" fontSize="18px">
                  Shipping Address
                </Heading>
                <Text>
                  {order.shippingAddress?.address},{' '}
                  {order.shippingAddress?.city},
                  {order.shippingAddress?.postalCode}{' '}
                  {order.shippingAddress?.country}
                </Text>
              </Box>

              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p="30px"
                mt="20px"
              >
                <Heading mb="10px" as="h4" fontSize="18px">
                  Payment Method
                </Heading>
                <Text>{order.paymentMethod}</Text>
              </Box>

              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p="30px"
                mt="20px"
              >
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
                      <Th textAlign="center" w="25%">
                        Image
                      </Th>
                      <Th textAlign="center" w="25%">
                        Name
                      </Th>
                      <Th textAlign="center" w="25%">
                        Quantity
                      </Th>
                      <Th textAlign="center" w="25%">
                        Price
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {order.orderItems.map((item: any) => (
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
                        <Td textAlign="center">
                          {item.price.toLocaleString()}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p="30px"
                mt="20px"
              >
                <Heading mb="10px" as="h4" fontSize="18px">
                  Payment status
                </Heading>
                <Text>{order.isPaid ? 'Paid' : 'Pending'}</Text>
              </Box>

              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p="30px"
                mt="20px"
              >
                <Heading mb="10px" as="h4" fontSize="18px">
                  Shipping status
                </Heading>
                <Text>{order.isDelivered ? 'Delivered' : 'Not yet'}</Text>
              </Box>
            </Box>
            <Box flex="1" w={{ base: '100%', lg: 'auto' }}>
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p="30px"
                mt="20px"
              >
                <Heading mb="10px" as="h4" fontSize="18px">
                  Order Summary
                </Heading>
                <Flex justifyContent="space-between">
                  <Text>Items:</Text>
                  <Text>{order.itemPrice.toLocaleString()} THB</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>Tax:</Text>
                  <Text>{order.taxPrice.toLocaleString()}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>Shipping:</Text>
                  <Text>{order.shippingPrice.toLocaleString()}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold">Total:</Text>
                  <Text fontWeight="bold">
                    {order.totalPrice.toLocaleString()}
                  </Text>
                </Flex>
                <Box mt="20px">
                  {order.paymentMethod === 'paypal' && !order.isPaid && (
                    <PayPalButton
                      options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                        currency: 'THB',
                      }}
                      amount={order.totalPrice}
                      onSuccess={(details: any, data: any) => {
                        toast({
                          title: 'Success',
                          description:
                            'Transaction completed by ' +
                            details.payer.name.given_name,
                          status: 'success',
                          duration: 8000,
                          isClosable: true,
                        });

                        // OPTIONAL: Call your server to save the transaction
                        updateOrderStatus(Number(orderId)).then(() => {
                          fetchOrder();
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Flex>
          <BackToShop />
        </Box>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}: any) => {
  const orderId: number = Number(params?.id);
  const global = await getGlobalData(locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      orderId,
      global,
    },
  };
};

export default Order;
