import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

function OtherLink() {
  return (
    <Box className="container" pt="50px">
      <Heading as="h4">LinkedIn Profile</Heading>
      <Text>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/teerasakyukanta/"
          rel="noreferrer"
        >
          https://www.linkedin.com/in/teerasakyukanta/
        </a>
      </Text>
    </Box>
  );
}

export default OtherLink;
