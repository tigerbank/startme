import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

function Layout({ children, nav }: any) {
  return (
    <>
      <Header />
      {nav && <Navigation nav={nav} />}
      <main>{children}</main>
    </>
  );
}

export default Layout;
