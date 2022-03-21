import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

function Parent({ children }: { children: React.ReactNode }) {
  console.log('parent render');
  const [count, setCount] = useState(0);
  return (
    <Box mt="50px">
      <Text mt="30px">Aviod unnecssary re-render of Child component</Text>
      {count}
      <br />
      Parent re-render anytime count is changed
      <br />
      <Button onClick={() => setCount((prev) => prev + 1)}>Count</Button>
      {children}
    </Box>
  );
}

export default Parent;
