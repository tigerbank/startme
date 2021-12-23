import { Box } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import React from 'react';

function Loading() {
  return (
    <Box textAlign="center" mt="50px">
      <CircularProgress isIndeterminate color="teal" />
    </Box>
  );
}

export default Loading;
