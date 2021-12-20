import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { Store } from '@/util/Store';
import { useRouter } from 'next/router';

function UserMenu({ onClose }: { onClose?: () => void }) {
  const { state, dispatch } = useContext(Store);
  const { user } = state;
  const router = useRouter();

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    Cookies.remove('user');
    Cookies.remove('cartItems');
    Cookies.remove('shippingAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };

  return (
    <Box d="flex" suppressHydrationWarning>
      {!user ? (
        <>
          <Text mr="10px">
            <Link href="/login">
              <a onClick={onClose}>Login</a>
            </Link>
          </Text>

          <Text mr="10px">
            <Link href="/register">
              <a onClick={onClose}>Register</a>
            </Link>
          </Text>
        </>
      ) : (
        <Menu>
          <MenuButton size="xs" variant="solid" colorScheme="teal" as={Button}>
            {user.username}
          </MenuButton>
          <MenuList p="0px">
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
}

export default UserMenu;
