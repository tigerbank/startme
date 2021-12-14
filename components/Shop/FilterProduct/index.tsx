import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, Select, Stack } from '@chakra-ui/react';
import PriceRangeScreen from './PriceRange';

function FilterProduct({ productFilter, setProductFilter }: any) {
  const [range, setRange] = useState([0, 50000]);

  useEffect(() => {
    setProductFilter({
      ...productFilter,
      range,
    });
  }, [range]);

  return (
    <Box mt="20px">
      <Heading as="h5" fontSize="16px" mb="15px">
        Filter Product
      </Heading>

      <Stack>
        <Input
          placeholder="Product name"
          onKeyUp={(e) =>
            setProductFilter({
              ...productFilter,
              s: (e.target as HTMLTextAreaElement).value,
            })
          }
        />
        {/* <Select>
          <option>All</option>
          <option>Nike</option>
          <option>Adidas</option>
        </Select> */}

        <PriceRangeScreen setRange={setRange} range={range} />
      </Stack>
    </Box>
  );
}

export default FilterProduct;
