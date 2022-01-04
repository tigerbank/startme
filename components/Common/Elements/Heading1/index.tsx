import { Heading } from '@chakra-ui/react';
import React from 'react';

type HeadlineProps = {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  as?: any;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
};

function index({
  color = 'teal.700',
  fontSize = '32px',
  as = 'h2',
  textAlign = 'left',
  children,
}: HeadlineProps) {
  return (
    <Heading color={color} fontSize={fontSize} as={as} textAlign={textAlign}>
      {children}
    </Heading>
  );
}

export default index;
