import { Box, Button } from '@chakra-ui/react';
import React, { useReducer } from 'react';

const initailState = 0;

const reducer = (state: any, action: any) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return initailState;
    default:
      return state;
  }
};

function TutorialUseReducer() {
  const [count, dispatch] = useReducer(reducer, initailState);
  console.log('useReducer render');

  return (
    <Box mt="100px">
      {count}
      <br />
      <Button onClick={() => dispatch('increment')}>Incresase</Button>
      <Button onClick={() => dispatch('decrement')}>Decrease</Button>
      <Button onClick={() => dispatch('reset')}>Reset</Button>
    </Box>
  );
}

export default TutorialUseReducer;
