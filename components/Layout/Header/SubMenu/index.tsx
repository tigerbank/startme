import { Box } from '@chakra-ui/react';

import React from 'react';
import LanguageSwitcher from '@/components/Layout/Header/LanguageSwitcher';
import UserMenu from '@/components/Layout/Header/UserMenu';
import CartMenu from '@/components/Layout/Header/CartMenu';

function SubMenu() {
  return (
    <>
      <Box d="flex" alignItems="center">
        <Box mr="5px">
          <UserMenu />
        </Box>

        <Box mr="10px" d="flex">
          <CartMenu />
        </Box>

        <Box d="flex">
          <LanguageSwitcher />
        </Box>
      </Box>
    </>
  );
}

export default SubMenu;
