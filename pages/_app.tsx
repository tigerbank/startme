import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import NextNprogress from 'nextjs-progressbar';
import Layout from '@/components/Layout';
import { Box } from '@chakra-ui/layout';
import { StoreProvider } from '@/util/Store';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
});

const theme = extendTheme({
  // fonts: {
  //   heading: 'Prompt',
  //   body: 'Prompt',
  // },
  colors: {
    main: {
      gray: '#f1f1f1',
    },
  },
  breakpoints,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress options={{ showSpinner: false }} />
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <Box h="100vw" bg="main.gray">
            <Layout nav={pageProps.nav}>
              <Component {...pageProps} />
            </Layout>
          </Box>
        </ChakraProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
