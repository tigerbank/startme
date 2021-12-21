import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import PriceRangeScreen from '@/components/Shop/FilterProduct/PriceRange';
import BrandCheckBox from '@/components/Shop/FilterProduct/BrandCheckBox';
import { useTranslation } from 'next-i18next';

function FilterProduct({ productFilter, setProductFilter }: any) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation('common');
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const filterForm = () => {
    return (
      <>
        <Heading as="h5" fontSize="20px" mb="15px">
          {t('filter_product')}
        </Heading>
        <Stack>
          <Input
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
        </Stack>
      </>
    );
  };
  const renderFilter = () => {
    if (isMobile) {
      return (
        <>
          <Button
            isFullWidth
            colorScheme="teal"
            onClick={onOpen}
            variant="outline"
          >
            {t('filter_product')}
          </Button>
          <Drawer placement="top" onClose={onClose} isOpen={isOpen} size="full">
            <DrawerOverlay />
            <DrawerContent pt="100px">
              <DrawerCloseButton _focus={{ outline: 'none' }} top="50px" />
              <DrawerBody>{filterForm()}</DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      );
    } else {
      return filterForm();
    }
  };

  return <Box mt="20px">{renderFilter()}</Box>;
}

export default FilterProduct;
