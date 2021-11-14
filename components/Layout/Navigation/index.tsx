import { Box } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import { NavProps } from 'interfaces/common';

function Navigation({ nav }: { nav: NavProps[] }) {
  const sortedNav = nav && [...nav].sort((a, b) => a.order - b.order);
  return (
    <Box className={styles.navigation} bg="teal" mb="20px">
      <Box className="container">
        <Box color="white" d="flex" p="10px 0">
          <ul>
            {sortedNav.map((navItem: NavProps) => (
              <li key={navItem.id}>
                <Link href={`/${navItem.page.slug}`}>{navItem.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default Navigation;
