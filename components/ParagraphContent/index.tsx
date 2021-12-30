import { Box, Heading, Text, Link } from '@chakra-ui/react';
import React from 'react';

function ParagraphContent() {
  return (
    <Box py="70px" bg="teal" mt="30px">
      <Box className="container" color="white">
        <Heading as="h3" fontSize="30px" textAlign="center">
          About This Website
        </Heading>
        <Text px="80px" mt="20px" textAlign="center">
          This site is a simple portfolio that contains multiple projects for
          website development showcase and experiment. This website is built
          with Nextjs, Strapi, Typescript, Chakra-ui, and many other
          technologies. More detail about this project, <br />
          <Text as="span" whiteSpace="nowrap">
            please check :
          </Text>
          <Link ml="3px" fontWeight="bold" whiteSpace="nowrap">
            <a
              target="_blank"
              href="https://github.com/tigerbank/startme/"
              rel="noreferrer"
            >
              https://github.com/tigerbank/startme/
            </a>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default ParagraphContent;
