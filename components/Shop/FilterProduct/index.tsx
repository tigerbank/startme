import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, Stack } from '@chakra-ui/react';
import PriceRangeScreen from '@/components/Shop/FilterProduct/PriceRange';
import BrandCheckBox from '@/components/Shop/FilterProduct/BrandCheckBox';

function FilterProduct({ productFilter, setProductFilter }: any) {
  const [range, setRange] = useState([0, 50000]);
  const [checkedBrand, setCheckedBrand] = useState([]);

  useEffect(() => {
    setProductFilter({
      ...productFilter,
      range,
    });
  }, [range]);

  useEffect(() => {
    setProductFilter({
      ...productFilter,
      checkedBrand,
    });
  }, [checkedBrand]);

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

        <BrandCheckBox
          checkedBrand={checkedBrand}
          setCheckedBrand={setCheckedBrand}
        />

        <PriceRangeScreen setRange={setRange} range={range} />
      </Stack>
    </Box>
  );
}

export default FilterProduct;
