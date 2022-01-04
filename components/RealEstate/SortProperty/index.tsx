import { Box, Select, Text } from '@chakra-ui/react';
import React from 'react';

function SortProperty({ sortBy, setSortBy }: any) {
  return (
    <Box pr="10px" d="flex" alignItems="center" justifyContent="right">
      <Text mr="10px" color="grey">
        Sort By:
      </Text>
      <Select
        variant="outline"
        defaultValue="price-high-low"
        onChange={(e) => setSortBy(e.target.value)}
        bg="white"
        w="250px"
        _focus={{ outline: 'none' }}
      >
        <option data-testid="select-option" value="newest">
          Newest
        </option>
        <option data-testid="select-option" value="oldest">
          Oldest
        </option>
        <option data-testid="select-option" value="price-low-high">
          Price (low-high)
        </option>
        <option data-testid="select-option" value="price-high-low">
          Price (high-low)
        </option>
      </Select>
    </Box>
  );
}

export default SortProperty;
