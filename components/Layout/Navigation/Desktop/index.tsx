import { Box } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import styles from '@/components/Layout/Navigation/Desktop/Navigation.module.scss';
import { NavProps } from '@/interfaces/common';

function DesktopNavigation({ nav }: { nav: NavProps[] }) {
  const renderNavItem = (navItem: NavProps) => {
    if (navItem.subnav.length === 0) {
      return (
        <li key={navItem.id}>
          <Link href={navItem.url}>{navItem.text}</Link>
        </li>
      );
    } else {
      return (
        <li key={navItem.id}>
          <Menu>
            <MenuButton>
              <Text cursor="pointer">
                {navItem.text} <ChevronDownIcon />
              </Text>
            </MenuButton>

            <MenuList p="0" mt="7px">
              {navItem.subnav &&
                navItem.subnav.map((subNavItem: any) => (
                  <Link passHref href={subNavItem.url} key={subNavItem.id}>
                    <MenuItem color="black">{subNavItem.text}</MenuItem>
                  </Link>
                ))}
            </MenuList>
          </Menu>
        </li>
      );
    }
  };

  return (
    <Box
      mt="45px"
      className={styles.navigation}
      bg="black"
      borderBottom="solid 5px"
    >
      <Box className="container">
        <Box color="white" d="flex" p="10px 0">
          <ul>
            {nav &&
              nav.map((navItem: NavProps) => {
                return renderNavItem(navItem);
              })}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default DesktopNavigation;
