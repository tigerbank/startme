import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import React from 'react';

function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Button onClick={toggleColorMode}>
        Theme {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Box>
  );
}

export default ColorModeSwitcher;
