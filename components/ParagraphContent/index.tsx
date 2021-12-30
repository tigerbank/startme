import { Box, Heading, Text, Link } from '@chakra-ui/react';
import React from 'react';

function ParagraphContent() {
  return (
    <Box py="70px" bg="teal" mt="30px">
      <Box className="container" color="white">
        <Heading as="h3" fontSize="30px" textAlign="center">
          About This Website
        </Heading>
        <Box maxWidth="900px" ml="auto" mr="auto">
          <Text px="20px" mt="20px" textAlign="center">
            This site is a simple portfolio that contains multiple projects for
            website development showcase and experiment built with Nextjs,
            Strapi, Typescript, Chakra-ui, and many other technologies. More
            detail about this project, <br />
            <Text as="span" whiteSpace="nowrap">
              please check :
            </Text>
            <Link ml="3px" fontWeight="bold">
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
    </Box>
  );
}

export default ParagraphContent;
