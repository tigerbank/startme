import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import NextNprogress from 'nextjs-progressbar';
import { Box } from '@chakra-ui/layout';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import { StoreProvider } from '@/util/Store';
import Layout from '@/components/Layout';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
});

const theme = extendTheme({
  fonts: {
    heading: 'IBM Plex Sans Thai',
    body: 'IBM Plex Sans Thai',
  },

  colors: {
    main: {
      gray: '#f1f1f1',
    },
  },
  breakpoints,
});

function MyApp({ Component, pageProps }: AppProps) {
  const env = process.env.NODE_ENV;
  return (
    <>
      {env === 'production' && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <Script id="analytics" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}')`}
          </Script>
        </>
      )}

      <NextNprogress options={{ showSpinner: false }} />
      <DefaultSeo
        openGraph={{
          type: 'website',
          url: 'https://teerasakyukan.com',
          site_name: 'Teerasakyukan Portfolio',
          images: [
            {
              url: 'https://teerasakyukan.com/images/og-image.jpg',
              width: 800,
              height: 600,
              alt: 'Teerasakyukan Portfolio',
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <Box bg="main.gray">
            <Layout nav={pageProps.global?.nav}>
              <Component {...pageProps} />
            </Layout>
          </Box>
        </ChakraProvider>
      </StoreProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
