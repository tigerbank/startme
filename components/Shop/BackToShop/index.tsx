import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useTranslation } from 'next-i18next';

function BackToShop() {
  const { t } = useTranslation('common');
  return (
    <Box mt="30px">
      <Link href="/shop" passHref>
        <a>
          <Icon mr="5px" as={ArrowBackIcon} />
          {t('back_to_shop')}
        </a>
      </Link>
    </Box>
  );
}

export default BackToShop;
