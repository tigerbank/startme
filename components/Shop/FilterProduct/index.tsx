import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import PriceRangeScreen from '@/components/Shop/FilterProduct/PriceRange';
import BrandCheckBox from '@/components/Shop/FilterProduct/BrandCheckBox';

function FilterProduct({ productFilter, setProductFilter }: any) {
  const isNotXl = useBreakpointValue({ base: true, xl: false });
  const { t } = useTranslation('common');
  const [range, setRange] = useState([0, 50000]);
  const [checkedBrand, setCheckedBrand] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

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

  const filterForm = () => {
    return (
      <>
        <Heading
          as="h5"
          fontSize="20px"
          mb="15px"
          mt={{ base: '50px', xl: '0px' }}
        >
          {t('filter_product')}
        </Heading>
        <Box borderEndRadius="lg">
          <Input
            mb="20px"
            bg="white"
            placeholder={t('product_name')}
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
        </Box>
      </>
    );
  };

  return (
    <Box mt="20px">
      {isNotXl ? (
        <>
          <Button
            isFullWidth
            colorScheme="teal"
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
          >
            {!isOpen ? t('filter_product') : 'Close filter'}
          </Button>

          <Box d={isOpen ? 'block' : 'none'}>{filterForm()}</Box>
        </>
      ) : (
        filterForm()
      )}
    </Box>
  );
}

export default FilterProduct;
