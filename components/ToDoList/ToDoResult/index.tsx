import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TodoProps } from 'interfaces/common';
import { useRouter } from 'next/router';

function ToDoResult({ todos }: { todos: TodoProps[] }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  function handleDelete(id: number) {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => refreshData());
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
