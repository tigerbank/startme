import { Button } from '@chakra-ui/react';
import React from 'react';

function ButtonComponent({ handleClick, name }: any) {
  console.log('render Button' + name);
  return <Button onClick={handleClick}>Button</Button>;
}

export default React.memo(ButtonComponent);
