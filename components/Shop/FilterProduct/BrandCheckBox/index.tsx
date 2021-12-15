import { BrandProps } from '@/interfaces/common';
import { getBrands } from '@/util/api';
import { Box, Checkbox, Stack, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function BrandCheckBox({ checkedBrand, setCheckedBrand }: any) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrands();
  }, []);

  const handleToggle = (id: number) => {
    const currentIndex = checkedBrand.indexOf(id);
    const newChecked = [...checkedBrand];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedBrand(newChecked);
  };

  return (
    <Box>
      <Heading my="15px" as="h4" fontSize="16px">
        Brand
      </Heading>
      <Stack>
        {brands.map((brand: BrandProps) => (
          <Checkbox
            onChange={() => handleToggle(brand.id)}
            key={brand.id}
            value={brand.id}
          >
            {brand.name}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
}

export default BrandCheckBox;
