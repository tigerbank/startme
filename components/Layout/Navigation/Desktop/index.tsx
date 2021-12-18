import { Box } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import styles from '@/components/Layout/Navigation/Desktop/Navigation.module.scss';
import { NavProps } from '@/interfaces/common';

function DesktopNavigation({ nav }: { nav: NavProps[] }) {
  return (
    <Box className={styles.navigation} bg="black" borderBottom="solid 5px">
      <Box className="container">
        <Box color="white" d="flex" p="10px 0">
          <ul>
            {nav &&
              nav.map((navItem: NavProps) => {
                return (
                  <li key={navItem.id}>
                    <Link href={navItem.url}>{navItem.text}</Link>
                  </li>
                );
              })}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default DesktopNavigation;
