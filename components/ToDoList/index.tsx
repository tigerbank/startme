import { Box, Heading } from '@chakra-ui/layout';
import React from 'react';
import { TodoProps } from 'interfaces/common';
import ToDoForm from './ToDoForm';
import ToDoResult from './ToDoResult';

function ToDoList({ todos }: { todos: TodoProps[] }) {
  return (
    <Box mt="20px" className="container">
      <Heading as="h2" textAlign="center" fontSize="18px" mb="10px">
        All Tasks
      </Heading>
      <ToDoForm />
      <ToDoResult todos={todos} />
    </Box>
  );
}

export default ToDoList;
