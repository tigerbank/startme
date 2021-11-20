import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from 'components/Layout';
import { Box } from '@chakra-ui/layout';

const theme = extendTheme({
  colors: {
    main: {
      gray: '#f1f1f1',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box h="100vw" bg="main.gray">
        <Layout nav={pageProps.nav}>
          <Component {...pageProps} />
        </Layout>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
