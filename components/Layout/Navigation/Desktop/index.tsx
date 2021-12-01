import { Box } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import styles from '@/components/Layout/Navigation/Desktop/Navigation.module.scss';
import { NavProps } from '@/interfaces/common';

function DesktopNavigation({ nav }: { nav: NavProps[] }) {
  const sortedNav = nav && [...nav].sort((a, b) => a.order - b.order);
  return (
    <Box className={styles.navigation} bg="black" borderBottom="solid 5px">
      <Box className="container">
        <Box color="white" d="flex" p="10px 0">
          <ul>
            {sortedNav.map((navItem: NavProps) => {
              if (navItem.page || navItem.url) {
                return (
                  <li key={navItem.id}>
                    <Link
                      href={
                        navItem.page ? `/${navItem.page.slug}` : navItem.url
                      }
                    >
                      {navItem.title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default DesktopNavigation;
