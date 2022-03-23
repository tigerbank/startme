import React from 'react';
import { Box, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

function Work({ duration, company, position, description }: any) {
  return (
    <MotionBox
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      mt="100px"
      d="flex"
      flexDirection={{ base: 'column', lg: 'row' }}
      gap="50px"
      w="90%"
      ml="auto"
      mr="auto"
    >
      <Box
        w={{ base: '100%', lg: '25%' }}
        textAlign={{ base: 'left', lg: 'right' }}
      >
        {duration}
      </Box>
      <Box w={{ base: '100%', lg: '65%' }}>
        <Heading as="h4">{company}</Heading>
        <Heading as="h5">{position}</Heading>
        <UnorderedList>
          {description.map((item: any) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </MotionBox>
  );
}

export default Work;
