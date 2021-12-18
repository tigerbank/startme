import { Box } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import styles from '@/components/Layout/Navigation/Desktop/Navigation.module.scss';
import { NavProps } from '@/interfaces/common';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

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
          <Popover>
            <PopoverTrigger>
              <Text cursor="pointer">
                {navItem.text} <ChevronDownIcon />
              </Text>
            </PopoverTrigger>

            <PopoverContent
              position="relative"
              width="250px"
              left="80px"
              border="none"
              mt="7px"
              _focus={{ outline: 'none' }}
            >
              <PopoverBody p="0" color="black">
                <ul>
                  {navItem.subnav &&
                    navItem.subnav.map((subNavItem: any) => (
                      <li key={subNavItem.id}>
                        <Link href={subNavItem.url}>{subNavItem.text}</Link>
                      </li>
                    ))}
                </ul>
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
