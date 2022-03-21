import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MemorizedChild } from './child';

function ExperimentUseMemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  console.log('render from parent');

  return (
    <Box mt="50px" className="container">
      ExperimentUseMemo:
      <br />
      when parent component renders, child component may un-neccessary render.
      <br />
      To optimize this, we can use React.memo() to memoize the child component.
      <br />
      {count}
      <br />
      <button onClick={() => setCount(count + 1)}>Set count</button>
      <br />
      <button onClick={() => setName('John')}>Set name</button>
      <MemorizedChild name={name} />
    </Box>
  );
}

export default ExperimentUseMemo;
