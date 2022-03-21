import { Box } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import ButtonComponent from './Button';
import Count from './Count';
import Title from './Title';

function UseCallbackExample() {
  const [age, setAge] = useState(38);
  const [salary, setSalary] = useState(100000);

  const incrementAge = useCallback(() => {
    setAge(age + 1);
  }, [age]);

  const incrementSalary = useCallback(() => {
    setSalary(salary + 10000);
  }, [salary]);

  return (
    <Box className="container" mt="150px">
      <Title />
      <Count name="age" value={age} />
      <ButtonComponent handleClick={incrementAge} name="age" />
      <Count name="salary" value={salary} />
      <ButtonComponent handleClick={incrementSalary} name="salary" />
    </Box>
  );
}

export default UseCallbackExample;
