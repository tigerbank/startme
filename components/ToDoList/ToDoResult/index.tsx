import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TodoProps } from 'interfaces/common';
import { getTodosData } from 'util/api';

function ToDoResult() {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  async function getData() {
    const data = await getTodosData();
    setTodos(data);
  }

  getData();

  function handleDelete(id: number) {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        return;
      });
  }

  return (
    <Box>
      {todos &&
        todos.map((todo: TodoProps) => (
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
