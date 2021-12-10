import React from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  UnorderedList,
  List,
} from '@chakra-ui/react';

function Pagination({ postsPerPage, totalPosts, paginate }: any) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Box>
      <UnorderedList d="flex">
        {pageNumber.map((number) => {
          return (
            <List mr="10px" key={number}>
              <Badge
                onClick={() => paginate(number)}
                variant="outline"
                colorScheme="teal"
                px="10px"
                py="5px"
                cursor="pointer"
              >
                {number}
              </Badge>
            </List>
          );
        })}
      </UnorderedList>
    </Box>
  );
}

export default Pagination;
