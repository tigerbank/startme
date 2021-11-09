import { Box } from '@chakra-ui/layout';
import React, { PropsWithChildren } from 'react';
import Header from './Header';

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
