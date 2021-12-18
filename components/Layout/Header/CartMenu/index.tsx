import React, { useContext } from 'react';

import Link from 'next/link';
import { Text, Badge } from '@chakra-ui/react';
import { Store } from '@/util/Store';

function CartMenu() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Text
      mr="5px"
      borderRight="solid 1px #b1b1b1"
      borderLeft="solid 1px #b1b1b1"
      py="10px"
      px="25px"
    >
      <Link href="/shop/cart">
        <a>
          Cart
          {cart.cartItems.length > 0 && (
            <Badge
              position="relative"
              top="-5px"
              left="3px"
              colorScheme="red"
              suppressHydrationWarning
              variant="solid"
              borderRadius="20px"
              fontSize="10px"
              px="5px"
            >
              {cart.cartItems.length}
            </Badge>
          )}
        </a>
      </Link>
    </Text>
  );
}

export default CartMenu;
