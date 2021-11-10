import { Box } from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <Box className={styles.navigation} bg="teal" mb="20px">
      <Box className="container">
        <Box color="white" d="flex" p="10px 0">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/event">Event</Link>
            </li>
            <li>
              <Link href="/1">About</Link>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default Navigation;
