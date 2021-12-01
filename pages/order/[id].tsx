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
import CartSteps from '@/components/CartSteps';
import { Store } from '@/util/Store';
import { GetServerSideProps } from 'next';
import { getOrder } from '@/util/api';
import { OrderProps } from '@/interfaces/common';

function Order({ order }: { order: OrderProps }) {
  const router = useRouter();
  const { state } = useContext(Store);
  const { user } = state;
  const {
    itemPrice,
    shippingPrice,
    paymentMethod,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    shippingAddress,
    orderItems,
  } = order;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  if (!order) {
    return <Box>Loading...</Box>;
  }

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
              {shippingAddress?.address}, {shippingAddress?.city},
              {shippingAddress?.postalCode} {shippingAddress?.country}
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
                {orderItems.map((item: any) => (
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
            <Text>{isPaid ? 'Paid' : 'Pending'}</Text>
          </Box>

          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
            <Heading mb="10px" as="h4" fontSize="18px">
              Shipping status
            </Heading>
            <Text>{isDelivered ? 'Delivered' : 'Not yet'}</Text>
          </Box>
        </Box>
        <Box flex="1" w={{ base: '100%', lg: 'auto' }}>
          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
            <Heading mb="10px" as="h4" fontSize="18px">
              Order Summary
            </Heading>
            <Flex justifyContent="space-between">
              <Text>Items:</Text>
              <Text>{itemPrice} THB</Text>
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
              <Text fontWeight="bold">{totalPrice}</Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box mt="30px">
        <Link href="/shop">Back to shop</Link>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const orderId: number = Number(context.params?.id);

  const order = await getOrder(orderId);

  return {
    props: {
      order,
    },
  };
};

export default Order;
