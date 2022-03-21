import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const initState = {
  fname: 'bruce',
  lname: 'wayne',
};

function ObjectUseState() {
  const [person, setPerson] = useState(initState);

  const changeName = () => {
    // person.fname = 'clark';
    // person.lname = 'kent';

    const newPerson = { ...person };
    newPerson.fname = 'clark';
    newPerson.lname = 'kent';
    setPerson(newPerson);
  };

  console.log('object useState render');

  return (
    <Box mt="150px">
      {person.fname} {person.lname}
      <Button onClick={changeName}>xx</Button>
    </Box>
  );
}

export default ObjectUseState;
