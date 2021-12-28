import { BrandProps } from '@/interfaces/common';
import { getBrands } from '@/util/api';
import { Box, Checkbox, Stack, Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

function BrandCheckBox({ checkedBrand, setCheckedBrand }: any) {
  const { t } = useTranslation('common');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await getBrands();
        setBrands(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setStatus('Could not fetch brands');
      }
    };
    fetchBrands();
    return () => {
      setLoading(false);
      setBrands([]);
      setStatus(null);
    };
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
