import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

function PriceRangeScreen({ range, setRange }: any) {
  const { t } = useTranslation('common');
  return (
    <Box px="20px">
      <Text mb="30px" mt="15px" fontWeight="bold">
        {t('price')}
      </Text>
      <RangeSlider
        onChangeEnd={(val) => {
          setRange(val);
        }}
        defaultValue={[0, 50000]}
        min={0}
        max={50000}
        step={5000}
        colorScheme="teal"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>

        <>
          <RangeSliderThumb index={0}>
            <Text position="relative" top="-20px" fontSize="11px">
              {range[0]}
            </Text>
          </RangeSliderThumb>
        </>

        <RangeSliderThumb index={1}>
          <Text position="relative" top="-20px" fontSize="11px">
            {range[1]}
          </Text>
        </RangeSliderThumb>
      </RangeSlider>
    </Box>
  );
}

export default PriceRangeScreen;
