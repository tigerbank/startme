import React from 'react';
import { Box, Badge, UnorderedList, List, Flex, Text } from '@chakra-ui/react';
import { PaginationProps } from '@/interfaces/common';

function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  noOfAllPosts,
}: PaginationProps) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Flex alignItems="center">
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
                  data-testid={`paginationList-${number}`}
                >
                  {number}
                </Badge>
              </List>
            );
          })}
        </UnorderedList>
      </Box>

      <Text fontSize="12px" textAlign="right">
        Page {currentPage} of {noOfAllPosts}
      </Text>
    </Flex>
  );
}

export default Pagination;
