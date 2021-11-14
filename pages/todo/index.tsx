import React from 'react';
import ToDoList from 'components/ToDoList';
import { Box } from '@chakra-ui/layout';
import { getTodosData } from 'util/api';
import { TodoProps } from 'interfaces/common';

function Todo({ todos }: { todos: TodoProps[] }) {
  return (
    <Box>
      <ToDoList todos={todos} />
    </Box>
  );
}

export async function getServerSideProps() {
  const todos = await getTodosData();

  if (!todos) {
    return {
      notFound: true,
    };
  }

  return {
    props: { todos },
  };
}

export default Todo;
