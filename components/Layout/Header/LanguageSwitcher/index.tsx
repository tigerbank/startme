import React from 'react';
import { useRouter } from 'next/router';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

function LanguageSwitcher() {
  const router = useRouter();

  return (
    <Box d="flex">
      <Link passHref locale="en" href={(router && router.asPath) || '/'}>
        <a>
          <Text fontWeight={router.locale === 'en' ? 'bold' : 'normal'}>
            EN
          </Text>
        </a>
      </Link>
      &nbsp;|&nbsp;
      <Link passHref locale="th" href={(router && router.asPath) || '/'}>
        <a>
          <Text fontWeight={router.locale === 'th' ? 'bold' : 'normal'}>
            ไทย
          </Text>
        </a>
      </Link>
    </Box>
  );
}

export default LanguageSwitcher;
