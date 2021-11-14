import { Box, Heading } from '@chakra-ui/layout';
import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoResult from './ToDoResult';

function ToDoList() {
  return (
    <Box mt="20px" className="container">
      <Heading as="h2" textAlign="center" fontSize="18px" mb="10px">
        All Tasks
      </Heading>
      <ToDoForm />
      <ToDoResult />
    </Box>
  );
}

export default ToDoList;
