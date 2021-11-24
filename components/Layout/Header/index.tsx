import React, { useContext } from 'react';
import Link from 'next/link';
import { Box, Heading, Text } from '@chakra-ui/layout';
import LanguageSwitcher from './LanguageSwitcher';
import { Store } from 'util/Store';
import Cookies from 'js-cookie';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

function Header() {
  const { state, dispatch } = useContext(Store);
  const { cart, user } = state;

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    Cookies.remove('user');
    Cookies.remove('cartItems');
  };
  return (
    <>
      <Box
        height="60px"
        borderBottom="solid 1px #cecece"
        display="flex"
        alignItems="center"
      >
        <Box
          className="container"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading fontSize="20px" as="h3" fontFamily="Comfortaa, cursive">
            <Link href="/">
              <a>TEERASAKYUKAN</a>
            </Link>
          </Heading>
          <Box d="flex" alignItems="center">
            <Box suppressHydrationWarning mr="5" d="flex">
              {!user ? (
                <Text mr="5px">
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </Text>
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

            <Box>
              <LanguageSwitcher />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;
