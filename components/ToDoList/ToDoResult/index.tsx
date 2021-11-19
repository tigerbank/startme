import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TodoProps } from 'interfaces/common';

function ToDoResult({ lists, handleDelete }: any) {
  return (
    <Box data-testid="task-container">
      {lists.map((todo: TodoProps) => (
        <Box
          borderBottom="solid 1px #cecece"
          key={todo.id}
          padding="20px"
          d="flex"
          justifyContent="space-between"
        >
          <Text>{todo.item}</Text>
          <Text cursor="pointer" onClick={handleDelete.bind(null, todo.id)}>
            X
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default ToDoResult;
