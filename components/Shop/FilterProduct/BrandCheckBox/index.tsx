import { Box, Checkbox, Stack, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { getBrands } from '@/util/api';
import { BrandProps } from '@/interfaces/common';

function BrandCheckBox({ checkedBrand, setCheckedBrand }: any) {
  const { t } = useTranslation('common');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    let controller: any = new AbortController();
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await getBrands({
          signal: controller.signal,
        });
        setBrands(data);
        setLoading(false);
        controller = null;
      } catch (error: any) {}
    };
    fetchBrands();
    return () => controller?.abort();
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

  if (loading) {
    return <Box mt="20px">Loading...</Box>;
  }

  if (status) {
    return <Box mt="20px">{status}</Box>;
  }
  return (
    <Box>
      <Heading my="15px" as="h4" fontSize="16px">
        {t('brand')}
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
