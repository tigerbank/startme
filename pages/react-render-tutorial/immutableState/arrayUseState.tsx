import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const initState = ['Bruce', 'wayne'];

function ObjectUseState() {
  const [persons, setPersons] = useState(initState);

  const handleClick = () => {
    const newPersons = [...persons];
    newPersons.push('Clark');
    newPersons.push('kent');
    setPersons(newPersons);
  };

  console.log('object useState render');

  return (
    <Box mt="150px">
      <Button onClick={handleClick}>Click</Button>
      {persons.map((person, index) => {
        return <div key={person}>{person}</div>;
      })}
    </Box>
  );
}

export default ObjectUseState;
