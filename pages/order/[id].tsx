import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { useRouter } from 'next/router';
import { Store } from '@/util/Store';
import { GetServerSideProps } from 'next';
import { getOrder, updateOrderStatus } from '@/util/api';
import { OrderProps } from '@/interfaces/common';
import { PayPalButton } from 'react-paypal-button-v2';

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
      <Box className="container" mt="20px">
        <Heading as="h3">Order Summary {}</Heading>
        <Flex flexDir={{ base: 'column', lg: 'row' }}>
          <Box w={{ base: '100%', lg: '70%' }} mr="40px">
            <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
              <Heading mb="10px" as="h4" fontSize="18px">
                Shipping Address
              </Heading>
              <Text>
                {order.shippingAddress?.address}, {order.shippingAddress?.city},
                {order.shippingAddress?.postalCode}{' '}
                {order.shippingAddress?.country}
              </Text>
            </Box>

            <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
              <Heading mb="10px" as="h4" fontSize="18px">
                Payment Method
              </Heading>
              <Text>{order.paymentMethod}</Text>
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
                  {order.orderItems.map((item: any) => (
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

            <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
              <Heading mb="10px" as="h4" fontSize="18px">
                Payment status
              </Heading>
              <Text>{order.isPaid ? 'Paid' : 'Pending'}</Text>
            </Box>

            <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
              <Heading mb="10px" as="h4" fontSize="18px">
                Shipping status
              </Heading>
              <Text>{order.isDelivered ? 'Delivered' : 'Not yet'}</Text>
            </Box>
          </Box>
          <Box flex="1" w={{ base: '100%', lg: 'auto' }}>
            <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
              <Heading mb="10px" as="h4" fontSize="18px">
                Order Summary
              </Heading>
              <Flex justifyContent="space-between">
                <Text>Items:</Text>
                <Text>{order.itemPrice} THB</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Tax:</Text>
                <Text>{order.taxPrice}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Shipping:</Text>
                <Text>{order.shippingPrice}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Total:</Text>
                <Text fontWeight="bold">{order.totalPrice}</Text>
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
        <Box mt="30px">
          <Link href="/shop">Back to shop</Link>
        </Box>
      </Box>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const orderId: number = Number(context.params?.id);

  return {
    props: {
      orderId,
    },
  };
};

export default Order;
