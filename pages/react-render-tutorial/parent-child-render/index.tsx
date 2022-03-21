import { Box } from '@chakra-ui/react';
import React from 'react';
import Child from './Child';
import Parent from './Parent';

function ParentChildRender() {
  return (
    <Box className="container">
      <Parent>
        <Child />
      </Parent>
    </Box>
  );
}

export default ParentChildRender;
