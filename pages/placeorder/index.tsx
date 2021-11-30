import CartSteps from '@/components/CartSteps';
import { Store } from '@/util/Store';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import { totalItemPrice } from '@/util/cart';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';

function PlaceOrder() {
  const { state, dispatch } = useContext(Store);
  const {
    user,
    cart: { shippingAddress, paymentMethod, cartItems },
  } = state;
  const router = useRouter();

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

  const totalPrice = totalItemPrice(cartItems);
  const shippingPrice = totalPrice > 200 ? 0 : 15;
  const taxPrice = (totalPrice * 0.07).toFixed(2);
  const total = totalPrice + shippingPrice + Number(taxPrice);

  return (
    <Box className="container">
      <CartSteps currentStep={3} />
      <Heading as="h3">Place order</Heading>
      <Flex>
        <Box w="70%" mr="40px">
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
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
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
                    <Td>{item.quantity}</Td>
                    <Td>{item.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        <Box flex="1">
          <Box bg="white" borderRadius="md" boxShadow="md" p="30px" mt="20px">
            <Heading mb="10px" as="h4" fontSize="18px">
              Order Summary
            </Heading>
            <Flex justifyContent="space-between">
              <Text>Items:</Text>
              <Text>
                {totalPrice}
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
            <Button mt="20px" isFullWidth>
              Place order
            </Button>
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
