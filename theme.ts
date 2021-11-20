import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    100: '#110000',
    900: '#001100',
  },
};

const theme = extendTheme({ config, colors });

export default theme;
