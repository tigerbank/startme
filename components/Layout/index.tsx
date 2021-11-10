import { Box } from '@chakra-ui/layout';
import React, { PropsWithChildren } from 'react';
import Header from './Header';
import Navigation from './Navigation';

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <Navigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
