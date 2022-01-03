import { Box } from '@chakra-ui/react';
import React from 'react';

function ContentWithSidebar({ children }: { children: React.ReactNode }) {
  let element = React.Children.toArray(children);

  return (
    <Box d="flex" flexDir={{ base: 'column', lg: 'row' }}>
      <Box width={{ base: '100%', lg: '70%' }}>{element[0]}</Box>
      <Box width={{ base: '100%', lg: '30%' }}>
        <Box mt={{ base: '20px', lg: '0px' }} pl={{ base: 0, lg: '30px' }}>
          {element[1]}
        </Box>
      </Box>
    </Box>
  );
}

export default ContentWithSidebar;
