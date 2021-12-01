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
import LanguageSwitcher from '@/components/Layout/Header/LanguageSwitcher';

function SubMenu() {
  const { state, dispatch } = useContext(Store);
  const { cart, user } = state;
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
    <>
      <Box d="flex" alignItems="center">
        <Box suppressHydrationWarning mr="5" d="flex">
          {!user ? (
            <>
              <Text mr="10px">
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Text>

              <Text mr="10px">
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </Text>
            </>
          ) : (
            <Menu>
              <MenuButton as={Button}>{user.username}</MenuButton>
              <MenuList>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>

        <Box mr="10" d="flex">
          <Text mr="5px">
            <Link href="/shop/cart">
              <a>Cart</a>
            </Link>
          </Text>
          <Text suppressHydrationWarning>
            {cart.cartItems.length > 0 && cart.cartItems.length}
          </Text>
        </Box>

        <Box d="flex">
          <LanguageSwitcher />
        </Box>
      </Box>
    </>
  );
}

export default SubMenu;
