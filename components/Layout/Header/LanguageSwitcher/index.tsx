import { Box } from '@chakra-ui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function LanguageSwitcher() {
  const router = useRouter();

  return (
    <Box>
      <Link locale="th" href={(router && router.asPath) || '/'}>
        TH
      </Link>
      &nbsp;|&nbsp;
      <Link locale="en" href={(router && router.asPath) || '/'}>
        EN
      </Link>
    </Box>
  );
}

export default LanguageSwitcher;
